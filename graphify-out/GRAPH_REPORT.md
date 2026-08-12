# Graph Report - .  (2026-08-12)

## Corpus Check
- 4 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1313 nodes · 3474 edges · 69 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.52)
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
Cohesion: 0.12
Nodes (41): ADR-0001, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage() (+33 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (34): ADR-0008, EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig() (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (37): MutasiLampiranCard(), Props, FormValues, Props, schema, RFC-7807, EntityFormModal(), BadgeItem (+29 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (37): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FormValues, KontrakFormSheet() (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (38): AppShell(), MODULE_ENTITY_MAP, MODULES, Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (41): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+33 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (43): LampiranProfilAcceptRequest, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery (+35 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (34): MasterSwitch(), MasterSwitchProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+26 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (32): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+24 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (29): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, GajiPhdpPostRequest (+21 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (29): RiwayatMutasiQuery, RiwayatSkQuery, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiListResponse (+21 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (23): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, PopoverFilterContent(), STATUS_OPTIONS (+15 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (18): ChangePasswordForm(), Data, schema, Data, LoginForm(), schema, DataTableToolbar(), DataTableToolbarProps (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (27): CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (21): Field(), SectionLeftPanel(), Props, RingkasanPanel(), biodataFormSchema, editFormFields, formatPendidikan(), labelAgama() (+13 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (13): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, PENDIDIKAN_COLUMNS, PendidikanPage(), val() (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (26): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest, BiodataPostRequest (+18 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (19): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, KONTRAK_COLUMNS, KontrakPage(), val() (+11 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (22): ApprovalSearchParams, RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, GolonganSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams (+14 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (14): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps, sanksiDefaults() (+6 more)

### Community 20 - "Community 20"
Cohesion: 0.16
Nodes (19): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+11 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (17): FormValues, Props, schema, toDefaults(), useGajiProfilOptions(), FormValues, Props, schema (+9 more)

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (17): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+9 more)

### Community 24 - "Community 24"
Cohesion: 0.19
Nodes (12): Props, SkLampiranCard(), rp(), SK_COLUMNS, SkPage(), val(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (12): fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel(), SECTIONS, val() (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (15): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+7 more)

### Community 29 - "Community 29"
Cohesion: 0.24
Nodes (10): DashboardClient(), DashboardPage(), SectionCard(), formatRp(), labelStatus(), labelStatusKerja(), SectionDetail(), formatRp() (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.16
Nodes (11): PageParams, PageView, GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (14): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaDetail, PengalamanKerjaPostRequest (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (11): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, KEAHLIAN_COLUMNS (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.20
Nodes (11): CrudFormProps, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator() (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 35 - "Community 35"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 36 - "Community 36"
Cohesion: 0.15
Nodes (13): KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest (+5 more)

### Community 37 - "Community 37"
Cohesion: 0.28
Nodes (9): MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val(), formatDate(), rupiah() (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.26
Nodes (8): Biodata, EnumOption, Golongan, HttpStatusText, Jabatan, KodePajak, ListResultEnumOption, Organisasi

### Community 39 - "Community 39"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (11): ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.21
Nodes (8): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, KARTU_COLUMNS, KartuIdentitasPage(), val()

### Community 42 - "Community 42"
Cohesion: 0.21
Nodes (9): PENGALAMAN_KOLOM, PengalamanKerjaPage(), val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props (+1 more)

### Community 43 - "Community 43"
Cohesion: 0.17
Nodes (11): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+3 more)

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.27
Nodes (8): t(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), SpFormSheet()

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (6): SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 50 - "Community 50"
Cohesion: 0.20
Nodes (9): GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (9): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, PageResultPageDasarGajiResponse, SingleResultDasarGajiResponse (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 54 - "Community 54"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 55 - "Community 55"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 58 - "Community 58"
Cohesion: 0.36
Nodes (6): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat()

### Community 59 - "Community 59"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, SingleResultLampiranProfilQuery

### Community 60 - "Community 60"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, LampiranProfilQuery

### Community 61 - "Community 61"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, ListResultLampiranProfilQuery

### Community 62 - "Community 62"
Cohesion: 0.43
Nodes (5): labelAgama(), labelJk(), labelKawin(), SectionBiodata(), ProfilKeluargaQuery

### Community 63 - "Community 63"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 64 - "Community 64"
Cohesion: 0.60
Nodes (4): extractErrorMessage(), patchBiodata(), RFC-7807, useBiodataMutation()

## Knowledge Gaps
- **407 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+402 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 7` to `Community 33`, `Community 2`, `Community 3`, `Community 4`, `Community 37`, `Community 12`, `Community 44`, `Community 14`, `Community 15`, `Community 17`, `Community 49`, `Community 19`, `Community 20`, `Community 21`, `Community 54`, `Community 25`, `Community 26`, `Community 29`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 30` to `Community 1`, `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 10`, `Community 13`, `Community 16`, `Community 18`, `Community 23`, `Community 25`, `Community 28`, `Community 31`, `Community 35`, `Community 36`, `Community 38`, `Community 39`, `Community 40`, `Community 43`, `Community 45`, `Community 46`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 56`, `Community 57`, `Community 59`, `Community 60`, `Community 61`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 18` to `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 10`, `Community 13`, `Community 16`, `Community 23`, `Community 28`, `Community 30`, `Community 31`, `Community 35`, `Community 36`, `Community 38`, `Community 39`, `Community 40`, `Community 43`, `Community 45`, `Community 46`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 56`, `Community 57`, `Community 59`, `Community 60`, `Community 61`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _407 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11951710261569416 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1069182389937107 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0641025641025641 - nodes in this community are weakly interconnected._