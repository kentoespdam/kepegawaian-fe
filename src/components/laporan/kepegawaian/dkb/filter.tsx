import {
	filterKenaikanBerkala,
	getFilterLabelById,
} from "@_types/laporan/kepegawaian/dkb";
import { Label } from "@components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import KenaikanBerkalaDownloadButton from "./button.download";

const FilterKenaikanBerkala = ({ filter }: { filter: string }) => {
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleChange = (value: string) => {
		replace(`${pathname}?filter=${value}`);
	};
	return (
		<div className="flex gap-2 items-center justify-center">
			<Label>Filter</Label>
			<Select onValueChange={handleChange}>
				<SelectTrigger className="w-auto flex gap-2">
					<SelectValue placeholder={getFilterLabelById(filter)} />
				</SelectTrigger>
				<SelectContent>
					{filterKenaikanBerkala.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
            <KenaikanBerkalaDownloadButton filter={filter} />
		</div>
	);
};

export default FilterKenaikanBerkala;
