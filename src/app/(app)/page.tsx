import type { LucideIcon } from "lucide-react";
import {
	AlertTriangle,
	Award,
	BookOpen,
	Briefcase,
	Building2,
	CalendarCheck2,
	CalendarOff,
	CheckCircle2,
	CreditCard,
	FileBadge,
	GraduationCap,
	Home as HomeIcon,
	Layers,
	Scale,
	ShieldAlert,
	Sparkles,
	Stethoscope,
	UserCheck,
	UserRound,
	Users,
	Wrench,
} from "lucide-react";
import Link from "next/link";
import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";

interface EntityMeta {
	id: string;
	label: string;
	desc: string;
	icon: LucideIcon;
}

const MASTER_CATEGORIES: {
	title: string;
	description: string;
	icon: LucideIcon;
	entities: EntityMeta[];
}[] = [
	{
		title: "Struktur & Posisi",
		description: "Hierarki organisasi, grade, level jabatan, dan profesi",
		icon: Building2,
		entities: [
			{ id: "organisasi", label: "Organisasi", desc: "Unit kerja & departemen", icon: Building2 },
			{ id: "jabatan", label: "Jabatan", desc: "Posisi struktural & fungsional", icon: Briefcase },
			{ id: "profesi", label: "Profesi", desc: "Rumpun profesi & keahlian", icon: Stethoscope },
			{ id: "golongan", label: "Golongan", desc: "Pangkat & golongan ruang", icon: BookOpen },
			{ id: "grade", label: "Grade", desc: "Tingkatan kelas jabatan", icon: Scale },
			{ id: "level", label: "Level", desc: "Jenjang eselon/manajerial", icon: Layers },
		],
	},
	{
		title: "Kompetensi & Dokumen",
		description: "Data kualifikasi, pelatihan resmi, dan identitas",
		icon: Award,
		entities: [
			{ id: "jenjang-pendidikan", label: "Jenjang Pendidikan", desc: "Tingkat pendidikan formal", icon: GraduationCap },
			{ id: "jenis-pelatihan", label: "Jenis Pelatihan", desc: "Pelatihan & sertifikasi dinas", icon: FileBadge },
			{ id: "jenis-keahlian", label: "Jenis Keahlian", desc: "Spesialisasi keterampilan teknis", icon: Wrench },
			{ id: "jenis-kitas", label: "Kartu Identitas", desc: "KTP, SIM, NPWP, BPJS, dll.", icon: CreditCard },
		],
	},
	{
		title: "Kedisiplinan & Fasilitas",
		description: "Tata tertib, penegakan sanksi, dan aset penunjang",
		icon: ShieldAlert,
		entities: [
			{ id: "sanksi", label: "Sanksi", desc: "Katalog sanksi & ketentuan", icon: ShieldAlert },
			{ id: "jenis-sp", label: "Surat Peringatan", desc: "Kategori SP 1, 2, dan 3", icon: AlertTriangle },
			{ id: "alasan-berhenti", label: "Alasan Berhenti", desc: "Kategori terminasi & pensiun", icon: CalendarOff },
			{ id: "rumah-dinas", label: "Rumah Dinas", desc: "Inventaris hunian dinas pegawai", icon: HomeIcon },
			{ id: "hari-libur", label: "Hari Libur", desc: "Kalender libur resmi & cuti bersama", icon: CalendarCheck2 },
		],
	},
];

