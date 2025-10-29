import { Avatar } from "@components/ui/avatar"
import logo from "@public/images/logo_pdam_40x40.png"
import Image from "next/image"
import { Suspense } from "react"
import MenuSheet from "./menusheet"
import ProfileComponent from "./profil"
import LoadingProfile from "./profil/loading"
import { AppData } from "@_types/index"

export type TopBarProps = {
	appData?: AppData
}
const TopBarComponent = ({ appData }: TopBarProps) => {
	return (
		<div className="sticky top-0 z-50 flex w-full flex-row items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-full flex-wrap content-center items-center gap-2">
				<MenuSheet appData={appData} />
				<Avatar className="h-10 w-12">
					<Image
						alt="Logo Perumdam Tirta Satria"
						src={logo}
						fill
						loading="lazy"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</Avatar>
				<div className="text-2xl font-bold">Kepegawaian</div>
			</div>
			<Suspense fallback={<LoadingProfile />}>
				<ProfileComponent appData={appData} />
			</Suspense>
		</div>
	)
}

export default TopBarComponent
