# Graph Report - kepegawaian-fe  (2026-10-06)

## Corpus Check
- 450 files · ~143,884 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2101 nodes · 6623 edges · 99 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef42f453`
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
- section-right-panel.tsx
- jenis-kitas.ts
- riwayat-constants.ts
- create-batch-dialog.tsx
- KpiClient
- kuota-page-client.tsx
- rp
- (app)/page.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 90 edges
3. `throwIfNotOk()` - 88 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 78 edges
6. `verifySession` - 75 edges
7. `toApiParams()` - 72 edges
8. `fromPage()` - 56 edges
9. `Page` - 51 edges
10. `Envelope` - 50 edges

## Surprising Connections (you probably didn't know these)
- `JenisBadge()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `DashboardPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/page.tsx → src/lib/auth/pegawaiSession.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/pendukung-layout-client.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (99 total, 0 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.05
Nodes (50): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+42 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.12
Nodes (14): createApiClient(), handle(), baseClient, fetchMock, PageResultPageGajiBatchMasterResponse, GajiKpiPostRequest, GajiKpiPutRequest, GajiKpiUploadResponse (+6 more)

### Community 3 - "button.tsx"
Cohesion: 0.11
Nodes (30): FormValues, KuotaFormSheet(), numField, schema, toNum(), DetailApprovalDialogProps, RiwayatTab(), CrudLike (+22 more)

### Community 4 - "fromPage"
Cohesion: 0.07
Nodes (20): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, PENGALAMAN_KOLOM, ConfirmDeleteDialog() (+12 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.19
Nodes (18): EntityFormModal(), KOMPONEN_COLUMNS, ParameterSettingClient(), PendapatanNonPajakClient(), PotonganTkkClient(), TunjanganClient(), DataTablePagination(), DataTablePaginationProps (+10 more)

### Community 6 - "formatDate"
Cohesion: 0.31
Nodes (5): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable()

### Community 7 - "pengajuan.ts"
Cohesion: 0.09
Nodes (27): CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams (+19 more)

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.13
Nodes (22): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+14 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.11
Nodes (21): RolesClient(), CreateUserDialog(), CreateUserDialogProps, RoleAssignmentDialog(), RoleAssignmentDialogProps, systemKeys, useCreateUser(), useRoleAssignment() (+13 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.09
Nodes (14): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+6 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.05
Nodes (62): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+54 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.24
Nodes (5): masterKeys, useProfesiForm(), FullSanksiPayload, api, ApiError

### Community 13 - "cn"
Cohesion: 0.04
Nodes (79): KuotaStrip(), AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, Breadcrumb(), BreadcrumbEllipsis() (+71 more)

### Community 14 - "PageQuery"
Cohesion: 0.06
Nodes (34): ApprovalSearchParams, JenisKeahlianSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse (+26 more)

### Community 15 - "hasPermission"
Cohesion: 0.13
Nodes (20): CutiKuotaPage(), CutiPengajuanPage(), CutiPersetujuanPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage() (+12 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.21
Nodes (14): Field(), SectionLeftPanel(), biodataFormSchema, editFormFields, usePegawaiDashboard(), extractErrorMessage(), RFC-7807, useSelfBiodataMutation() (+6 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.05
Nodes (65): SectionCrudSlotProps, SectionRightPanel(), PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, SignerPicker(), EntityFormModalProps, FormField (+57 more)

### Community 18 - "verifySession"
Cohesion: 0.11
Nodes (21): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+13 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.22
Nodes (15): makeColumns(), UsersClient(), ReprocessButtonProps, VerifyButtonProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+7 more)

### Community 20 - "useFkOptions"
Cohesion: 0.12
Nodes (28): DataPegawaiToolbar(), labelMap(), PopoverFilterContent(), Props, SheetEditProfil(), MutasiFormSheet(), FormValues, schema (+20 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.16
Nodes (17): ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession() (+9 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.20
Nodes (9): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, useKpiList(), usePeriodeFilter() (+1 more)

### Community 23 - "pegawai.ts"
Cohesion: 0.09
Nodes (29): MutasiLampiranCard(), Props, SignerPickerProps, RiwayatMutasiQuery, RiwayatSpQuery, RiwayatTerminasiQuery, GradeResponse, JenisKitasResponse (+21 more)

### Community 24 - "grade.ts"
Cohesion: 0.18
Nodes (21): useCutiKuotaList(), useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList(), useMutasiContextData() (+13 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.10
Nodes (26): KomponenDialog(), KomponenDialogProps, FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula() (+18 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.23
Nodes (13): KeluargaToolbar(), HUBUNGAN_KELUARGA_INT, hubunganKeluargaFilterOptions(), hubunganKeluargaInt(), labelHubunganKeluarga(), labelStatusPendidikanKeluarga(), STATUS_APPROVAL, STATUS_KERJA (+5 more)

### Community 28 - "riwayat.ts"
Cohesion: 0.06
Nodes (41): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian (+33 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.16
Nodes (8): FileCell(), isImage(), isPdf(), SP_COLUMNS, DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter()

### Community 30 - "master-config.ts"
Cohesion: 0.13
Nodes (27): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+19 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.06
Nodes (64): Props, FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, CURRENT_YEAR, FormValues (+56 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.20
Nodes (8): KomponenTable(), KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, useBatchMasterProses(), fmtRupiah(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.10
Nodes (22): BatchContext, BatchProvider(), BatchState, useBatchContext(), Consumer(), MOCK_BATCH, useBatchInfo(), BatchSearchParams (+14 more)

### Community 34 - "master.ts"
Cohesion: 0.20
Nodes (9): Biodata, EnumOption, Golongan, Grade, Jabatan, KodePajak, ListResultEnumOption, Organisasi (+1 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.16
Nodes (6): ReprocessButton(), VerifyButton(), useBatchAction(), useDeleteBatch(), useReprocessBatch(), GajiBatchRootProcessRequest

### Community 36 - "profile.ts"
Cohesion: 0.12
Nodes (25): HubunganKeluarga, JenisProfilUpdate, StatusPendidikanKeluarga, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest (+17 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.10
Nodes (17): CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, ADR-0040, YEAR_OPTIONS, MUTASI_COLUMNS, rp(), SK_COLUMNS (+9 more)

### Community 38 - "command.tsx"
Cohesion: 0.13
Nodes (23): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKComboboxFilterProps, FKCombobox(), FKComboboxProps (+15 more)

### Community 39 - "biodata.ts"
Cohesion: 0.21
Nodes (23): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+15 more)

### Community 40 - "EntityConfig"
Cohesion: 0.23
Nodes (11): potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+3 more)

### Community 41 - "entity-form-modal.tsx"
Cohesion: 0.36
Nodes (7): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField

### Community 42 - "utils.ts"
Cohesion: 0.47
Nodes (4): Props, TerminasiFormValues, terminasiSchema, PegawaiResponse

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.10
Nodes (20): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+12 more)

### Community 44 - "alasan-berhenti.ts"
Cohesion: 0.15
Nodes (12): BiodataFormInput, biodataFormSchema, KeahlianFormInput, keahlianFormSchema, KeluargaFormInput, keluargaFormSchema, PelatihanFormInput, pelatihanFormSchema (+4 more)

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 46 - "jenis-keahlian.ts"
Cohesion: 0.18
Nodes (10): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse (+2 more)

### Community 47 - "jenis-kitas.ts"
Cohesion: 0.22
Nodes (9): hariLiburConfig, HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery (+1 more)

### Community 48 - "sanksi.config.ts"
Cohesion: 0.14
Nodes (15): boolOpt, sanksiConfig, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest (+7 more)

### Community 49 - "jenis-pelatihan.ts"
Cohesion: 0.22
Nodes (9): pendapatanNonPajakConfig, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse (+1 more)

### Community 50 - "pegawai-organisasi-table.tsx"
Cohesion: 0.33
Nodes (6): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, GajiBatchMasterResponse

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.14
Nodes (19): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps (+11 more)

### Community 52 - "profesi.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.08
Nodes (19): KuotaFormSheetProps, mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock, useSaveKuotaMutation(), cutiKeys (+11 more)

### Community 54 - "tunjangan.ts"
Cohesion: 0.18
Nodes (11): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+3 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.12
Nodes (17): biodataColumns, DataPegawaiClient(), pegawaiColumns, BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClientProps, STATUS_DOT (+9 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "pengajuan-form-sheet.tsx"
Cohesion: 0.19
Nodes (18): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+10 more)

### Community 60 - "login-form.tsx"
Cohesion: 0.29
Nodes (6): Data, LoginForm(), loginRequest(), useLogin(), LoginFormData, loginSchema

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
Cohesion: 0.07
Nodes (22): parameterSettingConfig, SingleResultString, KepegawaianSearchParams, SingleResultObject, ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest (+14 more)

### Community 66 - "phdp.ts"
Cohesion: 0.22
Nodes (8): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, useProfilApproval(), StatusUpdateProfil

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 69 - "crud-form.tsx"
Cohesion: 0.11
Nodes (20): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, CrudForm() (+12 more)

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.27
Nodes (7): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox()

### Community 71 - "pengajuan-klaim.test.tsx"
Cohesion: 0.11
Nodes (18): ADR-0043, MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), CURRENT_YEAR, JenisBadge() (+10 more)

### Community 72 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.29
Nodes (5): SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 73 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 74 - "kpi.ts"
Cohesion: 0.21
Nodes (11): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, useKpiForm(), UseKpiFormProps, useCreateKpi() (+3 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.21
Nodes (21): KartuIdentitasPage(), KeahlianPage(), KeluargaPage(), PelatihanPage(), PendidikanPage(), PengalamanKerjaPage(), CutiPage(), KONTRAK_COLUMNS (+13 more)

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 77 - "keahlian-form-sheet.tsx"
Cohesion: 0.33
Nodes (5): namaWajib, ProfesiInput, profesiSchema, SimpleNameInput, simpleNameSchema

### Community 78 - "persetujuan-page-client.test.tsx"
Cohesion: 0.29
Nodes (6): ADR-0001, ParameterSettingPage(), PendapatanNonPajakPage(), PegawaiSession, AppwriteUser, Prefs

### Community 79 - "change-password-form.tsx"
Cohesion: 0.21
Nodes (10): KpiFormDialog(), UploadKpiDialog(), UploadKpiDialogProps, ChangePasswordForm(), Data, schema, Input(), useUploadKpi() (+2 more)

### Community 80 - "popover.tsx"
Cohesion: 0.11
Nodes (16): FieldDate(), toDate(), toStr(), MasterSwitch(), MasterSwitchProps, buttonVariants, Calendar(), CalendarDayButton() (+8 more)

### Community 81 - "approvalStatusTone"
Cohesion: 0.14
Nodes (18): StatusBadge(), DetailApprovalDialog(), StatusBadge(), CURRENT_YEAR, PersetujuanPageClient(), PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS (+10 more)

### Community 87 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 88 - "proses-gaji-client.test.tsx"
Cohesion: 0.20
Nodes (3): MOCK_BATCH, mockSearchParams, AuthProvider()

### Community 89 - "pengajuan-page-client.test.tsx"
Cohesion: 0.23
Nodes (7): DetailTab(), Props, RingkasanPanel(), labelAgama(), labelJk(), formatDate(), PegawaiResponseRingkasan

### Community 90 - "AuthProvider"
Cohesion: 0.20
Nodes (8): AppwriteUser, PageResultPageUserResponse, PageUserResponse, Prefs, SavedResultAppwriteUser, SimpleGrantedAuthority, UserPatchStatusRequest, UsersSearchParams

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.27
Nodes (7): DashboardClient(), DashboardPage(), SectionCrudSlot(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 92 - "jenis-kitas.ts"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 93 - "riwayat-constants.ts"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 94 - "create-batch-dialog.tsx"
Cohesion: 0.38
Nodes (5): CreateBatchDialog(), CreateBatchDialogProps, FormValues, schema, useCreateBatch()

### Community 95 - "KpiClient"
Cohesion: 0.29
Nodes (3): KpiClient(), mockSearchParams, metadata

### Community 96 - "kuota-page-client.tsx"
Cohesion: 0.40
Nodes (5): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, useDeleteKuotaMutation()

### Community 97 - "rp"
Cohesion: 0.67
Nodes (4): PairCell(), rp(), SkCell(), val()

### Community 98 - "(app)/page.tsx"
Cohesion: 0.50
Nodes (3): EntityMeta, Home(), MASTER_CATEGORIES

## Knowledge Gaps
- **530 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+525 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `button.tsx`, `fromPage`, `role-permission-dialog.tsx`, `users-client.tsx`, `pendukung-layout-client.tsx`, `section-left-panel.tsx`, `dashboard-sections.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `data-pegawai-client.tsx`, `phdp.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-klaim.test.tsx`, `persetujuan-page-client.tsx`, `change-password-form.tsx`, `popover.tsx`, `approvalStatusTone`, `pengajuan-page-client.test.tsx`, `section-right-panel.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `fromPage`, `data-table.tsx`, `formatDate`, `role-permission-dialog.tsx`, `users-client.tsx`, `cn`, `pengajuan-page-client.tsx`, `useFkOptions`, `useKomponenForm.ts`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `data-pegawai-client.tsx`, `pengajuan-form-sheet.tsx`, `login-form.tsx`, `phdp.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-klaim.test.tsx`, `persetujuan-page-client.tsx`, `change-password-form.tsx`, `popover.tsx`, `approvalStatusTone`, `pengajuan-page-client.test.tsx`, `section-right-panel.tsx`, `create-batch-dialog.tsx`, `kuota-page-client.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `PageQuery` to `_shared/index.ts`, `jenis-sp.ts`, `keluarga-form-sheet.tsx`, `pengajuan.ts`, `users-client.tsx`, `master-entity-types.ts`, `pegawai.ts`, `useKomponenForm.ts`, `riwayat.ts`, `batch.ts`, `biodata.ts`, `EntityConfig`, `detail-dasar-gaji.ts`, `jenis-keahlian.ts`, `jenis-kitas.ts`, `sanksi.config.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `kuota-form-sheet.test.tsx`, `tunjangan.ts`, `kuota.ts`, `parameter-setting.ts`, `AuthProvider`, `jenis-kitas.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _530 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05026300409117475 - nodes in this community are weakly interconnected._
- **Should `keluarga-form-sheet.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10606060606060606 - nodes in this community are weakly interconnected._