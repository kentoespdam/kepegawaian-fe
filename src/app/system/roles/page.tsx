import RoleFormDialog from "@components/system/roles/form.dialog";
import RoleTableComponent from "@components/system/roles/table.index";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
	title: "User Roles",
};
const RolesPage = () => {
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						<span>{metadata.title}</span>
						<Suspense fallback={<>Loading...</>}>
							<RoleFormDialog />
						</Suspense>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<Suspense fallback={<>Loading...</>}>
						<RoleTableComponent />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
};

export default RolesPage;
