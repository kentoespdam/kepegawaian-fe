import { type QueryKey, useQueryClient } from "@tanstack/react-query"
import { RefreshCcwIcon } from "lucide-react"
import { LoadingButtonClient } from "../loading-button-client"
import TooltipBuilder from "../tooltip"
import { useCallback } from "react"

interface RefreshSearchComponentProps {
	pending?: boolean
	qKey?: QueryKey
}
const RefreshSearchComponent = ({
	pending,
	qKey,
}: RefreshSearchComponentProps) => {
	const qc = useQueryClient()

	const refreshSearch = useCallback(
		async () =>
			await qc.invalidateQueries({
				queryKey: qKey,
			}),
		[qc, qKey]
	)

	return (
		<TooltipBuilder
			text="Refresh"
			className="bg-primary text-primary-foreground"
		>
			<LoadingButtonClient
				pending={pending ?? false}
				variant="outline"
				size="icon"
				icon={<RefreshCcwIcon className="text-primary" />}
				onClick={refreshSearch}
			/>
		</TooltipBuilder>
	)
}

export default RefreshSearchComponent
