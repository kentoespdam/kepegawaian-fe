import { Card, CardContent, CardHeader } from "@components/ui/card";
import { ButtonLink } from "@components/ui/link";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import LampiranProfilContent from "./content";

export const metadata = {
	title: "Lampiran Profil",
};

const LampiranProfilPage = ({
	params,
	searchParams,
}: {
	params: { slug: string; id: number };
	searchParams: { [key: string]: string };
}) => {
	const { slug, id } = params;

	return (
		<Card>
			<CardHeader className="flex flex-row gap-2 items-center">
				<ButtonLink
					title="Kembali"
					icon={<ArrowLeftIcon className="h-4 w-4" />}
					href={searchParams.path}
					variant="destructive"
				/>
				<span className="text-2xl">{metadata.title}</span>
			</CardHeader>
			<Separator className="mb-4" />
			<CardContent>
				<LampiranProfilContent type={slug} id={id} />
			</CardContent>
		</Card>
	);
};

export default LampiranProfilPage;
