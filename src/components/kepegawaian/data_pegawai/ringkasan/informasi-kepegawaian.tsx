import type { PegawaiRingkas } from "@_types/pegawai";
import Fieldset from "@components/ui/fieldset";
import RingkasanContent from "./ringkasan-content";

interface InformasiKepegawaianProps {
	pegawai?: PegawaiRingkas;
}
const InformasiKepegawaian = ({ pegawai }: InformasiKepegawaianProps) => {
	const isAskes = pegawai ? pegawai.isAskes ? "Aktif" : "Tidak Aktif" : "-"
	const absesnsiId = pegawai?.absesniId ?? 0
	const idAbsesni = absesnsiId > 0 ? absesnsiId.toString() : '-'
	return (
		<Fieldset title="Informasi Kepegawaian">
			<div className="w-full grid gap-1">
				<RingkasanContent field="Status" value={pegawai?.statusPegawai} />
				<RingkasanContent
					field="Pangkat Golongan"
					value={pegawai?.pangkatGolongan}
				/>
				<RingkasanContent field="TMT Golongan" value={pegawai?.tmtGolongan} />
				<RingkasanContent field="Masa Kerja Golongan" value={pegawai?.tmtGolongan} />
				<RingkasanContent field="Unit Kerja" value={pegawai?.unitKerja} />
				<RingkasanContent field="Jabatan" value={pegawai?.jabatan} />
				<RingkasanContent field="Profesi" value={pegawai?.profesi} />
				<RingkasanContent field="Grade" value={pegawai?.grade} />
				<RingkasanContent field="Tgl. Mulai Kerja" value={pegawai?.tmtKerja} />
				<RingkasanContent field="Tgl. Pengangkatan" value={pegawai?.tmtPegawai} />
				<RingkasanContent field="TMT Pensiun" value={pegawai?.tmtPensiun} />
				<RingkasanContent field="Status BPJS Kesehatan" value={isAskes} />
				<RingkasanContent field="ID Mesin Absen" value={idAbsesni} />
				<RingkasanContent field="No Kontrak" value={pegawai?.noKontrak} />
				<RingkasanContent field="No NPWP" value={pegawai?.noNpwp} />
				<RingkasanContent field="No Jamsostek" value={pegawai?.noJamsostek} />
				<RingkasanContent field="No BPJS Kes" value={pegawai?.noBpjs} />
				<RingkasanContent field="ID Card" value={pegawai?.noIdCard} />
			</div>
		</Fieldset>
	);
};

export default InformasiKepegawaian;
