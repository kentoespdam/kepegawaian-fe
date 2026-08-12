# Graph Report - .  (2026-08-12)

## Corpus Check
- 64 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1274 nodes · 3429 edges · 76 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.53)
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
- `CommandSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (76 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (40): ADR-0001, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage() (+32 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (34): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (43): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery (+35 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (35): Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (31): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (33): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (24): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, ConfirmDeleteDialog(), CrudForm(), SanksiManager(), SanksiManagerProps (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (31): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery (+23 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (22): FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), EnumOption, ENUMS (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (22): FKComboboxFilterProps, FKComboboxProps, Button(), buttonVariants, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+14 more)

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (17): FormValues, Props, schema, SpFormSheet(), RFC-7807, EntityFormModal(), LampiranCardProps, LampiranItem (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.19
Nodes (21): Field(), SectionLeftPanel(), RingkasanPanel(), biodataFormSchema, editFormFields, formatPendidikan(), labelAgama(), labelJk() (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.16
Nodes (18): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, CrudFormProps, FKCombobox(), Label() (+10 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (24): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPatchRequest, BiodataPostRequest, BiodataPutRequest (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (18): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), normalizeFk(), Props, schema, FieldDate(), FieldFk() (+10 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (22): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext (+14 more)

### Community 17 - "Community 17"
Cohesion: 0.16
Nodes (15): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (12): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FieldTextarea(), inter, metadata (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (15): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (17): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (19): CutiApprovalMiniResponse, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatMutasiQuery, JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanQuery (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (17): ApprovalSearchParams, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest (+9 more)

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (13): fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel(), SECTIONS, t() (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (11): Data, LoginForm(), schema, DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter() (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (15): JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams, ListResultLevelResponse (+7 more)

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (14): KepegawaianSearchParams, SingleResultObject, JenisKeahlianSearchParams, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery (+6 more)

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (16): GradeQuery, AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail (+8 more)

### Community 29 - "Community 29"
Cohesion: 0.18
Nodes (11): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, EnumOption (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 31 - "Community 31"
Cohesion: 0.13
Nodes (15): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+7 more)

### Community 32 - "Community 32"
Cohesion: 0.23
Nodes (12): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat(), DataPegawaiClient(), columns (+4 more)

### Community 33 - "Community 33"
Cohesion: 0.21
Nodes (11): ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.23
Nodes (11): MutasiLampiranCard(), Props, MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val() (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (10): PageParams, PageView, JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.15
Nodes (14): LampiranSkAcceptRequest, LampiranSkPostRequest, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest, RiwayatSkQuery, RiwayatTerminasiPostRequest (+6 more)

### Community 38 - "Community 38"
Cohesion: 0.27
Nodes (9): KONTRAK_COLUMNS, KontrakPage(), val(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi() (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.17
Nodes (11): CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanPostRequest, CutiPengajuanPutRequest, KlaimCuti, PageCutiApprovalChainResponse, PageCutiPengajuanResponse, PageResultPageCutiApprovalChainResponse (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (7): biodataColumns, FILTER_PARAMS, pegawaiColumns, TABS, Props, PegawaiResponseRingkasan, PegawaiTableResponse

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (8): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, apiErrorMessage(), RFC-7807

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 47 - "Community 47"
Cohesion: 0.27
Nodes (7): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox()

### Community 48 - "Community 48"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 49 - "Community 49"
Cohesion: 0.27
Nodes (6): Props, SkLampiranCard(), rp(), SK_COLUMNS, SkPage(), val()

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (9): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, PageResultPageDasarGajiResponse, SingleResultDasarGajiResponse (+1 more)

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail, SingleResultLampiranProfilQuery

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (8): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil

### Community 59 - "Community 59"
Cohesion: 0.32
Nodes (6): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions()

### Community 60 - "Community 60"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 61 - "Community 61"
Cohesion: 0.29
Nodes (7): LampiranProfilAcceptRequest, ListResultLampiranSkQuery, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, PelatihanLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 62 - "Community 62"
Cohesion: 0.25
Nodes (7): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (7): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, ProfilKeluargaLampiranPostRequest, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga

### Community 66 - "Community 66"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery

### Community 67 - "Community 67"
Cohesion: 0.43
Nodes (5): AppShell(), MODULE_ENTITY_MAP, MODULES, entityGate(), entityHref()

### Community 68 - "Community 68"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

### Community 70 - "Community 70"
Cohesion: 0.60
Nodes (4): extractErrorMessage(), patchBiodata(), RFC-7807, useBiodataMutation()

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (5): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, StatusKepegawaian

## Knowledge Gaps
- **390 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+385 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 4` to `Community 3`, `Community 6`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 15`, `Community 17`, `Community 19`, `Community 20`, `Community 21`, `Community 24`, `Community 25`, `Community 33`, `Community 39`, `Community 42`, `Community 43`, `Community 44`, `Community 47`, `Community 48`, `Community 67`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 36` to `Community 1`, `Community 2`, `Community 5`, `Community 7`, `Community 8`, `Community 14`, `Community 16`, `Community 22`, `Community 23`, `Community 24`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 31`, `Community 40`, `Community 45`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 27` to `Community 2`, `Community 5`, `Community 7`, `Community 14`, `Community 16`, `Community 22`, `Community 23`, `Community 26`, `Community 28`, `Community 29`, `Community 31`, `Community 36`, `Community 40`, `Community 45`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _390 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1257459505541347 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1069182389937107 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._