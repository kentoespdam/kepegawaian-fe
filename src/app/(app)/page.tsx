import type { LucideIcon } from "lucide-react";
import {
	AlertTriangle,
	BookOpen,
	Briefcase,
	Building2,
	CalendarOff,
	CreditCard,
	GraduationCap,
	Home as HomeIcon,
	Layers,
	Scale,
	ShieldAlert,
	Stethoscope,
	TriangleAlert,
	Wrench,
} from "lucide-react";
import Link from "next/link";
import { MASTER_ENTITIES } from "@/config/entities";
import { verifySession } from "@/lib/auth";

const ENTITY_ICONS: Record<string, LucideIcon> = {
	level: Layers,
	grade: Scale,
	organisasi: Building2,
	jabatan: Briefcase,
	profesi: Stethoscope,
	golongan: BookOpen,
	"jenis-keahlian": Wrench,
	"jenis-kitas": CreditCard,
	"jenis-pelatihan": GraduationCap,
	"jenjang-pendidikan": GraduationCap,
	"jenis-sp": AlertTriangle,
	sanksi: ShieldAlert,
	"alasan-berhenti": CalendarOff,
	"rumah-dinas": HomeIcon,
	"hari-libur": CalendarOff,
};
export default async function Home() {
	const user = await verifySession();
	// Read master terbuka utk semua user login (kontrak BE: tak ada MASTER:READ) —
	// tampilkan semua entity referensi, tanpa filter role legacy.
	const visible = MASTER_ENTITIES;

	return (
		<div className="mx-auto max-w-4xl">
			<div className="mb-8">
				<h1 className="text-xl font-semibold text-foreground">Selamat datang, {user.name}</h1>
				<p className="mt-1 text-sm text-muted-foreground">Modul Master &middot; data referensi kepegawaian</p>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
				{visible.map((entity) => {
					const Icon = ENTITY_ICONS[entity.id] ?? TriangleAlert;
					return (
						<Link
							key={entity.id}
							href={`/master/${entity.id}`}
							className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30"
						>
							<Icon className="size-5 text-primary" aria-hidden="true" />
							{entity.label}
						</Link>
					);
				})}
			</div>

			<div className="mt-12 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
				Modul lain akan hadir
			</div>
		</div>
	);
}
