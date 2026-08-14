# Graph Report - .  (2026-08-14)

## Corpus Check
- 238 files · ~81,788 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1445 nodes · 3889 edges · 70 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.52)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Data Pegawai Pages
- Dashboard Panels
- Cuti API Types
- Master Entity Configs
- UI Primitives
- Sidebar & Sheet UI
- Riwayat SK Types
- Mutasi Form
- Pegawai Types
- Roles & Users Admin
- Gaji Komponen Types
- Dashboard Biodata
- Edit Gaji Form
- Badge & Sanksi Managers
- Biodata Types
- Keahlian Form
- Cuti API Types
- Level & Dasar Gaji Types
- Gaji Komponen Types
- Pengalaman Kerja Page
- DataTable Toolbar & FK
- Gaji Batch Types
- Pelatihan Types
- Pendidikan & Kontrak Pages
- Dropdown & Avatar UI
- SP & Lampiran Forms
- Sanksi Form
- Pendidikan Form & Auth
- Edit Gaji Form
- Enum Option Types
- Data Pegawai Pages
- Master Kepegawaian Types
- Keluarga Types
- Pendidikan Types
- Data Pegawai Clients
- Confirm Delete Dialog
- Appwrite Session
- Gaji Profil Types
- Kartu Identitas Form
- Profesi Form
- PDF Viewer
- Profesi Types
- SK Page & Riwayat
- Data Pegawai Toolbar
- Sanksi Types
- SP & Lampiran Forms
- Pendukung Layout
- Cuti Page
- Mutasi Page
- Login Form
- Cuti Kuota Types
- Jenis SP Types
- Cuti Page Tests
- Riwayat Layout
- Gaji Komponen Types
- App Providers
- Alasan Berhenti Types
- Hari Libur Types
- Jenis Kitas Types
- Jenis Pelatihan Types
- Rumah Dinas Types
- Master Kepegawaian Types
- SK Form
- SP Page
- SK Page Tests

## God Nodes (most connected - your core abstractions)
1. `cn()` - 174 edges
2. `PageQuery` - 87 edges
3. `can()` - 60 edges
4. `forbidden()` - 56 edges
5. `Page` - 50 edges
6. `Envelope` - 49 edges
7. `MasterEntityTypes` - 45 edges
8. `verifySession` - 45 edges
9. `getRoles()` - 44 edges
10. `SortObject` - 43 edges

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

## Communities (70 total, 0 thin omitted)

### Community 0 - "Data Pegawai Pages"
Cohesion: 0.08
Nodes (59): ADR-0001, DataPegawaiPage(), KARTU_COLUMNS, KartuIdentitasPage(), val(), KeahlianPage(), KeluargaPage(), PelatihanPage() (+51 more)

### Community 1 - "Dashboard Panels"
Cohesion: 0.06
Nodes (50): Field(), SectionLeftPanel(), fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel() (+42 more)

### Community 2 - "Cuti API Types"
Cohesion: 0.06
Nodes (48): MasterEntityName, MasterEntityTypes, GolonganListResponse, GolonganPostRequest, GolonganQuery, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+40 more)

### Community 3 - "Master Entity Configs"
Cohesion: 0.11
Nodes (33): ADR-0008, EntityFormModalProps, FormField, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib (+25 more)

### Community 4 - "UI Primitives"
Cohesion: 0.08
Nodes (42): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+34 more)

### Community 5 - "Sidebar & Sheet UI"
Cohesion: 0.08
Nodes (37): AppShell(), MODULE_ENTITY_MAP, MODULES, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+29 more)

### Community 6 - "Riwayat SK Types"
Cohesion: 0.06
Nodes (42): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse (+34 more)

### Community 7 - "Mutasi Form"
Cohesion: 0.09
Nodes (27): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues, JENIS_SK_BY_MUTASI (+19 more)

### Community 8 - "Pegawai Types"
Cohesion: 0.09
Nodes (33): RiwayatMutasiQuery, RiwayatSkQuery, GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest (+25 more)

### Community 9 - "Roles & Users Admin"
Cohesion: 0.10
Nodes (27): RolesClient(), useAllPermissions(), useAllRoles(), makeColumns(), useAllRoles(), UsersClient(), PrefPermission, PrefRole (+19 more)

### Community 10 - "Gaji Komponen Types"
Cohesion: 0.08
Nodes (28): CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse, GajiKomponenMiniProjection (+20 more)

### Community 11 - "Dashboard Biodata"
Cohesion: 0.12
Nodes (21): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+13 more)

### Community 12 - "Edit Gaji Form"
Cohesion: 0.14
Nodes (25): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+17 more)

