import type { KomponenGaji } from "@_types/penggajian/komponen";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useKomponenGajiStore } from "@store/penggajian/komponen";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";

interface KomponenGajiTableActionProps {
	row: KomponenGaji;
}
const KomponenGajiTableAction = ({ row }: KomponenGajiTableActionProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const profilId = +(params.get("profilId") ?? 0);
	const callbackUrl = btoa(`/penggajian/komponen_gaji?${params.toString()}`);
	const search = new URLSearchParams();
	search.set("callback", callbackUrl);

	const { setKomponenGajiId, setOpenDelete } = useKomponenGajiStore(
		useShallow((state) => ({
			setKomponenGajiId: state.setKomponenGajiId,
			setOpenDelete: state.setOpenDelete,
		})),
	);
	const editHandler = () => {
		router.push(
			`/penggajian/komponen_gaji/${profilId}/edit/${row.id}?${search.toString()}`,
		);
	};

	const deleteHandler = () => {
		setKomponenGajiId(row.id);
		setOpenDelete(true);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="default" size="icon" className="size-6">
					<EllipsisIcon className="size-6"/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto">
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-primary"
						onClick={editHandler}
					>
						<PencilIcon className="mr-2 size-4 text-primary" />
						<span>Edit</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="flex flex-row items-center cursor-pointer text-destructive"
						onClick={deleteHandler}
					>
						<DeleteIcon className="mr-2 size-4 text-destructive" />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default KomponenGajiTableAction;
