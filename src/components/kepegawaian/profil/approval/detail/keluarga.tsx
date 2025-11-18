"use client";
import type { Keluarga } from "@_types/profil/keluarga";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { memo } from "react";

const DetailUpdateKeluarga = memo(
	({ isNew, data }: { isNew: boolean; data?: Keluarga }) => {
		return (
			<Table className="border strip">
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
						<TableCell className="py-1 flex justify-between">
							<span>Nama</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.nama}</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Jenis Kelamin</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.jenisKelamin}</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Hub. Keluarga</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.hubunganKeluarga}</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Tempat Lahir</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.tempatLahir}</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Tgl. Lahir</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.tanggalLahir}</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Tanggungan</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">
							{data?.tanggungan ? "Ya" : "Tidak"}
						</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Status Sekolah</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.statusPendidikan}</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Status Nikah</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">
							{data?.statusKawin ? "Sudah Menikah" : "Belum Menikah"}
						</TableCell>
					</TableRow>
					<TableRow className="border-none p-0">
						<TableCell className="py-1 flex justify-between">
							<span>Keterangan</span>
							<span>:</span>
						</TableCell>
						<TableCell className="py-1">{data?.notes}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
	},
);

DetailUpdateKeluarga.displayName = "DetailUpdateKeluarga";

export default DetailUpdateKeluarga;