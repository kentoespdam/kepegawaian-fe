import UsersTableComponent from "@components/system/users/table.index";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
	title: "Users",
};
const UsersPage = () => {
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						<span>{metadata.title}</span>
						{/* <RoleFormDialog /> */}
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<Suspense fallback={<>Loading...</>}>
						<UsersTableComponent />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
};

export default UsersPage;
