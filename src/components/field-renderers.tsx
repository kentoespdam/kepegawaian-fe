import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { FKCombobox } from "@/components/fk-combobox";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function FieldSelect({
	label,
	value,
	options,
	onChange,
	error,
	required,
}: {
	label: string;
	value: string | undefined;
	options: readonly { value: string; label: string }[];
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Select value={value ?? ""} onValueChange={(v) => onChange(v ?? "")}>
				<SelectTrigger className="h-11 w-full" aria-invalid={!!error}>
					<SelectValue placeholder={`Pilih ${label.toLowerCase()}`} />
				</SelectTrigger>
				<SelectContent>
					{options.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

export function FieldText({
	label,
	value,
	onChange,
	error,
	required,
	placeholder,
	type,
}: {
	label: string;
	value: string | undefined;
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
	placeholder?: string;
	type?: string;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Input
				type={type ?? "text"}
				className="h-11"
				value={value ?? ""}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				aria-invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

export function FieldTextarea({
	label,
	value,
	onChange,
	error,
	required,
}: {
	label: string;
	value: string | undefined;
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Textarea
				className="min-h-24"
				value={value ?? ""}
				onChange={(e) => onChange(e.target.value)}
				aria-invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

// ── Helpers ──

/** Convert YYYY-MM-DD string to Date (local, no timezone shift) */
function toDate(s: string): Date | undefined {
	if (!s) return undefined;
	const [y, m, d] = s.split("-").map(Number);
	return new Date(y, m - 1, d);
}

/** Convert Date to YYYY-MM-DD string */
function toStr(d: Date | undefined): string {
	if (!d) return "";
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

// ── FieldDate ──

export function FieldDate({
	label,
	value,
	onChange,
	error,
	required,
	min,
}: {
	label: string;
	value: string | undefined;
	onChange: (v: string) => void;
	error?: string;
	required?: boolean;
	/** Tanggal minimum (YYYY-MM-DD) — tanggal sebelum ini di-disable di kalender. */
	min?: string;
}) {
	const [open, setOpen] = React.useState(false);
	const date = toDate(value ?? "");

	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger
					render={
						<button
							type="button"
							className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none hover:bg-accent/50 aria-invalid:border-destructive md:text-sm"
							aria-invalid={!!error}
						/>
					}
				>
					<span className={date ? "text-foreground" : "text-muted-foreground"}>
						{date
							? date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
							: "Pilih tanggal"}
					</span>
					<CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
					{" "}
					<Calendar
						mode="single"
						selected={date}
						onSelect={(d) => {
							onChange(toStr(d));
							setOpen(false);
						}}
						disabled={min ? { before: new Date(`${min}T00:00:00`) } : undefined}
					/>
				</PopoverContent>
			</Popover>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

export function FieldFk({
	label,
	options,
	value,
	onChange,
	error,
	required,
	disabled,
	loading,
	placeholder,
}: {
	label: string;
	options: { value: string; label: string }[];
	value: string | undefined;
	onChange: (v: string | undefined) => void;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	loading?: boolean;
	placeholder?: string;
}) {
	return (
		<div className="space-y-1.5">
			<Label className="text-sm font-medium">
				{label}
				{required && <span className="ml-0.5 text-destructive">*</span>}
			</Label>
			<FKCombobox
				options={options}
				value={value}
				onChange={onChange}
				placeholder={placeholder ?? `Pilih ${label.toLowerCase()}`}
				disabled={disabled}
				loading={loading}
				invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}
