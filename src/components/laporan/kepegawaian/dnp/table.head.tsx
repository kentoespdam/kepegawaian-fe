import { TableHead, TableHeader, TableRow } from "@components/ui/table";

const DnpTableHeader = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="border text-center" rowSpan={3} colSpan={2}>
					NO
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					NAMA
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					NIPAM
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					JABATAN
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					TMT JABATAN
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					PANGKAT
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					GOL.
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					TMT
				</TableHead>
				<TableHead className="border text-center text-nowrap" colSpan={2}>
					MASA KERJA
				</TableHead>
				<TableHead className="border text-center text-nowrap" colSpan={3}>
					MASA KERJA
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					PENDIDIKAN
				</TableHead>
				<TableHead className="border text-center" rowSpan={3}>
					TEMPAT / TGL.LAHIR
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="border text-center text-nowrap" colSpan={2}>
					GOL. TERAKHIR
				</TableHead>
				<TableHead className="border text-center" rowSpan={2}>
					MULAI BEKERJA
				</TableHead>
				<TableHead className="border text-center" colSpan={2}>
					SELURUH
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="border text-center">TH</TableHead>
				<TableHead className="border text-center">BLN</TableHead>
				<TableHead className="border text-center">TH</TableHead>
				<TableHead className="border text-center">BLN</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="border font-extrabold text-center" colSpan={2}>
					1
				</TableHead>
				<TableHead className="border font-extrabold text-center">2</TableHead>
				<TableHead className="border font-extrabold text-center">3</TableHead>
				<TableHead className="border font-extrabold text-center">4</TableHead>
				<TableHead className="border font-extrabold text-center">5</TableHead>
				<TableHead className="border font-extrabold text-center">6</TableHead>
				<TableHead className="border font-extrabold text-center">7</TableHead>
				<TableHead className="border font-extrabold text-center">8</TableHead>
				<TableHead className="border font-extrabold text-center" colSpan={2}>
					9
				</TableHead>
				<TableHead className="border font-extrabold text-center">10</TableHead>
				<TableHead className="border font-extrabold text-center" colSpan={2}>
					11
				</TableHead>
				<TableHead className="border font-extrabold text-center">12</TableHead>
				<TableHead className="border font-extrabold text-center">13</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default DnpTableHeader;
