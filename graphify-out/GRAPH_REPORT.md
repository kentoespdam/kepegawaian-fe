# Graph Report - .  (2026-08-12)

## Corpus Check
- 6 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1287 nodes · 3444 edges · 69 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.53)
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 174 edges
2. `PageQuery` - 81 edges
3. `can()` - 48 edges
4. `Page` - 47 edges
5. `MasterEntityTypes` - 45 edges
6. `verifySession` - 45 edges
7. `getRoles()` - 44 edges
8. `Envelope` - 43 edges
9. `PageEnvelope` - 40 edges
10. `SortObject` - 40 edges

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

## Communities (69 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (54): Field(), SectionLeftPanel(), fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel() (+46 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (38): DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage() (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (42): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FormValues, KontrakFormSheet() (+34 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (34): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (44): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (32): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, Data, LoginForm(), schema (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (43): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery (+35 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (40): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse (+32 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (30): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+22 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (25): FormValues, Props, schema, SheetEditProfil(), toDefaults(), EnumOption, ENUMS, FieldSelect() (+17 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (23): FormValues, Props, schema, RFC-7807, EntityFormModal(), BadgeItem, BadgeManager(), BadgeManagerProps (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (26): Separator(), SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent() (+18 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (26): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+18 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (21): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+13 more)

### Community 15 - "Community 15"
Cohesion: 0.18
Nodes (26): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest, BiodataPostRequest (+18 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (19): DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter(), FKComboboxFilterProps, FKComboboxProps, Button() (+11 more)

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (23): PegawaiSession, AppwriteUser, GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest (+15 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (20): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.10
Nodes (20): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+12 more)

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (18): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, PageResultPageDasarGajiResponse, SingleResultDasarGajiResponse (+10 more)

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (18): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatMutasiQuery (+10 more)

### Community 23 - "Community 23"
Cohesion: 0.24
Nodes (13): ADR-0001, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions() (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.20
Nodes (13): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, columns, TABS, TerminasiClient() (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (15): JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams, ListResultLevelResponse (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (10): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+2 more)

### Community 27 - "Community 27"
Cohesion: 0.19
Nodes (13): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+5 more)

### Community 28 - "Community 28"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (15): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.20
Nodes (9): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), KONTRAK_COLUMNS, KontrakPage(), val(), DataTablePagination(), DataTablePaginationProps (+1 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 32 - "Community 32"
Cohesion: 0.24
Nodes (10): MutasiLampiranCard(), Props, MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val() (+2 more)

### Community 33 - "Community 33"
Cohesion: 0.17
Nodes (12): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+4 more)

### Community 34 - "Community 34"
Cohesion: 0.21
Nodes (9): PENGALAMAN_KOLOM, PengalamanKerjaPage(), val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props (+1 more)

### Community 35 - "Community 35"
Cohesion: 0.17
Nodes (11): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 37 - "Community 37"
Cohesion: 0.33
Nodes (6): EnumOption, Grade, HttpStatusText, ListResultEnumOption, Organisasi, Profesi

### Community 38 - "Community 38"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.27
Nodes (8): t(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), SpFormSheet()

### Community 40 - "Community 40"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 41 - "Community 41"
Cohesion: 0.27
Nodes (6): Props, SkLampiranCard(), rp(), SK_COLUMNS, SkPage(), val()

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 43 - "Community 43"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 44 - "Community 44"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 47 - "Community 47"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 50 - "Community 50"
Cohesion: 0.25
Nodes (7): JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery, SingleResultJabatanQuery

### Community 51 - "Community 51"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (7): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery

### Community 53 - "Community 53"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 54 - "Community 54"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, SingleResultLampiranProfilQuery

### Community 55 - "Community 55"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery

### Community 56 - "Community 56"
Cohesion: 0.29
Nodes (6): Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle(), PopoverTrigger()

### Community 57 - "Community 57"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 58 - "Community 58"
Cohesion: 0.33
Nodes (6): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 59 - "Community 59"
Cohesion: 0.33
Nodes (5): GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (5): HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 61 - "Community 61"
Cohesion: 0.33
Nodes (5): JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

### Community 63 - "Community 63"
Cohesion: 0.50
Nodes (3): cellContent(), DataTable(), DataTableProps

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (5): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, StatusKepegawaian

## Knowledge Gaps
- **396 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+391 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 13` to `Community 0`, `Community 2`, `Community 36`, `Community 5`, `Community 40`, `Community 9`, `Community 10`, `Community 43`, `Community 12`, `Community 14`, `Community 16`, `Community 19`, `Community 56`, `Community 26`, `Community 27`, `Community 28`, `Community 63`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 24` to `Community 0`, `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 11`, `Community 15`, `Community 17`, `Community 18`, `Community 20`, `Community 21`, `Community 22`, `Community 25`, `Community 29`, `Community 33`, `Community 35`, `Community 37`, `Community 38`, `Community 42`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 59`, `Community 60`, `Community 61`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 18` to `Community 4`, `Community 7`, `Community 11`, `Community 15`, `Community 17`, `Community 20`, `Community 21`, `Community 22`, `Community 25`, `Community 29`, `Community 33`, `Community 35`, `Community 37`, `Community 38`, `Community 42`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 59`, `Community 60`, `Community 61`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _396 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05359937402190924 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.131002331002331 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0647307924984876 - nodes in this community are weakly interconnected._