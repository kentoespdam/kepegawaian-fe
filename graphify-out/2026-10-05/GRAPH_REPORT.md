# Graph Report - kepegawaian-fe  (2026-10-05)

## Corpus Check
- 408 files · ~137,911 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1957 nodes · 6295 edges · 91 communities (87 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.57)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `be985860`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- _shared/index.ts
- jenis-sp.ts
- keluarga-form-sheet.tsx
- button.tsx
- fromPage
- data-table.tsx
- formatDate
- pengajuan.ts
- role-permission-dialog.tsx
- users-client.tsx
- pendukung-layout-client.tsx
- master-entity-types.ts
- mutasi-form-sheet.tsx
- cn
- PageQuery
- hasPermission
- section-left-panel.tsx
- dashboard-sections.tsx
- verifySession
- pengajuan-page-client.tsx
- useFkOptions
- appwriteSession.ts
- components/periode-filter.tsx
- pegawai.ts
- grade.ts
- useKomponenForm.ts
- dropdown-menu.tsx
- sidebar.tsx
- riwayat.ts
- riwayat/cuti/page.tsx
- master-config.ts
- field-renderers.tsx
- components/rincian-gaji-panel.tsx
- batch.ts
- master.ts
- sidebar-utils.ts
- profile.ts
- proses-gaji-client.tsx
- command.tsx
- biodata.ts
- EntityConfig
- entity-form-modal.tsx
- utils.ts
- detail-dasar-gaji.ts
- alasan-berhenti.ts
- cuti/page.test.tsx
- jenis-keahlian.ts
- jenis-kitas.ts
- sanksi.config.ts
- jenis-pelatihan.ts
- pegawai-organisasi-table.tsx
- tambahan-client.tsx
- profesi.ts
- kuota-form-sheet.test.tsx
- tunjangan.ts
- pdf-viewer.test.tsx
- kuota.ts
- data-pegawai-client.tsx
- verifikasi-client.test.tsx
- pengajuan-form-sheet.tsx
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- kontrak-form-sheet.test.tsx
- terminasi-form-sheet.test.tsx
- tambahan-client.test.tsx
- parameter-setting.ts
- phdp.ts
- persetujuan-client.test.tsx
- profil-update.ts
- crud-form.tsx
- kontrak-form-sheet.tsx
- pengajuan-klaim.test.tsx
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx
- kpi.ts
- persetujuan-page-client.tsx
- sk-form-sheet.test.tsx
- keahlian-form-sheet.tsx
- persetujuan-page-client.test.tsx
- change-password-form.tsx
- popover.tsx
- approvalStatusTone
- sk/page.test.tsx
- proses-gaji-client.test.tsx
- pengajuan-page-client.test.tsx
- AuthProvider

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 89 edges
3. `PageQuery` - 87 edges
4. `hasPermission()` - 78 edges
5. `verifySession` - 75 edges
6. `toApiParams()` - 56 edges
7. `fromPage()` - 56 edges
8. `throwIfNotOk()` - 53 edges
9. `Page` - 51 edges
10. `Envelope` - 50 edges

