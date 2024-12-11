import KomponenGajiComponent from "@components/penggajian/komponen";
import ProfilGajiComponent from "@components/penggajian/profil";
import { cn } from "@lib/utils";
import { Suspense } from "react";

export const metadata = { title: "Komponen Gaji" }
const KomponenGajiPage = () => {
    return (
        <div className={cn("grid gap-2", "lg:grid-cols-12", "md:grid-cols-12")}>
            <div className="lg:col-span-4">
                <Suspense>
                    <ProfilGajiComponent />
                </Suspense>
            </div>
            <div className="lg:col-span-8">
                <Suspense>
                    <KomponenGajiComponent/>
                </Suspense>
            </div>
        </div>
    )
}

export default KomponenGajiPage;