import JenisSpAddButton from "@components/master/jenis_sp/button.add";
import JenisSpFormDialog from "@components/master/jenis_sp/dialog.form";
import JenisSpTableComponent from "@components/master/jenis_sp/table.index";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
	title: "Jenis SP",
};
const JenisSpPage = () => {
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						<span>{metadata.title}</span>
						<Suspense fallback={<>Loading...</>}>
							<JenisSpAddButton />
						</Suspense>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<Suspense fallback={<>Loading...</>}>
						<JenisSpTableComponent />
					</Suspense>
				</CardContent>
			</Card>
			<JenisSpFormDialog />
		</div>
	);
};

export default JenisSpPage;
