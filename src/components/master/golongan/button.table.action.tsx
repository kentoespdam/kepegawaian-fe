import { Button } from "@src/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import { useGolonganStore } from "@src/store/master/golongan";
import { DeleteIcon, EllipsisIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

type GolonganTableActionProps = {
	golonganId: number;
};
const GolonganTableAction = ({ golonganId }: GolonganTableActionProps) => {
	const { setSelectedDataId, setOpenDelete } = useGolonganStore(
		useShallow((state) => ({
			setSelectedDataId: state.setSelectedDataId,
			setOpenDelete: state.setOpenDelete,
		})),
	);
	const router = useRouter();

	const editHandler = () => {
		router.push(`/master/golongan/edit/${golonganId}`);
	};

	const deleteHandler = () => {
		setSelectedDataId(golonganId);
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

export default GolonganTableAction;
