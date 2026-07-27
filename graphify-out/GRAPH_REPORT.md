# Graph Report - .  (2026-07-27)

## Corpus Check
- 180 files · ~43,733 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1026 nodes · 2803 edges · 48 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Auth & App Shell
- Master Entity Config
- Profil Sub-Types
- Sidebar & Navigation
- UI Primitives (cn, Avatar, Table)
- Data Pegawai & Terminasi
- Dashboard & Batch Gaji
- Biodata & Keluarga
- Toolbar & Form Inputs
- Master Entity Search Params
- Master Entity Definitions
- Riwayat Kepegawaian Types
- Pegawai Response Types
- FKCombobox & Command
- Dropdown Menu & User Menu
- Cuti Pengajuan & Approval
- Badge & Sanksi Manager
- Shared Page Query Types
- Jenis Kitas & Jenjang
- Dasar Gaji
- Edit Profil & Tambah Pegawai
- Cuti Kuota & Approval
- Change Password & Profil
- Confirm Delete & Alert Dialog
- Appwrite Auth Session
- Shared Enum Types
- Entity Form Modal & Sheet
- Profesi Types
- Profesi Form & API
- Lampiran & Riwayat SK
- Organisasi & Status Pegawai
- Grade Types
- Sanksi Types
- Edit Gaji Sheet
- Cuti Jenis
- Jabatan Types
- Sanksi Form
- Root Layout & Providers
- Login Form
- Input Group Component
- Parameter Setting Gaji
- PHDP Gaji
- Tunjangan Gaji
- Profile Update Types
- Jenis SP Types
- Gaji Profil
- Common Response Types
- Status Kepegawaian & Potongan

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
- `PopoverFilterContent()` --calls--> `useFkOptions()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/data-pegawai-toolbar.tsx → src/hooks/useFkOptions.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (48 total, 0 thin omitted)

### Community 0 - "Auth & App Shell"
Cohesion: 0.13
Nodes (40): ADR-0001, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage() (+32 more)

### Community 1 - "Master Entity Config"
Cohesion: 0.07
Nodes (39): EntityFormModalProps, FormField, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol (+31 more)

### Community 2 - "Profil Sub-Types"
Cohesion: 0.05
Nodes (50): KartuIdentitasDetail, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail (+42 more)

### Community 3 - "Sidebar & Navigation"
Cohesion: 0.08
Nodes (37): AppShell(), MODULE_ENTITY_MAP, MODULES, SheetDescription(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+29 more)

### Community 4 - "UI Primitives (cn, Avatar, Table)"
Cohesion: 0.09
Nodes (34): MasterSwitch(), MasterSwitchProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+26 more)

### Community 5 - "Data Pegawai & Terminasi"
Cohesion: 0.08
Nodes (29): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat(), biodataColumns, DataPegawaiClient() (+21 more)

### Community 6 - "Dashboard & Batch Gaji"
Cohesion: 0.07
Nodes (34): DashboardClient(), DashboardPage(), SectionCard(), formatRp(), labelStatus(), labelStatusKerja(), SectionDetail(), formatRp() (+26 more)

### Community 7 - "Biodata & Keluarga"
Cohesion: 0.11
Nodes (36): labelAgama(), labelJk(), labelKawin(), SectionBiodata(), BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest (+28 more)

### Community 8 - "Toolbar & Form Inputs"
Cohesion: 0.10
Nodes (28): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS, statusKerjaLabel() (+20 more)

### Community 9 - "Master Entity Search Params"
Cohesion: 0.08
Nodes (28): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery (+20 more)

### Community 10 - "Master Entity Definitions"
Cohesion: 0.12
Nodes (31): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery (+23 more)

### Community 11 - "Riwayat Kepegawaian Types"
Cohesion: 0.07
Nodes (29): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+21 more)

### Community 12 - "Pegawai Response Types"
Cohesion: 0.09
Nodes (25): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseDetail (+17 more)

### Community 13 - "FKCombobox & Command"
Cohesion: 0.15
Nodes (16): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+8 more)

### Community 14 - "Dropdown Menu & User Menu"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 15 - "Cuti Pengajuan & Approval"
Cohesion: 0.13
Nodes (21): CutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest, CutiPengajuanResponse, KlaimCuti (+13 more)

### Community 16 - "Badge & Sanksi Manager"
Cohesion: 0.16
Nodes (15): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, SanksiManager(), SanksiManagerProps, SanksiRow, Badge() (+7 more)

### Community 17 - "Shared Page Query Types"
Cohesion: 0.11
Nodes (18): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, GradeSearchParams, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery (+10 more)

### Community 18 - "Jenis Kitas & Jenjang"
Cohesion: 0.10
Nodes (18): JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse (+10 more)

### Community 19 - "Dasar Gaji"
Cohesion: 0.10
Nodes (19): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, SingleResultDasarGajiResponse, SingleResultPageDasarGajiResponse, DasarGaji (+11 more)

### Community 20 - "Edit Profil & Tambah Pegawai"
Cohesion: 0.17
Nodes (15): FormValues, Props, schema, SheetEditProfil(), toDefaults(), EnumOption, ENUMS, FieldFk() (+7 more)

### Community 21 - "Cuti Kuota & Approval"
Cohesion: 0.12
Nodes (17): ApprovalSearchParams, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest (+9 more)

### Community 22 - "Change Password & Profil"
Cohesion: 0.18
Nodes (12): ChangePasswordForm(), Data, schema, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+4 more)

### Community 23 - "Confirm Delete & Alert Dialog"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 24 - "Appwrite Auth Session"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 25 - "Shared Enum Types"
Cohesion: 0.20
Nodes (10): GajiKomponenMiniProjection, KomponenSearchParams, ListResultGajiKomponenMiniProjection, PageGajiKomponenResponse, PageResultPageGajiKomponenResponse, SingleResultGajiKomponenResponse, EnumOption, HttpStatusText (+2 more)

### Community 26 - "Entity Form Modal & Sheet"
Cohesion: 0.17
Nodes (10): EntityFormModal(), CrudForm(), Dialog(), DialogTitle(), Sheet(), SheetContent(), SheetFooter(), SheetHeader() (+2 more)

### Community 27 - "Profesi Types"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 28 - "Profesi Form & API"
Cohesion: 0.28
Nodes (7): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, useFkOptions(), api

### Community 29 - "Lampiran & Riwayat SK"
Cohesion: 0.20
Nodes (11): LampiranProfilAcceptRequest, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest (+3 more)

### Community 30 - "Organisasi & Status Pegawai"
Cohesion: 0.17
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery, ListResultStatusPegawaiResponse (+2 more)

### Community 31 - "Grade Types"
Cohesion: 0.20
Nodes (10): GradeListResponse, GradePostRequest, GradeQuery, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery (+2 more)

### Community 32 - "Sanksi Types"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 33 - "Edit Gaji Sheet"
Cohesion: 0.29
Nodes (8): FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), usePajakOptions(), TambahPegawaiForm()

### Community 34 - "Cuti Jenis"
Cohesion: 0.22
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 35 - "Jabatan Types"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 36 - "Sanksi Form"
Cohesion: 0.36
Nodes (7): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField

### Community 37 - "Root Layout & Providers"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 38 - "Login Form"
Cohesion: 0.33
Nodes (5): Data, LoginForm(), schema, loginRequest(), useLogin()

### Community 39 - "Input Group Component"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 40 - "Parameter Setting Gaji"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 41 - "PHDP Gaji"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 42 - "Tunjangan Gaji"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 43 - "Profile Update Types"
Cohesion: 0.22
Nodes (8): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil

### Community 44 - "Jenis SP Types"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 45 - "Gaji Profil"
Cohesion: 0.25
Nodes (7): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse

### Community 46 - "Common Response Types"
Cohesion: 0.29
Nodes (7): RiwayatSkQuery, RiwayatTerminasiQuery, RiwayatSkResponse, GajiTunjanganResponse, GolonganResponse, LampiranSkQuery, PegawaiResponse

### Community 47 - "Status Kepegawaian & Potongan"
Cohesion: 0.40
Nodes (5): PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, StatusKepegawaian

## Knowledge Gaps
- **326 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+321 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Primitives (cn, Avatar, Table)` to `Sidebar & Navigation`, `Data Pegawai & Terminasi`, `Dashboard & Batch Gaji`, `Input Group Component`, `Toolbar & Form Inputs`, `FKCombobox & Command`, `Dropdown Menu & User Menu`, `Badge & Sanksi Manager`, `Edit Profil & Tambah Pegawai`, `Change Password & Profil`, `Confirm Delete & Alert Dialog`, `Entity Form Modal & Sheet`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **Why does `Page` connect `Data Pegawai & Terminasi` to `Auth & App Shell`, `Master Entity Config`, `Profil Sub-Types`, `Dashboard & Batch Gaji`, `Biodata & Keluarga`, `Master Entity Search Params`, `Master Entity Definitions`, `Riwayat Kepegawaian Types`, `Pegawai Response Types`, `Cuti Pengajuan & Approval`, `Shared Page Query Types`, `Jenis Kitas & Jenjang`, `Dasar Gaji`, `Cuti Kuota & Approval`, `Shared Enum Types`, `Profesi Types`, `Organisasi & Status Pegawai`, `Grade Types`, `Sanksi Types`, `Cuti Jenis`, `Jabatan Types`, `Parameter Setting Gaji`, `PHDP Gaji`, `Tunjangan Gaji`, `Profile Update Types`, `Jenis SP Types`, `Gaji Profil`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Shared Page Query Types` to `Master Entity Config`, `Profil Sub-Types`, `Dashboard & Batch Gaji`, `Biodata & Keluarga`, `Master Entity Search Params`, `Riwayat Kepegawaian Types`, `Pegawai Response Types`, `Cuti Pengajuan & Approval`, `Jenis Kitas & Jenjang`, `Dasar Gaji`, `Cuti Kuota & Approval`, `Shared Enum Types`, `Profesi Types`, `Organisasi & Status Pegawai`, `Grade Types`, `Sanksi Types`, `Cuti Jenis`, `Jabatan Types`, `Parameter Setting Gaji`, `PHDP Gaji`, `Tunjangan Gaji`, `Profile Update Types`, `Jenis SP Types`, `Gaji Profil`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _326 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth & App Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.12595573440643862 - nodes in this community are weakly interconnected._
- **Should `Master Entity Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07422559906487435 - nodes in this community are weakly interconnected._
- **Should `Profil Sub-Types` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._