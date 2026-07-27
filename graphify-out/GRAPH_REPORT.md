# Graph Report - .  (2026-07-27)

## Corpus Check
- Corpus is ~43,872 words - fits in a single context window. You may not need a graph.

## Summary
- 1027 nodes · 2805 edges · 51 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Pages & Routing
- Master Entity Config
- Dashboard & Biodata
- Golongan / Grade / Jabatan
- Riwayat Kepegawaian
- Sidebar UI
- FK Combobox & Dialogs
- Dasar Gaji & Profile
- Batch Gaji
- Data Pegawai & Terminasi
- Pegawai Response Types
- Avatar & Table UI
- Profesi Form
- Cuti Jenis & Profile Update
- Shared Search Params
- Badge & Sanksi Manager
- User Menu & Logout
- Tambah Pegawai & Edit Gaji
- Cuti Approval & Kuota
- Cuti Pengajuan
- Auth Proxy & Session
- Login & Toolbar Filter
- Data Pegawai Toolbar
- Profil & Change Password
- Confirm Delete Dialog
- Edit Profil Sheet
- Profesi Types
- Shared Enum Types
- Sanksi Types
- Status Pegawai & Parameter
- Detail Dasar Gaji
- Entity Form Modal / Sheet
- Sanksi Form
- Jenis SP Types
- Organisasi Types
- Jabatan Types
- Tunjangan
- Keahlian
- Root Layout & Providers
- Lampiran Types
- Alasan Berhenti
- Jenis Kitas
- Jenis Pelatihan
- Rumah Dinas
- PHDP
- Pelatihan
- Pengalaman Kerja
- Kartu Identitas
- Pendidikan
- Data Table
- Profil Detail

## God Nodes (most connected - your core abstractions)
1. `cn()` - 152 edges
2. `PageQuery` - 81 edges
3. `can()` - 48 edges
4. `Page` - 46 edges
5. `MasterEntityTypes` - 45 edges
6. `verifySession` - 45 edges
7. `getRoles()` - 44 edges
8. `Envelope` - 43 edges
9. `SortObject` - 40 edges
10. `PageableObject` - 40 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CommandSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (51 total, 0 thin omitted)

### Community 0 - "Pages & Routing"
Cohesion: 0.11
Nodes (44): DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage() (+36 more)

### Community 1 - "Master Entity Config"
Cohesion: 0.10
Nodes (35): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+27 more)

### Community 2 - "Dashboard & Biodata"
Cohesion: 0.08
Nodes (44): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+36 more)

### Community 3 - "Golongan / Grade / Jabatan"
Cohesion: 0.08
Nodes (38): MasterEntityName, MasterEntityTypes, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery (+30 more)

### Community 4 - "Riwayat Kepegawaian"
Cohesion: 0.06
Nodes (42): LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse (+34 more)

### Community 5 - "Sidebar UI"
Cohesion: 0.08
Nodes (33): Separator(), SheetDescription(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup() (+25 more)

### Community 6 - "FK Combobox & Dialogs"
Cohesion: 0.11
Nodes (26): FKComboboxFilterProps, FKComboboxProps, Button(), buttonVariants, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+18 more)

### Community 7 - "Dasar Gaji & Profile"
Cohesion: 0.08
Nodes (29): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, SingleResultDasarGajiResponse, SingleResultPageDasarGajiResponse, GajiPendapatanNonPajakPostRequest (+21 more)

### Community 8 - "Batch Gaji"
Cohesion: 0.07
Nodes (30): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+22 more)

### Community 9 - "Data Pegawai & Terminasi"
Cohesion: 0.11
Nodes (22): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat(), biodataColumns, DataPegawaiClient() (+14 more)

### Community 10 - "Pegawai Response Types"
Cohesion: 0.08
Nodes (28): JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiPatchGaji, PegawaiResponseDetail (+20 more)

### Community 11 - "Avatar & Table UI"
Cohesion: 0.13
Nodes (24): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+16 more)

### Community 12 - "Profesi Form"
Cohesion: 0.16
Nodes (18): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, CrudFormProps, FKCombobox(), Label() (+10 more)

### Community 13 - "Cuti Jenis & Profile Update"
Cohesion: 0.10
Nodes (20): PageParams, PageView, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse (+12 more)

### Community 14 - "Shared Search Params"
Cohesion: 0.10
Nodes (21): ApprovalSearchParams, KepegawaianSearchParams, SingleResultObject, HariLiburSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse (+13 more)

### Community 15 - "Badge & Sanksi Manager"
Cohesion: 0.13
Nodes (18): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, CrudForm(), SanksiManager(), SanksiManagerProps, SanksiRow (+10 more)

### Community 16 - "User Menu & Logout"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 17 - "Tambah Pegawai & Edit Gaji"
Cohesion: 0.16
Nodes (16): FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), EnumOption, ENUMS (+8 more)

### Community 18 - "Cuti Approval & Kuota"
Cohesion: 0.13
Nodes (18): CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest (+10 more)

### Community 19 - "Cuti Pengajuan"
Cohesion: 0.15
Nodes (18): CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest, CutiPengajuanResponse, KlaimCuti, PageCutiApprovalChainResponse (+10 more)

### Community 20 - "Auth Proxy & Session"
Cohesion: 0.24
Nodes (13): ADR-0001, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions() (+5 more)

