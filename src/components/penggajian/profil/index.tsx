"use client";
import type { PegawaiDetail } from "@_types/pegawai";
import { useRouter } from "next/navigation";

interface ProfilGajiFormComponentProps {
    pegawai: PegawaiDetail
}
const ProfilGajiFormComponent = ({ pegawai }: ProfilGajiFormComponentProps) => {
    const router = useRouter()



    return (
        <div >
            Enter
        </div>
    );
}

export default ProfilGajiFormComponent;