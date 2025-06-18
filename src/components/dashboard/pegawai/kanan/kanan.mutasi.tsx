import type { PegawaiDetail } from "@_types/pegawai";
import LampiranSkContent from "@components/kepegawaian/detail/lampiran";
import { AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import KananDataMutasiTable from "./kanan.mutasi.table";

const KananDataMutasi = ({ pegawai }: { pegawai: PegawaiDetail }) => {
	return (
		<AccordionItem value="data-mutasi">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Data Mutasi pekerjaan
			</AccordionTrigger>
			<AccordionContent className="grid border-t p-0">
				<div className="grid min-h-full w-full">
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
								<span className="text-md font-semibold">
									Data Mutasi Pekerjaan [{pegawai?.nipam}] (
									{pegawai?.biodata.nama})
								</span>
							</header>
							<main className="flex flex-1 flex-col">
								<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
									<KananDataMutasiTable pegawaiId={pegawai.id} />
								</div>
							</main>
						</div>
					</div>
					<div className="border-t border-r border-b gap-0">
						<div className="grid">
							<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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

export default KananDataMutasi;
