"use client"

import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

type InputTextComponentProps = {
    id: string
    label: string
    defaultValue?: string
    required?: boolean
}
const InputTextComponent = (props: InputTextComponentProps) => {
    return (
        <>
            <Label htmlFor={props.id}>
                {props.label} {!props.required ? "" : <span className="text-red-500">*</span>}
            </Label>
            <Input
                id={props.id}
                name={props.id}
                placeholder={props.label}
                defaultValue={props.defaultValue}
                required={props.required}
            />
        </>
    );
}

export default InputTextComponent;