"use client"
import type { Pegawai } from "@_types/pegawai"
import TooltipBuilder from "@components/builder/tooltip"
import TabBiodataNonPegawai from "@components/kepegawaian/data_pegawai/non-pegawai"
import TabBiodataPegawai from "@components/kepegawaian/data_pegawai/pegawai"
import RingkasanBiodata from "@components/kepegawaian/data_pegawai/ringkasan"
import { ButtonLink } from "@components/ui/link"
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs"
import { cn } from "@lib/utils"
import { useDataPegawaiStore } from "@store/kepegawaian/data_pegawai/data_pegawai-store"
import { UserPlusIcon } from "lucide-react"
import { memo } from "react"
import TabBerhenti from "@components/kepegawaian/data_pegawai/berhenti"

const tabs = [
	{
		value: "pegawai",
		label: "Pegawai",
	},
	{
		value: "non-pegawai",
		label: "Non Pegawai",
	},
	{
		value: "pensiun",
		label: "Pensiun",
	},
]

const TabListBuilder = memo(() => {
	return (
		<TabsList>
			{tabs.map((tab) => (
				<TabsTrigger key={tab.value} value={tab.value}>
					{tab.label}
				</TabsTrigger>
			))}
		</TabsList>
	)
})

TabListBuilder.displayName = "TabListBuilder"

const DataPegawaiPage = () => {
	const { tab, setTab } = useDataPegawaiStore((state) => ({
		tab: state.tab,
		setTab: state.setTab,
	}))

	return (
		<div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:grid-cols-5 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start md:col-span-3 lg:col-span-2">
				<Tabs
					defaultValue={tab}
					onValueChange={(value) => setTab(value)}
				>
					<div
						className={cn(
							"grid grid-cols-1 gap-2",
							"md:flex md:items-center"
						)}
					>
						<div>
							<TabListBuilder />
						</div>
						<div>
							<TooltipBuilder text="Tambah Biodata">
								<ButtonLink
									href="/kepegawaian/data_pegawai/add"
									title="Tambah Biodata"
									icon={<UserPlusIcon className="h-4 w-4" />}
									className="ml-auto"
								/>
							</TooltipBuilder>
						</div>
					</div>
					{tab === "pegawai" ? <TabBiodataPegawai /> : null}
					{tab === "non-pegawai" ? <TabBiodataNonPegawai /> : null}
					{tab === "pensiun" ? <TabBerhenti /> : null}
				</Tabs>
			</div>
			<div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
				<RingkasanBiodata />
			</div>
		</div>
	)
}

export default DataPegawaiPage
