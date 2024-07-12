import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";

const ViewImageComponent = (props: LampiranFile) => {
	return (
		<div className="border">
			<img
				src={`data:${props.type};base64,${props.base64}`}
				alt="Gambar Lampiran"
                className="w-full"
			/>
		</div>
	);
};

export default ViewImageComponent;
