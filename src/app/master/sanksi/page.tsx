import AddSanksiButton from "@components/master/sanksi/button.add";
import SanksiFormDialog from "@components/master/sanksi/dialog.form";
import SanksiTableComponent from "@components/master/sanksi/table.index";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Suspense } from "react";

export const metadata = {
	title: "Sanksi SP",
};
const SanksiPage = () => {
	return (
		<div className="grid">
			<Card>
				<CardHeader>
					<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
						<span>{metadata.title}</span>
						<Suspense fallback={<>Loading...</>}>
							<AddSanksiButton />
						</Suspense>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<Suspense fallback={<>Loading...</>}>
						<SanksiTableComponent />
					</Suspense>
				</CardContent>
			</Card>
			<SanksiFormDialog />
		</div>
	);
};

export default SanksiPage;
