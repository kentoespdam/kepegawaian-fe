# Graph Report - .  (2026-09-06)

## Corpus Check
- 0 files · ~99,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2044 nodes · 6279 edges · 87 communities (85 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.57)
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
- Community 79
- Community 80
- Community 81

## God Nodes (most connected - your core abstractions)
1. `cn()` - 209 edges
2. `PageQuery` - 85 edges
3. `hasPermission()` - 70 edges
4. `throwIfNotOk()` - 62 edges
5. `Button()` - 61 edges
6. `verifySession` - 57 edges
7. `apiErrorMessage()` - 54 edges
8. `Page` - 49 edges
9. `useFkOptions()` - 48 edges
10. `Envelope` - 48 edges

## Surprising Connections (you probably didn't know these)
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/layout.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts
- `RiwayatLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (87 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (71): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+63 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (67): MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery (+59 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (49): besok(), FormValues, PengajuanFormSheet(), schema, selisihHari(), FormValues, KartuIdentitasFormSheet(), normalizeFk() (+41 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (37): FormValues, numField, schema, CURRENT_YEAR, KuotaImportDialogProps, YEAR_OPTIONS, SignerPicker(), SignerPickerProps (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (44): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, KARTU_COLUMNS, KartuIdentitasPage(), val() (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (27): EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), ProfilDialog(), ProfilDialogProps, ParameterSettingClient(), PendapatanNonPajakClient(), PotonganTkkClient() (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (37): KuotaPageClient(), PengajuanPageClient(), RiwayatTab(), CURRENT_YEAR, PersetujuanPageClient(), PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS (+29 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (44): PengajuanFormSheetProps, Props, CutiApprovalPostRequest, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse (+36 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (34): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+26 more)

### Community 9 - "Community 9"
Cohesion: 0.05
Nodes (41): ApprovalSearchParams, CutiApprovalMiniResponse, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaSisa (+33 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (28): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, ENABLED_CATEGORIES (+20 more)

### Community 11 - "Community 11"
Cohesion: 0.05
Nodes (38): SingleResultString, ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery (+30 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (30): FormValues, Props, schema, SheetEditProfil(), toDefaults(), CURRENT_YEAR, FormValues, KeahlianFormSheet() (+22 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (37): KuotaStrip(), ProfilPage(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+29 more)

### Community 14 - "Community 14"
Cohesion: 0.06
Nodes (38): KepegawaianSearchParams, SingleResultObject, AlasanBerhentiSearchParams, GolonganSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse (+30 more)

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (26): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), EntityMeta, Home() (+18 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (29): Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), biodataFormSchema, editFormFields, dashboardKeys (+21 more)

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (31): CrudConfig, EntityFormModalProps, FormField, keahlianCrudConfig, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl, TINGKAT_KEMAMPUAN_OPTIONS (+23 more)

### Community 18 - "Community 18"
Cohesion: 0.16
Nodes (20): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (25): ADR-0043, CURRENT_YEAR, JenisBadge(), KuotaStrip(), PengajuanPageClientProps, STATUS_ICONS, mockFetch(), okJson() (+17 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (26): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+18 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (21): ADR-0001, ADR-0010, AccountSession, ADR-0041, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+13 more)

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (18): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, getYearOptions() (+10 more)

### Community 23 - "Community 23"
Cohesion: 0.07
Nodes (30): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiPatchGaji, PegawaiResponseDetail (+22 more)

### Community 24 - "Community 24"
Cohesion: 0.09
Nodes (26): GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+18 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (22): KomponenDialog(), KomponenDialogProps, FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula() (+14 more)

### Community 26 - "Community 26"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 27 - "Community 27"
Cohesion: 0.10
Nodes (25): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+17 more)

### Community 28 - "Community 28"
Cohesion: 0.07
Nodes (27): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+19 more)

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (21): CURRENT_YEAR, ADR-0040, YEAR_OPTIONS, StatusBadge(), StatusBadge(), CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS (+13 more)

### Community 30 - "Community 30"
Cohesion: 0.24
Nodes (11): ADR-0008, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField, simpleNameSchema (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.23
Nodes (16): SectionRightPanel(), profilKeys, DashboardQuery, useDashboardSections(), UseDashboardSectionsReturn, useSelfKeahlianMutation(), useSelfKeluargaMutation(), useSelfPelatihanMutation() (+8 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (14): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, KomponenTable(), KomponenTableProps, RincianGajiPanel() (+6 more)

### Community 33 - "Community 33"
Cohesion: 0.11
Nodes (18): penggajianKeys, batchKeys, GajiBatchMasterPostRequest, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootResponse, ListResultGajiBatchMasterProsesResponse (+10 more)

### Community 34 - "Community 34"
Cohesion: 0.09
Nodes (25): JenisSk, StatusBerhenti, StatusKepegawaian, Biodata, CutiJenisMiniResponse, EnumOption, GajiPendapatanNonPajakResponse, Golongan (+17 more)

### Community 35 - "Community 35"
Cohesion: 0.13
Nodes (21): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, ADR-0041, SidebarContent(), SidebarFooter() (+13 more)

### Community 36 - "Community 36"
Cohesion: 0.11
Nodes (24): JenisProfilUpdate, TingkatKemampuan, JenjangPendidikanResponse, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasQuery, KeahlianLampiranPostRequest (+16 more)

### Community 37 - "Community 37"
Cohesion: 0.11
Nodes (15): CreateBatchDialog(), CreateBatchDialogProps, FormValues, schema, BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClient() (+7 more)

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (20): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+12 more)

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (23): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPostRequest (+15 more)

### Community 40 - "Community 40"
Cohesion: 0.12
Nodes (16): FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), COLUMNS, FIELD_MAP (+8 more)

### Community 41 - "Community 41"
Cohesion: 0.15
Nodes (16): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FieldDate(), toDate(), toStr() (+8 more)

### Community 42 - "Community 42"
Cohesion: 0.14
Nodes (14): KuotaFormSheet(), toNum(), KuotaImportDialog(), t(), SpFormSheet(), TerminasiFormSheet(), ChangePasswordForm(), LampiranUploadModal() (+6 more)

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (13): KONTRAK_COLUMNS, KontrakPage(), val(), MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell() (+5 more)

### Community 44 - "Community 44"
Cohesion: 0.15
Nodes (8): ReprocessButton(), ReprocessButtonProps, VerifyButton(), VerifyButtonProps, useBatchAction(), useReprocessBatch(), useBatchInfo(), GajiBatchRootProcessRequest

### Community 45 - "Community 45"
Cohesion: 0.12
Nodes (15): KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson() (+7 more)

### Community 46 - "Community 46"
Cohesion: 0.16
Nodes (14): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest (+6 more)

### Community 47 - "Community 47"
Cohesion: 0.12
Nodes (15): alasanBerhentiConfig, golonganConfig, gradeConfig, hariLiburConfig, jabatanConfig, jenisKeahlianConfig, jenisKitasConfig, jenisPelatihanConfig (+7 more)

### Community 48 - "Community 48"
Cohesion: 0.14
Nodes (15): RiwayatSpQuery, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+7 more)

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (10): SectionCrudSlot(), hubunganKeluarga(), jenisMutasi(), rp(), SECTIONS, val(), Accordion(), AccordionContent() (+2 more)

### Community 50 - "Community 50"
Cohesion: 0.28
Nodes (12): SECTIONS, boolStr(), fetchSection(), hubunganKeluarga(), jenisMutasi(), jenisSk(), rp(), SectionFetchResult (+4 more)

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (7): UploadPotonganDialog(), UploadPotonganDialogProps, TambahanClientProps, BATCH_COLUMNS, STATUS_BADGE, STATUS_LABELS, StatusBatch

### Community 52 - "Community 52"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (7): KuotaFormSheetProps, mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock, CutiKuotaResponse

### Community 54 - "Community 54"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 55 - "Community 55"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "Community 56"
Cohesion: 0.18
Nodes (11): DeletedResult, Envelope, Page, PageableObject, PageEnvelope, SavedResultListLong, SavedResultLong, SavedResultString (+3 more)

### Community 57 - "Community 57"
Cohesion: 0.27
Nodes (8): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, EnumArray, ENUMS, valueFromLabel()

### Community 58 - "Community 58"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "Community 59"
Cohesion: 0.42
Nodes (7): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps

### Community 60 - "Community 60"
Cohesion: 0.29
Nodes (6): CutiPengajuanPage(), CutiPersetujuanPage(), ADR-0041, DashboardClient(), DashboardPage(), getPegawaiSession

### Community 61 - "Community 61"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), ResizeObserverMock

### Community 62 - "Community 62"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 63 - "Community 63"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 64 - "Community 64"
Cohesion: 0.22
Nodes (8): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_PROSES, mockFetch(), mockSearchParams

### Community 65 - "Community 65"
Cohesion: 0.22
Nodes (9): BatchSearchParams, KomponenSearchParams, ListResultGajiKomponenMiniProjection, PageGajiKomponenResponse, PageResultPageGajiKomponenResponse, SingleResultGajiKomponenResponse, PageQuery, GajiProfilResponse (+1 more)

### Community 66 - "Community 66"
Cohesion: 0.33
Nodes (9): Agama, GolonganDarah, HubunganKeluarga, JenisKelamin, StatusApproval, StatusKawin, StatusPendidikanKeluarga, ProfilKeluargaPostRequest (+1 more)

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "Community 68"
Cohesion: 0.31
Nodes (6): BatchContext, BatchProvider(), BatchState, useBatchContext(), Consumer(), MOCK_BATCH

### Community 69 - "Community 69"
Cohesion: 0.43
Nodes (3): TambahanDialog(), TambahanForm, tambahanSchema

### Community 70 - "Community 70"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (5): MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson()

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 73 - "Community 73"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 74 - "Community 74"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 75 - "Community 75"
Cohesion: 0.33
Nodes (5): ApprovalAction, DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), StatusBadge()

### Community 76 - "Community 76"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (4): CrudForm(), CrudFormProps, fields, schema

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (3): MutasiLampiranCard(), Props, RiwayatMutasiQuery

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

## Knowledge Gaps
- **567 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+562 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 13` to `Community 2`, `Community 3`, `Community 4`, `Community 6`, `Community 8`, `Community 10`, `Community 12`, `Community 16`, `Community 19`, `Community 22`, `Community 26`, `Community 27`, `Community 29`, `Community 32`, `Community 35`, `Community 37`, `Community 38`, `Community 40`, `Community 41`, `Community 49`, `Community 50`, `Community 54`, `Community 55`, `Community 75`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 14` to `Community 0`, `Community 1`, `Community 33`, `Community 65`, `Community 7`, `Community 39`, `Community 9`, `Community 11`, `Community 48`, `Community 52`, `Community 23`, `Community 24`, `Community 28`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 1` to `Community 0`, `Community 33`, `Community 65`, `Community 6`, `Community 7`, `Community 39`, `Community 9`, `Community 11`, `Community 14`, `Community 47`, `Community 48`, `Community 49`, `Community 52`, `Community 23`, `Community 24`, `Community 28`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _567 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0461357625624449 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.04828504828504829 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06277436347673397 - nodes in this community are weakly interconnected._