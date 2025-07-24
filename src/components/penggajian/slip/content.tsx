"use client";
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master";
import { Separator } from "@components/ui/separator";
import { Suspense } from "react";
import SlipGajiDetail from "./detail";
import SlipGajiKop from "./kop";
import SlipGajiProfil from "./profi";

const SlipGajiContentComponent = ({ gaji }: { gaji: GajiBatchMaster }) => {
	return (
		<div className="grid gap-2" id="target-gaji-content">
			<Suspense fallback={<div>Loading</div>}>
				<SlipGajiKop />
			</Suspense>
			<Suspense fallback={<div>Loading</div>}>
				<Separator className="border-t-2 border-b-2 h-1.5 flex-grow bg-border-none border-black" />
			</Suspense>
			<Suspense fallback={<div>Loading</div>}>
				<SlipGajiProfil gaji={gaji} />
			</Suspense>
			<Suspense fallback={<div>Loading</div>}>
				<SlipGajiDetail gaji={gaji} />
			</Suspense>
		</div>
	);
};

export default SlipGajiContentComponent;
