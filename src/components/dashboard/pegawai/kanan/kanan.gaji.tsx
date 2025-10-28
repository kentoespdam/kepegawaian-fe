import type { PegawaiDetail } from "@_types/pegawai"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion"
import KananDataGajiTable from "./kanan.gaji.table"

type KananDataGajiProps = {
	pegawai: PegawaiDetail
}
const KananDataGaji = ({ pegawai }: KananDataGajiProps) => {
	const { nipam, biodata } = pegawai
	return (
		<AccordionItem value="data-gaji">
			<AccordionTrigger className="bg-primary p-2 text-primary-foreground">
				Riwayat Penerimaan Gaji
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid">
					<header className="flex h-10 items-center justify-between border-b bg-muted/40 lg:h-[60px] lg:px-6">
						<span className="text-md font-semibold">
							Riwayat Penerimaan Gaji [{nipam}] ({biodata.nama})
						</span>
					</header>
					<main className="flex flex-1 flex-col lg:gap-6">
						<div
							className="grid flex-1"
							x-chunk="dashboard-02-chunk-1"
						>
							<KananDataGajiTable pegawai={pegawai} />
						</div>
					</main>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default KananDataGaji
