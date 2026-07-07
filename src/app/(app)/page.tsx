import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { can } from "@/lib/auth/can";

const ENTITIES = [
  { id: "golongan", label: "Golongan" },
  { id: "grade", label: "Grade" },
  { id: "level", label: "Level" },
  { id: "jabatan", label: "Jabatan" },
  { id: "organisasi", label: "Organisasi" },
  { id: "profesi", label: "Profesi" },
  { id: "sanksi", label: "Sanksi" },
  { id: "jenjang-pendidikan", label: "Jenjang Pendidikan" },
  { id: "jenis-keahlian", label: "Jenis Keahlian" },
  { id: "jenis-kitas", label: "Jenis Kitas" },
  { id: "jenis-pelatihan", label: "Jenis Pelatihan" },
  { id: "jenis-sp", label: "Jenis SP" },
  { id: "alasan-berhenti", label: "Alasan Berhenti" },
  { id: "alat-kerja", label: "Alat Kerja" },
  { id: "apd", label: "APD" },
  { id: "hari-libur", label: "Hari Libur" },
  { id: "rumah-dinas", label: "Rumah Dinas" },
];

export default async function Home() {
  const user = await verifySession();
  const roles = user.labels;
  const visible = ENTITIES.filter((e) => can(roles, "view", e.id));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Selamat datang, {user.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Modul Master &middot; data referensi kepegawaian</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {visible.map((entity) => (
          <Link
            key={entity.id}
            href={`/master/${entity.id}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {entity.label}
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Modul lain akan hadir
      </div>
    </div>
  );
}
