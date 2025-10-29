import Link from "next/link"
import TooltipBuilder from "../tooltip"
import { Button } from "@components/ui/button"
import { CirclePlusIcon } from "lucide-react"
import { memo } from "react"

const ButtonAddBuilder = memo(
	({ href, msg }: { href: string; msg: string }) => {
		return (
			<TooltipBuilder text={msg} className="bg-primary">
				<Link href={href}>
					<Button
						variant="ghost"
						className="h-6 w-6 rounded-full p-0 text-primary hover:bg-primary hover:text-primary-foreground"
					>
						<CirclePlusIcon />
					</Button>
				</Link>
			</TooltipBuilder>
		)
	}
)
ButtonAddBuilder.displayName = "ButtonAddBuilder"

export default ButtonAddBuilder
