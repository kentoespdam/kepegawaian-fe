"use client";
import type { SystemRole } from "@_types/system/system_role";
import { type User, userTableColumns } from "@_types/system/user";
import SearchBuilder from "@components/builder/search";
import TableHeadBuilder from "@components/builder/table/head";
import LoadingTable from "@components/builder/table/loading";
import PaginationBuilder from "@components/builder/table/pagination";
import { Table } from "@components/ui/table";
import { getListDataEnc, getPageDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useUserStore } from "@store/system/users.store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ChangePasswordFormDialog from "./change.password";
import UserTableBody from "./table.body";

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
	const queryRoles = useQuery({
		queryKey: ["user-roles"],
		queryFn: async () =>
			await getListDataEnc<SystemRole>({
				path: encodeString("system/roles"),
				isRoot: true,
			}),
	});
	const query = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await getPageDataEnc<User>({
				path: encodeString("system/users"),
				isRoot: true,
				searchParams: params.toString(),
			}),
	});

	return (
		<div className="rounded-md grid">
			<SearchBuilder columns={userTableColumns} />
			<Table>
				<TableHeadBuilder columns={userTableColumns} />
				{queryRoles.data &&
				queryRoles.data.length > 0 &&
				query.data &&
				!query.data.empty ? (
					<UserTableBody data={query.data} qKey={qKey} roleList={queryRoles.data} />
				) : (
					<LoadingTable
						columns={userTableColumns}
						isLoading={query.isLoading}
						error={query.error?.message}
					/>
				)}
				{/* {query.isLoading || query.error || !query.data || query.data.empty ? (
					<LoadingTable
						columns={userTableColumns}
						isLoading={query.isLoading}
						error={query.error?.message}
					/>
				) : (
					<UserTableBody data={query.data} qKey={qKey} />
				)} */}
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
