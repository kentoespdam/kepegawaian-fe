import { redirect } from "next/navigation";

export default function CutiPersetujuanRiwayatPage() {
	redirect("/cuti/persetujuan?readWriteStatus=READ");
}
