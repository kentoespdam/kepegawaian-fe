import { TableHead, TableHeader, TableRow } from "@components/ui/table";

const DukTableHeader = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="border text-center" rowSpan={2}>
					NO
				</TableHead>
				<TableHead className="border text-center" rowSpan={2}>
					NAMA
				</TableHead>
				<TableHead className="border text-center" rowSpan={2}>
					NIPAM
				</TableHead>
				<TableHead className="border text-center" colSpan={3}>
					GOLONGAN
				</TableHead>
				<TableHead className="border text-center" colSpan={2}>
					JABATAN
				</TableHead>
				<TableHead className="border text-center" colSpan={3}>
					MASA KERJA KESELURUHAN
				</TableHead>
				<TableHead className="border text-center" colSpan={3}>
					PENDIDIKAN
				</TableHead>
				<TableHead className="border text-center" rowSpan={2}>
					USIA
				</TableHead>
				<TableHead className="border text-center" rowSpan={2}>
					STATUS
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="border text-center">GOL.</TableHead>
				<TableHead className="border text-center">PANGKAT</TableHead>
				<TableHead className="border text-center">TMT</TableHead>
				<TableHead className="border text-center">NAMA</TableHead>
				<TableHead className="border text-center">TMT</TableHead>
				<TableHead className="border text-center">MULAI KERJA</TableHead>
				<TableHead className="border text-center">THN</TableHead>
				<TableHead className="border text-center">BLN</TableHead>
				<TableHead className="border text-center">NAMA</TableHead>
				<TableHead className="border text-center">LULUS TAHUN</TableHead>
				<TableHead className="border text-center">TINGKAT IJAZAH</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="border text-center font-extrabold">1</TableHead>
				<TableHead className="border text-center font-extrabold">2</TableHead>
				<TableHead className="border text-center font-extrabold">3</TableHead>
				<TableHead className="border text-center font-extrabold">4</TableHead>
				<TableHead className="border text-center font-extrabold">5</TableHead>
				<TableHead className="border text-center font-extrabold">6</TableHead>
				<TableHead className="border text-center font-extrabold">7</TableHead>
				<TableHead className="border text-center font-extrabold">8</TableHead>
				<TableHead className="border text-center font-extrabold">9</TableHead>
				<TableHead className="border text-center font-extrabold">10</TableHead>
				<TableHead className="border text-center font-extrabold">11</TableHead>
				<TableHead className="border text-center font-extrabold">12</TableHead>
				<TableHead className="border text-center font-extrabold">13</TableHead>
				<TableHead className="border text-center font-extrabold">14</TableHead>
				<TableHead className="border text-center font-extrabold">15</TableHead>
				<TableHead className="border text-center font-extrabold">16</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default DukTableHeader;
