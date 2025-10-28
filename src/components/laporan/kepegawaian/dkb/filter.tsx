"use client"
import {
	filterKenaikanBerkala,
	getFilterLabelById,
} from "@_types/laporan/kepegawaian/dkb"
import { Label } from "@components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select"
import { usePathname, useRouter } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import KenaikanBerkalaDownloadButton from "./button.download"

const FilterKenaikanBerkala = ({ filter }: { filter: string }) => {
	const pathname = usePathname()
	const { replace } = useRouter()

	const items = useMemo(() => filterKenaikanBerkala, [])
	const placeholder = useMemo(() => getFilterLabelById(filter), [filter])

	const handleChange = useCallback(
		(value: string) => {
			// use replace to avoid adding history entries when changing filter
			replace(`${pathname}?filter=${value}`)
		},
		[pathname, replace]
	)

	return (
		<div className="flex items-center justify-center gap-2">
			<Label>Filter</Label>
			<Select value={filter} onValueChange={handleChange}>
				<SelectTrigger className="flex w-auto gap-2">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{items.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<KenaikanBerkalaDownloadButton filter={filter} />
		</div>
	)
}

export default React.memo(FilterKenaikanBerkala)
