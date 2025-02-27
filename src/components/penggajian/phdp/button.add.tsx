import TooltipBuilder from "@components/builder/tooltip";
import { ButtonLink } from "@components/ui/link";
import { PlusCircleIcon } from "lucide-react";

const AddPhdpButton = () => {
    return (
        <TooltipBuilder text="Add PHDP" delayDuration={100}>
            <ButtonLink
                href={"/penggajian/phdp/add"}
                icon={<PlusCircleIcon className=" h-5 w-5" />}
                variant={"ghost"}
                className="text-primary hover:opacity-75"
                size={"icon"} />
        </TooltipBuilder>
    );
}

export default AddPhdpButton;