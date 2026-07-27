# Graph Report - .  (2026-07-27)

## Corpus Check
- 0 files · ~99,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1031 nodes · 2824 edges · 49 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Pages & Routing
- Sidebar & Navigation
- Auth & Session
- UI Primitives
- Master Entity Config
- Pegawai Types
- Tambah Pegawai Form
- Data Pegawai Toolbar
- Edit Profil / Gaji Sheet
- Ringkasan Panel
- Sanksi & Badge Manager
- CRUD
- Paging
- FK Combobox
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48

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
- `Can()` --calls--> `can()`  [EXTRACTED]
  src/components/can.tsx → src/lib/auth/can.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AvatarImage()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts
- `AvatarBadge()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (49 total, 0 thin omitted)

### Community 0 - "Pages & Routing"
Cohesion: 0.08
Nodes (64): ADR-0008, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModalProps, GolonganPage() (+56 more)

### Community 1 - "Sidebar & Navigation"
Cohesion: 0.07
Nodes (37): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+29 more)

### Community 2 - "Auth & Session"
Cohesion: 0.07
Nodes (45): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+37 more)

### Community 3 - "UI Primitives"
Cohesion: 0.07
Nodes (39): AppShell(), MODULE_ENTITY_MAP, MODULES, SheetDescription(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+31 more)

### Community 4 - "Master Entity Config"
Cohesion: 0.06
Nodes (43): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse (+35 more)

### Community 5 - "Pegawai Types"
Cohesion: 0.10
Nodes (23): ChangePasswordForm(), Data, schema, Data, LoginForm(), schema, CrudFormProps, Button() (+15 more)

### Community 6 - "Tambah Pegawai Form"
Cohesion: 0.07
Nodes (30): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+22 more)

### Community 7 - "Data Pegawai Toolbar"
Cohesion: 0.14
Nodes (21): ADR-0001, Can(), appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames() (+13 more)

### Community 8 - "Edit Profil / Gaji Sheet"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 9 - "Ringkasan Panel"
Cohesion: 0.13
Nodes (24): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), Popover() (+16 more)

### Community 10 - "Sanksi & Badge Manager"
Cohesion: 0.12
Nodes (26): CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest (+18 more)

### Community 11 - "CRUD"
Cohesion: 0.13
Nodes (18): EntityFormModal(), SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField (+10 more)

### Community 12 - "Paging"
Cohesion: 0.10
Nodes (19): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, ConfirmDeleteDialog(), CrudForm(), Badge(), badgeVariants (+11 more)

### Community 13 - "FK Combobox"
Cohesion: 0.19
Nodes (25): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, GajiBatchMasterResponse, BiodataDetail, BiodataPatchRequest, BiodataPostRequest (+17 more)

### Community 14 - "Community 14"
Cohesion: 0.13
Nodes (20): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+12 more)

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (19): PageParams, PageView, GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams (+11 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (21): ApprovalSearchParams, KepegawaianSearchParams, SingleResultObject, JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+13 more)

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (17): FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), EnumOption, ENUMS (+9 more)

### Community 18 - "Community 18"
Cohesion: 0.16
Nodes (17): DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter(), FKComboboxFilterProps, FKComboboxProps, Command() (+9 more)

### Community 19 - "Community 19"
Cohesion: 0.10
Nodes (20): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, SingleResultDasarGajiResponse, SingleResultPageDasarGajiResponse, DasarGaji (+12 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (17): JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelPostRequest (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (18): JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseDetail, PegawaiResponseSession (+10 more)

### Community 22 - "Community 22"
Cohesion: 0.11
Nodes (16): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, GajiTunjanganPostRequest (+8 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (9): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FieldText(), FieldTextarea(), FullSanksiPayload (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (15): RiwayatSkQuery, GradeResponse, PegawaiPatchGaji, RiwayatSkResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.21
Nodes (11): ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.23
Nodes (9): Biodata, EnumOption, Golongan, HttpStatusText, Jabatan, KodePajak, ListResultEnumOption, Organisasi (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 28 - "Community 28"
Cohesion: 0.19
Nodes (7): cellContent(), DataTable(), DataTableProps, MasterSwitch(), MasterSwitchProps, Separator(), Skeleton()

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 30 - "Community 30"
Cohesion: 0.17
Nodes (11): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 32 - "Community 32"
Cohesion: 0.20
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.20
Nodes (9): GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 35 - "Community 35"
Cohesion: 0.20
Nodes (9): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 38 - "Community 38"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (8): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 43 - "Community 43"
Cohesion: 0.39
Nodes (6): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKCombobox()

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 45 - "Community 45"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, SingleResultLampiranProfilQuery

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery

### Community 47 - "Community 47"
Cohesion: 0.33
Nodes (6): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

## Knowledge Gaps
- **326 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+321 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Ringkasan Panel` to `Sidebar & Navigation`, `UI Primitives`, `Pegawai Types`, `Community 37`, `Edit Profil / Gaji Sheet`, `Community 43`, `Paging`, `CRUD`, `Community 14`, `Community 18`, `Community 25`, `Community 28`?**
  _High betweenness centrality (0.243) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 15` to `Pages & Routing`, `Auth & Session`, `Master Entity Config`, `Tambah Pegawai Form`, `Sanksi & Badge Manager`, `FK Combobox`, `Community 16`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 24`, `Community 26`, `Community 27`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 44`, `Community 45`, `Community 46`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 16` to `Auth & Session`, `Master Entity Config`, `Tambah Pegawai Form`, `Sanksi & Badge Manager`, `FK Combobox`, `Community 15`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 24`, `Community 26`, `Community 27`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 44`, `Community 45`, `Community 46`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _326 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.07529536236995239 - nodes in this community are weakly interconnected._
- **Should `Sidebar & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.06711915535444947 - nodes in this community are weakly interconnected._
- **Should `Auth & Session` be split into smaller, more focused modules?**
  _Cohesion score 0.06509803921568627 - nodes in this community are weakly interconnected._