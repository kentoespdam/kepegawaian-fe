"use client";
import { getStatusKawinLabel } from "@_types/enums/status_kawin";
import type { PegawaiDetail } from "@_types/pegawai";
import type { Pendidikan } from "@_types/profil/pendidikan";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { dateToIndonesian } from "@helpers/string";
import { useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
	AtSignIcon,
	MapIcon,
	MapPinIcon,
	PrinterIcon,
	StarIcon,
	Tag,
	UndoIcon,
	VenusAndMarsIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import CvLeftDetail from "./left.detail";
import CvLeftPhoto from "./left.photo";
import CvRightKeahlian from "./right.keahlian";
import CvRightPendidikan from "./right.pendidikan";
import CvRightPengalamanKerja from "./right.pengalaman";
import CvRightPrestasi from "./right.prestasi";
import CvRightTitle from "./right.title";

export type CvComponentProps = {
	pegawai: PegawaiDetail;
	pendidikanList?: Pendidikan[];
};

const CvComponent = ({ pegawaiId }: { pegawaiId: string }) => {
	const {
		data: pegawai,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["pegawai", pegawaiId],
		queryFn: () =>
			getDataByIdEnc<PegawaiDetail>({
				path: encodeString("pegawai"),
				id: pegawaiId,
				isRoot: true,
			}),

		enabled: !!pegawaiId,
	});

	const router = useRouter();
	const targetRef = useRef(null);
	// const { toPDF, targetRef } = usePDF({ filename: `CV-${pegawaiId}.pdf` });
	const toPDF = async () => {
		if (!targetRef.current) return;

		const pdf = new jsPDF();
		const canvas = await html2canvas(targetRef.current);

		const imgData = canvas.toDataURL("image/png");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save(`cv-${pegawai?.biodata.nama}.pdf`);
	};

	return !pegawai || isLoading || isFetching ? null : (
		<div className="grid gap-2">
			<div className="w-full grid grid-cols-5 gap-2">
				<Button
					variant={"destructive"}
					className="flex gap-2 col-span-1"
					onClick={() => router.back()}
				>
					<UndoIcon />
					<span>Kembali</span>
				</Button>
				<Button
					className="w-full flex gap-2 col-span-4"
					onClick={() => toPDF()}
				>
					<PrinterIcon />
					<span>Cetak PDF</span>
				</Button>
			</div>
			<div
				className="w-full grid grid-cols-12 items-start gap-4 bg-gray-800"
				ref={targetRef}
			>
				<div className="grid col-span-4 p-4 gap-2  text-white">
					<CvLeftPhoto pegawai={pegawai} />
					<Separator />
					<CvLeftDetail
						icon={<Tag className="size-4" />}
						label="NIK / NIPAM"
						value={pegawai.nipam}
					/>
					<Separator />
					<CvLeftDetail
						icon={<VenusAndMarsIcon className="w-4 h-4" />}
						label="Jenis Kelamin"
						value={
							pegawai.biodata.jenisKelamin === "LAKI_LAKI" ? "Pria" : "Wanita"
						}
					/>
					<Separator />
					<CvLeftDetail
						icon={<MapPinIcon className="w-4 h-4" />}
						label="Tempat, Tgl Lahir"
						value={`${pegawai.biodata.tempatLahir}, ${dateToIndonesian(pegawai.biodata.tanggalLahir)}`}
					/>
					<Separator />
					<CvLeftDetail
						icon={<VenusAndMarsIcon className="w-4 h-4" />}
						label="Status Perkawinan"
						value={getStatusKawinLabel(pegawai.biodata.statusKawin)}
					/>
					<Separator />
					<CvLeftDetail
						icon={<StarIcon className="w-4 h-4" />}
						label="Agama"
						value={pegawai.biodata.agama.replace("_", " ")}
					/>
					<Separator />
					<CvLeftDetail
						icon={<MapIcon className="w-4 h-4" />}
						label="Alamat"
						value={pegawai.biodata.alamat}
					/>
					<Separator />
					<CvLeftDetail
						icon={<MapIcon className="w-4 h-4" />}
						label="No. Telp"
						value={pegawai.biodata.telp}
					/>
					<Separator />
					<CvLeftDetail
						icon={<AtSignIcon className="w-4 h-4" />}
						label="Email"
						value={pegawai.email ?? "-"}
					/>
				</div>
				<div className="col-span-8 p-1 bg-white">
					<div className="grid gap-4">
						<CvRightTitle />
						<CvRightPendidikan nik={pegawai.biodata.nik} />
						<CvRightPengalamanKerja nik={pegawai.biodata.nik} />
						<CvRightKeahlian nik={pegawai.biodata.nik} />
						<CvRightPrestasi nik={pegawai.biodata.nik} />
						<div className="flex justify-end pr-4">
							<div className="min-w-40 grid gap-24 text-center">
								<span>
									Purwokerto, {dateToIndonesian(new Date().toDateString())}
								</span>
								<span>({pegawai.biodata.nama})</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CvComponent;
