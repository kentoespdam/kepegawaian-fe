"use client";
import { Dialog, DialogContent, DialogTitle } from "@components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { useSanksiStore } from "@store/master/sanksi";
import SanksiForm from "../sanksi/form.index";
import PatchSanksiJenisSp from "./form.patch.sanksi.jenis_sp";

interface PatchSanksiJenisSpFormProps {
	qKey: string[];
}

const PatchSanksiJenisSpForm = ({ qKey }: PatchSanksiJenisSpFormProps) => {
	const { jenisSpId, openSanksiForm, setOpenSanksiForm } = useSanksiStore(
		(state) => ({
			jenisSpId: state.jenisSpId,
			openSanksiForm: state.openSanksiForm,
			setOpenSanksiForm: state.setOpenSanksiForm,
		}),
	);

	const openChangeHandler = () => {
		setOpenSanksiForm(!openSanksiForm);
	};

	return (
		<Dialog open={openSanksiForm} onOpenChange={openChangeHandler}>
			<DialogContent className="max-w-fit">
				<DialogTitle>Add / Edit Sanksi</DialogTitle>
				<Tabs defaultValue="choose" className="min-w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="choose">Choose</TabsTrigger>
						<TabsTrigger value="new">New</TabsTrigger>
					</TabsList>
					<TabsContent value="choose">
						<PatchSanksiJenisSp
							qKey={qKey}
							jenisSpId={jenisSpId}
							setOpenSanksiForm={setOpenSanksiForm}
						/>
					</TabsContent>
					<TabsContent value="new">
						<SanksiForm qKey={qKey} setOpenSanksiForm={setOpenSanksiForm} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default PatchSanksiJenisSpForm;
