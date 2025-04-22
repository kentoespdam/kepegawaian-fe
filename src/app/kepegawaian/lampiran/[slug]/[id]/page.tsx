import LampiranSkDetailComponent from "@components/kepegawaian/detail/lampiran/detail";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";

export const metadata = {
	title: "Detail Lampiran",
};
const DetailLampiranPage = ({
	params,
	searchParams,
}: {
	params: { slug: string; id: number };
	searchParams: { path: string };
}) => {
	const { slug, id } = params;
	return (
		<Card>
			<CardHeader className="flex flex-row gap-2 items-center">
				<ButtonLink
					title="Kembali"
					icon={<ArrowLeftIcon className="h-4 w-4" />}
					href={atob(searchParams.path)}
					variant="destructive"
				/>
				<span className="text-2xl">{metadata.title}</span>
			</CardHeader>
			<Separator className="mb-4" />
			<CardContent>
				<LampiranSkDetailComponent jenisSk={slug} id={id} />
			</CardContent>
		</Card>
	);
};

export default DetailLampiranPage;
