"use client";
import {
  type ProfilUpdate,
  profilUpdateColumns,
} from "@_types/profil/profil-update";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import ProfilUpdateTableBody from "@components/kepegawaian/profil/approval/table_body";
import { Table } from "@components/ui/table";
import { getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type ApprovalProfilComponentProps = {
  pegawaiId: number;
};
const ApprovalProfilComponent = ({
  pegawaiId,
}: ApprovalProfilComponentProps) => {
  const params = useSearchParams();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["approval-profil", params.toString()],
    queryFn: () =>
      getPageDataEnc<ProfilUpdate>({
        path: encodeString(`profil/profil-update`),
        isRoot: true,
        searchParams: params.toString(),
      }),
  });
  const showLoading = isLoading || isFetching;
  const isEmptyData = !data || data.empty;
  return (
			<div className="grid gap-2">
				<Table>
					<TableHeadBuilder columns={profilUpdateColumns} />
					{!isEmptyData ? (
						<ProfilUpdateTableBody data={data} pegawaiId={pegawaiId} />
					) : (
						<LoadingTable
							columns={profilUpdateColumns}
							isLoading={showLoading}
						/>
					)}
				</Table>
				<PaginationBuilder data={data} />
			</div>
		);
};
export default ApprovalProfilComponent;
