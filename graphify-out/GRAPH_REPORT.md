# Graph Report - .  (2026-08-14)

## Corpus Check
- 253 files · ~99,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1480 nodes · 4110 edges · 82 communities (81 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.52)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
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
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78

## God Nodes (most connected - your core abstractions)
1. `cn()` - 174 edges
2. `PageQuery` - 87 edges
3. `forbidden()` - 66 edges
4. `can()` - 60 edges
5. `hasPermission()` - 55 edges
6. `Page` - 50 edges
7. `Envelope` - 49 edges
8. `MasterEntityTypes` - 45 edges
9. `verifySession` - 45 edges
10. `getRoles()` - 44 edges

## Surprising Connections (you probably didn't know these)
- `Can()` --calls--> `can()`  [EXTRACTED]
  src/components/can.tsx → src/lib/auth/can.ts
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

## Communities (82 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (59): Field(), SectionLeftPanel(), fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel() (+51 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (56): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+48 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (34): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (37): t(), CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FormValues (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (40): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, CURRENT_YEAR, FormValues, KeahlianFormSheet() (+32 more)

### Community 5 - "Community 5"
Cohesion: 0.19
Nodes (26): AlasanBerhentiPage(), EntityFormModal(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+18 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (41): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse (+33 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (36): SingleResultString, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse (+28 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (28): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, PELATIHAN_COLUMNS, PelatihanPage(), val() (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (27): KARTU_COLUMNS, KartuIdentitasPage(), val(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), BadgeItem (+19 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (32): Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+24 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (32): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+24 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (26): DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter(), FKComboboxFilterProps, FKComboboxProps, LampiranUploadModalProps (+18 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (24): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, Data, LoginForm(), schema (+16 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (22): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (26): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+18 more)

### Community 16 - "Community 16"
Cohesion: 0.26
Nodes (16): DataPegawaiPage(), KeluargaPage(), PendukungPage(), PengalamanKerjaPage(), CutiPage(), RiwayatPage(), SkPage(), TambahPegawaiPage() (+8 more)

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (23): JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseDetail, PegawaiResponseMutasiContext, PegawaiResponseSession (+15 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (23): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.19
Nodes (16): ADR-0001, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions() (+8 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (19): RolesClient(), useAllPermissions(), useAllRoles(), makeColumns(), useAllRoles(), UsersClient(), PrefRole, ListResultPrefPermission (+11 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (13): FormValues, Props, schema, SheetEditProfil(), MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson() (+5 more)

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (10): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS, PAGE_TITLES, Rail() (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (13): FormValues, Props, schema, SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson() (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (15): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, flattenForDiff(), resolveValue(), STATUS_LABEL, PageProfileUpdateQuery (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (12): ChangePasswordForm(), Data, schema, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.17
Nodes (11): FormValues, normalizeFk(), Props, schema, SkFormSheet(), fillRequiredFields(), mockFetch(), okJson() (+3 more)

### Community 28 - "Community 28"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (15): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.21
Nodes (11): AppLayout(), AppShell(), MODULE_ENTITY_MAP, MODULES, Entity, MASTER_ENTITIES, entityGate(), entityHref() (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.19
Nodes (14): MasterEntityTypes, GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 33 - "Community 33"
Cohesion: 0.24
Nodes (8): EnumOption, HttpStatusText, HubunganKeluarga, ListResultEnumOption, PrefPermission, Profesi, StatusPendidikanKeluarga, TingkatKemampuan

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.15
Nodes (13): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+5 more)

### Community 36 - "Community 36"
Cohesion: 0.21
Nodes (8): CrudForm(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (10): MasterEntityName, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+2 more)

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (9): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranCard(), LampiranCardProps, LampiranItem, PdfViewer (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.21
Nodes (11): PegawaiListResponse, PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.31
Nodes (8): MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val(), formatDate(), rupiah()

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (10): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, PengalamanKerjaPostRequest (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (10): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest, RiwayatTerminasiPostRequest (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 45 - "Community 45"
Cohesion: 0.24
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 47 - "Community 47"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 48 - "Community 48"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (9): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery (+1 more)

### Community 50 - "Community 50"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianSearchParams, PageKeahlianQuery, TingkatKemampuan, KeahlianLampiranPostRequest, KeahlianPostRequest (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 52 - "Community 52"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 53 - "Community 53"
Cohesion: 0.25
Nodes (8): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, HariLiburSearchParams, PegawaiSearchParams, KomponenSearchParams, BiodataSearchParams, PageQuery

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (8): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (8): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, PageableObject

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (8): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, ListResultLampiranProfilQuery

### Community 63 - "Community 63"
Cohesion: 0.22
Nodes (8): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, StatusPendidikanKeluarga, LampiranProfilQuery, ProfilKeluargaLampiranPostRequest, ProfilKeluargaPostRequest, ProfilKeluargaPutRequest

### Community 64 - "Community 64"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest, PelatihanSearchParams, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest

### Community 65 - "Community 65"
Cohesion: 0.22
Nodes (8): PagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, PendidikanLampiranPostRequest, PendidikanPostRequest, PendidikanPutRequest, SingleResultLampiranProfilQuery

### Community 66 - "Community 66"
Cohesion: 0.29
Nodes (6): KEAHLIAN_COLUMNS, KeahlianPage(), TINGKAT_LABEL, val(), KeahlianQuery, PageResultPageKeahlianQuery

### Community 67 - "Community 67"
Cohesion: 0.32
Nodes (5): KONTRAK_COLUMNS, KontrakPage(), val(), DataTablePagination(), DataTablePaginationProps

### Community 68 - "Community 68"
Cohesion: 0.29
Nodes (5): rp(), SK_COLUMNS, val(), cellContent(), DataTable()

### Community 69 - "Community 69"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 70 - "Community 70"
Cohesion: 0.25
Nodes (7): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 71 - "Community 71"
Cohesion: 0.25
Nodes (7): GajiKomponenMiniProjection, ListResultGajiKomponenMiniProjection, PageGajiKomponenResponse, PageResultPageGajiKomponenResponse, SingleResultGajiKomponenResponse, PageEnvelope, SingleResultInteger

### Community 72 - "Community 72"
Cohesion: 0.25
Nodes (7): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse

### Community 73 - "Community 73"
Cohesion: 0.25
Nodes (7): SortObject, PagePrefRole, PageResultPagePrefRole, PrefRoleStoreRequest, PrefRoleUpdateRequest, RolesSearchParams, SingleResultPrefRole

### Community 74 - "Community 74"
Cohesion: 0.38
Nodes (3): DataTableProps, Skeleton(), RFC-7807

### Community 75 - "Community 75"
Cohesion: 0.29
Nodes (7): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, PengalamanLampiranPostRequest, JenisProfilUpdate

### Community 76 - "Community 76"
Cohesion: 0.29
Nodes (7): RiwayatSpQuery, RiwayatTerminasiQuery, OrganisasiQuery, LampiranSkQuery, OrganisasiMiniResponse, PegawaiResponse, SanksiMiniResponse

### Community 77 - "Community 77"
Cohesion: 0.33
Nodes (6): RiwayatMutasiQuery, RiwayatSkQuery, RiwayatSkResponse, GajiTunjanganResponse, GolonganResponse, ProfesiMiniResponse

## Knowledge Gaps
- **430 isolated node(s):** `PREVIEW`, `Row`, `FILTER_PARAMS`, `pegawaiColumns`, `biodataColumns` (+425 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 11` to `Community 0`, `Community 1`, `Community 3`, `Community 9`, `Community 10`, `Community 12`, `Community 13`, `Community 22`, `Community 23`, `Community 26`, `Community 27`, `Community 28`, `Community 30`, `Community 36`, `Community 39`, `Community 45`, `Community 52`, `Community 68`, `Community 74`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 53` to `Community 1`, `Community 4`, `Community 6`, `Community 7`, `Community 15`, `Community 17`, `Community 18`, `Community 20`, `Community 25`, `Community 29`, `Community 31`, `Community 33`, `Community 34`, `Community 35`, `Community 37`, `Community 40`, `Community 42`, `Community 44`, `Community 48`, `Community 49`, `Community 50`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 70`, `Community 71`, `Community 72`, `Community 73`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 37` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 6`, `Community 7`, `Community 15`, `Community 17`, `Community 18`, `Community 20`, `Community 25`, `Community 29`, `Community 31`, `Community 33`, `Community 34`, `Community 35`, `Community 40`, `Community 42`, `Community 44`, `Community 48`, `Community 49`, `Community 50`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 70`, `Community 71`, `Community 72`, `Community 73`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `FILTER_PARAMS` to the rest of the system?**
  _430 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.060041407867494824 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1069182389937107 - nodes in this community are weakly interconnected._