### Community 13 - "Badge & Sanksi Managers"
Cohesion: 0.10
Nodes (20): SanksiManager(), SanksiManagerProps, SanksiRow, Badge(), badgeVariants, Sheet(), SheetContent(), SheetDescription() (+12 more)

### Community 14 - "Biodata Types"
Cohesion: 0.17
Nodes (27): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest (+19 more)

### Community 15 - "Keahlian Form"
Cohesion: 0.09
Nodes (23): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, KEAHLIAN_COLUMNS (+15 more)

### Community 16 - "Cuti API Types"
Cohesion: 0.10
Nodes (25): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisResponse, CutiKuotaResponse, CutiApprovalChainResponse (+17 more)

### Community 17 - "Level & Dasar Gaji Types"
Cohesion: 0.08
Nodes (24): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, PageResultPageDasarGajiResponse, SingleResultDasarGajiResponse (+16 more)

### Community 18 - "Gaji Komponen Types"
Cohesion: 0.09
Nodes (22): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, GolonganSearchParams, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse (+14 more)

### Community 19 - "Pengalaman Kerja Page"
Cohesion: 0.11
Nodes (20): PENGALAMAN_KOLOM, val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props, schema (+12 more)

### Community 20 - "DataTable Toolbar & FK"
Cohesion: 0.15
Nodes (20): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+12 more)

### Community 21 - "Gaji Batch Types"
Cohesion: 0.09
Nodes (23): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+15 more)

### Community 22 - "Pelatihan Types"
Cohesion: 0.12
Nodes (18): PELATIHAN_COLUMNS, val(), FormValues, normalizeFk(), PelatihanFormSheet(), Props, schema, PagePelatihanQuery (+10 more)

### Community 23 - "Pendidikan & Kontrak Pages"
Cohesion: 0.15
Nodes (14): PENDIDIKAN_COLUMNS, val(), KONTRAK_COLUMNS, KontrakPage(), val(), cellContent(), Column, DataTable() (+6 more)

### Community 24 - "Dropdown & Avatar UI"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 25 - "SP & Lampiran Forms"
Cohesion: 0.16
Nodes (14): EntityFormModal(), BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, CrudForm(), LampiranUploadModalProps, Dialog() (+6 more)

### Community 26 - "Sanksi Form"
Cohesion: 0.13
Nodes (15): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, DataTableToolbar() (+7 more)

### Community 27 - "Pendidikan Form & Auth"
Cohesion: 0.13
Nodes (15): t(), CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, SpFormSheet() (+7 more)

### Community 28 - "Edit Gaji Form"
Cohesion: 0.18
Nodes (14): FormValues, Props, schema, SheetEditProfil(), toDefaults(), EnumOption, ENUMS, FieldFk() (+6 more)

### Community 29 - "Enum Option Types"
Cohesion: 0.14
Nodes (14): ListResultStatusPegawaiResponse, StatusPegawaiResponse, Biodata, EnumOption, Golongan, Grade, HttpStatusText, HubunganKeluarga (+6 more)

### Community 30 - "Data Pegawai Pages"
Cohesion: 0.15
Nodes (16): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, flattenForDiff(), resolveValue(), STATUS_LABEL, useAuth() (+8 more)

### Community 31 - "Master Kepegawaian Types"
Cohesion: 0.11
Nodes (16): SingleResultString, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse (+8 more)

### Community 32 - "Keluarga Types"
Cohesion: 0.13
Nodes (16): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery (+8 more)

### Community 33 - "Pendidikan Types"
Cohesion: 0.12
Nodes (17): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PelatihanLampiranPostRequest, PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanLampiranPostRequest (+9 more)

### Community 34 - "Data Pegawai Clients"
Cohesion: 0.21
Nodes (12): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, columns, TABS, TerminasiClient() (+4 more)

### Community 35 - "Confirm Delete Dialog"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 36 - "Appwrite Session"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 37 - "Gaji Profil Types"
Cohesion: 0.14
Nodes (13): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse (+5 more)

### Community 38 - "Kartu Identitas Form"
Cohesion: 0.19
Nodes (12): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, KartuIdentitasDetail, KartuIdentitasPostRequest, KartuIdentitasPutRequest (+4 more)

### Community 39 - "Profesi Form"
Cohesion: 0.26
Nodes (7): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, useFkOptions(), api

