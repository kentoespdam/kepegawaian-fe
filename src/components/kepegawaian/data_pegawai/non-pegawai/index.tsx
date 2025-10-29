import { type Biodata, biodataTableColumns } from "@_types/profil/biodata";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { Table } from "@components/ui/table";
import { TabsContent } from "@components/ui/tabs";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useDataPegawaiStore } from "@store/kepegawaian/data_pegawai/data_pegawai-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NonPegawaiTableBody from "./body";

const TabBiodataNonPegawai = () => {
	const { tab } = useDataPegawaiStore((state) => ({
		tab: state.tab,
	}));
	const searchParams = useSearchParams();
	const search = useMemo(
		() => new URLSearchParams(searchParams).toString(),
		[searchParams],
	);
	const qKey = useMemo(() => ["data-biodata", search], [search]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<Biodata>({
				path: encodeString("profil/biodata"),
				searchParams: search,
				isRoot: true,
			}),
		enabled: tab === "non-pegawai",
		staleTime: 1000 * 60 * 5,
	});

	const showLoading = isLoading || isFetching;
	const isEmptyData = !data || data.empty;

	return (
		<TabsContent value="non-pegawai" x-chunk="dashboard-05-chunk-3">
			<Card>
				<CardHeader className="px-7">
					<CardTitle>Daftar Biodata</CardTitle>
					<CardDescription>Daftar Biodata Non Pegawai</CardDescription>
				</CardHeader>
				<CardContent className="grid">
					<SearchBuilder columns={biodataTableColumns} />
					<Table>
						<TableHeadBuilder columns={biodataTableColumns} />
						{showLoading || isEmptyData ? (
							<LoadingTable
								columns={biodataTableColumns}
								isLoading={showLoading}
							/>
						) : (
							<NonPegawaiTableBody data={data} />
						)}
					</Table>
					<PaginationBuilder data={data} />
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default TabBiodataNonPegawai;