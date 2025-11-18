import ApprovalProfilComponent from "@components/kepegawaian/profil/approval";
import ApprovalProfilFormDialog from "@components/kepegawaian/profil/approval/dialog_form";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import getAppData from "@lib/app-data";

export const metadata = {
	title: "Approval Profil",
};
const ApprovalProfilPage = async () => {
	const { pegawai } = await getAppData();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-bold text-md flex flex-row justify-between items-center">
					{metadata.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ApprovalProfilComponent pegawaiId={pegawai.id} />
				<ApprovalProfilFormDialog />
			</CardContent>
		</Card>
	);
};

export default ApprovalProfilPage;
