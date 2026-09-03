#!/usr/bin/env node
// Capture browser console output for a page, optionally after dev login from .env.local.
// Usage: node scripts/capture-console.mjs <url> [--login] [--wait-ms=N]
// Prints `[LEVEL] message` lines to stdout. Exit code 0 always (grep the output).

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:3000/";
const doLogin = process.argv.includes("--login");
const cookieArg = process.argv.find((a) => a.startsWith("--cookie="));
const setCookie = cookieArg ? cookieArg.split("=").slice(1).join("=") : null; // "name=value"
const periodArg = process.argv.find((a) => a.startsWith("--period="));
const period = periodArg ? periodArg.split("=")[1] : null; // e.g. 2025-09
const waitArg = process.argv.find((a) => a.startsWith("--wait-ms="));
const waitMs = waitArg ? Number(waitArg.split("=")[1]) : 10000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv(file) {
	const out = {};
	if (!existsSync(file)) return out;
	for (const line of readFileSync(file, "utf8").split("\n")) {
		const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/);
		if (!m) continue;
		let v = m[2].trim();
		if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
			v = v.slice(1, -1);
		}
		out[m[1]] = v;
	}
	return out;
}

const port = 9333;
const profile = mkdtempSync(join(tmpdir(), "chromecap-"));
const chrome = spawn(
	"google-chrome",
	[
		"--headless=new",
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${profile}`,
		"--no-sandbox",
		"--disable-gpu",
		"--disable-dev-shm-usage",
		"--disable-extensions",
		"--no-first-run",
		"about:blank",
	],
	{ stdio: ["ignore", "ignore", "inherit"] },
);

async function getTarget() {
	for (let i = 0; i < 60; i++) {
		try {
			const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
			const page = list.find((t) => t.type === "page");
			if (page) return page;
		} catch {
			/* chrome not ready yet */
		}
		await sleep(200);
	}
	throw new Error("chrome devtools endpoint not reachable");
}

let exited = false;
process.on("exit", () => {
	if (!exited) {
		try {
			chrome.kill("SIGKILL");
		} catch {}
	}
});

try {
	const target = await getTarget();
	const ws = new WebSocket(target.webSocketDebuggerUrl);
	let msgId = 0;
	const pending = new Map();
	const logs = [];
	let finalUrl = "";

	ws.onmessage = (ev) => {
		const msg = JSON.parse(ev.data);
		if (msg.id && pending.has(msg.id)) {
			pending.get(msg.id)(msg);
			pending.delete(msg.id);
			return;
		}
		if (msg.method === "Page.frameNavigated" && !msg.params.frame.parentId) {
			finalUrl = msg.params.frame.url;
		}
		if (msg.method === "Runtime.consoleAPICalled") {
			const args = msg.params.args
				.map((a) => (a.type === "string" ? a.value : a.description ?? a.value ?? ""))
				.join(" ");
			logs.push(`[${msg.params.type.toUpperCase()}] ${args}`);
		}
		if (msg.method === "Log.entryAdded") {
			logs.push(`[${msg.params.entry.level.toUpperCase()}] ${msg.params.entry.text}`);
		}
		if (msg.method === "Runtime.exceptionThrown") {
			const d = msg.params.exceptionDetails;
			const text = d.exception?.description ?? d.text ?? "";
			logs.push(`[EXCEPTION] ${text.split("\n")[0]}`);
		}
	};

	const send = (method, params = {}) =>
		new Promise((res) => {
			const id = ++msgId;
			pending.set(id, res);
			ws.send(JSON.stringify({ id, method, params }));
		});

	await new Promise((r) => (ws.onopen = r));
	await send("Runtime.enable");
	await send("Page.enable");
	await send("Log.enable");
	await send("Network.enable");
	const badResponses = [];
	const origOnmessage = ws.onmessage;
	ws.onmessage = (ev) => {
		const msg = JSON.parse(ev.data);
		if (
			msg.method === "Network.responseReceived" &&
			msg.params.response.status >= 300 &&
			msg.params.response.status !== 304
		) {
			badResponses.push(`${msg.params.response.status} ${msg.params.response.url}`);
		}
		origOnmessage(ev);
	};

	await send("Page.navigate", { url: "http://localhost:3000/login" });
	await sleep(3000);

	if (doLogin) {
		const env = loadEnv(".env.local");
		const email = env.TEST_EMAIL.includes("@")
			? env.TEST_EMAIL
			: `${env.TEST_EMAIL}@${env.DEFAULT_EMAIL_DOMAIN ?? ""}`;
		const expr = `(async () => {
			const r = await fetch("/api/proxy/v1/account/sessions/email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: ${JSON.stringify(email)}, password: ${JSON.stringify(env.TEST_PASSWORD)} }),
			});
			return { ok: r.ok, status: r.status };
		})()`;
		const res = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
		const r = res.result ?? {};
		if (r.exceptionDetails) {
			console.log(`[LOGIN] evaluate threw: ${r.exceptionDetails.exception?.description ?? r.exceptionDetails.text}`);
		} else {
			const value = r.result?.value;
			console.log(`[LOGIN] ${value?.ok ? "ok" : "FAIL"} (${value?.status ?? JSON.stringify(value)})`);
		}
	}

	if (setCookie) {
		const eq = setCookie.indexOf("=");
		const cname = setCookie.slice(0, eq);
		const cvalue = setCookie.slice(eq + 1);
		await send("Network.setCookie", { name: cname, value: cvalue, url: "http://localhost:3000" });
		console.log(`[COOKIE] ${cname}=${cvalue.slice(0, 8)}...`);
	}

	await send("Page.navigate", { url });
	await sleep(4000);

	if (period) {
		const [yearStr, monthStr] = period.split("-");
		const monthLabel = new Date(Number(yearStr), Number(monthStr) - 1, 1).toLocaleString("en-US", { month: "long" });
		const expr = `(async () => {
			const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
			const pick = async (label, text) => {
				const trigger = document.querySelector('button[aria-label="' + label + '"]');
				if (!trigger) return false;
				trigger.click();
				await sleep(600);
				const items = Array.from(document.querySelectorAll('[data-slot="select-item"]'));
				const item = items.find((el) => el.textContent.trim().includes(text));
				if (!item) return false;
				item.click();
				await sleep(500);
				return true;
			};
			const okM = await pick("Pilih Bulan", ${JSON.stringify(monthLabel)});
			const okY = await pick("Pilih Tahun", ${JSON.stringify(yearStr)});
			return { month: okM, year: okY };
		})()`;
		const res = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
		const value = res.result?.result?.value;
		console.log(`[PERIOD] ${period} month=${value?.month} year=${value?.year}`);
		await sleep(waitMs);
	} else {
		await sleep(waitMs);
	}

	for (const br of badResponses) {
		logs.push(`[HTTP] ${br}`);
	}
	logs.push(`[FINAL] ${finalUrl}`);
	console.log(logs.length ? logs.join("\n") : "[no console output]");
} catch (err) {
	console.error(`[ERROR] ${err.message}`);
	process.exitCode = 1;
} finally {
	exited = true;
	try {
		chrome.kill("SIGKILL");
	} catch {}
	rmSync(profile, { recursive: true, force: true });
}