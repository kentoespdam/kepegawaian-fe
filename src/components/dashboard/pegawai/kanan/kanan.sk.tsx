import type { PegawaiDetail } from "@_types/pegawai";
import LampiranSkContent from "@components/kepegawaian/detail/lampiran";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";
import KananDataRiwayatSkTable from "./kanan.sk.table";

type KananDataRiwayatSkProps = {
	pegawai: PegawaiDetail;
};
const KananDataRiwayatSk = ({ pegawai }: KananDataRiwayatSkProps) => {
	return (
		<AccordionItem value="data-riwayat-sk">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Surat Keputusan (SK)
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid min-h-full w-full">
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Surat Keputusan (SK) [{pegawai?.nipam}] (
									{pegawai?.biodata.nama})
								</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<KananDataRiwayatSkTable pegawai={pegawai} />
								</div>
							</main>
						</div>
					</div>
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between min-h-5 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">Lampiran</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<LampiranSkContent pegawaiId={pegawai.id} />
								</div>
							</main>
						</div>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default KananDataRiwayatSk;
