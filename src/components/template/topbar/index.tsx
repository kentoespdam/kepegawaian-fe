import { Avatar } from "@components/ui/avatar";
import logo from "@public/images/logo_pdam_40x40.png";
import Image from "next/image";
import type { Models } from "node-appwrite";
import { Suspense } from "react";
import MenuSheet from "./menusheet";
import ProfileComponent from "./profil";
import LoadingProfile from "./profil/loading";

interface TopBarProps {
	user: Models.User<Models.Preferences>;
}
const TopBarComponent = ({ user }: TopBarProps) => {
	return (
		<div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row justify-between items-center px-4">
			<div className="flex flex-wrap gap-2 items-center content-center h-full">
				<MenuSheet user={user} />
				<Avatar className="h-10 w-12">
					<Image
						alt="Logo Perumdam Tirta Satria"
						src={logo}
						fill
						loading="lazy"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</Avatar>
				<div className="font-bold text-2xl">Kepegawaian</div>
				{/* <RenewAuthToken /> */}
			</div>
			<Suspense fallback={<LoadingProfile />}>
				<ProfileComponent />
			</Suspense>
		</div>
	);
};

export default TopBarComponent;
