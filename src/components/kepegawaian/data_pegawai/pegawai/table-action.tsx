"use client"
import type { Pegawai, PegawaiDetail } from "@_types/pegawai"
import { Button } from "@components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { getDataByIdEnc } from "@helpers/action"
import { encodeId, encodeString } from "@helpers/number"
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi"
import {
	DollarSignIcon,
	EllipsisIcon,
	PrinterIcon,
	RssIcon,
	UserCogIcon,
	UserIcon,
	UserRoundCogIcon,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

interface KepegawaianTableActionProps {
	data: Pegawai
}
const KepegawaianTableAction = ({ data }: KepegawaianTableActionProps) => {
	const { id } = data
	const params = useSearchParams()
	const callbackUrl = btoa(params.toString() ?? "")

	const encodedId = useMemo(() => encodeId(id), [id])

	const { setPegawai, setOpen } = useProfilPribadiStore((state) => ({
		setPegawai: state.setPegawaiId,
		setOpen: state.setOpen,
	}))

	const handleEditProfilePribadi = () => {
		// "use server";
		getDataByIdEnc<PegawaiDetail>({
			path: encodeString("pegawai"),
			id: encodedId,
			isRoot: true,
		}).then((res) => {
			setPegawai(res)
			setOpen(true)
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="default" size="icon" className="h-7 w-7">
					<EllipsisIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuGroup>
					<Link
						href={`/kepegawaian/pendukung/pendidikan/${encodedId}`}
					>
						<DropdownMenuItem className="flex cursor-pointer flex-row items-center">
							<RssIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Data Pendukung</span>
						</DropdownMenuItem>
					</Link>

					<Link href={`/kepegawaian/detail/mutasi/${encodedId}`}>
						<DropdownMenuItem className="flex cursor-pointer flex-row items-center">
							<UserCogIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Data Kepegawaian</span>
						</DropdownMenuItem>
					</Link>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<UserIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Profil</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<Link
									href={`/kepegawaian/profil/gaji/${encodedId}?callbackUrl=${callbackUrl}`}
								>
									<DropdownMenuItem className="flex cursor-pointer flex-row items-center">
										<DollarSignIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Data Profil Gaji</span>
									</DropdownMenuItem>
								</Link>

								<DropdownMenuItem
									className="flex cursor-pointer flex-row items-center"
									onClick={handleEditProfilePribadi}
								>
									<UserRoundCogIcon className="mr-2 h-[1rem] w-[1rem]" />
									<span>Data Profil Pribadi</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuItem
						className="flex cursor-pointer flex-row items-center"
						asChild
					>
						<Link href={`/laporan/kepegawaian/cv/${encodedId}`}>
							<PrinterIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Cetak CV</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default KepegawaianTableAction
