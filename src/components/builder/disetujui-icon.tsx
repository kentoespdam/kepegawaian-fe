import { CircleDashedIcon, CircleDotIcon } from "lucide-react";
import TooltipBuilder from "./tooltip";

interface DisetujuiIconBuilderProps {
	disetujui: boolean;
}
const DisetujuiIconBuilder = (props: DisetujuiIconBuilderProps) => {
	return (
		<TooltipBuilder
			text={props.disetujui ? "Disetujui" : "Belum Disetujui"}
			className="bg-white text-black shadow-md"
		>
			{props.disetujui ? (
				<CircleDotIcon className="text-green-500 h-5 w-5" />
			) : (
				<CircleDashedIcon className="text-red-500 h-5 w-5" />
			)}
		</TooltipBuilder>
	);
};

export default DisetujuiIconBuilder;
