"use client"

import { FilterLaporanPendidikan2Schema } from "@_types/laporan/kepegawaian/lap_statistik"
import SelectBulanZod from "@components/form/zod/bulan"
import SelectTahunZod from "@components/form/zod/tahun"
import { Button } from "@components/ui/button"
import Fieldset from "@components/ui/fieldset"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import Pendidikan2DownloadButton from "./pendidikan2_download_button"

const Pendidikan2Filter = () => {
	const params = useSearchParams()
	const now = useMemo(() => new Date(), [])
	const { replace } = useRouter()

	const defaultValues = useMemo(
		() => ({
			tahun: `${params.get("tahun") ?? now.getFullYear()}`,
			bulan: `${params.get("bulan") ?? now.getMonth() + 1}`,
		}),
		[params, now]
	)

	const form = useForm<FilterLaporanPendidikan2Schema>({
		resolver: zodResolver(FilterLaporanPendidikan2Schema),
		defaultValues,
	})

	const onSubmit = useCallback(
		(data: FilterLaporanPendidikan2Schema) => {
			const urlParams = new URLSearchParams()
			urlParams.set("tahun", data.tahun.toString())
			urlParams.set("bulan", data.bulan.toString())
			replace(`?${urlParams.toString()}`)
		},
		[replace]
	)

	return (
		<Form {...form}>
			<Fieldset title="Filter">
				<form
					id="form"
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-2"
				>
					<SelectTahunZod id="tahun" form={form} />
					<SelectBulanZod id="bulan" form={form} />
					<Button
						type="submit"
						className="mt-2 flex justify-between gap-2"
					>
						<SearchIcon /> <span>Cari</span>
					</Button>
					<Pendidikan2DownloadButton form={form} />
				</form>
			</Fieldset>
		</Form>
	)
}

export default React.memo(Pendidikan2Filter)
