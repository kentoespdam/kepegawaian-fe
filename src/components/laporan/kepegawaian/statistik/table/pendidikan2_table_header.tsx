import { TableHead, TableHeader, TableRow } from "@components/ui/table"
import React from "react"

const Pendidikan2TableHeader = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead
					rowSpan={2}
					className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground"
				>
					Pendidikan
				</TableHead>
				<TableHead
					colSpan={6}
					className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground"
				>
					GOLONGAN
				</TableHead>
				<TableHead
					colSpan={5}
					className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground"
				>
					STATUS PEGAWAI
				</TableHead>
				<TableHead
					colSpan={4}
					className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground"
				>
					KATEGORI UNIT KERJA
				</TableHead>
				<TableHead
					colSpan={3}
					className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground"
				>
					JENIS KELAMIN
				</TableHead>
			</TableRow>
			<TableRow>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					NON GOL
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					A
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					B
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					C
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					D
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					JML
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					KONTRAK
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					CAPEG / CA HONTAP
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					HON TTP
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					TETAP
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					JML
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					ADM
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					PELAYANAN
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					TEKNIK
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					JML
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					PRIA
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					WANITA
				</TableHead>
				<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
					JML
				</TableHead>
			</TableRow>
		</TableHeader>
	)
}

export default React.memo(Pendidikan2TableHeader)