export default async function Home() {
	const [user, { roles, permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	const canReadPegawai = hasPermission(permissions, PERMISSION.PEGAWAI_READ, roles);
	const canApproveProfil = hasPermission(permissions, PERMISSION.PROFIL_APPROVE, roles);

	const initial = user.name?.charAt(0).toUpperCase() ?? "P";
	const formattedDate = new Intl.DateTimeFormat("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date());

	return (
		<div className="mx-auto max-w-6xl space-y-8 pb-8">
			{/* Hero Welcome Card */}
			<section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
				<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/30 via-primary to-primary/30" />
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-start gap-4">
						<div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-sm ring-4 ring-primary/10">
							{initial}
						</div>
						<div className="space-y-1">
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-xs font-semibold uppercase tracking-wider text-primary">
									Perumdam Tirta Satria
								</span>
								<span className="text-xs text-muted-foreground">&bull;</span>
								<span className="text-xs text-muted-foreground">{formattedDate}</span>
							</div>
							<h1 className="text-xl font-semibold text-foreground sm:text-2xl">Selamat Datang, {user.name}</h1>
							<p className="text-sm text-muted-foreground">
								Sistem Informasi Manajemen Kepegawaian &middot; Akses layanan dan kelola data referensi perusahaan
							</p>
						</div>
					</div>

					{roles.length > 0 && (
						<div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:justify-end">
							{roles.map((role) => (
								<span
									key={role}
									className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
								>
									<Sparkles className="size-3" />
									{role}
								</span>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Operational Shortcuts */}
			<section className="space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="text-base font-semibold text-foreground">Layanan & Operasional Kepegawaian</h2>
					<span className="text-xs text-muted-foreground">Pintasan Utama</span>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<Link
						href="/kepegawaian/dashboard"
						className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
					>
						<div className="space-y-2">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
								<UserRound className="size-5" />
							</div>
							<h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
								Dashboard Pegawai
							</h3>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Akses profil mandiri, riwayat keluarga, pendidikan, sertifikasi, dan pengalaman kerja.
							</p>
						</div>
						<div className="mt-4 flex items-center text-xs font-medium text-primary">Buka Dashboard &rarr;</div>
					</Link>

					{canReadPegawai && (
						<Link
							href="/kepegawaian/data"
							className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
						>
							<div className="space-y-2">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
									<Users className="size-5" />
								</div>
								<h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
									Data Pegawai
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Kelola database pegawai aktif, riwayat mutasi, SK kenaikan golongan, dan penetapan gaji.
								</p>
							</div>
							<div className="mt-4 flex items-center text-xs font-medium text-primary">Kelola Data Pegawai &rarr;</div>
						</Link>
					)}

					{canReadPegawai && (
						<Link
							href="/kepegawaian/terminasi"
							className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
						>
							<div className="space-y-2">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
									<CalendarOff className="size-5" />
								</div>
								<h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
									Terminasi & Pensiun
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Pantau masa persiapan pensiun (MPP), calon purna tugas, dan arsip data pemberhentian.
								</p>
							</div>
							<div className="mt-4 flex items-center text-xs font-medium text-primary">Lihat Terminasi &rarr;</div>
						</Link>
					)}

					{canApproveProfil && (
						<Link
							href="/profil/approval"
							className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
						>
							<div className="space-y-2">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
									<UserCheck className="size-5" />
								</div>
								<h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
									Approval Profil
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Verifikasi dan setujui pengajuan perubahan biodata dan data keluarga dari pegawai.
								</p>
							</div>
							<div className="mt-4 flex items-center text-xs font-medium text-primary">Tinjau Pengajuan &rarr;</div>
						</Link>
					)}
				</div>
			</section>

			{/* Master Data Section */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-base font-semibold text-foreground">Data Referensi (Master Data)</h2>
						<p className="text-xs text-muted-foreground">Katalog konfigurasi dasar kepegawaian Perumdam</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{MASTER_CATEGORIES.map((category) => {
						const CategoryIcon = category.icon;
						return (
							<div
								key={category.title}
								className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-xs"
							>
								<div className="mb-4 flex items-center gap-3 border-b border-border/60 pb-3">
									<div className="flex size-8 items-center justify-center rounded-lg bg-muted text-primary">
										<CategoryIcon className="size-4" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
										<p className="text-[0.75rem] text-muted-foreground">{category.description}</p>
									</div>
								</div>

								<div className="flex flex-col gap-2">
									{category.entities.map((entity) => {
										const Icon = entity.icon;
										return (
											<Link
												key={entity.id}
												href={`/master/${entity.id}`}
												className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/60 p-3 text-sm transition-all duration-150 hover:border-primary/40 hover:bg-muted hover:shadow-xs"
											>
												<div className="flex items-center gap-3 min-w-0">
													<div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-card text-muted-foreground ring-1 ring-border/50 group-hover:text-primary">
														<Icon className="size-4" />
													</div>
													<div className="truncate">
														<span className="font-medium text-foreground group-hover:text-primary transition-colors block truncate">
															{entity.label}
														</span>
														<span className="text-[0.7rem] text-muted-foreground block truncate">{entity.desc}</span>
													</div>
												</div>
												<span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
													&rsaquo;
												</span>
											</Link>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</section>

			{/* Civic Badge Note */}
			<section className="rounded-xl border border-border/80 bg-muted/40 p-4 text-center text-xs text-muted-foreground">
				<p className="flex items-center justify-center gap-2">
					<CheckCircle2 className="size-4 text-primary" />
					<span>
						<strong>Perumdam Tirta Satria</strong> &mdash; Sistem Informasi Manajemen Kepegawaian
					</span>
				</p>
			</section>
		</div>
	);
}
