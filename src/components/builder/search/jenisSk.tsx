import type { JenisSk } from "@_types/master/jenis_sk";
import { Button } from "@components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@components/ui/popover";
import { globalGetData } from "@helpers/action";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";

const JenisSkSearchBuilder = ({ col, val }: BaseSearchProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { replace } = useRouter();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(val ?? "");

	const query = useQuery({
		queryKey: ["jenis_sk"],
		queryFn: async () => {
			const result = await globalGetData<JenisSk[]>({
				path: "master/jenis-sk",
			});
			return result;
		},
	});

	const handleSelect = useDebouncedCallback((val: string) => {
		setValue(val);
		setOpen(false);
		if (!val) search.delete(col.id);
		else search.set(col.id, String(val));
		replace(`${location.pathname}?${search.toString()}`);
	}, 500);

	useEffect(() => {
		setValue(val ?? "");
	}, [val]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className={cn(
						"w-full justify-between",
						!value ? "text-muted-foreground" : "",
					)}
				>
					<span className="text-left flex-1 truncate">
						{!query.data
							? "Jenis SK tidak ditemukan"
							: query.isLoading || query.isFetching
								? "Loading..."
								: value
									? query.data.find((item) => item.id === value)?.nama
									: "Pilih Jenis Surat Keputusan"}
					</span>
					<ChevronDownIcon className="h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Type to search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{query.data?.map((item) => (
							<CommandItem
								key={item.id}
								value={item.id}
								onSelect={() => {
									handleSelect(item.id);
								}}
							>
								{item.nama}
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default JenisSkSearchBuilder;
