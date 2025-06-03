import { filterLta, getFilterLabelById } from "@_types/laporan/kepegawaian/lta";
import { Label } from "@components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import LtaDownloadButton from "./button.download";

const LtaFilter = ({ filter }: { filter: string }) => {
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleChange = (value: string) => {
		replace(`${pathname}?filter=${value}`);
	};
	return (
		<div className="flex gap-2 items-center justify-center">
			<Label>Filter Kontrak</Label>
			<Select onValueChange={handleChange}>
				<SelectTrigger className="w-auto flex gap-2">
					<SelectValue placeholder={getFilterLabelById(filter)} />
				</SelectTrigger>
				<SelectContent>
					{filterLta.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
            <LtaDownloadButton filter={filter} />
		</div>
	);
};

export default LtaFilter;
