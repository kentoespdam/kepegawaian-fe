"use client";

import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ViewPdfComponent = (props: LampiranFile) => {
	const defaultPlugin = defaultLayoutPlugin();

	return (
		<div className="h-screen">
			<Worker workerUrl="/pdfjs-dist/build/pdf.worker.min.js">
				<Viewer
					fileUrl={`data:${props.type};base64,${props.base64}`}
					plugins={[defaultPlugin]}
				/>
			</Worker>
		</div>
	);
};

export default ViewPdfComponent;
