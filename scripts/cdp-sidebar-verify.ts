/* One-off visual verification of app-shell sidebar via raw Chrome DevTools Protocol.
   Usage: bun scripts/cdp-sidebar-verify.ts
   Requires: google-chrome running with --remote-debugging-port=9222 */
const CDP_PORT = 9222;
const BASE = "http://localhost:3000";

interface CdpMsg { id?: number; method?: string; params?: unknown; result?: unknown; error?: { message: string } }

// --- minimal CDP client (websocket, no deps) ---
class Cdp {
	ws: WebSocket;
	id = 0;
	waiters = new Map<number, (m: CdpMsg) => void>();
	events: { method: string; resolve: (m: CdpMsg) => void }[] = [];

	constructor(wsUrl: string) {
		this.ws = new WebSocket(wsUrl);
		this.ws.onmessage = (ev) => {
			const m = JSON.parse(ev.data as string) as CdpMsg;
			if (m.id && this.waiters.has(m.id)) {
				this.waiters.get(m.id)!(m);
				this.waiters.delete(m.id);
			} else if (m.method) {
				const idx = this.events.findIndex((e) => e.method === m.method);
				if (idx >= 0) {
					this.events[idx].resolve(m);
					this.events.splice(idx, 1);
				}
			}
		};
	}
	static async connect(wsUrl: string) {
		const c = new Cdp(wsUrl);
		await new Promise<void>((res, rej) => {
			c.ws.onopen = () => res();
			c.ws.onerror = () => rej(new Error("ws error"));
		});
		return c;
	}
	send(method: string, params: unknown = {}): Promise<CdpMsg> {
		const id = ++this.id;
		this.ws.send(JSON.stringify({ id, method, params }));
		return new Promise((res) => this.waiters.set(id, res));
	}
	async eval<T = unknown>(expr: string): Promise<T> {
		const r = await this.send("Runtime.evaluate", {
			expression: expr,
			returnByValue: true,
			awaitPromise: true,
		});
		if (r.error) throw new Error(`eval failed: ${r.error.message}`);
		const res = r.result as { result?: { value?: T }; exceptionDetails?: { text: string; exception?: { description?: string } } };
		if (res.exceptionDetails) throw new Error(`page threw: ${res.exceptionDetails.exception?.description ?? res.exceptionDetails.text}`);
		return res.result!.value as T;
	}
}

// --- luminance / contrast (WCAG) computed in-page over rendered pixels ---
const MEASURE_JS = `
(async () => {
  const out = {};
  // 1) off-canvas drawer open at mobile?
  const drawer = document.querySelector('[data-slot="sidebar-container"]');
  out.sidebarInDOM = !!drawer;
  out.sidebarVisible = drawer ? getComputedStyle(drawer).display !== 'none' && drawer.getBoundingClientRect().width > 0 : false;
  out.viewport = { w: innerWidth, h: innerHeight };

  // helpers: resolve ANY CSS color (oklch/color-mix) to sRGB via canvas, composite alpha, WCAG contrast
  const cv = document.createElement('canvas'); cv.width = 1; cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  function toSRGB(css){ cx.clearRect(0,0,1,1); cx.fillStyle = css; cx.fillRect(0,0,1,1); const d = cx.getImageData(0,0,1,1).data; return [d[0], d[1], d[2], d[3]/255]; }
  const chan = (v) => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
  const lum = (r,g,b) => 0.2126*chan(r)+0.7152*chan(g)+0.0722*chan(b);
  function composite(fg, bg){ const a = fg[3]; return [0,1,2].map(i => fg[i]*a + bg[i]*(1-a)); }
  function effBg(el){
    let n = el.parentElement;
    while(n && n !== document.documentElement){
      const c = toSRGB(getComputedStyle(n).backgroundColor);
      if (c[3] > 0.9) return c;
      n = n.parentElement;
    }
    return [255,255,255,1];
  }
  function contrast(el){
    const cs = getComputedStyle(el);
    const fg = toSRGB(cs.color); if (fg[3] === 0) return null;
    const bg = effBg(el);
    const f = fg[3] < 1 ? composite(fg, bg) : fg.slice(0,3);
    const L1 = lum(...f), L2 = lum(...bg);
    return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
  }

  // 2) interactive rows: height + contrast
  const rows = [...document.querySelectorAll('[data-sidebar="menu-button"], [data-sidebar="menu-sub-button"], [data-sidebar="menu-sub"] button')];
  out.rows = rows.filter(r => r.offsetParent !== null).map(r => {
    const b = r.getBoundingClientRect();
    const label = (r.textContent || '').trim().replace(/\\s+/g,' ').slice(0, 40);
    const c = contrast(r);
    return { label, h: Math.round(b.height), w: Math.round(b.width), contrast: c === null ? null : Math.round(c*100)/100 };
  });

  // 3) horizontal overflow anywhere?
  out.docScrollW = document.documentElement.scrollWidth;
  out.docClientW = document.documentElement.clientWidth;

  // 4) footer + header text contrast
  const foot = document.querySelector('[data-slot="sidebar-footer"] p, [data-sidebar="footer"] p');
  out.footer = foot && foot.offsetParent !== null ? { text: foot.textContent.trim(), contrast: Math.round(contrast(foot)*100)/100, fontSize: getComputedStyle(foot).fontSize } : null;
  const brand = document.querySelector('[data-sidebar="header"] span');
  out.brand = brand && brand.offsetParent !== null ? { text: brand.textContent.trim(), contrast: Math.round(contrast(brand)*100)/100, fontSize: getComputedStyle(brand).fontSize } : null;

  // 5) dark?
  out.isDark = document.documentElement.classList.contains('dark');
  out.collapsed = !!document.querySelector('[data-state="collapsed"][data-collapsible="icon"]') || document.querySelector('[data-slot="sidebar-gap"]')?.getAttribute('data-collapsible') === 'icon';
  // nav single-line check (desktop)
  const navBtns = rows.filter(r => r.getAttribute('data-sidebar') === 'menu-button');
  if (navBtns.length){
    const tops = new Set(navBtns.map(b => Math.round(b.getBoundingClientRect().top)));
    out.navSingleLine = tops.size === navBtns.length;
  }
  return out;
})()`;

