"use client";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { base64toBlob } from "@helpers/string";
import Image from "next/image";

const ViewImageComponent = (props: LampiranFile) => {
	const blob = base64toBlob(props.base64, props.type);
	const url = URL.createObjectURL(blob);

	return (
		<div className="w-max-full border realtive">
			<Image
				src={url}
				alt="Gambar Lampiran"
				className="w-full"
				width={600}
				height={0}
				sizes="(max-width: 768px) 100vw, 33vw"
				style={{ width: "100%", height: "auto" }}
			/>
		</div>
	);
};

export default ViewImageComponent;
