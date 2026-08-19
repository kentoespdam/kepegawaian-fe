import type { z } from "zod";
import type { FormField } from "@/components/crud-form";
import type { Column } from "@/components/data-table";

export interface CrudConfig {
	label: string;
	formSchema: z.ZodType;
	formFields: FormField[];
	/** FK combobox: field name -> master entity slug (options via /master/{entity}/list). */
	fkSources?: { field: string; entity: string }[];
	defaultValues: (row: Record<string, unknown>) => Record<string, unknown>;
}

export interface SectionConf {
	id: string;
	label: string;
	buildUrl: (pegawaiId: number, nik: string | null, params: Record<string, string>) => string;
	columns: Column<Record<string, unknown>>[];
	isSingleItem?: boolean;
	crudConfig?: CrudConfig;
}