// --- simple PNG writer for raw RGBA screenshot bytes (no deps) ---
function crc32(buf: Buffer): number {
	let c = ~0;
	for (const b of buf) {
		c ^= b;
		for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
	}
	return ~c >>> 0;
}
function chunk(type: string, data: Buffer): Buffer {
	const len = Buffer.alloc(4);
	len.writeUInt32BE(data.length);
	const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
	const crc = Buffer.alloc(4);
	crc.writeUInt32BE(crc32(td));
	return Buffer.concat([len, td, crc]);
}
function savePng(rgba: Buffer, w: number, h: number, path: string) {
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(w, 0);
	ihdr.writeUInt32BE(h, 4);
	ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
	// each row: filter byte 0 + w*4 bytes
	const stride = w * 4 + 1;
	const raw = Buffer.alloc(h * stride);
	for (let y = 0; y < h; y++) {
		raw[y * stride] = 0;
		rgba.copy(raw, y * stride + 1, y * w * 4, (y + 1) * w * 4);
	}
	const zlib = Bun.deflateSync(raw);
	Bun.write(path, Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk("IHDR", ihdr), chunk("IDAT", zlib), chunk("IEND", Buffer.alloc(0))]));
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
	const targets = await (await fetch(`http://localhost:${CDP_PORT}/json`)).json();
	const page = targets.find((t: { type: string }) => t.type === "page" && t.url.startsWith("about:")) ?? targets[0];
	const cdp = await Cdp.connect(page.webSocketDebuggerUrl);
	console.log(`Connected to: ${page.url}`);

	await cdp.send("Page.enable");
	await cdp.send("Emulation.setDeviceMetricsOverride", { width: 375, height: 667, deviceScaleFactor: 1, mobile: true });

	// login flow
	await cdp.send("Page.navigate", { url: `${BASE}/login` });
	await sleep(1500);
	const env = Bun.file(".env.local");
	const envText = await env.text();
	const email = envText.match(/^TEST_EMAIL=(.*)$/m)?.[1]?.trim();
	const password = envText.match(/^TEST_PASSWORD=(.*)$/m)?.[1]?.trim();
	if (!email || !password) throw new Error("TEST_EMAIL/TEST_PASSWORD not found in .env.local");

	await cdp.eval(`(() => {
		const setVal = (el, v) => {
			const setter = Object.getOwnPropertyDescriptor(el.constructor.prototype, 'value').set;
			setter.call(el, v);
			el.dispatchEvent(new Event('input', { bubbles: true }));
		};
		const inputs = [...document.querySelectorAll('form input')];
		const emailInput = inputs.find(i => i.type === 'email' || i.name?.toLowerCase().includes('email') || i.id?.toLowerCase().includes('email'));
		const passInput = inputs.find(i => i.type === 'password');
		if (!emailInput || !passInput) throw new Error('login inputs not found');
		setVal(emailInput, ${JSON.stringify(email)});
		setVal(passInput, ${JSON.stringify(password)});
		return true;
	})()`);
	await sleep(200);
	await cdp.eval(`(() => {
		const btn = [...document.querySelectorAll('form button[type="submit"]')][0];
		if (!btn) throw new Error('submit not found');
		btn.click();
		return true;
	})()`);

	// wait for post-login redirect (max 15s)
	let loggedIn = false;
	for (let i = 0; i < 30; i++) {
		await sleep(500);
		const url = await cdp.eval("location.pathname");
		if (url !== "/login") { loggedIn = true; break; }
	}
	if (!loggedIn) throw new Error("login failed");
	console.log(`Logged in, landed on: ${await cdp.eval("location.pathname")}`);

	// navigate to a page with a rich sidebar (penggajian has sub-groups)
	await cdp.send("Page.navigate", { url: `${BASE}/penggajian/setup/komponen` });
	await sleep(2500);

	const shot = async (name: string) => {
		const r = await cdp.send("Page.captureScreenshot", { format: "png" }) as { result?: { data?: string } };
		if (!r.result?.data) throw new Error("screenshot failed");
		const buf = Buffer.from(r.result.data, "base64");
		// decode PNG header for dims
		const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
		Bun.write(`graphify-out/verify-${name}.png`, buf);
		console.log(`  📸 verify-${name}.png (${w}x${h})`);
	};

	// ===== MOBILE 375px — light =====
	console.log("\n=== MOBILE 375px — LIGHT ===");
	const lightMobile = await cdp.eval(MEASURE_JS);
	console.log(JSON.stringify(lightMobile, null, 2));
	await shot("375-light-closed");

	// open off-canvas drawer: click the SidebarTrigger
	await cdp.eval(`(() => { const t = document.querySelector('[data-slot="sidebar-trigger"]'); t?.click(); return !!t; })()`);
	await sleep(700);
	const drawerOpen = await cdp.eval(MEASURE_JS);
	console.log("--- drawer open ---");
	console.log(JSON.stringify({ sidebarVisible: drawerOpen.sidebarVisible, rows: drawerOpen.rows }, null, 2));
	await shot("375-light-drawer");

	// failures so far (light)
	const badRows = drawerOpen.rows.filter(r => r.h < 44 || (r.contrast !== null && r.contrast < 4.5));
	console.log(badRows.length ? `  ✗ FAIL: ${badRows.length} rows violate 44px/contrast: ${JSON.stringify(badRows)}` : "  ✓ all visible rows ≥44px & AA contrast");

	// ===== MOBILE 375px — dark =====
	console.log("\n=== MOBILE 375px — DARK ===");
	await cdp.eval(`localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark');`);
	await sleep(400);
	await shot("375-dark-drawer");
	const dark = await cdp.eval(MEASURE_JS);
	const badDark = dark.rows.filter(r => r.h < 44 || (r.contrast !== null && r.contrast < 4.5));
	console.log(dark.footer ? `  footer: "${dark.footer.text}" contrast=${dark.footer.contrast} fontSize=${dark.footer.fontSize}` : "  footer hidden");
	console.log(badDark.length ? `  ✗ FAIL dark: ${JSON.stringify(badDark)}` : "  ✓ dark rows ≥44px & AA contrast");
	// doc overflow
	const overflow = drawerOpen.docScrollW > drawerOpen.docClientW + 1;
	console.log(overflow ? `  ✗ horizontal overflow: scrollW=${drawerOpen.docScrollW} clientW=${drawerOpen.docClientW}` : `  ✓ no horizontal overflow (scrollW=${drawerOpen.docScrollW})`);

	// ===== DESKTOP 1440px =====
	console.log("\n=== DESKTOP 1440px — light ===");
	await cdp.eval(`localStorage.setItem('theme','light'); document.documentElement.classList.remove('dark');`);
	await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
	await sleep(900);
	await shot("1440-light");
	const desk = await cdp.eval(MEASURE_JS);
	console.log(JSON.stringify({ viewport: desk.viewport, navSingleLine: desk.navSingleLine, brand: desk.brand, footer: desk.footer, collapsed: desk.collapsed }, null, 2));
	const badDesk = desk.rows.filter(r => r.h < 44 || (r.contrast !== null && r.contrast < 4.5));
	console.log(badDesk.length ? `  ✗ FAIL desktop: ${JSON.stringify(badDesk)}` : "  ✓ desktop rows ≥44px & AA contrast");

	// dark desktop sanity
	await cdp.eval(`localStorage.setItem('theme','dark'); document.documentElement.classList.add('dark');`);
	await sleep(400);
	await shot("1440-dark");
	console.log("\n✅ verification run complete");
	process.exit(0);
}

main().catch((e) => { console.error("FAILED:", e); process.exit(1); });
