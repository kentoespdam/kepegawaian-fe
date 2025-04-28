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
							{/* <JenisSpAddButton /> */}
						</Suspense>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-2">
					<Suspense fallback={<>Loading...</>}>
						{/* <JenisSpTableComponent /> */}
					</Suspense>
				</CardContent>
			</Card>
			{/* <JenisSpAddFormDialog /> */}
		</div>
	);
};

export default SanksiPage;
