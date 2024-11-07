import type {
	FieldValues,
	Path,
	UseFormRegisterReturn,
	UseFormReturn,
} from "react-hook-form";

export interface InputZodProps<TData extends FieldValues> {
	id: Path<TData>;
	label?: string;
	form: UseFormReturn<TData>;
	type?: "text" | "number" | "email" | "hidden" | "float" | "file";
	disabled?: boolean;
	fileRef?: UseFormRegisterReturn;
	className?: string;
	readonly?: boolean;
}
