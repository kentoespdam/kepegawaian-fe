"use client";
import { ResetIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoadingButtonClient } from "../loading-button-client";
import TooltipBuilder from "../tooltip";
import type { CustomColumnDef } from "@_types/index";

type ResetSearchComponentProps = {
	columns: CustomColumnDef[]
	pending?: boolean;
	isFetching?: boolean;
	isLoading?: boolean;
};
const ResetSearchComponent = (props: ResetSearchComponentProps) => {
	const { replace } = useRouter();
	const searchParams = useSearchParams()
	const search = new URLSearchParams(searchParams.toString())
	const pathname = usePathname();

	const clearSearch = () => {
		for (const c of props.columns) {
			search.delete(c.id);
		}
		replace(`${pathname}?${search.toString()}`);
	};

	return (
		<TooltipBuilder
			text="Clear Search"
			className="bg-destructive text-destructive-foreground"
		>
			<LoadingButtonClient
				pending={props.pending ?? false}
				variant="outline"
				type="reset"
				size="icon"
				icon={<ResetIcon className="text-destructive" />}
				onClick={clearSearch}
			/>
		</TooltipBuilder>
	);
};

export default ResetSearchComponent;
