# Graph Report - kepegawaian-fe  (2026-10-12)

## Corpus Check
- 463 files · ~146,390 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2161 nodes · 6767 edges · 104 communities (101 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `300f3547`
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
- KpiClient
- kuota-page-client.tsx
- (app)/page.tsx
- tambahan.schema.ts
- kuota.ts
- klaim-form-schema.ts
- data-pegawai-client.tsx
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx
- useMutasiFormQueries.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 92 edges
3. `throwIfNotOk()` - 88 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 82 edges
6. `verifySession` - 79 edges
7. `toApiParams()` - 72 edges
8. `fromPage()` - 56 edges
9. `Page` - 51 edges
10. `forbidden()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `CutiPengajuanPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/page.tsx → src/lib/auth/pegawaiSession.ts
- `CutiPersetujuanPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/cuti/persetujuan/page.tsx → src/lib/auth/pegawaiSession.ts
- `DashboardPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/page.tsx → src/lib/auth/pegawaiSession.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/pendukung-layout-client.tsx → src/lib/http-error.ts

## Import Cycles
- None detected.

## Communities (104 total, 3 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.07
Nodes (29): RolePermissionDialogProps, CreateUserDialog(), CreateUserDialogProps, RoleAssignmentDialog(), RoleAssignmentDialogProps, systemKeys, useCreateUser(), useRoleAssignment() (+21 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.07
Nodes (41): JenisBadge(), KuotaStrip(), KuotaStrip(), AlertDialogMedia(), AlertDialogOverlay(), Avatar(), AvatarBadge(), AvatarFallback() (+33 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.13
Nodes (10): CreateBatchDialog(), penggajianKeys, batchKeys, useCreateBatch(), useKpiList(), baseClient, penggajianApi, fetchMock (+2 more)

### Community 3 - "button.tsx"
Cohesion: 0.14
Nodes (29): DetailApprovalDialog(), CrudLike, Editing, SlotQuery, CreateBatchDialogProps, FormValues, schema, KpiFormDialog() (+21 more)

### Community 4 - "fromPage"
Cohesion: 0.06
Nodes (45): KARTU_COLUMNS, KartuIdentitasPage(), KEAHLIAN_COLUMNS, KeahlianPage(), TINGKAT_LABEL, KELUARGA_COLUMNS, KeluargaPage(), PELATIHAN_COLUMNS (+37 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.13
Nodes (14): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+6 more)

### Community 6 - "formatDate"
Cohesion: 0.05
Nodes (53): DnpPageClient(), formatDate(), DukPageClient(), formatDate(), Card(), CardAction(), CardContent(), CardDescription() (+45 more)

### Community 7 - "pengajuan.ts"
Cohesion: 0.18
Nodes (7): RiwayatTab(), useSaveKuotaMutation(), useCutiDetailApproval(), cutiKeys, PageResultPageCutiApprovalMiniResponse, CutiKuotaPegawaiResponse, PageResultPageCutiApprovalChainResponse

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.13
Nodes (23): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+15 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.22
Nodes (16): profilKeys, DashboardQuery, useDashboardSections(), UseDashboardSectionsReturn, useSelfKeahlianMutation(), useSelfKeluargaMutation(), useSelfPelatihanMutation(), useSelfPendidikanMutation() (+8 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.15
Nodes (9): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+1 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.04
Nodes (71): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+63 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.23
Nodes (5): masterKeys, FullSanksiPayload, api, ApiError, createApiClient()

### Community 13 - "cn"
Cohesion: 0.08
Nodes (39): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent() (+31 more)

### Community 14 - "PageQuery"
Cohesion: 0.03
Nodes (74): SingleResultString, JenisPelatihanSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse (+66 more)

### Community 15 - "hasPermission"
Cohesion: 0.18
Nodes (25): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), DNPReportPage(), DUKReportPage() (+17 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.16
Nodes (18): SectionLeftPanel(), Props, RingkasanPanel(), formatPendidikan(), HUBUNGAN_KELUARGA_INT, labelAgama(), labelHubunganKeluarga(), labelJk() (+10 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.11
Nodes (30): EntityFormModalProps, FormField, keahlianCrudConfig, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig (+22 more)

### Community 18 - "verifySession"
Cohesion: 0.11
Nodes (28): AlasanBerhentiPage(), EntityFormModal(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+20 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.16
Nodes (21): ADR-0043, CURRENT_YEAR, PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, PersetujuanClientProps, makeColumns(), UsersClient() (+13 more)

### Community 20 - "useFkOptions"
Cohesion: 0.07
Nodes (44): DataPegawaiToolbar(), labelMap(), PopoverFilterContent(), KartuIdentitasFormSheet(), normalizeFk(), KeahlianFormSheet(), normalizeFk(), KeluargaFormSheet() (+36 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.13
Nodes (21): ADR-0001, ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+13 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.30
Nodes (8): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, usePeriodeFilter(), UsePeriodeFilterOptions

### Community 23 - "pegawai.ts"
Cohesion: 0.12
Nodes (15): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+7 more)

### Community 24 - "grade.ts"
Cohesion: 0.16
Nodes (19): useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList(), useMutasiContextData(), useMutasiDetail() (+11 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.21
Nodes (9): KomponenDialog(), FormulaEditor(), JENIS_LABEL, OPERATORS, appendKode(), formatFormula(), sanitizeFormula(), KODE_ROUTES (+1 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.19
Nodes (15): SectionCrudSlotProps, PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, boolStr(), formatPeriode(), hubunganKeluarga(), jenisMutasi() (+7 more)

### Community 28 - "riwayat.ts"
Cohesion: 0.06
Nodes (46): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse (+38 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.14
Nodes (7): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RiwayatLayout(), usePegawaiSession(), SingleResultPegawaiResponseSession

### Community 30 - "master-config.ts"
Cohesion: 0.12
Nodes (30): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+22 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.07
Nodes (54): Props, Props, FormValues, Props, schema, CURRENT_YEAR, FormValues, Props (+46 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.18
Nodes (7): KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, TambahanDialog(), useBatchMasterProses(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.08
Nodes (25): BatchContext, BatchProvider(), BatchState, useBatchContext(), useDeleteBatch(), Consumer(), MOCK_BATCH, useBatchInfo() (+17 more)

### Community 34 - "master.ts"
Cohesion: 0.14
Nodes (14): Props, RiwayatSpQuery, Biodata, EnumOption, Golongan, Grade, Jabatan, JenisSpMiniResponse (+6 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.18
Nodes (10): BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClientProps, STATUS_DOT, TunjanganPage(), TunjanganClient(), DataTablePagination() (+2 more)

### Community 36 - "profile.ts"
Cohesion: 0.12
Nodes (25): HubunganKeluarga, JenisProfilUpdate, StatusPendidikanKeluarga, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest (+17 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.06
Nodes (37): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, ADR-0040 (+29 more)

### Community 38 - "command.tsx"
Cohesion: 0.22
Nodes (14): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+6 more)

### Community 39 - "biodata.ts"
Cohesion: 0.21
Nodes (23): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+15 more)

### Community 40 - "EntityConfig"
Cohesion: 0.23
Nodes (11): potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+3 more)

### Community 41 - "entity-form-modal.tsx"
Cohesion: 0.43
Nodes (6): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, useProfesiForm()

### Community 42 - "utils.ts"
Cohesion: 0.05
Nodes (54): KlaimFormSheetProps, PengajuanFormSheetProps, SignerPickerProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, CutiJenisPostRequest (+46 more)

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.25
Nodes (8): KeluargaToolbar(), biodataFormSchema, editFormFields, hubunganKeluargaFilterOptions(), hubunganKeluargaInt(), EnumArray, ENUMS, valueFromLabel()

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
Cohesion: 0.31
Nodes (5): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable()

### Community 48 - "sanksi.config.ts"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 49 - "jenis-pelatihan.ts"
Cohesion: 0.22
Nodes (9): pendapatanNonPajakConfig, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse (+1 more)

### Community 50 - "pegawai-organisasi-table.tsx"
Cohesion: 0.23
Nodes (9): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, KomponenTable(), fmtRupiah(), rupiah() (+1 more)

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.17
Nodes (17): PersetujuanClient(), TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, Skeleton() (+9 more)

### Community 52 - "profesi.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 54 - "tunjangan.ts"
Cohesion: 0.18
Nodes (11): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+3 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.16
Nodes (17): KomponenDialogProps, FormulaEditorProps, INITIAL_KOMPONEN_FORM, KodeItem, KomponenFormState, GajiBatchMasterProsesPostRequest, GajiKomponenMiniProjection, GajiKomponenPostRequest (+9 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "pengajuan-form-sheet.tsx"
Cohesion: 0.36
Nodes (8): besok(), FormValues, PengajuanFormSheet(), schema, selisihHari(), useHariKerjaQuery(), useJenisCutiList(), useSaveCutiMutation()

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
Cohesion: 0.22
Nodes (9): parameterSettingConfig, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams (+1 more)

### Community 66 - "phdp.ts"
Cohesion: 0.18
Nodes (10): KOMPONEN_COLUMNS, KomponenClient(), KomponenPage(), Entity, MASTER_ENTITIES, useKomponenSetup(), BE_PERMISSION_CATALOG, entityGate() (+2 more)

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 69 - "crud-form.tsx"
Cohesion: 0.09
Nodes (28): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, CrudForm() (+20 more)

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.28
Nodes (7): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, useProfilApproval()

### Community 71 - "pengajuan-klaim.test.tsx"
Cohesion: 0.14
Nodes (12): CutiPengajuanPage(), MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), PengajuanPageClient(), mockFetch() (+4 more)

### Community 72 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 73 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (6): FormValues, KuotaFormSheet(), numField, schema, toNum(), ListResultPegawaiListResponse

### Community 74 - "kpi.ts"
Cohesion: 0.13
Nodes (20): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, useKpiForm(), UseKpiFormProps, useCreateKpi() (+12 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.29
Nodes (6): LevelPostRequest, LevelSearchParams, ListResultLevelResponse, PageLevelResponse, PageResultPageLevelResponse, SingleResultLevelResponse

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 77 - "keahlian-form-sheet.tsx"
Cohesion: 0.33
Nodes (5): namaWajib, ProfesiInput, profesiSchema, SimpleNameInput, simpleNameSchema

### Community 78 - "persetujuan-page-client.test.tsx"
Cohesion: 0.21
Nodes (8): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil

### Community 79 - "change-password-form.tsx"
Cohesion: 0.50
Nodes (3): usePegawaiDashboard(), dashboardKeys, BiodataDashboardResponse

### Community 80 - "popover.tsx"
Cohesion: 0.50
Nodes (4): ProfilFormValues, schema, toDefaults(), useEditProfilPegawai()

### Community 81 - "approvalStatusTone"
Cohesion: 0.53
Nodes (6): StatusBadge(), StatusBadge(), StatusBadge(), StatusBadge(), approvalStatusTone(), labelApprovalStatus()

### Community 87 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 88 - "proses-gaji-client.test.tsx"
Cohesion: 0.20
Nodes (3): MOCK_BATCH, mockSearchParams, AuthProvider()

### Community 90 - "AuthProvider"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useSelfBiodataMutation()

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.24
Nodes (10): DashboardClient(), DashboardPage(), SectionCrudSlot(), Field(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem() (+2 more)

### Community 93 - "riwayat-constants.ts"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 95 - "KpiClient"
Cohesion: 0.29
Nodes (3): KpiClient(), mockSearchParams, metadata

### Community 96 - "kuota-page-client.tsx"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 98 - "(app)/page.tsx"
Cohesion: 0.12
Nodes (15): DetailApprovalDialogProps, DetailTab(), CutiPersetujuanPage(), CURRENT_YEAR, PersetujuanPageClient(), PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS (+7 more)

### Community 101 - "kuota.ts"
Cohesion: 0.17
Nodes (11): KuotaFormSheetProps, CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+3 more)

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.44
Nodes (7): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), useKlaimCutiMutation()

### Community 106 - "data-pegawai-client.tsx"
Cohesion: 0.39
Nodes (6): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai()

### Community 107 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.29
Nodes (5): SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 109 - "edit-profil-sheet.test.tsx"
Cohesion: 0.29
Nodes (5): SheetEditProfil(), MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 110 - "useMutasiFormQueries.ts"
Cohesion: 0.38
Nodes (6): MutasiFormSheet(), normalizeFk(), useJabatanProfesiCascade(), useMutasiFormQueries(), SingleResultRiwayatMutasiQuery, SingleResultPegawaiResponseMutasiContext

## Knowledge Gaps
- **561 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+556 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `button.tsx`, `fromPage`, `formatDate`, `role-permission-dialog.tsx`, `pendukung-layout-client.tsx`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `sidebar-utils.ts`, `proses-gaji-client.tsx`, `command.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `kuota.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `approvalStatusTone`, `section-right-panel.tsx`, `(app)/page.tsx`, `useMutasiFormQueries.ts`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `jenis-sp.ts`, `fromPage`, `formatDate`, `role-permission-dialog.tsx`, `cn`, `section-left-panel.tsx`, `verifySession`, `pengajuan-page-client.tsx`, `useFkOptions`, `useKomponenForm.ts`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `sidebar-utils.ts`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `jenis-kitas.ts`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `kuota.ts`, `pengajuan-form-sheet.tsx`, `login-form.tsx`, `phdp.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `edit-profil-sheet.test.tsx`, `section-right-panel.tsx`, `(app)/page.tsx`, `klaim-form-schema.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `PageQuery` to `_shared/index.ts`, `formatDate`, `master-entity-types.ts`, `pegawai.ts`, `riwayat.ts`, `batch.ts`, `biodata.ts`, `EntityConfig`, `utils.ts`, `jenis-keahlian.ts`, `sanksi.config.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `tunjangan.ts`, `data-pegawai-client.tsx`, `parameter-setting.ts`, `edit-gaji-sheet.test.tsx`, `kpi.ts`, `persetujuan-page-client.tsx`, `persetujuan-page-client.test.tsx`, `kuota-page-client.tsx`, `kuota.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _561 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06914893617021277 - nodes in this community are weakly interconnected._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06767676767676768 - nodes in this community are weakly interconnected._
- **Should `keluarga-form-sheet.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._