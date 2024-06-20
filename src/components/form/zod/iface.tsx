import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface InputZodProps<TData extends FieldValues> {
    id: Path<TData>;
    label: string
    form: UseFormReturn<TData>;
};