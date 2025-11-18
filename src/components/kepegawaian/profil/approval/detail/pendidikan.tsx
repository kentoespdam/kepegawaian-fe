"use client";

import type { Pendidikan } from "@_types/profil/pendidikan";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";

const DetailUpdatePendidikan = ({
	isNew,
	data,
}: {
	isNew: boolean;
	data: Pendidikan;
}) => {
	return (
		<Table className="border">
			<TableHeader>
				<TableRow className="border-none p-0">
					<TableHead
						colSpan={2}
						align="center"
						className="text-black font-bold text-center"
					>{`Data ${isNew ? "Baru" : "Lama"}`}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Nama</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">
						{data?.jenjangPendidikan.nama}
					</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Lembaga</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">{data?.institusi}</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Jurusan</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">{data?.jurusan}</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Tahun Masuk</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">{data?.tahunMasuk}</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Tahun Selesai</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">{data?.tahunLulus}</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Lulus?</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">
						{data?.isLulus ? "Ya" : "Tidak"}
					</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Grade</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">{data?.gpa}</TableCell>
				</TableRow>
				<TableRow className="border-none p-0">
					<TableCell className="py-1 flex justify-between gap-1">
						<span>Gelar Akademik</span>
						<span>:</span>
					</TableCell>
					<TableCell className="py-1">{data?.gelarBelakang}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}

export default DetailUpdatePendidikan;