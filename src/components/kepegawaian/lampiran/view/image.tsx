import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { base64toBlob } from "@helpers/string";
import Image from "next/image";

const ViewImageComponent = (props: LampiranFile) => {
	const blob = base64toBlob(props.base64, props.type);
	return (
		<div className="border">
			<Image
				src={URL.createObjectURL(blob)}
				alt="Gambar Lampiran"
				className="w-full"
			/>
		</div>
	);
};

export default ViewImageComponent;
