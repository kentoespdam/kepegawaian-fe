# Graph Report - .  (2026-07-27)

## Corpus Check
- 180 files · ~44,097 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1033 nodes · 2832 edges · 49 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Core Pages Layout
- Master Config Types
- Dashboard Biodata
- Toolbar Filter Edit
- Lampiran Riwayat Types
- Sidebar Shell
- Master Entity Types
- Avatar Breadcrumb UI
- Badge Dialog
- Filter Login
- Gaji Batch
- Profesi CRUD Form
- Pegawai Data Types
- Auth Session
- Modal Dialog
- Combobox Command
- Biodata Management
- Dropdown Menu
- Cuti Leave
- Search Params Gaji
- Jenjang Level
- Tunjangan
- Dasar Gaji
- Approval Workflow
- Paging Gaji Profil
- Sanksi Sanction
- Shared Enums
- Profesi APD
- Detail Dasar Gaji
- Switch Form
- Cuti Kuota
- Jenis SP
- Organisasi
- Data Table UI
- Jabatan
- Parameter Setting
- Keahlian
- Alasan Berhenti
- Golongan
- Hari Libur
- Rumah Dinas
- Pelatihan
- Pengalaman Kerja
- Change Password
- Kartu Identitas
- Keluarga
- Pendidikan
- Lampiran Request
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
- `CommandSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (49 total, 0 thin omitted)

### Community 0 - "Core Pages Layout"
Cohesion: 0.13
Nodes (38): DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModal(), GolonganPage(), GradePage() (+30 more)

### Community 1 - "Master Config Types"
Cohesion: 0.10
Nodes (35): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+27 more)

### Community 2 - "Dashboard Biodata"
Cohesion: 0.07
Nodes (38): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+30 more)

### Community 3 - "Toolbar Filter Edit"
Cohesion: 0.08
Nodes (37): DataPegawaiToolbar(), fkLabelMap(), labelMap(), PopoverFilterContent(), statusKerjaLabel(), statusPegawaiLabel(), FormValues, Props (+29 more)

### Community 4 - "Lampiran Riwayat Types"
Cohesion: 0.06
Nodes (42): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse (+34 more)

### Community 5 - "Sidebar Shell"
Cohesion: 0.08
Nodes (36): AppShell(), MODULE_ENTITY_MAP, MODULES, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+28 more)

### Community 6 - "Master Entity Types"
Cohesion: 0.08
Nodes (38): MasterEntityName, MasterEntityTypes, GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery (+30 more)

### Community 7 - "Avatar Breadcrumb UI"
Cohesion: 0.11
Nodes (31): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+23 more)

### Community 8 - "Badge Dialog"
Cohesion: 0.09
Nodes (27): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, ConfirmDeleteDialog(), ConfirmDeleteDialogProps, SanksiManager(), SanksiManagerProps (+19 more)

### Community 9 - "Filter Login"
Cohesion: 0.09
Nodes (23): DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, STATUS_OPTIONS, Data, LoginForm(), schema, DataTableToolbar() (+15 more)

### Community 10 - "Gaji Batch"
Cohesion: 0.07
Nodes (30): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+22 more)

### Community 11 - "Profesi CRUD Form"
Cohesion: 0.15
Nodes (19): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, CrudForm(), CrudFormProps, FKCombobox() (+11 more)

### Community 12 - "Pegawai Data Types"
Cohesion: 0.10
Nodes (24): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiPatchGaji (+16 more)

### Community 13 - "Auth Session"
Cohesion: 0.20
Nodes (17): ADR-0001, ADR-0010, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), resolveToken() (+9 more)

### Community 14 - "Modal Dialog"
Cohesion: 0.12
Nodes (14): Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle(), Sheet() (+6 more)

### Community 15 - "Combobox Command"
Cohesion: 0.16
Nodes (19): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+11 more)

### Community 16 - "Biodata Management"
Cohesion: 0.23
Nodes (22): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPatchRequest, BiodataPostRequest, BiodataPutRequest (+14 more)

### Community 17 - "Dropdown Menu"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 18 - "Cuti Leave"
Cohesion: 0.10
Nodes (20): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+12 more)

### Community 19 - "Search Params Gaji"
Cohesion: 0.10
Nodes (19): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, JenisKitasSearchParams, PegawaiSearchParams, GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse (+11 more)

### Community 20 - "Jenjang Level"
Cohesion: 0.11
Nodes (17): JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelPostRequest (+9 more)

### Community 21 - "Tunjangan"
Cohesion: 0.10
Nodes (18): GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse (+10 more)

### Community 22 - "Dasar Gaji"
Cohesion: 0.12
Nodes (16): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, SingleResultDasarGajiResponse, SingleResultPageDasarGajiResponse, GajiPendapatanNonPajakPostRequest (+8 more)

### Community 23 - "Approval Workflow"
Cohesion: 0.20
Nodes (15): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatMutasiQuery (+7 more)

### Community 24 - "Paging Gaji Profil"
Cohesion: 0.17
Nodes (11): PageParams, PageView, GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams (+3 more)

### Community 25 - "Sanksi Sanction"
Cohesion: 0.15
Nodes (14): RiwayatSpQuery, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+6 more)

### Community 26 - "Shared Enums"
Cohesion: 0.23
Nodes (9): Biodata, EnumOption, Grade, HttpStatusText, Jabatan, KodePajak, ListResultEnumOption, Organisasi (+1 more)

### Community 27 - "Profesi APD"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 28 - "Detail Dasar Gaji"
Cohesion: 0.17
Nodes (12): DasarGaji, DetailDasarGaji, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+4 more)

### Community 29 - "Switch Form"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 30 - "Cuti Kuota"
Cohesion: 0.17
Nodes (11): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+3 more)

### Community 31 - "Jenis SP"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 32 - "Organisasi"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 33 - "Data Table UI"
Cohesion: 0.27
Nodes (5): cellContent(), DataTable(), DataTableProps, Separator(), Skeleton()

### Community 34 - "Jabatan"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 35 - "Parameter Setting"
Cohesion: 0.20
Nodes (9): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse (+1 more)

### Community 36 - "Keahlian"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 37 - "Alasan Berhenti"
Cohesion: 0.22
Nodes (8): AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery

### Community 38 - "Golongan"
Cohesion: 0.22
Nodes (8): GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery

### Community 39 - "Hari Libur"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 40 - "Rumah Dinas"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 41 - "Pelatihan"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 42 - "Pengalaman Kerja"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 43 - "Change Password"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 44 - "Kartu Identitas"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 45 - "Keluarga"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, SingleResultLampiranProfilQuery

### Community 46 - "Pendidikan"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery

### Community 47 - "Lampiran Request"
Cohesion: 0.33
Nodes (6): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 48 - "Profil Detail"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

## Knowledge Gaps
- **327 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+322 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Avatar Breadcrumb UI` to `Data Table UI`, `Dashboard Biodata`, `Sidebar Shell`, `Badge Dialog`, `Filter Login`, `Profesi CRUD Form`, `Modal Dialog`, `Combobox Command`, `Dropdown Menu`, `Switch Form`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Search Params Gaji` to `Lampiran Riwayat Types`, `Master Entity Types`, `Gaji Batch`, `Pegawai Data Types`, `Biodata Management`, `Cuti Leave`, `Jenjang Level`, `Tunjangan`, `Dasar Gaji`, `Approval Workflow`, `Paging Gaji Profil`, `Sanksi Sanction`, `Shared Enums`, `Profesi APD`, `Detail Dasar Gaji`, `Cuti Kuota`, `Jenis SP`, `Organisasi`, `Jabatan`, `Parameter Setting`, `Keahlian`, `Alasan Berhenti`, `Golongan`, `Hari Libur`, `Rumah Dinas`, `Pelatihan`, `Pengalaman Kerja`, `Kartu Identitas`, `Keluarga`, `Pendidikan`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `Page` connect `Paging Gaji Profil` to `Master Config Types`, `Lampiran Riwayat Types`, `Master Entity Types`, `Gaji Batch`, `Pegawai Data Types`, `Biodata Management`, `Cuti Leave`, `Search Params Gaji`, `Jenjang Level`, `Tunjangan`, `Dasar Gaji`, `Approval Workflow`, `Sanksi Sanction`, `Shared Enums`, `Profesi APD`, `Detail Dasar Gaji`, `Cuti Kuota`, `Jenis SP`, `Organisasi`, `Jabatan`, `Parameter Setting`, `Keahlian`, `Alasan Berhenti`, `Golongan`, `Hari Libur`, `Rumah Dinas`, `Pelatihan`, `Pengalaman Kerja`, `Kartu Identitas`, `Keluarga`, `Pendidikan`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _327 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Pages Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.131002331002331 - nodes in this community are weakly interconnected._
- **Should `Master Config Types` be split into smaller, more focused modules?**
  _Cohesion score 0.10437710437710437 - nodes in this community are weakly interconnected._
- **Should `Dashboard Biodata` be split into smaller, more focused modules?**
  _Cohesion score 0.06531204644412192 - nodes in this community are weakly interconnected._