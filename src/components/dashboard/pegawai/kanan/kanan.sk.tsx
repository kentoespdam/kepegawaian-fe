import LampiranSkContent from "@components/kepegawaian/detail/lampiran"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import KananDataRiwayatSkTable from "./kanan.sk.table"
import { DashboardPanelKananComponentProps } from "@components/dashboard/pegawai/kanan/index"

const KananDataRiwayatSk = ({
	pegawai,
	isKaryawanAktif,
}: DashboardPanelKananComponentProps) => {
	const { nipam, biodata } = pegawai
	return (
		<AccordionItem value="data-riwayat-sk">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Data Surat Keputusan (SK)
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid min-h-full w-full">
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Surat Keputusan (SK) [{nipam}] (
									{biodata.nama})
								</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<KananDataRiwayatSkTable
										pegawai={pegawai}
									/>
								</div>
							</main>
						</div>
					</div>
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex min-h-5 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Lampiran
								</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<LampiranSkContent
										isKaryawanAktif={isKaryawanAktif}
									/>
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default KananDataRiwayatSk