## Surprising Connections (you probably didn't know these)
- `DetailTab()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/(app)/cuti/persetujuan/detail-approval-dialog.tsx → src/lib/utils.ts
- `DashboardPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/page.tsx → src/lib/auth/pegawaiSession.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/pendukung-layout-client.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/riwayat-layout-client.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (91 total, 4 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.05
Nodes (33): ListResultStatusPegawaiResponse, StatusPegawaiResponse, KartuIdentitasDetail, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, JenisKeahlianResponse (+25 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.18
Nodes (11): jenisSpConfig, JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery (+3 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.10
Nodes (24): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, FormValues, normalizeFk(), PelatihanFormSheet() (+16 more)

### Community 3 - "button.tsx"
Cohesion: 0.18
Nodes (20): CreateBatchDialog(), CreateBatchDialogProps, FormValues, schema, KpiFormDialog(), UploadKpiDialog(), UploadKpiDialogProps, ProfilDialog() (+12 more)

### Community 4 - "fromPage"
Cohesion: 0.10
Nodes (41): KuotaPageClient(), PengajuanPageClient(), PersetujuanPageClient(), KARTU_COLUMNS, KartuIdentitasPage(), KEAHLIAN_COLUMNS, KeahlianPage(), TINGKAT_LABEL (+33 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.09
Nodes (33): CURRENT_YEAR, ADR-0040, YEAR_OPTIONS, EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), KomponenPage(), ParameterSettingClient() (+25 more)

### Community 6 - "formatDate"
Cohesion: 0.26
Nodes (7): RiwayatTab(), TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable(), formatDate()

### Community 7 - "pengajuan.ts"
Cohesion: 0.08
Nodes (28): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse (+20 more)

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.11
Nodes (26): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+18 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.11
Nodes (25): RolesClient(), CreateUserDialog(), RoleAssignmentDialog(), RoleAssignmentDialogProps, makeColumns(), UsersClient(), systemKeys, useAllPermissions() (+17 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.09
Nodes (16): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+8 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.10
Nodes (30): MasterEntityName, MasterEntityTypes, hariLiburConfig, GolonganListResponse, GradeQuery, HariLiburListResponse, HariLiburPostRequest, HariLiburQuery (+22 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.23
Nodes (10): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), Props, schema, normalizeFk(), useJabatanProfesiCascade(), useMutasiFormQueries() (+2 more)

### Community 13 - "cn"
Cohesion: 0.06
Nodes (46): JenisBadge(), KuotaStrip(), KuotaStrip(), MasterSwitch(), MasterSwitchProps, AlertDialogMedia(), AlertDialogOverlay(), Breadcrumb() (+38 more)

### Community 14 - "PageQuery"
Cohesion: 0.04
Nodes (66): SingleResultString, RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+58 more)

### Community 15 - "hasPermission"
Cohesion: 0.17
Nodes (23): CutiKuotaPage(), CutiPengajuanPage(), CutiPersetujuanPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage() (+15 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (39): DashboardClient(), DashboardPage(), SectionCrudSlot(), Field(), SectionLeftPanel(), KeluargaToolbar(), rp(), val() (+31 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.06
Nodes (60): SectionCrudSlotProps, SectionRightPanel(), SignerPicker(), EntityFormModalProps, FormField, SECTIONS, keahlianCrudConfig, keahlianFormFields (+52 more)

### Community 18 - "verifySession"
Cohesion: 0.15
Nodes (21): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+13 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.11
Nodes (25): ADR-0043, CURRENT_YEAR, PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, PersetujuanClientProps, ReprocessButton(), ReprocessButtonProps (+17 more)

### Community 20 - "useFkOptions"
Cohesion: 0.11
Nodes (28): DataPegawaiToolbar(), labelMap(), PopoverFilterContent(), SheetEditProfil(), KartuIdentitasFormSheet(), normalizeFk(), FormValues, schema (+20 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.13
Nodes (21): ADR-0001, ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+13 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.21
Nodes (9): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, useKpiList(), usePeriodeFilter() (+1 more)

### Community 23 - "pegawai.ts"
Cohesion: 0.08
Nodes (30): SignerPickerProps, potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse (+22 more)

### Community 24 - "grade.ts"
Cohesion: 0.20
Nodes (9): gradeConfig, GradeListResponse, GradePostRequest, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+1 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.13
Nodes (20): KomponenDialog(), KomponenDialogProps, FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula() (+12 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.08
Nodes (35): SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+27 more)

### Community 28 - "riwayat.ts"
Cohesion: 0.06
Nodes (48): MutasiLampiranCard(), Props, Props, SkLampiranCard(), Props, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery (+40 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.08
Nodes (22): CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, ADR-0040, YEAR_OPTIONS, MUTASI_COLUMNS, PairCell(), rp() (+14 more)

### Community 30 - "master-config.ts"
Cohesion: 0.13
Nodes (21): ADR-0008, FKSource, makeConfig(), namaWajib, nameField, golonganConfig, jabatanConfig, jenjangPendidikanConfig (+13 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.13
Nodes (25): Props, Props, FormValues, Props, schema, FormValues, Props, schema (+17 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.20
Nodes (8): KomponenTable(), KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, useBatchMasterProses(), fmtRupiah(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.08
Nodes (25): BatchContext, BatchProvider(), BatchState, useBatchContext(), useDeleteBatch(), Consumer(), MOCK_BATCH, useBatchInfo() (+17 more)

### Community 34 - "master.ts"
Cohesion: 0.09
Nodes (22): RiwayatSpQuery, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+14 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.27
Nodes (9): AppShell(), MODULE_ENTITY_MAP, MODULES, Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities() (+1 more)

### Community 36 - "profile.ts"
Cohesion: 0.13
Nodes (21): JenisProfilUpdate, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest, KeahlianPostRequest, KeahlianPutRequest (+13 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.33
Nodes (5): BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClientProps, STATUS_DOT

### Community 38 - "command.tsx"
Cohesion: 0.22
Nodes (14): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+6 more)

### Community 39 - "biodata.ts"
Cohesion: 0.10
Nodes (39): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse (+31 more)

### Community 40 - "EntityConfig"
Cohesion: 0.20
Nodes (10): EntityConfig, JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, resolveFkLabel(), UseMasterTableOpts, buildTreeOptions(), computeSubtreeIds(), Computed (+2 more)

### Community 41 - "entity-form-modal.tsx"
Cohesion: 0.14
Nodes (16): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps, sanksiDefaults() (+8 more)

### Community 42 - "utils.ts"
Cohesion: 0.15
Nodes (13): FormValues, KuotaFormSheet(), numField, schema, toNum(), TerminasiFormSheet(), useTerminasiForm(), apiErrorMessage() (+5 more)

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 44 - "alasan-berhenti.ts"
Cohesion: 0.22
Nodes (9): alasanBerhentiConfig, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+1 more)

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.18
Nodes (10): KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson() (+2 more)

### Community 46 - "jenis-keahlian.ts"
Cohesion: 0.22
Nodes (9): jenisKeahlianConfig, JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery (+1 more)

### Community 47 - "jenis-kitas.ts"
Cohesion: 0.15
Nodes (13): nameCol, simpleNameSchema, jenisKitasConfig, levelConfig, JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams (+5 more)

### Community 48 - "sanksi.config.ts"
Cohesion: 0.40
Nodes (4): boolOpt, sanksiConfig, SanksiPostRequest, SanksiQuery

### Community 49 - "jenis-pelatihan.ts"
Cohesion: 0.22
Nodes (9): jenisPelatihanConfig, JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery (+1 more)

### Community 50 - "pegawai-organisasi-table.tsx"
Cohesion: 0.33
Nodes (6): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, GajiBatchMasterResponse

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.19
Nodes (12): PersetujuanClient(), TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, penggajianKeys (+4 more)

### Community 52 - "profesi.ts"
Cohesion: 0.15
Nodes (12): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+4 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.20
Nodes (7): KuotaFormSheetProps, mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock, CutiKuotaResponse

### Community 54 - "tunjangan.ts"
Cohesion: 0.24
Nodes (8): GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.20
Nodes (9): CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse, PageResultCutiKuotaPegawaiResponse, SingleResultCutiKuotaResponse (+1 more)

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.33
Nodes (7): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai(), PegawaiTableResponse

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "pengajuan-form-sheet.tsx"
Cohesion: 0.19
Nodes (15): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+7 more)

### Community 60 - "login-form.tsx"
Cohesion: 0.33
Nodes (5): Data, LoginForm(), schema, loginRequest(), useLogin()

### Community 61 - "pengajuan-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), ResizeObserverMock

### Community 62 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 63 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 64 - "tambahan-client.test.tsx"
Cohesion: 0.22
Nodes (8): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_PROSES, mockFetch(), mockSearchParams

### Community 65 - "parameter-setting.ts"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 66 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.22
Nodes (8): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil

### Community 69 - "crud-form.tsx"
Cohesion: 0.14
Nodes (16): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, CrudFormProps (+8 more)

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.13
Nodes (19): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues, normalizeFk() (+11 more)

### Community 71 - "pengajuan-klaim.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson()

### Community 72 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.29
Nodes (5): SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 73 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 74 - "kpi.ts"
Cohesion: 0.06
Nodes (32): KpiFormDialogProps, KpiClient(), mockSearchParams, metadata, inter, metadata, handleSessionExpired(), Providers() (+24 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.08
Nodes (27): ApprovalAction, DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), CURRENT_YEAR, PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS (+19 more)

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 77 - "keahlian-form-sheet.tsx"
Cohesion: 0.29
Nodes (7): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS

### Community 79 - "change-password-form.tsx"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 80 - "popover.tsx"
Cohesion: 0.29
Nodes (6): Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle(), PopoverTrigger()

### Community 81 - "approvalStatusTone"
Cohesion: 0.53
Nodes (6): StatusBadge(), StatusBadge(), StatusBadge(), StatusBadge(), approvalStatusTone(), labelApprovalStatus()

### Community 87 - "sk/page.test.tsx"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

## Knowledge Gaps
- **513 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+508 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `keluarga-form-sheet.tsx`, `button.tsx`, `fromPage`, `data-table.tsx`, `role-permission-dialog.tsx`, `users-client.tsx`, `pendukung-layout-client.tsx`, `mutasi-form-sheet.tsx`, `section-left-panel.tsx`, `dashboard-sections.tsx`, `pengajuan-page-client.tsx`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `sidebar-utils.ts`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `utils.ts`, `pegawai-organisasi-table.tsx`, `pdf-viewer.test.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `persetujuan-page-client.tsx`, `popover.tsx`, `approvalStatusTone`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `keluarga-form-sheet.tsx`, `fromPage`, `data-table.tsx`, `formatDate`, `role-permission-dialog.tsx`, `users-client.tsx`, `mutasi-form-sheet.tsx`, `cn`, `section-left-panel.tsx`, `verifySession`, `pengajuan-page-client.tsx`, `useFkOptions`, `useKomponenForm.ts`, `sidebar.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `utils.ts`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `pengajuan-form-sheet.tsx`, `login-form.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `persetujuan-page-client.tsx`, `keahlian-form-sheet.tsx`, `change-password-form.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `PageQuery` to `_shared/index.ts`, `jenis-sp.ts`, `pengajuan.ts`, `users-client.tsx`, `master-entity-types.ts`, `pegawai.ts`, `grade.ts`, `riwayat.ts`, `batch.ts`, `master.ts`, `biodata.ts`, `detail-dasar-gaji.ts`, `alasan-berhenti.ts`, `jenis-keahlian.ts`, `jenis-kitas.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `tunjangan.ts`, `kuota.ts`, `parameter-setting.ts`, `phdp.ts`, `profil-update.ts`, `kpi.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _513 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05496828752642706 - nodes in this community are weakly interconnected._
- **Should `keluarga-form-sheet.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1010752688172043 - nodes in this community are weakly interconnected._
- **Should `fromPage` be split into smaller, more focused modules?**
  _Cohesion score 0.09745390693590869 - nodes in this community are weakly interconnected._