import LampiranSkContent from "@components/kepegawaian/detail/lampiran"
import { AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { AccordionContent } from "@radix-ui/react-accordion"
import KananDataMutasiTable from "./kanan.mutasi.table"
import { PegawaiDetail } from "@_types/pegawai"

const KananDataMutasi = ({ pegawai }: { pegawai: PegawaiDetail }) => {
	const { id, nipam, biodata } = pegawai ?? {}
	return (
		<AccordionItem value="data-mutasi">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Data Mutasi pekerjaan
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid min-h-full w-full">
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Mutasi Pekerjaan [{nipam}] (
									{biodata.nama})
								</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<KananDataMutasiTable pegawaiId={id} />
								</div>
							</main>
						</div>
					</div>
					<div className="gap-0 border-b border-r border-t">
						<div className="grid">
							<header className="flex h-10 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Lampiran
								</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div
									className="grid flex-1"
									x-chunk="dashboard-02-chunk-1"
								>
									<LampiranSkContent pegawaiId={id} />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default KananDataMutasi