### Community 40 - "PDF Viewer"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "Profesi Types"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 42 - "SK Page & Riwayat"
Cohesion: 0.28
Nodes (8): rp(), SK_COLUMNS, SkPage(), val(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisSk()

### Community 43 - "Data Pegawai Toolbar"
Cohesion: 0.21
Nodes (11): CrudFormProps, FKCombobox(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton() (+3 more)

### Community 44 - "Sanksi Types"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 45 - "SP & Lampiran Forms"
Cohesion: 0.20
Nodes (9): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranCard(), LampiranCardProps, LampiranItem, PdfViewer (+1 more)

### Community 46 - "Pendukung Layout"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 47 - "Cuti Page"
Cohesion: 0.22
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 48 - "Mutasi Page"
Cohesion: 0.31
Nodes (9): MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val(), JENIS_MUTASI_OPTIONS, labelJenisMutasi() (+1 more)

### Community 49 - "Login Form"
Cohesion: 0.27
Nodes (6): Data, LoginForm(), schema, Label(), loginRequest(), useLogin()

### Community 50 - "Cuti Kuota Types"
Cohesion: 0.18
Nodes (10): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse, SingleResultCutiKuotaPegawaiResponse (+2 more)

### Community 51 - "Jenis SP Types"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 52 - "Cuti Page Tests"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 53 - "Riwayat Layout"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 54 - "Gaji Komponen Types"
Cohesion: 0.20
Nodes (9): GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse (+1 more)

### Community 55 - "App Providers"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 56 - "Alasan Berhenti Types"
Cohesion: 0.22
Nodes (8): AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery

### Community 57 - "Hari Libur Types"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 58 - "Jenis Kitas Types"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 59 - "Jenis Pelatihan Types"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 60 - "Rumah Dinas Types"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 61 - "Master Kepegawaian Types"
Cohesion: 0.22
Nodes (8): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, Page

### Community 62 - "SK Form"
Cohesion: 0.32
Nodes (6): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions()

### Community 63 - "SP Page"
Cohesion: 0.36
Nodes (6): FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val()

### Community 64 - "SK Page Tests"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

## Knowledge Gaps
- **424 isolated node(s):** `PREVIEW`, `Row`, `FILTER_PARAMS`, `pegawaiColumns`, `biodataColumns` (+419 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Primitives` to `Dashboard Panels`, `Confirm Delete Dialog`, `Sidebar & Sheet UI`, `Mutasi Form`, `Data Pegawai Toolbar`, `Dashboard Biodata`, `Badge & Sanksi Managers`, `Pendukung Layout`, `Cuti Page`, `Login Form`, `DataTable Toolbar & FK`, `Riwayat Layout`, `Pendidikan & Kontrak Pages`, `Dropdown & Avatar UI`, `SP & Lampiran Forms`, `Sanksi Form`, `Edit Gaji Form`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `Page` connect `Master Kepegawaian Types` to `Dashboard Panels`, `Cuti API Types`, `Master Entity Configs`, `Riwayat SK Types`, `Pegawai Types`, `Roles & Users Admin`, `Gaji Komponen Types`, `Biodata Types`, `Keahlian Form`, `Cuti API Types`, `Level & Dasar Gaji Types`, `Gaji Komponen Types`, `Pengalaman Kerja Page`, `Gaji Batch Types`, `Pelatihan Types`, `Enum Option Types`, `Data Pegawai Pages`, `Master Kepegawaian Types`, `Keluarga Types`, `Pendidikan Types`, `Data Pegawai Clients`, `Gaji Profil Types`, `Kartu Identitas Form`, `Profesi Types`, `Sanksi Types`, `Cuti Kuota Types`, `Jenis SP Types`, `Gaji Komponen Types`, `Alasan Berhenti Types`, `Hari Libur Types`, `Jenis Kitas Types`, `Jenis Pelatihan Types`, `Rumah Dinas Types`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Gaji Komponen Types` to `Cuti API Types`, `Riwayat SK Types`, `Pegawai Types`, `Roles & Users Admin`, `Gaji Komponen Types`, `Biodata Types`, `Keahlian Form`, `Cuti API Types`, `Level & Dasar Gaji Types`, `Pengalaman Kerja Page`, `Gaji Batch Types`, `Pelatihan Types`, `Enum Option Types`, `Data Pegawai Pages`, `Master Kepegawaian Types`, `Keluarga Types`, `Pendidikan Types`, `Gaji Profil Types`, `Kartu Identitas Form`, `Profesi Types`, `Sanksi Types`, `Cuti Kuota Types`, `Jenis SP Types`, `Gaji Komponen Types`, `Alasan Berhenti Types`, `Hari Libur Types`, `Jenis Kitas Types`, `Jenis Pelatihan Types`, `Rumah Dinas Types`, `Master Kepegawaian Types`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `FILTER_PARAMS` to the rest of the system?**
  _424 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Data Pegawai Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07989690721649484 - nodes in this community are weakly interconnected._
- **Should `Dashboard Panels` be split into smaller, more focused modules?**
  _Cohesion score 0.06321334503950835 - nodes in this community are weakly interconnected._
- **Should `Cuti API Types` be split into smaller, more focused modules?**
  _Cohesion score 0.06289308176100629 - nodes in this community are weakly interconnected._