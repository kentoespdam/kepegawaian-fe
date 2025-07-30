"use client";
import {
	type ParameterSetting,
	parameterSettingTableColumns,
} from "@_types/penggajian/parameter_setting";
import DeleteZodDialogBuilder from "@components/builder/button/delete-zod";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useParameterSettingStore } from "@store/penggajian/parameter_setting";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ParameterSettingTableBody from "./table.body";

const ParameterSettingComponent = () => {
	const params = useSearchParams();
	const search = new URLSearchParams(params);
	const { parameterSettingId, openDelete, setOpenDelete } =
		useParameterSettingStore((state) => state);

	const { isLoading, error, data } = useQuery({
		queryKey: ["parameter_setting", search.toString()],
		queryFn: async () =>
			await getPageDataEnc<ParameterSetting>({
				path: encodeString("penggajian/parameter-setting"),
				searchParams: search.toString(),
				isRoot: true,
			}),
	});

	return (
		<>
			<SearchBuilder columns={parameterSettingTableColumns} />
			<div className="overflow-auto min-h-90">
				<Table>
					<TableHeadBuilder columns={parameterSettingTableColumns} />
					{isLoading || error || !data || data?.empty ? (
						<LoadingTable
							columns={parameterSettingTableColumns}
							isLoading={isLoading}
							error={error?.message}
						/>
					) : (
						<ParameterSettingTableBody data={data} />
					)}
				</Table>
				<PaginationBuilder data={data} />
				<DeleteZodDialogBuilder
					id={parameterSettingId}
					deletePath="penggajian/parameter-setting"
					openDelete={openDelete}
					setOpenDelete={setOpenDelete}
					queryKeys={[["parameter_setting", search.toString()]]}
				/>
			</div>
		</>
	);
};

export default ParameterSettingComponent;
