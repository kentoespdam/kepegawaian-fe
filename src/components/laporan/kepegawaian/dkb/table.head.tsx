import { TableHead, TableHeader, TableRow } from "@components/ui/table";

const LapKenaikanBerkalaTableHeader = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					No
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Nama
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Nipam
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					TMT Jabatan
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Pangkat
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Gol.
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					TMT Gol.
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					colSpan={2}
				>
					Masa Kerja
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					colSpan={3}
				>
					Masa Kerja
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Pendidikan
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Tempat, Tgl. Lahir
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={3}
				>
					Nilai Kinerja Rata2 Tahun ke 3 & 4
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					colSpan={2}
				>
					Gol. Terakhir
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					rowSpan={2}
				>
					Mulai Bekerja
				</TableHead>
				<TableHead
					className="border text-center bg-primary text-primary-foreground border-x text-nowrap"
					colSpan={2}
				>
					Seluruh
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="border text-center bg-primary text-primary-foreground border-x text-nowrap">
					Th
				</TableHead>
				<TableHead className="border text-center bg-primary text-primary-foreground border-x text-nowrap">
					Bln
				</TableHead>
				<TableHead className="border text-center bg-primary text-primary-foreground border-x text-nowrap">
					Th
				</TableHead>
				<TableHead className="border text-center bg-primary text-primary-foreground border-x text-nowrap">
					Bln
				</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default LapKenaikanBerkalaTableHeader;
