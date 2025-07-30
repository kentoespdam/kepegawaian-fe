import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import { ApprovalCutiStatus } from "@_types/enums/approval_cuti_status";
import { JenisPengajuanCuti } from "@_types/enums/jenis_pengajuan_cuti";
import type { PegawaiDetail } from "@_types/pegawai";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { usePengajuanCutiStore } from "@store/cuti/pengajuan";
import { EllipsisIcon, PencilIcon, XIcon } from "lucide-react";

type PengajuanCutiTableActionButtonProps = {
	pegawai: PegawaiDetail;
	data: CutiPegawai;
};
const PengajuanCutiTableActionButton = ({
	pegawai,
	data,
}: PengajuanCutiTableActionButtonProps) => {
	const { setSelectedDataId, setOpen, setOpenDelete, setDefaultValue } =
		usePengajuanCutiStore((state) => ({
			setSelectedDataId: state.setSelectedDataId,
			setOpen: state.setOpen,
			setOpenDelete: state.setOpenDelete,
			setDefaultValue: state.setDefaultValue,
		}));

	const editHandler = () => {
		if (data.approvalCutiStatus !== ApprovalCutiStatus.Enum.PENDING) return;
		setDefaultValue(pegawai, data);
		setOpen(true);
	};

	const deleteHandler = () => {
		setSelectedDataId(data.id);
		setOpenDelete(true);
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
					{data.jenisPengajuanCuti ===
					JenisPengajuanCuti.Enum.PENGAJUAN_CUTI ? (
						<DropdownMenuItem
							className="flex flex-row items-center cursor-pointer text-primary"
							onClick={editHandler}
						>
							<PencilIcon className="mr-2 h-[1rem] w-[1rem]" />
							<span>Edit</span>
						</DropdownMenuItem>
					) : null}

					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-destructive"
						onClick={deleteHandler}
					>
						<XIcon className="mr-2 h-[1rem] w-[1rem]" />
						<span>Batalkan Pengajuan</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default PengajuanCutiTableActionButton;
