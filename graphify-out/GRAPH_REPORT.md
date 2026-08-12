# Graph Report - .  (2026-08-12)

## Corpus Check
- 223 files · ~75,968 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1342 nodes · 3522 edges · 79 communities
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
- `AppLayout()` --calls--> `verifySession`  [EXTRACTED]
  src/app/(app)/layout.tsx → src/lib/auth/verifySession.ts
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

## Communities (79 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (40): ADR-0001, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage() (+32 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (34): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (41): AppLayout(), AppShell(), MODULE_ENTITY_MAP, MODULES, Separator(), SheetDescription(), Sidebar(), SidebarContent() (+33 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (35): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FormValues, KontrakFormSheet() (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (37): MasterSwitch(), MasterSwitchProps, Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (42): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse (+34 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (29): MutasiLampiranCard(), Props, FormValues, Props, schema, RFC-7807, BadgeItem, BadgeManager() (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (33): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+25 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (34): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, PageResultPageDasarGajiResponse, SingleResultDasarGajiResponse (+26 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (29): Field(), SectionLeftPanel(), HUBUNGAN_INT, KELUARGA_COLUMNS, KeluargaPage(), KeluargaToolbar(), val(), RingkasanPanel() (+21 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (29): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseDetail, PegawaiResponseMutasiContext (+21 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (24): FormValues, Props, schema, toDefaults(), useGajiProfilOptions(), FormValues, Props, schema (+16 more)

### Community 12 - "Community 12"
Cohesion: 0.17
Nodes (23): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+15 more)

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (23): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, RumahDinasSearchParams, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse (+15 more)

### Community 15 - "Community 15"
Cohesion: 0.19
Nodes (25): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest, BiodataPostRequest (+17 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (15): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, Data (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (20): CutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest, CutiPengajuanResponse, KlaimCuti (+12 more)

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (15): DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter(), InputGroup(), InputGroupAddon(), inputGroupAddonVariants (+7 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (17): JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelPostRequest (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.12
Nodes (17): ApprovalSearchParams, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.16
Nodes (11): biodataColumns, FILTER_PARAMS, pegawaiColumns, TABS, Props, cellContent(), DataTable(), DataTableProps (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.19
Nodes (12): Props, SkLampiranCard(), rp(), SK_COLUMNS, SkPage(), val(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS (+4 more)

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (17): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest, GajiBatchRootResponse, ListResultGajiBatchMasterProsesResponse (+9 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (12): fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel(), SECTIONS, val() (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.21
Nodes (8): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKCombobox(), FullSanksiPayload, api

### Community 26 - "Community 26"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.21
Nodes (11): ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (11): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, KEAHLIAN_COLUMNS (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (9): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), KONTRAK_COLUMNS, KontrakPage(), val(), DataTablePagination(), DataTablePaginationProps (+1 more)

### Community 30 - "Community 30"
Cohesion: 0.30
Nodes (11): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 32 - "Community 32"
Cohesion: 0.21
Nodes (13): MasterEntityTypes, GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery (+5 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 34 - "Community 34"
Cohesion: 0.18
Nodes (13): GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiKomponenMiniProjection, GajiKomponenPostRequest, GajiKomponenPutRequest, GajiKomponenResponse, KomponenSearchParams, ListResultGajiKomponenMiniProjection (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (9): DataPegawaiClient(), columns, TABS, TerminasiClient(), fromPage(), PageParams, PageView, toApiParams() (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.28
Nodes (9): MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val(), formatDate(), rupiah() (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.21
Nodes (12): RiwayatSkQuery, PegawaiPatchGaji, RiwayatSkResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+4 more)

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.21
Nodes (8): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, KARTU_COLUMNS, KartuIdentitasPage(), val()

### Community 40 - "Community 40"
Cohesion: 0.21
Nodes (9): PENGALAMAN_KOLOM, PengalamanKerjaPage(), val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props (+1 more)

### Community 41 - "Community 41"
Cohesion: 0.23
Nodes (10): CrudFormProps, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator() (+2 more)

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (8): SheetEditProfil(), toDefaults(), ChangePasswordForm(), Data, schema, changePassword(), useChangePassword(), apiErrorMessage()

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 44 - "Community 44"
Cohesion: 0.24
Nodes (8): PELATIHAN_COLUMNS, PelatihanPage(), val(), FormValues, normalizeFk(), PelatihanFormSheet(), Props, schema

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 46 - "Community 46"
Cohesion: 0.24
Nodes (9): MasterEntityName, JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (7): DashboardClient(), DashboardPage(), formatRp(), labelStatus(), labelStatusKerja(), SectionDetail(), getPegawaiSession

### Community 50 - "Community 50"
Cohesion: 0.27
Nodes (8): t(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), SpFormSheet()

### Community 51 - "Community 51"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 54 - "Community 54"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 55 - "Community 55"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (8): AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (8): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 63 - "Community 63"
Cohesion: 0.36
Nodes (6): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat()

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (7): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, SingleResultRumahDinasQuery

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 66 - "Community 66"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, SingleResultLampiranProfilQuery

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery

### Community 68 - "Community 68"
Cohesion: 0.43
Nodes (5): labelAgama(), labelJk(), labelKawin(), SectionBiodata(), ProfilKeluargaQuery

### Community 69 - "Community 69"
Cohesion: 0.47
Nodes (4): SectionCard(), formatRp(), SectionPenggajian(), GajiBatchMasterResponse

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (5): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (6): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 73 - "Community 73"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

### Community 74 - "Community 74"
Cohesion: 0.60
Nodes (4): extractErrorMessage(), patchBiodata(), RFC-7807, useBiodataMutation()

## Knowledge Gaps
- **417 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+412 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 4` to `Community 2`, `Community 3`, `Community 6`, `Community 9`, `Community 11`, `Community 13`, `Community 16`, `Community 18`, `Community 21`, `Community 24`, `Community 25`, `Community 27`, `Community 30`, `Community 36`, `Community 41`, `Community 43`, `Community 45`, `Community 49`, `Community 52`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 35` to `Community 1`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 14`, `Community 15`, `Community 17`, `Community 19`, `Community 20`, `Community 23`, `Community 24`, `Community 32`, `Community 33`, `Community 34`, `Community 37`, `Community 38`, `Community 46`, `Community 47`, `Community 48`, `Community 53`, `Community 54`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 64`, `Community 65`, `Community 66`, `Community 67`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 14` to `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 15`, `Community 17`, `Community 19`, `Community 20`, `Community 23`, `Community 32`, `Community 33`, `Community 34`, `Community 37`, `Community 38`, `Community 46`, `Community 47`, `Community 48`, `Community 53`, `Community 54`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 64`, `Community 65`, `Community 66`, `Community 67`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _417 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12489343563512362 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1069182389937107 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06509803921568627 - nodes in this community are weakly interconnected._