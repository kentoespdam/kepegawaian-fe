import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import Fieldset from "@components/ui/fieldset";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { TabsContent } from "@components/ui/tabs";
import { Textarea } from "@components/ui/textarea";
import { dateToIndonesian } from "@helpers/string";
import { cn } from "@lib/utils";

type InfoCutiTabProps = {
	cutiPegawai?: CutiPegawai;
};
const InfoCutiTab = ({ cutiPegawai }: InfoCutiTabProps) => {
	return (
		<TabsContent
			value="informasiCuti"
			className="p-2 border rounded max-h-[75vh] overflow-auto"
		>
			<div className="grid gap-2">
				<Fieldset title="Data Karyawan">
					<div className="grid gap-2 grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="nipam">Nipam</Label>
							<Input
								id="nipam"
								value={cutiPegawai?.nipam}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="nama">Nama</Label>
							<Input
								id="nama"
								value={cutiPegawai?.nama}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2 col-span-2">
							<Label htmlFor="golongan">Pangkat Golongan</Label>
							<Input
								id="golongan"
								value={cutiPegawai?.pangkatGolongan}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="golongan">Organisasi</Label>
							<Input
								id="golongan"
								value={cutiPegawai?.organisasi?.nama}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="jabatan">Jabatan</Label>
							<Input
								id="jabatan"
								value={cutiPegawai?.jabatan?.nama}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
					</div>
				</Fieldset>
				<Fieldset title="Data Pengajuan Cuti" clasName="p-1">
					<div className="grid gap-2 grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="jenisCuti">Jenis Cuti</Label>
							<Input
								id="jenisCuti"
								value={cutiPegawai?.jenisCuti?.nama}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div
							className={cn(
								"grid gap-2",
								!cutiPegawai?.subJenisCuti && "opacity-50",
							)}
						>
							<Label htmlFor="subJenisCuti">Sub Jenis Cuti</Label>
							<Input
								id="subJenisCuti"
								value={cutiPegawai?.subJenisCuti?.nama}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tanggalMulai">Tanggal Mulai</Label>
							<Input
								id="tanggalMulai"
								value={dateToIndonesian(cutiPegawai?.tanggalMulai)}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tanggalSelesai">Tanggal Selesai</Label>
							<Input
								id="tanggalSelesai"
								value={dateToIndonesian(cutiPegawai?.tanggalSelesai)}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="jumlahHariKerja">Jumlah Hari Kerja</Label>
							<Input
								id="jumlahHariKerja"
								value={cutiPegawai?.jumlahHariKerja}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
						<div />
						<div className="grid gap-2 col-span-2">
							<Label htmlFor="alasan">Alasan</Label>
							<Textarea
								id="alasan"
								value={cutiPegawai?.alasan}
								readOnly
								className="bg-secondary text-secondary-foreground"
							/>
						</div>
					</div>
				</Fieldset>
			</div>
		</TabsContent>
	);
};

export default InfoCutiTab;