### Community 21 - "Login & Toolbar Filter"
Cohesion: 0.15
Nodes (11): Data, LoginForm(), schema, DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter() (+3 more)

### Community 22 - "Data Pegawai Toolbar"
Cohesion: 0.16
Nodes (14): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), POPOVER_FILTERS, STATUS_OPTIONS, statusKerjaLabel(), statusPegawaiLabel() (+6 more)

### Community 23 - "Profil & Change Password"
Cohesion: 0.18
Nodes (12): ChangePasswordForm(), Data, schema, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+4 more)

### Community 24 - "Confirm Delete Dialog"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 25 - "Edit Profil Sheet"
Cohesion: 0.23
Nodes (8): PopoverFilterContent(), FormValues, Props, schema, SheetEditProfil(), toDefaults(), useFkOptions(), api

### Community 26 - "Profesi Types"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 27 - "Shared Enum Types"
Cohesion: 0.27
Nodes (8): RiwayatSpQuery, EnumOption, HttpStatusText, JenisSpMiniResponse, KodePajak, ListResultEnumOption, Profesi, SanksiMiniResponse

### Community 28 - "Sanksi Types"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 29 - "Status Pegawai & Parameter"
Cohesion: 0.15
Nodes (11): ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse (+3 more)

### Community 30 - "Detail Dasar Gaji"
Cohesion: 0.17
Nodes (12): DasarGaji, DetailDasarGaji, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+4 more)

### Community 31 - "Entity Form Modal / Sheet"
Cohesion: 0.23
Nodes (7): EntityFormModal(), Sheet(), SheetContent(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 32 - "Sanksi Form"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 33 - "Jenis SP Types"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 34 - "Organisasi Types"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 35 - "Jabatan Types"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 36 - "Tunjangan"
Cohesion: 0.20
Nodes (9): GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse (+1 more)

### Community 37 - "Keahlian"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 38 - "Root Layout & Providers"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 39 - "Lampiran Types"
Cohesion: 0.25
Nodes (8): LampiranProfilAcceptRequest, ListResultLampiranSkQuery, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PelatihanLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 40 - "Alasan Berhenti"
Cohesion: 0.22
Nodes (8): AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery

### Community 41 - "Jenis Kitas"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 42 - "Jenis Pelatihan"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 43 - "Rumah Dinas"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 44 - "PHDP"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 45 - "Pelatihan"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail, ListResultLampiranProfilQuery

### Community 46 - "Pengalaman Kerja"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 47 - "Kartu Identitas"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, LampiranProfilQuery

### Community 48 - "Pendidikan"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, SingleResultLampiranProfilQuery

### Community 49 - "Data Table"
Cohesion: 0.38
Nodes (4): cellContent(), DataTable(), DataTableProps, Skeleton()

### Community 50 - "Profil Detail"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

## Knowledge Gaps
- **326 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+321 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Avatar & Table UI` to `Pages & Routing`, `Sanksi Form`, `Dashboard & Biodata`, `Sidebar UI`, `FK Combobox & Dialogs`, `Profesi Form`, `Badge & Sanksi Manager`, `User Menu & Logout`, `Data Table`, `Login & Toolbar Filter`, `Data Pegawai Toolbar`, `Profil & Change Password`, `Confirm Delete Dialog`, `Entity Form Modal / Sheet`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **Why does `Page` connect `Cuti Jenis & Profile Update` to `Master Entity Config`, `Dashboard & Biodata`, `Golongan / Grade / Jabatan`, `Riwayat Kepegawaian`, `Dasar Gaji & Profile`, `Batch Gaji`, `Pegawai Response Types`, `Shared Search Params`, `Cuti Approval & Kuota`, `Cuti Pengajuan`, `Profesi Types`, `Shared Enum Types`, `Sanksi Types`, `Status Pegawai & Parameter`, `Detail Dasar Gaji`, `Jenis SP Types`, `Organisasi Types`, `Jabatan Types`, `Tunjangan`, `Keahlian`, `Alasan Berhenti`, `Jenis Kitas`, `Jenis Pelatihan`, `Rumah Dinas`, `PHDP`, `Pelatihan`, `Pengalaman Kerja`, `Kartu Identitas`, `Pendidikan`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Shared Search Params` to `Dashboard & Biodata`, `Golongan / Grade / Jabatan`, `Riwayat Kepegawaian`, `Dasar Gaji & Profile`, `Batch Gaji`, `Pegawai Response Types`, `Cuti Jenis & Profile Update`, `Cuti Approval & Kuota`, `Cuti Pengajuan`, `Profesi Types`, `Shared Enum Types`, `Sanksi Types`, `Status Pegawai & Parameter`, `Detail Dasar Gaji`, `Jenis SP Types`, `Organisasi Types`, `Jabatan Types`, `Tunjangan`, `Keahlian`, `Alasan Berhenti`, `Jenis Kitas`, `Jenis Pelatihan`, `Rumah Dinas`, `PHDP`, `Pelatihan`, `Pengalaman Kerja`, `Kartu Identitas`, `Pendidikan`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _326 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.10882882882882883 - nodes in this community are weakly interconnected._
- **Should `Master Entity Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10437710437710437 - nodes in this community are weakly interconnected._
- **Should `Dashboard & Biodata` be split into smaller, more focused modules?**
  _Cohesion score 0.08272859216255443 - nodes in this community are weakly interconnected._