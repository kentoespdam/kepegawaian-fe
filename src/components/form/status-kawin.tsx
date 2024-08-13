import { STATUS_KAWIN, type StatusKawin } from "@_types/enums/status_kawin";
import { Label } from "@components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@components/ui/select";

type SelectStatusKawinProps = {
    defaultValue?: string
}

const SelectStatusKawin = ({ defaultValue = "0" }: SelectStatusKawinProps) => {

    return (
        <>
            <Label
                htmlFor="statusKawin">Status Kawin <span className="text-red-500">*</span>
            </Label>
            <Select
                name="statusKawin"
                defaultValue={defaultValue}
                value={defaultValue}
                required
            >
                <SelectTrigger className="w-full">
                    <SelectValue id="statusKawin" placeholder="Pilih Status Kawin" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {STATUS_KAWIN.map((status, index) => (
                            <SelectItem
                                key={status}
                                value={index.toString()}
                                defaultChecked={defaultValue === status}
                            >
                                {status.replace("_", " ")}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}

export default SelectStatusKawin;