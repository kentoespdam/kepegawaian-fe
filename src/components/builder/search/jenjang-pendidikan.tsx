import {
	type JenjangPendidikan,
	findJenjangPendidikanValue,
} from "@_types/master/jenjang_pendidikan";
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
import { getListDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { cn } from "@lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchProps } from "./component";

const JenjangPendidikanSearchBuilder = ({ col, val }: BaseSearchProps) => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const { replace } = useRouter();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(val ?? "");

	const query = useQuery({
		queryKey: ["jenjang-pendidikan-list"],
		queryFn: async () => {
			const result = await getListDataEnc<JenjangPendidikan>({
				path: encodeString("jenjang_pendidikan"),
			});
			return result;
		},
	});

	const handleSelect = useDebouncedCallback((val: number) => {
		setValue(String(val));
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
					variant={"outline"}
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value && val !== "" ? (
						findJenjangPendidikanValue(query.data ?? [], value)?.nama.substring(
							0,
							20,
						)
					) : (
						<span className="opacity-50">Cari Pendidikan</span>
					)}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Type to search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						{query.data?.map((jabatan) => (
							<CommandItem
								key={jabatan.id}
								onSelect={() => {
									handleSelect(jabatan.id);
								}}
							>
								{jabatan.nama}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										val !== "" && value === String(jabatan.id)
											? "opacity-100"
											: "opacity-0",
									)}
								/>
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default JenjangPendidikanSearchBuilder;
