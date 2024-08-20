"use client";

import { useSearchParams } from "next/navigation";

type MutasiContentProps = {
	pegawaiId: number;
};
const MutasiContentComponent = (props: MutasiContentProps) => {
    const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
    
	return <div>Enter</div>;
};

export default MutasiContentComponent;
