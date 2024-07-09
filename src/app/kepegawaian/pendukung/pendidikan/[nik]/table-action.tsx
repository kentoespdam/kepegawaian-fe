import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan } from "@_types/profil/pendidikan";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { usePendidikanStore } from "@store/kepegawaian/biodata/pendidikan-store";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";

interface ProfilPendidikanActionProps {
	biodata: Biodata;
	data: Pendidikan;
}

const ProfilPendidikanAction = (props: ProfilPendidikanActionProps) => {
	const store = usePendidikanStore();

	const editHandler = () => {
		store.setDefaultValues(props.biodata, props.data);
		store.setOpen(true);
	};

	const deleteHadler = () => {
		store.setDefaultValues(props.biodata);
		store.setPendidikanId(props.data.id);
		store.setOpenDelete(true);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="default" size="icon" className="h-6 w-6">
					<EllipsisIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-primary"
						onClick={editHandler}
					>
						<PencilIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Edit</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-destructive"
						onClick={deleteHadler}
					>
						<DeleteIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Delete</span>
					</DropdownMenuItem>

					{/* <Link
						href={`/kepegawaian/pendukung/pendidikan/${props.data?.biodata.nik}`}
					>
						<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
							<RssIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Data Pendukung</span>
						</DropdownMenuItem>
					</Link>

					<Link href={`/kepegawaian/detail_kepegawaian/${props.data?.id}`}>
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
								<Link href={`/kepegawaian/profil/gaji/${props.data?.id}`}>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<DollarSignIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Data Profil Gaji</span>
									</DropdownMenuItem>
								</Link>

								<Link href={`/kepegawaian/profil/pribadi/${props.data?.id}`}>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<UserRoundCogIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Data Profil Pribadi</span>
									</DropdownMenuItem>
								</Link>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<FileTextIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Pencatatan Mutasi</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<Link href={`/kepegawaian/mutasi/${props.data?.id}`}>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<SendIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Mutasi Jabatan & Unit Kerja</span>
									</DropdownMenuItem>
								</Link>

								<Link href={`/kepegawaian/kontrak_kerja/${props.data?.id}`}>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<BookCheckIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Perbaharui Kontrak Kerja</span>
									</DropdownMenuItem>
								</Link>

								<Link href={`/kepegawaian/surat_peringatan/${props.data?.id}`}>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<FileInputIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Pemberian Surat Peringatan</span>
									</DropdownMenuItem>
								</Link>

								<Link href={`/kepegawaian/resign/${props.data?.id}`}>
									<DropdownMenuItem className="flex flex-row items-center cursor-pointer">
										<UserXIcon className="mr-2 h-[1rem] w-[1rem]" />
										<span>Karyawan Berhenti/Resign</span>
									</DropdownMenuItem>
								</Link>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub> */}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfilPendidikanAction;
