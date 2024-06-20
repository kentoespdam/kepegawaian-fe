"use client"

import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

interface InputTextComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
    defaultValue?: string
    required?: boolean
    type?: "string" | "number"
}
const InputTextComponent = ({ id, label, defaultValue, required, type, ...props }: InputTextComponentProps) => {
    console.log(props)
    return (
        <>
            <Label htmlFor={id}>
                {label} {!required ? "" : <span className="text-red-500">*</span>}
            </Label>
            <Input
                id={id}
                name={id}
                type={type ?? "string"}
                placeholder={label}
                defaultValue={defaultValue}
                required={required}
                {...props}
            />
        </>
    );
}

export default InputTextComponent;