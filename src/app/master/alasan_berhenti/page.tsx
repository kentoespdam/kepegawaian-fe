import { alasanBerhentiTableColumns } from "@_types/master/alasan_berhenti";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import AlasanBerhentiTable from "@components/master/alasan-berhenti/table";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
	title: "Master Alasan Berhenti",
};
const AlasanBerhentiPage = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					<span>{metadata.title}</span>
					<ButtonAddBuilder
						href="/master/alasan_berhenti/add"
						msg="Tambah Alasan Berhenti"
					/>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SearchBuilder columns={alasanBerhentiTableColumns} />
				<Suspense>
					<AlasanBerhentiTable />
				</Suspense>
			</CardContent>
		</Card>
	);
};

export default AlasanBerhentiPage;
