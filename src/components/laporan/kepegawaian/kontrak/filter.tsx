import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	filterKontrak,
	getFilterLabelById,
} from "@_types/laporan/kepegawaian/kontrak";
import { Label } from "@components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import LapKontrakDownloadButton from "./button.download";

const FilterMonitorKontrak = () => {
	const pathname = usePathname();
	const pathArray = pathname.split("/");
	const filter = pathArray.findLast((x) => x) as string;
	const filterLabel = getFilterLabelById(filter);
	const { replace } = useRouter();

	const handleClick = (value: string) => {
		replace(pathname.replace(filter, value));
	};
	return (
		<div className="flex gap-2 items-center justify-center">
			<Label>Filter Kontrak</Label>
			<Select onValueChange={handleClick}>
				<SelectTrigger className="w-auto">
					<SelectValue placeholder={filterLabel} className="pr-2" />
				</SelectTrigger>
				<SelectContent>
					{filterKontrak.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<LapKontrakDownloadButton filter={filter} />
		</div>
	);
};

export default FilterMonitorKontrak;
