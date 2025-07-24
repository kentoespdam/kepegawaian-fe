"use client";
import { type User, userTableColumns } from "@_types/system/user";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getPageData } from "@helpers/action";
import { useUserStore } from "@store/system/users.store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import UserTableBody from "./table.body";
import ChangePasswordFormDialog from "./change.password";

const UsersTableComponent = () => {
	const { userId, openChangePassword, setOpenChangePassword } = useUserStore(
		(state) => ({
			userId: state.userId,
			openChangePassword: state.openChangePassword,
			setOpenChangePassword: state.setOpenChangePassword,
		}),
	);
	const params = useSearchParams();
	const qKey = ["users", params.toString()];
	const query = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageData<User>({
				path: "system/users",
				isRoot: true,
				searchParams: params.toString(),
			}),
	});

	return (
		<div className="rounded-md grid">
			<SearchBuilder columns={userTableColumns} />
			<Table>
				<TableHeadBuilder columns={userTableColumns} />
				{query.isLoading || query.error || !query.data || query.data.empty ? (
					<LoadingTable
						columns={userTableColumns}
						isLoading={query.isLoading}
						error={query.error?.message}
					/>
				) : (
					<UserTableBody data={query.data} />
				)}
			</Table>
			<PaginationBuilder data={query.data} />
			<ChangePasswordFormDialog
				userId={userId}
				qKey={qKey}
				setOpenChangePassword={setOpenChangePassword}
				openChangePassword={openChangePassword}
			/>
		</div>
	);
};

export default UsersTableComponent;
