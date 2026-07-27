"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { FKCombobox } from "@/components/fk-combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
export interface FormField<Name extends string = string> {
	name: Name;
	label: string;
	type?: "text" | "email" | "password" | "number" | "textarea" | "select" | "combobox" | "date";
	placeholder?: string;
	required?: boolean;
	options?: { value: string; label: string; disabled?: boolean }[];
}

interface CrudFormProps<TValues extends Record<string, unknown> = Record<string, unknown>> {
	schema: z.ZodType;
	fields: FormField[];
	defaultValues?: TValues;
	onSubmit: (data: TValues) => Promise<void>;
	onCancel?: () => void;
	submitLabel?: string;
	isSubmitting?: boolean;
	error?: string | null;
}

export function CrudForm<TValues extends Record<string, unknown> = Record<string, unknown>>({
	schema,
	fields,
	defaultValues,
	onSubmit,
	onCancel,
	submitLabel = "Simpan",
	isSubmitting: externalSubmitting,
	error,
}: CrudFormProps<TValues>) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<Record<string, unknown>>({
		// ponytail: Zod v4 ZodType vs hookform FieldValues — cast diperlukan
		resolver: zodResolver(schema as never),
		defaultValues: defaultValues as Record<string, unknown> | undefined,
	});

	const submitting = externalSubmitting ?? isSubmitting;
	const onFormSubmit = (data: Record<string, unknown>) => onSubmit(data as TValues);

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
			{fields.map((field) => {
				const err = errors[field.name];
				return (
					<div key={field.name} className="space-y-1.5">
						<Label htmlFor={field.name} className="text-sm font-medium">
							{field.label}
							{field.required && <span className="ml-0.5 text-destructive">*</span>}
						</Label>
						{field.type === "combobox" ? (
							<FKCombobox
								id={field.name}
								options={field.options ?? []}
								value={watch(field.name) as string | number | undefined}
								placeholder={`Pilih ${field.label.toLowerCase()}`}
								invalid={!!err}
								onChange={(v) => setValue(field.name, v)}
							/>
						) : field.type === "textarea" ? (
							<Textarea
								id={field.name}
								className="min-h-24"
								{...register(field.name)}
								placeholder={field.placeholder}
							/>
						) : field.type === "select" ? (
							<Select value={String(watch(field.name) ?? "")} onValueChange={(v) => setValue(field.name, v)}>
								<SelectTrigger className="h-11 w-full" aria-invalid={!!err}>
									<SelectValue placeholder={`Pilih ${field.label.toLowerCase()}`} />
								</SelectTrigger>
								<SelectContent>
									{field.options?.map((opt) => (
										<SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							<Input
								id={field.name}
								type={field.type ?? "text"}
								{...register(field.name)}
								placeholder={field.placeholder}
								aria-invalid={!!err}
								className="h-11"
							/>
						)}
						{err && <p className="text-xs text-destructive">{String(err.message ?? "")}</p>}
					</div>
				);
			})}

			{error && <p className="text-sm text-destructive">{error}</p>}

			<div className="flex items-center justify-end gap-2 pt-2">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
						Batal
					</Button>
				)}
				<Button type="submit" disabled={submitting}>
					{submitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
					{submitting ? "Menyimpan…" : submitLabel}
				</Button>
			</div>
		</form>
	);
}
