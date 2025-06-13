import CvComponent from "@components/kepegawaian/cv";

const CvPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	return <CvComponent pegawaiId={id} />;
};

export default CvPage;
