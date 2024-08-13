import { AGAMA, type Agama } from "@_types/enums/agama";
import { Label } from "@components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@components/ui/select";

type SelectAgamaComponentProps = {
    defaultValue?: Agama
}
const SelectAgamaComponent = ({defaultValue}: SelectAgamaComponentProps) => {
    return (
        <>
        <Label htmlFor="agama">Agama <span className="text-red-500">*</span></Label>
        <Select name="agama" defaultValue={defaultValue} value={defaultValue} required>
            <SelectTrigger className="w-full">
                <SelectValue id="agama" placeholder="Pilih Agama" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {AGAMA.map((status, index) => (
                        <SelectItem key={status} value={index.toString()}>
                            {status.replace("_", " ")}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        </>
    );
}

export default SelectAgamaComponent;