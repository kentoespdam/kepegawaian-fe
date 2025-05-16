import { ButtonLink } from "@src/components/ui/link";
import { CirclePlus } from "lucide-react";
import TooltipBuilder from "../tooltip";

const ButtonAddBuilder = ({ href, msg }: { href: string; msg: string }) => {
	return (
		<TooltipBuilder text={msg} className="bg-primary">
			<ButtonLink
				href={href}
				size={"icon"}
				variant={"ghost"}
				className="rounded-full text-primary hover:bg-primary hover:text-primary-foreground size-6"
				icon={<CirclePlus className="size-6" />}
			/>
		</TooltipBuilder>
	);
};

export default ButtonAddBuilder;
