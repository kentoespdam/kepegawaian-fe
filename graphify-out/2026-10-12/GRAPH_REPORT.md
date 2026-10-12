# Graph Report - kepegawaian-fe  (2026-10-09)

## Corpus Check
- 459 files · ~146,404 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2156 nodes · 6759 edges · 113 communities (111 shown, 2 thin omitted)
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
- create-batch-dialog.tsx
- KpiClient
- kuota-page-client.tsx
- rp
- (app)/page.tsx
- tambahan.schema.ts
- TambahanDialog
- kuota.ts
- mutasi-client.tsx
- input-group.tsx
- api.ts
- klaim-form-schema.ts
- data-pegawai-client.tsx
- edit-gaji-sheet.test.tsx
- useLaporanDnp.ts
- edit-profil-sheet.test.tsx
- useMutasiFormQueries.ts
- PrefRole
- (app)/page.tsx

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
- `DashboardPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/page.tsx → src/lib/auth/pegawaiSession.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/pendukung-layout-client.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/riwayat-layout-client.tsx → src/lib/utils.ts
- `RiwayatLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/riwayat-layout-client.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (113 total, 2 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.15
Nodes (10): RoleAssignmentDialog(), systemKeys, useRoleAssignment(), ListResultPrefRole, PagePrefRole, PageResultPagePrefRole, PrefRoleStoreRequest, PrefRoleUpdateRequest (+2 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.07
Nodes (41): JenisBadge(), KuotaStrip(), KuotaStrip(), AlertDialogMedia(), AlertDialogOverlay(), Avatar(), AvatarBadge(), AvatarFallback() (+33 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.19
Nodes (7): useKpiList(), createApiClient(), baseClient, penggajianApi, fetchMock, PageResultPageGajiBatchMasterResponse, GajiKpiUploadResponse

### Community 3 - "button.tsx"
Cohesion: 0.13
Nodes (35): DetailApprovalDialog(), DetailApprovalDialogProps, CrudLike, Editing, SlotQuery, TerminasiFormSheet(), CreateBatchDialogProps, FormValues (+27 more)

### Community 4 - "fromPage"
Cohesion: 0.07
Nodes (22): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, BadgeItem, BadgeManager() (+14 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.20
Nodes (19): EntityFormModal(), KOMPONEN_COLUMNS, ProfilDialog(), ParameterSettingClient(), PendapatanNonPajakClient(), PotonganTkkClient(), cellContent(), DataTable() (+11 more)

### Community 6 - "formatDate"
Cohesion: 0.06
Nodes (33): KenaikanBerkalaResponse, KepegawaianSearchParams, KontrakResponse, LtaCountResponse, LtaResponse, SingleResultListDnpResponse, SingleResultListDukResponse, SingleResultListKenaikanBerkalaResponse (+25 more)

### Community 7 - "pengajuan.ts"
Cohesion: 0.14
Nodes (13): RiwayatTab(), useCutiDetailApproval(), cutiKeys, PageResultPageCutiApprovalMiniResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanPostRequest, CutiPengajuanPutRequest, KlaimCuti (+5 more)

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.15
Nodes (15): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+7 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.15
Nodes (19): keluargaMutationUrl, pelatihanMutationUrl, pendidikanMutationUrl, pengalamanKerjaMutationUrl, dashboardKeys, DashboardQuery, useDashboardSections(), UseDashboardSectionsReturn (+11 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.09
Nodes (14): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+6 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.05
Nodes (58): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+50 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.20
Nodes (7): masterKeys, ProfilFormValues, schema, toDefaults(), FullSanksiPayload, api, ApiError

### Community 13 - "cn"
Cohesion: 0.07
Nodes (40): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent() (+32 more)

### Community 14 - "PageQuery"
Cohesion: 0.04
Nodes (64): ApprovalSearchParams, PengajuanSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse (+56 more)

### Community 15 - "hasPermission"
Cohesion: 0.15
Nodes (16): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), DNPReportPage(), DUKReportPage() (+8 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.10
Nodes (32): Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), biodataFormSchema, editFormFields, usePegawaiDashboard() (+24 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.13
Nodes (26): EntityFormModalProps, FormField, keahlianCrudConfig, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig (+18 more)

### Community 18 - "verifySession"
Cohesion: 0.11
Nodes (22): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+14 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.15
Nodes (22): ADR-0043, CURRENT_YEAR, PengajuanPageClient(), PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, TambahanClientProps, ReprocessButton() (+14 more)

### Community 20 - "useFkOptions"
Cohesion: 0.14
Nodes (23): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), Props, FormValues (+15 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.16
Nodes (17): ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession() (+9 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.30
Nodes (8): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, usePeriodeFilter(), UsePeriodeFilterOptions

### Community 23 - "pegawai.ts"
Cohesion: 0.10
Nodes (19): Props, TerminasiFormValues, terminasiSchema, GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse (+11 more)

### Community 24 - "grade.ts"
Cohesion: 0.11
Nodes (35): useCutiPersetujuanList(), useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail() (+27 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.19
Nodes (10): KomponenDialog(), FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula(), sanitizeFormula() (+2 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.18
Nodes (16): SectionCrudSlotProps, PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, boolStr(), fetchSection(), formatPeriode(), hubunganKeluarga() (+8 more)

### Community 28 - "riwayat.ts"
Cohesion: 0.06
Nodes (45): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse (+37 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.20
Nodes (15): DnpPageClient(), formatDate(), DukPageClient(), formatDate(), Card(), CardAction(), CardContent(), CardDescription() (+7 more)

### Community 30 - "master-config.ts"
Cohesion: 0.13
Nodes (28): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+20 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.06
Nodes (57): Props, SheetEditProfil(), FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, CURRENT_YEAR (+49 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.17
Nodes (8): KomponenTable(), KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, TambahanDialog(), useBatchMasterProses(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.08
Nodes (26): BatchContext, BatchProvider(), BatchState, useBatchContext(), penggajianKeys, batchKeys, useRollbackBatch(), Consumer() (+18 more)

### Community 34 - "master.ts"
Cohesion: 0.18
Nodes (10): Biodata, EnumOption, Golongan, Grade, Jabatan, KodePajak, ListResultEnumOption, Organisasi (+2 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.16
Nodes (14): CreateBatchDialog(), BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClient(), ProsesGajiClientProps, STATUS_DOT, BATCH_COLUMNS (+6 more)

### Community 36 - "profile.ts"
Cohesion: 0.12
Nodes (25): HubunganKeluarga, JenisProfilUpdate, StatusPendidikanKeluarga, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest (+17 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.06
Nodes (24): CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, ADR-0040, YEAR_OPTIONS, KONTRAK_COLUMNS, rp(), SK_COLUMNS (+16 more)

### Community 38 - "command.tsx"
Cohesion: 0.30
Nodes (11): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+3 more)

### Community 39 - "biodata.ts"
Cohesion: 0.21
Nodes (22): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPostRequest (+14 more)

### Community 40 - "EntityConfig"
Cohesion: 0.18
Nodes (15): SignerPickerProps, potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, PegawaiListResponse, PegawaiPatchGaji, RiwayatSkResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest (+7 more)

### Community 41 - "entity-form-modal.tsx"
Cohesion: 0.24
Nodes (8): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKCombobox(), Textarea(), useProfesiForm()

### Community 42 - "utils.ts"
Cohesion: 0.24
Nodes (13): KlaimFormSheetProps, PengajuanFormSheetProps, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatSpQuery (+5 more)

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.06
Nodes (24): SingleResultString, JenisKeahlianListResponse, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery, JenisPelatihanListResponse (+16 more)

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
Cohesion: 0.31
Nodes (7): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, fmtRupiah(), GajiBatchMasterResponse

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.18
Nodes (13): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, VerifyButton() (+5 more)

### Community 52 - "profesi.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 54 - "tunjangan.ts"
Cohesion: 0.19
Nodes (11): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+3 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.18
Nodes (16): KomponenDialogProps, INITIAL_KOMPONEN_FORM, KodeItem, KomponenFormState, GajiBatchMasterProsesPostRequest, GajiKomponenMiniProjection, GajiKomponenPostRequest, GajiKomponenPutRequest (+8 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "pengajuan-form-sheet.tsx"
Cohesion: 0.38
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
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 66 - "phdp.ts"
Cohesion: 0.14
Nodes (17): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, SanksiManager(), SanksiManagerProps (+9 more)

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 69 - "crud-form.tsx"
Cohesion: 0.08
Nodes (31): FormValues, KuotaFormSheet(), KuotaFormSheetProps, numField, schema, toNum(), CURRENT_YEAR, KuotaImportDialog() (+23 more)

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.10
Nodes (16): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues, normalizeFk() (+8 more)

### Community 71 - "pengajuan-klaim.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson()

### Community 72 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 73 - "edit-profil-sheet.test.tsx"
Cohesion: 0.35
Nodes (6): ADR-0001, TunjanganPage(), PegawaiSession, AppwriteUser, Prefs, PegawaiResponseDetail

### Community 74 - "kpi.ts"
Cohesion: 0.13
Nodes (20): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, useKpiForm(), UseKpiFormProps, useCreateKpi() (+12 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.21
Nodes (21): KartuIdentitasPage(), KeahlianPage(), KeluargaPage(), PelatihanPage(), PendidikanPage(), PENGALAMAN_KOLOM, PengalamanKerjaPage(), CutiPage() (+13 more)

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
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 80 - "popover.tsx"
Cohesion: 0.27
Nodes (6): CutiPengajuanPage(), CutiPersetujuanPage(), PersetujuanPage(), ProsesGajiPage(), VerifikasiPage(), getPegawaiSession

### Community 81 - "approvalStatusTone"
Cohesion: 0.53
Nodes (6): StatusBadge(), StatusBadge(), StatusBadge(), StatusBadge(), approvalStatusTone(), labelApprovalStatus()

### Community 87 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 88 - "proses-gaji-client.test.tsx"
Cohesion: 0.20
Nodes (3): MOCK_BATCH, mockSearchParams, AuthProvider()

### Community 89 - "pengajuan-page-client.test.tsx"
Cohesion: 0.20
Nodes (7): RolesClient(), makeColumns(), UsersClient(), useUserList(), useAllPermissions(), useAllRoles(), ListResultPrefPermission

### Community 90 - "AuthProvider"
Cohesion: 0.18
Nodes (11): CreateUserDialog(), useCreateUser(), AppwriteUser, AuthPostRequest, PageResultPageUserResponse, PageUserResponse, Prefs, SavedResultAppwriteUser (+3 more)

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.23
Nodes (9): DashboardClient(), DashboardPage(), SectionCrudSlot(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger() (+1 more)

### Community 92 - "jenis-kitas.ts"
Cohesion: 0.22
Nodes (9): golonganConfig, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+1 more)

### Community 93 - "riwayat-constants.ts"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 94 - "create-batch-dialog.tsx"
Cohesion: 0.31
Nodes (8): FieldDate(), toDate(), toStr(), buttonVariants, Calendar(), Popover(), PopoverContent(), PopoverTrigger()

### Community 95 - "KpiClient"
Cohesion: 0.29
Nodes (3): KpiClient(), mockSearchParams, metadata

### Community 96 - "kuota-page-client.tsx"
Cohesion: 0.22
Nodes (9): jenisKitasConfig, JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery (+1 more)

### Community 98 - "(app)/page.tsx"
Cohesion: 0.12
Nodes (16): DetailTab(), CURRENT_YEAR, PersetujuanPageClient(), PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS, STATUS_OPTIONS, mockFetch() (+8 more)

### Community 100 - "TambahanDialog"
Cohesion: 0.22
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 101 - "kuota.ts"
Cohesion: 0.20
Nodes (9): CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse, PageResultCutiKuotaPegawaiResponse, SingleResultCutiKuotaResponse (+1 more)

### Community 102 - "mutasi-client.tsx"
Cohesion: 0.33
Nodes (5): MUTASI_COLUMNS, PairCell(), rp(), SkCell(), val()

### Community 103 - "input-group.tsx"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 104 - "api.ts"
Cohesion: 0.22
Nodes (8): DeletedResult, PageableObject, SavedResultListLong, SavedResultLong, SavedResultString, SingleResultInteger, SortObject, HttpStatusText

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.43
Nodes (6): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet()

### Community 106 - "data-pegawai-client.tsx"
Cohesion: 0.39
Nodes (6): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai()

### Community 107 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.29
Nodes (5): SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 108 - "useLaporanDnp.ts"
Cohesion: 0.39
Nodes (5): laporanKeys, useLaporanDuk(), handle(), DnpResponse, DukResponse

### Community 109 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 110 - "useMutasiFormQueries.ts"
Cohesion: 0.38
Nodes (6): MutasiFormSheet(), normalizeFk(), useJabatanProfesiCascade(), useMutasiFormQueries(), SingleResultRiwayatMutasiQuery, SingleResultPegawaiResponseMutasiContext

### Community 111 - "PrefRole"
Cohesion: 0.33
Nodes (6): RolePermissionDialogProps, CreateUserDialogProps, RoleAssignmentDialogProps, PrefPermission, PrefRole, UserResponse

### Community 112 - "(app)/page.tsx"
Cohesion: 0.50
Nodes (3): EntityMeta, Home(), MASTER_CATEGORIES

## Knowledge Gaps
- **561 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+556 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `button.tsx`, `fromPage`, `data-table.tsx`, `role-permission-dialog.tsx`, `pendukung-layout-client.tsx`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `sidebar-utils.ts`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `kuota.ts`, `phdp.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `approvalStatusTone`, `pengajuan-page-client.test.tsx`, `section-right-panel.tsx`, `create-batch-dialog.tsx`, `(app)/page.tsx`, `input-group.tsx`, `useMutasiFormQueries.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `jenis-sp.ts`, `fromPage`, `data-table.tsx`, `role-permission-dialog.tsx`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `useKomponenForm.ts`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `sidebar-utils.ts`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `kuota.ts`, `pengajuan-form-sheet.tsx`, `login-form.tsx`, `phdp.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `persetujuan-page-client.tsx`, `change-password-form.tsx`, `section-right-panel.tsx`, `create-batch-dialog.tsx`, `(app)/page.tsx`, `mutasi-client.tsx`, `input-group.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `PageQuery` to `_shared/index.ts`, `formatDate`, `pengajuan.ts`, `master-entity-types.ts`, `pegawai.ts`, `riwayat.ts`, `batch.ts`, `biodata.ts`, `EntityConfig`, `utils.ts`, `detail-dasar-gaji.ts`, `jenis-keahlian.ts`, `jenis-kitas.ts`, `sanksi.config.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `tunjangan.ts`, `data-pegawai-client.tsx`, `parameter-setting.ts`, `edit-gaji-sheet.test.tsx`, `kpi.ts`, `persetujuan-page-client.test.tsx`, `AuthProvider`, `jenis-kitas.ts`, `kuota-page-client.tsx`, `TambahanDialog`, `kuota.ts`, `api.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _561 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06767676767676768 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12542372881355932 - nodes in this community are weakly interconnected._
- **Should `fromPage` be split into smaller, more focused modules?**
  _Cohesion score 0.0660377358490566 - nodes in this community are weakly interconnected._