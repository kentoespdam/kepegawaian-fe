"use client";
import { ResetIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { LoadingButtonClient } from "../loading-button-client";
import TooltipBuilder from "../tooltip";

type ResetSearchComponentProps = {
	pending?: boolean;
	isFetching?: boolean;
	isLoading?: boolean;
};
const ResetSearchComponent = (props: ResetSearchComponentProps) => {
	const { replace } = useRouter();
	const pathname = usePathname();

	const clearSearch = () => {
		replace(pathname);
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
