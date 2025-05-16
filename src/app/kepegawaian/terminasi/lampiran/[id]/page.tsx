import LampiranSkDetailComponent from "@components/kepegawaian/detail/lampiran/detail";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";

export const metadata = {
	title: "Detail Lampiran",
};
const DetailLampiranPage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const { id } = await params;
	return (
		<Card>
			<CardHeader className="flex flex-row gap-2 items-center">
				<ButtonLink
					title="Kembali"
					icon={<ArrowLeftIcon className="h-4 w-4" />}
					href="/kepegawaian/terminasi/terminated"
					variant="destructive"
				/>
				<span className="text-2xl">{metadata.title}</span>
			</CardHeader>
			<Separator className="mb-4" />
			<CardContent>
				<LampiranSkDetailComponent jenisSk={"SK_PENSIUN"} id={id} />
			</CardContent>
		</Card>
	);
};

export default DetailLampiranPage;
