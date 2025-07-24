"use client";
import type { Pegawai, PegawaiDetail } from "@_types/pegawai";
import { Button } from "@components/ui/button";
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
} from "@components/ui/dropdown-menu";
import { getDataByIdEnc } from "@helpers/action";
import { encodeId, encodeString } from "@helpers/number";
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi";
import {
	DollarSignIcon,
	EllipsisIcon,
	PrinterIcon,
	RssIcon,
	UserCogIcon,
	UserIcon,
	UserRoundCogIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface KepegawaianTableActionProps {
	data?: Pegawai;
}
const KepegawaianTableAction = (props: KepegawaianTableActionProps) => {
	const params = useSearchParams();
	const callbackUrl = btoa(params.toString() ?? "");

	const { setPegawai, open, setOpen } = useProfilPribadiStore((state) => ({
		setPegawai: state.setPegawaiId,
		open: state.open,
		setOpen: state.setOpen,
	}));

	const handleEditProfilePribadi = () => {
		// "use server";
		getDataByIdEnc<PegawaiDetail>({
			path: encodeString("pegawai"),
			id: encodeId(props.data?.id as number),
			isRoot: true,
		}).then((res) => {
			setPegawai(res);
			setOpen(true);
		});
	};

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
						href={`/kepegawaian/pendukung/pendidikan/${props.data?.biodata.nik}`}
					>
						<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
							<RssIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Data Pendukung</span>
						</DropdownMenuItem>
					</Link>

					<Link href={`/kepegawaian/detail/mutasi/${props.data?.id}`}>
						<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
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
									href={`/kepegawaian/profil/gaji/${props.data?.id}?callbackUrl=${callbackUrl}`}
								>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<DollarSignIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Data Profil Gaji</span>
									</DropdownMenuItem>
								</Link>

								<DropdownMenuItem
									className="flex flex-row items-center cursor-pointer"
									onClick={handleEditProfilePribadi}
								>
									<UserRoundCogIcon className="mr-2 h-[1rem] w-[1rem]" />
									<span>Data Profil Pribadi</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<Link
						href={`/laporan/kepegawaian/cv/${encodeId(props.data?.id as number)}`}
					>
						<DropdownMenuItem
							className="flex flex-row items-center cursor-pointer"
							// onClick={handleClickCv}
						>
							<PrinterIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Cetak CV</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default KepegawaianTableAction;
