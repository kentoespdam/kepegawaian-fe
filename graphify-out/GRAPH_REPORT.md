# Graph Report - .  (2026-08-12)

## Corpus Check
- 4 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1324 nodes · 3487 edges · 67 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.52)
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
Cohesion: 0.06
Nodes (73): ADR-0001, ADR-0008, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModal() (+65 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (58): LampiranProfilAcceptRequest, KartuIdentitasDetail, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery (+50 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (54): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+46 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (44): AppShell(), MODULE_ENTITY_MAP, MODULES, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader() (+36 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (42): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse (+34 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (29): MasterSwitch(), MasterSwitchProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+21 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (22): t(), FormValues, Props, schema, SpFormSheet(), RFC-7807, LampiranCardProps, LampiranItem (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (26): DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter(), FKComboboxFilterProps, FKComboboxProps, Button() (+18 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (29): ApprovalSearchParams, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse (+21 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (28): CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse, JenjangPendidikanPostRequest (+20 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (30): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+22 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (29): RiwayatMutasiQuery, RiwayatSkQuery, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiListResponse (+21 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (26): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest, BiodataPostRequest (+18 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (23): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, JenisKeahlianSearchParams, PegawaiSearchParams, GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (20): PopoverFilterContent(), FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), FieldFk() (+12 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (18): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, ConfirmDeleteDialog(), CrudForm(), SanksiManager(), SanksiManagerProps (+10 more)

### Community 16 - "Community 16"
Cohesion: 0.16
Nodes (15): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (21): CutiApprovalMiniResponse, CutiApprovalPostRequest, CutiJenisResponse, CutiKuotaResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest (+13 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (17): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat(), biodataColumns, DataPegawaiClient() (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (14): KONTRAK_COLUMNS, KontrakPage(), val(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage() (+6 more)

### Community 21 - "Community 21"
Cohesion: 0.21
Nodes (16): SectionLeftPanel(), Props, RingkasanPanel(), formatPendidikan(), labelAgama(), labelJk(), labelKawin(), labelStatus() (+8 more)

### Community 22 - "Community 22"
Cohesion: 0.19
Nodes (14): Field(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), biodataFormSchema, editFormFields, extractErrorMessage() (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (14): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions(), FieldDate(), FieldFk() (+6 more)

### Community 24 - "Community 24"
Cohesion: 0.16
Nodes (15): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, STATUS_OPTIONS, statusKerjaLabel() (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.21
Nodes (13): CrudFormProps, FKCombobox(), Label(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton() (+5 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (8): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, SingleResultPegawaiResponseSession

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (12): PageParams, PageView, DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (15): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.20
Nodes (11): ChangePasswordForm(), Data, schema, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.21
Nodes (11): ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (11): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, KEAHLIAN_COLUMNS (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.23
Nodes (9): fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel(), SECTIONS, val() (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.24
Nodes (10): MutasiLampiranCard(), Props, MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val() (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.27
Nodes (6): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, api

### Community 38 - "Community 38"
Cohesion: 0.26
Nodes (8): EnumOption, Golongan, Grade, HttpStatusText, Jabatan, KodePajak, ListResultEnumOption, Organisasi

### Community 39 - "Community 39"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (11): ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (10): FormValues, Props, schema, SheetEditProfil(), toDefaults(), EnumOption, ENUMS, FieldSelect() (+2 more)

### Community 42 - "Community 42"
Cohesion: 0.21
Nodes (8): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, KARTU_COLUMNS, KartuIdentitasPage(), val()

### Community 43 - "Community 43"
Cohesion: 0.21
Nodes (9): PENGALAMAN_KOLOM, PengalamanKerjaPage(), val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.17
Nodes (11): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse, SingleResultCutiKuotaPegawaiResponse (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 46 - "Community 46"
Cohesion: 0.24
Nodes (8): PELATIHAN_COLUMNS, PelatihanPage(), val(), FormValues, normalizeFk(), PelatihanFormSheet(), Props, schema

### Community 47 - "Community 47"
Cohesion: 0.22
Nodes (8): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus()

### Community 48 - "Community 48"
Cohesion: 0.27
Nodes (6): Data, LoginForm(), schema, Input(), loginRequest(), useLogin()

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (9): gradeConfig, GradeListResponse, GradePostRequest, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+1 more)

### Community 50 - "Community 50"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 53 - "Community 53"
Cohesion: 0.27
Nodes (7): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox()

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), normalizeFk(), Props, schema, SingleResultPegawaiResponseMutasiContext, SingleResultDetailDasarGajiNominal

### Community 55 - "Community 55"
Cohesion: 0.27
Nodes (6): Props, SkLampiranCard(), rp(), SK_COLUMNS, SkPage(), val()

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.36
Nodes (7): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField

### Community 58 - "Community 58"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 60 - "Community 60"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 61 - "Community 61"
Cohesion: 0.33
Nodes (6): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema

### Community 62 - "Community 62"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

## Knowledge Gaps
- **411 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+406 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 5` to `Community 3`, `Community 6`, `Community 7`, `Community 15`, `Community 16`, `Community 17`, `Community 20`, `Community 22`, `Community 24`, `Community 25`, `Community 26`, `Community 30`, `Community 31`, `Community 35`, `Community 45`, `Community 47`, `Community 48`, `Community 53`, `Community 54`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 27` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 18`, `Community 29`, `Community 34`, `Community 35`, `Community 38`, `Community 39`, `Community 40`, `Community 44`, `Community 49`, `Community 50`, `Community 51`, `Community 56`, `Community 59`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 13` to `Community 1`, `Community 2`, `Community 4`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 18`, `Community 27`, `Community 29`, `Community 34`, `Community 38`, `Community 39`, `Community 40`, `Community 44`, `Community 49`, `Community 50`, `Community 51`, `Community 56`, `Community 59`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _411 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06259314456035768 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.046130952380952384 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05628415300546448 - nodes in this community are weakly interconnected._