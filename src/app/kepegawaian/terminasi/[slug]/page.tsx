import AddTerminasiButton from "@components/kepegawaian/terminasi/button/add";
import CalonTerminasiComponent from "@components/kepegawaian/terminasi/calon-pensiun";
import TerminatedComponent from "@components/kepegawaian/terminasi/terminated";
import { ButtonLink } from "@components/ui/link";
import { Separator } from "@components/ui/separator";

export const metadata = {
	title: "Terminasi Pegawai",
};
const TerminasiPage = ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	return (
		<div className="flex-1 grid gap-2 md:gap-2 lg:px-4 md:px-2">
			<header className="w-full flex justify-between h-10">
				<span className="text-md font-semibold">{metadata.title}</span>
				<AddTerminasiButton />
			</header>
			<div className="grid grid-cols-2 gap-2 items-center justify-center">
				<ButtonLink
					href="/kepegawaian/terminasi/will-retire"
					className="w-full"
					size="sm"
					title="Calon Pensiun"
					variant={slug === "will-retire" ? "default" : "outline"}
				/>
				<ButtonLink
					href="/kepegawaian/terminasi/terminated"
					className="w-full"
					size="sm"
					title="Pegawai Berhenti"
					variant={slug === "terminated" ? "default" : "outline"}
				/>
			</div>
			<Separator />
			{slug === "will-retire" ? (
				<CalonTerminasiComponent />
			) : (
				<TerminatedComponent />
			)}
		</div>
	);
};

export default TerminasiPage;
