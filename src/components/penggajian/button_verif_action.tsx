"use client"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import TooltipBuilder from "@components/builder/tooltip"
import { Button } from "@components/ui/button"
import React from "react"

const GajiVerifActionButton = ({
	tooltip,
	className = "",
	variant = "default",
	disabled = false,
	onClick,
	icon: Icon,
	title,
	pending = false,
}: {
	tooltip: string
	className?: string
	variant?:
		| "default"
		| "destructive"
		| "link"
		| "outline"
		| "secondary"
		| "ghost"
	disabled?: boolean
	onClick: () => void
	icon: React.ComponentType<{ className?: string }>
	title: string
	pending?: boolean
}) => (
	<TooltipBuilder className={className} text={tooltip} delayDuration={300}>
		{pending ? (
			<LoadingButtonClient
				pending={pending}
				className={`mt-2 flex gap-2 ${className}`}
				disabled={disabled}
				onClick={onClick}
				icon={<Icon className="h-4 w-4" />}
				title={title}
			/>
		) : (
			<Button
				type="button"
				variant={variant}
				className={`mt-2 flex gap-2 ${className}`}
				disabled={disabled}
				onClick={onClick}
			>
				<Icon className="h-4 w-4" />
				{title}
			</Button>
		)}
	</TooltipBuilder>
)

export default GajiVerifActionButton
