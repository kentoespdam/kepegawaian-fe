"use client";
import type { CustomColumnDef } from "@_types/index";
import { TableHead, TableHeader, TableRow } from "@components/ui/table";
import { cn } from "@lib/utils";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const TableHeadCellContentBuilder = ({
	head,
	sortDir,
	sortByString,
}: { head: CustomColumnDef; sortDir: string; sortByString: string }) => {
	return (
		<div
			className={cn(
				"",
				head.width && `w-${head.width}, text-wrap`,
				head.sortable && "flex justify-between items-center",
			)}
		>
			<span className={cn(head.width && `w-${head.width}, text-wrap`)}>
				{head.label}
			</span>
			{head.sortable ? (
				sortDir === "" || sortByString !== head.id ? (
					<ArrowUpDownIcon className="ml-2 h-4 w-4" />
				) : sortDir === "asc" ? (
					<ArrowDownIcon className="ml-2 h-4 w-4" />
				) : (
					<ArrowUpIcon className="ml-2 h-4 w-4" />
				)
			) : null}
		</div>
	);
};

type TableHeadBuilderProps = {
	columns: CustomColumnDef[];
};
const TableHeadBuilder = ({ columns }: TableHeadBuilderProps) => {
	const pathname = usePathname();
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const sortBy = search.get("sortBy")?.split(".") || "";
	const sortByString = sortBy.slice(sortBy.length - 1)[0] || "";
	const sortDir = search.get("sortDirection") || "";
	const { replace } = useRouter();
	const handleClick = (head: CustomColumnDef) => {
		if (!head.sortable) return;
		search.set(
			"sortBy",
			head.baseSort ? `${head.baseSort}.${head.id}` : head.id,
		);
		search.set(
			"sortDirection",
			sortDir === "asc" || sortDir === "" ? "desc" : "asc",
		);
		replace(`${pathname}?${search.toString()}`);
	};

	return (
		<TableHeader>
			<TableRow className="sticky top-0">
				{columns.map((head, index) => (
					<TableHead
						key={`${head.id}-${index}`}
						className={cn(
							"text-center bg-primary text-primary-foreground border-x text-nowrap h-10",
							index === 0 && "rounded-ss-lg border-l-0",
							index === columns.length - 1 && "rounded-se-lg border-r-0",
							head.sortable && "cursor-pointer",
						)}
						onClick={() => handleClick(head)}
					>
						<TableHeadCellContentBuilder
							head={head}
							sortDir={sortDir}
							sortByString={sortByString}
						/>
					</TableHead>
				))}
			</TableRow>
		</TableHeader>
	);
};

export default TableHeadBuilder;
