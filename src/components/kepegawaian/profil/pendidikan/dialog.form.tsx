import { Dialog } from "@components/ui/dialog";
import { usePendidikanStore } from "@store/kepegawaian/profil/pendidikan-store";
import ProfilPendidikanForm from "./form.index";

const FormProfilPendidikanDialog = () => {
    const { open, setOpen } = usePendidikanStore((state) => ({
		open: state.open,
		setOpen: state.setOpen,
	}));
    
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<ProfilPendidikanForm />
		</Dialog>
	);
};

export default FormProfilPendidikanDialog;
