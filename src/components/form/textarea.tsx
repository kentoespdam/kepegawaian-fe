import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"

type TextAreaComponentProps = {
    id: string
    label: string
    defaultValue?: string
    required?: boolean
}
const TextAreaComponent = (props: TextAreaComponentProps) => {
    return (
        <>
            <Label htmlFor={props.id}>
                {props.label} {!props.required ? "" : <span className="text-red-500">*</span>}
            </Label>
            <Textarea
                id={props.id}
                name={props.id}
                placeholder={`ketik ${props.label} disini...`}
                defaultValue={props.defaultValue}
                required={props.required}
            />
        </>
    );
}

export default TextAreaComponent;