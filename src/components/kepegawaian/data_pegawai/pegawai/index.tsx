"use client";
import type { Pageable } from "@_types/index";
import { type Pegawai, pegawaiTableColumns } from "@_types/pegawai";
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
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import EditProfilPribadiFormComponent from "../profil/pribadi";
import PegawaiTableBody from "./body";

const TabBiodataPegawai = () => {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const { pegawai, open } = useProfilPribadiStore((state) => ({
		pegawai: state.pegawai,
		open: state.open,
	}));

	const qc = useQueryClient();
	const qs = qc.getQueryState<Pageable<Pegawai>>([
		"data-pegawai",
		params.toString(),
	]);

	return (
		<TabsContent value="pegawai">
			<Card className="w-full">
				<CardHeader className="px-7">
					<CardTitle>Daftar Pegawai</CardTitle>
					<CardDescription>Daftar Biodata Pegawai</CardDescription>
				</CardHeader>
				<CardContent className="max-w-full grid">
					<SearchBuilder columns={pegawaiTableColumns} />
					<Table>
						<TableHeadBuilder columns={pegawaiTableColumns} />
						{qs?.status === "pending" ? (
							<LoadingTable columns={pegawaiTableColumns} isLoading={true} />
						) : !qs?.data || qs?.status === "error" ? (
							<LoadingTable
								columns={pegawaiTableColumns}
								isSuccess={false}
								error={qs?.error?.message}
							/>
						) : (
							<PegawaiTableBody data={qs.data} />
						)}
					</Table>
					<PaginationBuilder data={qs?.data} />
				</CardContent>
			</Card>
			<EditProfilPribadiFormComponent open={open} pegawai={pegawai} />
		</TabsContent>
	);
};

export default TabBiodataPegawai;
