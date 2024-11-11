import { alasanBerhentiTableColumns } from "@_types/master/alasan_berhenti";
import ButtonAddBuilder from "@components/builder/button/add";
import SearchBuilder from "@components/builder/search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import AlasanBerhentiTable from "./table";

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
				<AlasanBerhentiTable />
			</CardContent>
		</Card>
	);
};

export default AlasanBerhentiPage;
