import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";

const AddParameterSettingButton = () => {
    return (
        <TooltipBuilder text="Add Tunjangan" delayDuration={100}>
            <ButtonLink
                href={"/penggajian/parameter_setting/add"}
                icon={<PlusCircleIcon className="size-5" />}
                variant={"ghost"}
                className="text-primary hover:opacity-75"
                size={"icon"} />
        </TooltipBuilder>
    );
}

export default AddParameterSettingButton;