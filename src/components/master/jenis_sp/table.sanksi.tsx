import type { JenisSp } from "@_types/master/jenis_sp";
import type { Sanksi } from "@_types/master/sanksi";
import TooltipBuilder from "@components/builder/tooltip";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { useSanksiStore } from "@store/master/sanksi";
import { CircleXIcon, SquarePlusIcon } from "lucide-react";

interface SanksiBadgeProps {
	sanksi: Sanksi;
	jenisSpId: number;
}
const SanksiBadge = ({ sanksi, jenisSpId }: SanksiBadgeProps) => {
	const { setSanksiId, setJenisSpId, setOpenDelete } = useSanksiStore(
		(state) => ({
			setSanksiId: state.setSanksiId,
			setJenisSpId: state.setJenisSpId,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const deleteHandler = () => {
		setJenisSpId(jenisSpId);
		setSanksiId(sanksi.id);
		setOpenDelete(true);
	};
	return (
		<Badge variant={"outline"} className="flex justify-between">
			<span className="mr-2">
				{sanksi.kode} : {sanksi.keterangan}
			</span>
			<TooltipBuilder
				text="Delete APD"
				className="bg-destructive text-destructive-foreground"
			>
				<Button
					size={"icon"}
					variant="ghost"
					type="button"
					onClick={deleteHandler}
					className="h-5 w-5 text-destructive font-bold hover:bg-transparent"
				>
					<CircleXIcon className="h-4 w-4" />
				</Button>
			</TooltipBuilder>
		</Badge>
	);
};

interface JenisSpTableActionProps {
	row: JenisSp;
}
const JenisSpSanksiCell = ({ row }: JenisSpTableActionProps) => {
	const { setSanksiId, setJenisSpId, setOpenSanksiForm } = useSanksiStore(
		(state) => ({
			setSanksiId: state.setSanksiId,
			setJenisSpId: state.setJenisSpId,
			setOpenSanksiForm: state.setOpenSanksiForm,
			setOpenDelete: state.setOpenDelete,
		}),
	);
	const addSanksiHandler = () => {
		setSanksiId(0);
		setJenisSpId(row.id);
		setOpenSanksiForm(true);
	};
	return (
		<div className="flex gap-2">
			<div
				className={cn(
					row.sanksiSp.length > 2 ? "grid grid-cols-2" : "flex",
					"gap-2",
				)}
			>
				{row.sanksiSp.map((sanksi) => (
					<SanksiBadge key={sanksi.id} sanksi={sanksi} jenisSpId={row.id} />
				))}
			</div>
			<div>
				<TooltipBuilder
					text="Add Sanksi"
					className="bg-primary text-primary-foreground"
					delayDuration={100}
				>
					<Button
						size={"icon"}
						variant="ghost"
						type="button"
						onClick={addSanksiHandler}
					>
						<SquarePlusIcon className="h-7 w-7 text-primary" />
					</Button>
				</TooltipBuilder>
			</div>
		</div>
	);
};

export default JenisSpSanksiCell;
