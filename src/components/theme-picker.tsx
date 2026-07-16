"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useState } from "react";

// Setiap tema hanya meng-override token warna kunci di :root.
// Sisanya (neutral, radius, dst) tetap dari globals.css.
type Vars = Record<string, string>;
type Theme = { id: string; label: string; note: string; swatch: string; vars: Vars };

export const THEMES: Theme[] = [
	{
		id: "default",
		label: "Biru (Default)",
		note: "Tema bawaan",
		swatch: "oklch(0.55 0.13 235)",
		vars: {}, // kosong = pakai nilai asli globals.css
	},
	{
		id: "evergreen",
		label: "Evergreen",
		note: "Hijau pinus · paling ramah mata 35+",
		swatch: "oklch(0.48 0.09 158)",
		vars: {
			"--primary": "oklch(0.48 0.09 158)",
			"--primary-dark": "oklch(0.36 0.08 158)",
			"--primary-foreground": "oklch(0.99 0.01 95)",
			"--ring": "oklch(0.48 0.09 158)",
			"--accent": "oklch(0.94 0.03 75)",
			"--accent-foreground": "oklch(0.30 0.06 60)",
			// success digeser ke teal agar tak bentrok dgn primary hijau
			"--success": "oklch(0.52 0.10 195)",
			"--background": "oklch(0.99 0.008 95)",
			"--card": "oklch(0.97 0.008 95)",
			"--muted-foreground": "oklch(0.40 0.01 260)",
		},
	},
	{
		id: "terracotta",
		label: "Warm Terracotta",
		note: "Clay hangat · ramah & manusiawi",
		swatch: "oklch(0.55 0.12 45)",
		vars: {
			"--primary": "oklch(0.55 0.12 45)",
			"--primary-dark": "oklch(0.43 0.11 42)",
			"--primary-foreground": "oklch(0.99 0.01 80)",
			"--ring": "oklch(0.55 0.12 45)",
			"--accent": "oklch(0.93 0.04 55)",
			"--accent-foreground": "oklch(0.34 0.09 45)",
			"--background": "oklch(0.99 0.01 70)",
			"--card": "oklch(0.97 0.012 70)",
			"--muted-foreground": "oklch(0.40 0.01 60)",
		},
	},
	{
		id: "quiet-luxury",
		label: "Quiet Luxury",
		note: "Neutral + emerald · tenang & premium",
		swatch: "oklch(0.45 0.06 165)",
		vars: {
			"--primary": "oklch(0.45 0.06 165)",
			"--primary-dark": "oklch(0.34 0.05 165)",
			"--primary-foreground": "oklch(0.99 0.005 95)",
			"--ring": "oklch(0.45 0.06 165)",
			"--accent": "oklch(0.92 0.01 90)",
			"--accent-foreground": "oklch(0.28 0.02 90)",
			"--background": "oklch(0.98 0.004 90)",
			"--card": "oklch(0.955 0.004 90)",
			"--foreground": "oklch(0.20 0.01 60)",
			"--muted-foreground": "oklch(0.40 0.01 60)",
		},
	},
	{
		id: "deep-teal",
		label: "Deep Teal",
		note: "Teal dalam · segar, nuansa air",
		swatch: "oklch(0.50 0.09 195)",
		vars: {
			"--primary": "oklch(0.50 0.09 195)",
			"--primary-dark": "oklch(0.38 0.08 195)",
			"--primary-foreground": "oklch(0.99 0.01 95)",
			"--ring": "oklch(0.50 0.09 195)",
			"--accent": "oklch(0.93 0.03 80)",
			"--accent-foreground": "oklch(0.32 0.06 70)",
			"--background": "oklch(0.99 0.006 90)",
			"--card": "oklch(0.97 0.006 90)",
			"--muted-foreground": "oklch(0.40 0.01 260)",
		},
	},
];

const KEYS = [...new Set(THEMES.flatMap((t) => Object.keys(t.vars)))];
const STORAGE_KEY = "theme-id";

function apply(theme: Theme) {
	const root = document.documentElement.style;
	for (const k of KEYS) root.removeProperty(k);
	for (const [k, v] of Object.entries(theme.vars)) root.setProperty(k, v);
	localStorage.setItem(STORAGE_KEY, theme.id);
}

// Dijalankan sekali sebelum paint (lihat layout.tsx) untuk hindari flash.
export const preApplyScript = `(function(){try{var id=localStorage.getItem('${STORAGE_KEY}');if(!id||id==='default')return;var T=${JSON.stringify(
	Object.fromEntries(THEMES.map((t) => [t.id, t.vars])),
)};var v=T[id];if(!v)return;var s=document.documentElement.style;for(var k in v)s.setProperty(k,v[k]);}catch(e){}})();`;

export function ThemePicker() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("default");

	useEffect(() => {
		setActive(localStorage.getItem(STORAGE_KEY) ?? "default");
	}, []);

	return (
		<div className="fixed bottom-4 left-4 z-50">
			{open && (
				<div className="mb-2 w-64 rounded-xl border border-border bg-popover p-2 shadow-lg">
					<p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Pilih tema warna</p>
					<ul className="space-y-0.5">
						{THEMES.map((t) => (
							<li key={t.id}>
								<button
									type="button"
									onClick={() => {
										apply(t);
										setActive(t.id);
									}}
									className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-accent"
								>
									<span
										className="size-6 shrink-0 rounded-full ring-1 ring-black/10"
										style={{ background: t.swatch }}
									/>
									<span className="min-w-0 flex-1">
										<span className="block text-sm font-medium text-popover-foreground">{t.label}</span>
										<span className="block truncate text-xs text-muted-foreground">{t.note}</span>
									</span>
									{active === t.id && <Check className="size-4 shrink-0 text-primary" />}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-label="Ganti tema warna"
				aria-expanded={open}
				className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:opacity-90"
			>
				<Palette className="size-5" />
			</button>
		</div>
	);
}
