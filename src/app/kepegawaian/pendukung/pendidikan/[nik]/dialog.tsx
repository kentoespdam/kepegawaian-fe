import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@components/ui/dialog";

const ProfilPendidikanDialog = () => {
	return (
		<Dialog>
			<DialogTrigger>Edit</DialogTrigger>
			<DialogContent>
				<DialogHeader>Data Pendidikan Pegawai</DialogHeader>
                <div className="grid gap-4 py-4">
                    
                </div>
			</DialogContent>
		</Dialog>
	);
};

export default ProfilPendidikanDialog;
