# Graph Report - .  (2026-08-12)

## Corpus Check
- 4 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1301 nodes · 3460 edges · 67 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.53)
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

## Communities (67 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (40): DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage() (+32 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (43): MutasiLampiranCard(), Props, Props, SkLampiranCard(), EntityFormModal(), EntityFormModalProps, inter, metadata (+35 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (44): AppShell(), MODULE_ENTITY_MAP, MODULES, Separator(), Sheet(), SheetContent(), SheetDescription(), SheetFooter() (+36 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (46): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+38 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (40): Field(), SectionLeftPanel(), fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel() (+32 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (32): ADR-0008, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (42): MasterEntityName, MasterEntityTypes, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery (+34 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (34): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+26 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (27): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FormValues, JENIS_SK_BY_MUTASI (+19 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (35): LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse (+27 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (24): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, Data, LoginForm(), schema (+16 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (26): DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter(), FKComboboxFilterProps, FKComboboxProps, Button() (+18 more)

### Community 12 - "Community 12"
Cohesion: 0.13
Nodes (24): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+16 more)

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (22): FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), FormValues, Props (+14 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (19): MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val(), rp(), SK_COLUMNS (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (24): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (23): ApprovalSearchParams, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams (+15 more)

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (24): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseDetail (+16 more)

### Community 18 - "Community 18"
Cohesion: 0.21
Nodes (23): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPatchRequest, BiodataPostRequest, BiodataPutRequest (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (21): CutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest, CutiPengajuanResponse, KlaimCuti (+13 more)

### Community 21 - "Community 21"
Cohesion: 0.11
Nodes (17): JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelPostRequest (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.24
Nodes (13): ADR-0001, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions() (+5 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (12): ChangePasswordForm(), Data, schema, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (12): RiwayatSpQuery, EnumOption, Golongan, Grade, HttpStatusText, Jabatan, JenisSpMiniResponse, KodePajak (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (16): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.20
Nodes (13): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, columns, TABS, TerminasiClient() (+5 more)

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (12): PageParams, PageView, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.14
Nodes (14): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, JenisPelatihanSearchParams, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse (+6 more)

### Community 29 - "Community 29"
Cohesion: 0.21
Nodes (11): ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (11): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, KEAHLIAN_COLUMNS (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 32 - "Community 32"
Cohesion: 0.21
Nodes (8): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), cellContent(), DataTable(), DataTableProps, Skeleton(), SingleResultPegawaiResponseSession

### Community 33 - "Community 33"
Cohesion: 0.21
Nodes (9): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), KONTRAK_COLUMNS, KontrakPage() (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.17
Nodes (12): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+4 more)

### Community 35 - "Community 35"
Cohesion: 0.21
Nodes (12): RiwayatSkQuery, PegawaiPatchGaji, RiwayatSkResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+4 more)

### Community 36 - "Community 36"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.21
Nodes (9): PENGALAMAN_KOLOM, PengalamanKerjaPage(), val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 41 - "Community 41"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 44 - "Community 44"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 45 - "Community 45"
Cohesion: 0.27
Nodes (7): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions(), Checkbox()

### Community 46 - "Community 46"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (8): AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (8): GradeListResponse, GradePostRequest, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (8): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 51 - "Community 51"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 52 - "Community 52"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail, SingleResultLampiranProfilQuery

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 55 - "Community 55"
Cohesion: 0.36
Nodes (6): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat()

### Community 56 - "Community 56"
Cohesion: 0.36
Nodes (6): FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val()

### Community 57 - "Community 57"
Cohesion: 0.29
Nodes (7): LampiranProfilAcceptRequest, ListResultLampiranSkQuery, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, PelatihanLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 59 - "Community 59"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, ProfilKeluargaLampiranPostRequest, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga

### Community 60 - "Community 60"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery

### Community 61 - "Community 61"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

## Knowledge Gaps
- **403 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+398 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 15` to `Community 32`, `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 38`, `Community 39`, `Community 40`, `Community 8`, `Community 10`, `Community 11`, `Community 12`, `Community 44`, `Community 14`, `Community 45`, `Community 19`, `Community 23`, `Community 29`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 27` to `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 9`, `Community 16`, `Community 17`, `Community 18`, `Community 20`, `Community 21`, `Community 24`, `Community 25`, `Community 28`, `Community 34`, `Community 35`, `Community 36`, `Community 41`, `Community 42`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 58`, `Community 59`, `Community 60`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 28` to `Community 3`, `Community 6`, `Community 7`, `Community 9`, `Community 16`, `Community 17`, `Community 18`, `Community 20`, `Community 21`, `Community 24`, `Community 25`, `Community 27`, `Community 34`, `Community 35`, `Community 36`, `Community 41`, `Community 42`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 58`, `Community 59`, `Community 60`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _403 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12404092071611253 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05048076923076923 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05909090909090909 - nodes in this community are weakly interconnected._