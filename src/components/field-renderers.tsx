import { FKCombobox } from "@/components/fk-combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
