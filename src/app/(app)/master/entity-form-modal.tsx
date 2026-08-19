"use client";

import type { FormField } from "@/components/crud-form";
import { CrudForm } from "@/components/crud-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { EntityConfig } from "@/config/master-config";
import { ProfesiForm } from "./profesi/form";
import { SanksiForm } from "./sanksi/form";

interface EntityFormModalProps {
	entity: string;
	cfg: EntityConfig;
	dialogOpen: boolean;
	setDialogOpen: (v: boolean) => void;
	isCreate: boolean;
	editing: Record<string, unknown> | null;
	formFields: FormField[];
	error: string | null;
	setError: (e: string | null) => void;
	isSubmitting: boolean;
	onSubmit: (data: Record<string, unknown>) => Promise<void>;
}

export function EntityFormModal({
	entity,
	cfg,
	dialogOpen,
	setDialogOpen,
	isCreate,
	editing,
	formFields,
	error,
	setError,
	isSubmitting,
	onSubmit,
}: EntityFormModalProps) {
	const handleClose = (v: boolean) => {
		if (!v) setDialogOpen(false);
	};

	const formDefaults = (() => {
		if (!editing) return undefined;
		const combos = new Set<string>();
		if (cfg.treeField) combos.add(cfg.treeField);
		for (const fk of cfg.fkSources ?? []) combos.add(fk.field);
		if (combos.size === 0) return editing as Record<string, unknown>;
		const defs: Record<string, unknown> = { ...(editing as Record<string, unknown>) };
		for (const f of combos) {
			const nk = f.endsWith("Id") ? f.slice(0, -2) : f;
			const v = defs[nk];
			defs[f] = String(v && typeof v === "object" ? ((v as Record<string, unknown>).id ?? "") : (v ?? "")) || undefined;
		}
		return defs;
	})();

	if (entity === "sanksi") {
		return (
			<Sheet open={dialogOpen} onOpenChange={handleClose}>
				<SheetContent className="sm:max-w-120 flex flex-col gap-0 p-0">
					<SheetHeader className="shrink-0">
						<SheetTitle>{isCreate ? "Tambah Sanksi" : "Edit Sanksi"}</SheetTitle>
					</SheetHeader>
					<SanksiForm
						editing={editing}
						onCancel={() => setDialogOpen(false)}
						error={error}
						setError={setError}
						isSubmitting={isSubmitting}
						submit={onSubmit}
					/>
				</SheetContent>
			</Sheet>
		);
	}

	if (entity === "profesi") {
		return (
			<Sheet open={dialogOpen} onOpenChange={handleClose}>
				<SheetContent className="sm:max-w-120 flex flex-col gap-0 p-0">
					<SheetHeader className="shrink-0">
						<SheetTitle>{isCreate ? "Tambah Profesi" : "Edit Profesi"}</SheetTitle>
					</SheetHeader>
					<ProfesiForm
						editing={editing}
						onCancel={() => setDialogOpen(false)}
						error={error}
						setError={setError}
						isSubmitting={isSubmitting}
						submit={onSubmit}
					/>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{isCreate ? `Tambah ${cfg.label}` : `Edit ${cfg.label}`}</DialogTitle>
				</DialogHeader>
				<CrudForm
					schema={cfg.schema as never /* ponytail: Zod4 unknown vs hookform FieldValues — cast aman */}
					fields={formFields}
					defaultValues={formDefaults}
					onSubmit={onSubmit}
					onCancel={() => setDialogOpen(false)}
					isSubmitting={isSubmitting}
					error={error}
				/>
			</DialogContent>
		</Dialog>
	);
}
