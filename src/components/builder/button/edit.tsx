import Link from "next/link"
import TooltipBuilder from "../tooltip"
import { Button } from "@components/ui/button"
import { PencilIcon } from "lucide-react"
import { memo } from "react"

type ButtonEditBuilderProps = {
	href: string
	msg: string
}

const ButtonEditBuilder = memo((props: ButtonEditBuilderProps) => {
	return (
		<TooltipBuilder
			text={props.msg}
			className="bg-warning text-warning-foreground"
		>
			<Link href={props.href}>
				<Button variant="ghost" size="icon" className="h-7 w-7 p-0">
					<PencilIcon
						className="h-5 w-5 text-warning"
						aria-hidden="true"
					/>
				</Button>
			</Link>
		</TooltipBuilder>
	)
})
ButtonEditBuilder.displayName = "ButtonEditBuilder"

export default ButtonEditBuilder
