"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatFormula, sanitizeFormula, type KodeItem } from "@/hooks/penggajian/useKomponenForm";

const OPERATORS = ["(", ")", "*", "/", "+", "-"] as const;

const JENIS_LABEL: Record<string, string> = {
	PEMASUKAN: "Pemasukan",
	POTONGAN: "Potongan",
	NONE: "Lainnya",
};

interface FormulaEditorProps {
	value: string;
	onFormulaChange: (value: string) => void;
	onAppendKode: (kode: string) => void;
	kodeList: KodeItem[];
}

export function FormulaEditor({ value, onFormulaChange, onAppendKode, kodeList }: FormulaEditorProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// ponytail: use ref to avoid adding autoGrow to deps (it changes every render)
	const autoGrow = useRef(() => {
		const el = textareaRef.current;
		if (el) {
			el.style.height = "auto";
			el.style.height = `${el.scrollHeight}px`;
		}
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: value is a prop, not a mutable outer var
	useEffect(() => autoGrow.current(), [value]);

	const appendOperator = (op: string) => {
		const trimmed = value.trimEnd();
		onFormulaChange(trimmed ? `${trimmed} ${op}` : op);
	};

	// Group kode by jenisGaji — keys are TipeKomponen values or "LAIN" fallback
	const groups = kodeList.reduce<Record<string, KodeItem[]>>((acc, k) => {
		const key = k.jenisGaji ?? "LAIN";
		if (!acc[key]) acc[key] = [];
		acc[key].push(k);
		return acc;
	}, {});

	return (
		<div className="space-y-2">
			<Textarea
				ref={textareaRef}
				value={value}
				onChange={(e) => {
					onFormulaChange(sanitizeFormula(e.target.value));
					autoGrow.current();
				}}
				onBlur={() => onFormulaChange(formatFormula(value))}
				placeholder="Klik kode/operator di bawah, atau ketik manual"
				className="min-h-16 font-mono text-sm"
				rows={1}
			/>
			<div className="flex flex-wrap gap-1">
				{OPERATORS.map((op) => (
					<Button key={op} type="button" variant="outline" size="sm" onClick={() => appendOperator(op)}>
						{op}
					</Button>
				))}
			</div>
			{Object.keys(groups).length > 0 && (
				<div className="max-h-36 overflow-y-auto">
					{Object.entries(groups).map(([jenis, items]) => (
						<div key={jenis} className="mb-2 last:mb-0">
							{jenis !== "LAIN" && (
								<p className="mb-1 text-xs font-medium text-muted-foreground">{JENIS_LABEL[jenis] ?? "Lainnya"}</p>
							)}
							<div className="flex flex-wrap gap-1">
								{items.map((k) => (
									<Button
										key={k.kode}
										type="button"
										variant="secondary"
										size="sm"
										className="text-xs font-mono"
										title={k.nama}
										onClick={() => onAppendKode(k.kode ?? "")}
									>
										{k.kode}
									</Button>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
