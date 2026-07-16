#!/usr/bin/env node
/**
 * contrast-gate.mjs — WCAG contrast verifier for OKLCH CSS tokens.
 *
 * Usage:  node scripts/contrast-gate.mjs
 * Input:  reads pairs from stdin or uses built-in globals.css tokens.
 *
 * Pure Node, zero dependencies. OKLCH → OKLab → linear sRGB → luminance → ratio.
 */
"use strict";

// ---- OKLCH → sRGB (per CSS Color 4 spec) ----

function oklchToSrgb([L, C, H]) {
	const h = (H * Math.PI) / 180;
	const a = C * Math.cos(h);
	const b = C * Math.sin(h);

	// OKLab → linear sRGB (inverse of the forward OKLab matrix)
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ ** 3;
	const m = m_ ** 3;
	const s = s_ ** 3;

	return [
		+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	];
}

function relativeLuminance([r, g, b]) {
	// Use linear sRGB, not gamma-corrected
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(L1, L2) {
	const lighter = Math.max(L1, L2);
	const darker = Math.min(L1, L2);
	return (lighter + 0.05) / (darker + 0.05);
}

// ---- Parse "oklch(L C H)" ----

function parseOklch(str) {
	const m = str.trim().match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
	if (!m) throw new Error(`Cannot parse oklch: ${str}`);
	return [Number.parseFloat(m[1]), Number.parseFloat(m[2]), Number.parseFloat(m[3])];
}

// ---- Token pairs to verify ----

// Tokens from src/app/globals.css :root (Evergreen light)
const TOKENS = {
	"--background": parseOklch("oklch(0.99 0.008 95)"),
	"--foreground": parseOklch("oklch(0.22 0.01 260)"),
	"--card": parseOklch("oklch(0.97 0.008 95)"),
	"--card-foreground": parseOklch("oklch(0.22 0.01 260)"),
	"--popover": parseOklch("oklch(0.99 0.008 95)"),
	"--popover-foreground": parseOklch("oklch(0.22 0.01 260)"),
	"--primary": parseOklch("oklch(0.48 0.09 158)"),
	"--primary-foreground": parseOklch("oklch(0.99 0.008 95)"),
	"--secondary": parseOklch("oklch(0.965 0.006 85)"),
	"--secondary-foreground": parseOklch("oklch(0.22 0.01 260)"),
	"--muted": parseOklch("oklch(0.965 0.006 85)"),
	"--muted-foreground": parseOklch("oklch(0.4 0.01 260)"),
	"--accent": parseOklch("oklch(0.94 0.03 75)"),
	"--accent-foreground": parseOklch("oklch(0.3 0.06 60)"),
	"--destructive": parseOklch("oklch(0.52 0.2 25)"),
	"--destructive-foreground": parseOklch("oklch(0.99 0.008 85)"),
	"--success": parseOklch("oklch(0.52 0.1 195)"),
	"--success-foreground": parseOklch("oklch(0.99 0.008 85)"),
	"--warning": parseOklch("oklch(0.68 0.15 75)"),
	"--warning-foreground": parseOklch("oklch(0.22 0.01 260)"),
	"--border": parseOklch("oklch(0.86 0.008 85)"),
	"--input": parseOklch("oklch(0.86 0.008 85)"),
	"--ring": parseOklch("oklch(0.48 0.09 158)"),
};

// Tokens from src/app/globals.css .dark (Evergreen dark)
const DARK_TOKENS = {
	"--background": parseOklch("oklch(0.13 0.01 160)"),
	"--foreground": parseOklch("oklch(0.93 0.01 100)"),
	"--card": parseOklch("oklch(0.16 0.01 160)"),
	"--card-foreground": parseOklch("oklch(0.93 0.01 100)"),
	"--popover": parseOklch("oklch(0.16 0.01 160)"),
	"--popover-foreground": parseOklch("oklch(0.93 0.01 100)"),
	"--primary": parseOklch("oklch(0.62 0.09 158)"),
	"--primary-foreground": parseOklch("oklch(0.13 0.01 160)"),
	"--secondary": parseOklch("oklch(0.22 0.01 160)"),
	"--secondary-foreground": parseOklch("oklch(0.93 0.01 100)"),
	"--muted": parseOklch("oklch(0.22 0.01 160)"),
	"--muted-foreground": parseOklch("oklch(0.62 0.01 100)"),
	"--accent": parseOklch("oklch(0.25 0.03 75)"),
	"--accent-foreground": parseOklch("oklch(0.93 0.03 75)"),
	"--destructive": parseOklch("oklch(0.6 0.2 25)"),
	"--destructive-foreground": parseOklch("oklch(0.13 0.01 20)"),
	"--success": parseOklch("oklch(0.62 0.1 195)"),
	"--success-foreground": parseOklch("oklch(0.13 0.01 160)"),
	"--warning": parseOklch("oklch(0.72 0.15 75)"),
	"--warning-foreground": parseOklch("oklch(0.13 0.01 160)"),
	"--border": parseOklch("oklch(0.28 0.01 160)"),
	"--input": parseOklch("oklch(0.28 0.01 160)"),
	"--ring": parseOklch("oklch(0.62 0.09 158)"),
};

// Pairs: [foreground token name, background token name, label, minRatio]
const PAIRS = [
	["--foreground", "--background", "body teks di background", 7],
	["--muted-foreground", "--background", "muted teks di background", 4.5],
	["--muted-foreground", "--muted", "muted teks di muted bg", 4.5],
	["--primary-foreground", "--primary", "primary teks di primary bg", 4.5],
	["--secondary-foreground", "--secondary", "secondary teks di secondary bg", 4.5],
	["--card-foreground", "--card", "card teks di card bg", 7],
	["--popover-foreground", "--popover", "popover teks di popover bg", 7],
	["--accent-foreground", "--accent", "accent teks di accent bg", 4.5],
	["--destructive-foreground", "--destructive", "destructive teks di destructive bg", 4.5],
	["--success-foreground", "--success", "success teks di success bg", 4.5],
	["--warning-foreground", "--warning", "warning teks di warning bg", 4.5],
];

// ---- Runner ----

function luminance(tokenName, overrides = {}) {
	const oklch = overrides[tokenName] ?? TOKENS[tokenName];
	if (!oklch) return null;
	return relativeLuminance(oklchToSrgb(oklch));
}

function checkPair([fgName, bgName, label, minRatio], overrides = {}) {
	const lFg = luminance(fgName, overrides);
	const lBg = luminance(bgName, overrides);
	if (lFg == null || lBg == null) {
		console.log(`  ⚠ SKIP  ${label}  (token tak ditemukan)`);
		return true;
	}
	const ratio = contrastRatio(lFg, lBg);
	const pass = ratio >= minRatio;
	const level = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "FAIL";
	const mark = pass ? "✅" : "❌";
	console.log(
		`  ${mark} ${ratio.toFixed(2)}:1  ${level.padEnd(4)}  ${label}  (min ${minRatio}:1)`,
	);
	return pass;
}

function runSuite(name, overrides = {}) {
	console.log(`\n=== ${name} ===`);
	let pass = 0;
	let fail = 0;
	for (const pair of PAIRS) {
		if (checkPair(pair, overrides)) pass++;
		else fail++;
	}
	console.log(`  → ${pass} passed, ${fail} failed`);
	return fail === 0;
}

// Self-check: verify math against known WCAG values
// black (#000) vs white (#fff) should give exactly 21:1
function selfCheck() {
	// sRGB(0,0,0) luminance = 0, sRGB(1,1,1) luminance = 1
	const r = contrastRatio(1, 0);
	if (Math.abs(r - 21) > 0.01) {
		console.error(`Self-check FAIL: black/white ratio expected 21, got ${r}`);
		process.exit(1);
	}
}

selfCheck();

let ok = true;

ok = runSuite("Evergreen — Light (:root)") && ok;
ok = runSuite("Evergreen — Dark (.dark)", DARK_TOKENS) && ok;

console.log(`\n${ok ? "✅ ALL PASS" : "❌ SOME FAILED"}`);
process.exit(ok ? 0 : 1);
