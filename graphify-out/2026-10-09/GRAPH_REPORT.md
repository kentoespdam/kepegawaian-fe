# Graph Report - kepegawaian-fe  (2026-10-09)

## Corpus Check
- 456 files · ~145,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2148 nodes · 6724 edges · 101 communities (97 shown, 4 thin omitted)
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

## Communities (101 total, 4 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.10
Nodes (19): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+11 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.07
Nodes (38): JenisBadge(), KuotaStrip(), DetailApprovalDialog(), KuotaStrip(), MasterSwitch(), MasterSwitchProps, AlertDialogMedia(), AlertDialogOverlay() (+30 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.29
Nodes (6): createApiClient(), baseClient, penggajianApi, fetchMock, PageResultPageGajiBatchMasterResponse, GajiKpiUploadResponse

### Community 3 - "button.tsx"
Cohesion: 0.13
Nodes (32): DetailApprovalDialogProps, DetailTab(), RiwayatTab(), CrudLike, Editing, SlotQuery, CreateBatchDialog(), CreateBatchDialogProps (+24 more)

### Community 4 - "fromPage"
Cohesion: 0.06
Nodes (26): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, BadgeItem, BadgeManager() (+18 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.12
Nodes (21): EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), KomponenPage(), ParameterSettingPage(), ParameterSettingClient(), PendapatanNonPajakPage(), PendapatanNonPajakClient() (+13 more)

### Community 6 - "formatDate"
Cohesion: 0.06
Nodes (35): DnpResponse, DukResponse, KenaikanBerkalaResponse, KepegawaianSearchParams, KontrakResponse, LtaCountResponse, LtaResponse, SingleResultListDnpResponse (+27 more)

### Community 7 - "pengajuan.ts"
Cohesion: 0.11
Nodes (23): SignerPickerProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisResponse, CutiPengajuanKlaimPostRequest (+15 more)

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.08
Nodes (37): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+29 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.15
Nodes (19): keluargaMutationUrl, pendidikanMutationUrl, pengalamanKerjaMutationUrl, dashboardKeys, DashboardQuery, useDashboardSections(), UseDashboardSectionsReturn, useSelfKeahlianMutation() (+11 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.15
Nodes (9): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+1 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.06
Nodes (51): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+43 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.20
Nodes (9): SheetEditProfil(), masterKeys, ProfilFormValues, schema, toDefaults(), useEditProfilPegawai(), FullSanksiPayload, api (+1 more)

### Community 13 - "cn"
Cohesion: 0.08
Nodes (35): SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+27 more)

### Community 14 - "PageQuery"
Cohesion: 0.04
Nodes (53): CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse, JenisPelatihanSearchParams (+45 more)

### Community 15 - "hasPermission"
Cohesion: 0.16
Nodes (26): CutiKuotaPage(), CutiPengajuanPage(), CutiPersetujuanPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage() (+18 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.10
Nodes (34): Field(), SectionLeftPanel(), KeluargaToolbar(), rp(), val(), Props, RingkasanPanel(), biodataFormSchema (+26 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.12
Nodes (27): EntityFormModalProps, FormField, keahlianCrudConfig, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig (+19 more)

### Community 18 - "verifySession"
Cohesion: 0.15
Nodes (19): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+11 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.17
Nodes (20): ADR-0043, CURRENT_YEAR, PengajuanPageClient(), PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, makeColumns(), UsersClient() (+12 more)

### Community 20 - "useFkOptions"
Cohesion: 0.12
Nodes (27): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, schema (+19 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.08
Nodes (31): ADR-0001, ADR-0010, ADR-0041, SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson() (+23 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.22
Nodes (11): STATUS_BADGE, STATUS_LABEL, VerifikasiClientProps, getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect() (+3 more)

### Community 23 - "pegawai.ts"
Cohesion: 0.12
Nodes (16): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+8 more)

### Community 24 - "grade.ts"
Cohesion: 0.16
Nodes (19): useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList(), useMutasiContextData(), useMutasiDetail() (+11 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.18
Nodes (14): KomponenDialog(), FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula(), INITIAL_KOMPONEN_FORM (+6 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.17
Nodes (17): SectionCrudSlotProps, PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, SignerPicker(), boolStr(), fetchSection(), formatPeriode() (+9 more)

### Community 28 - "riwayat.ts"
Cohesion: 0.05
Nodes (52): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse (+44 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.22
Nodes (13): DnpPageClient(), DukPageClient(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader() (+5 more)

### Community 30 - "master-config.ts"
Cohesion: 0.14
Nodes (25): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+17 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.10
Nodes (41): Props, Props, FormValues, Props, schema, CURRENT_YEAR, FormValues, Props (+33 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.20
Nodes (8): KomponenTable(), KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, useBatchMasterProses(), fmtRupiah(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.08
Nodes (24): BatchContext, BatchProvider(), BatchState, useBatchContext(), penggajianKeys, batchKeys, Consumer(), MOCK_BATCH (+16 more)

### Community 34 - "master.ts"
Cohesion: 0.17
Nodes (11): Props, Biodata, EnumOption, Golongan, Grade, Jabatan, KodePajak, ListResultEnumOption (+3 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.16
Nodes (6): ReprocessButton(), VerifyButton(), useBatchAction(), useDeleteBatch(), useReprocessBatch(), GajiBatchRootProcessRequest

### Community 36 - "profile.ts"
Cohesion: 0.13
Nodes (21): JenisProfilUpdate, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest, KeahlianPostRequest, KeahlianPutRequest (+13 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.05
Nodes (56): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, CURRENT_YEAR, PersetujuanPageClient(), PersetujuanPageClientProps, RW_OPTIONS (+48 more)

### Community 38 - "command.tsx"
Cohesion: 0.22
Nodes (14): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+6 more)

### Community 39 - "biodata.ts"
Cohesion: 0.18
Nodes (27): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+19 more)

### Community 40 - "EntityConfig"
Cohesion: 0.23
Nodes (11): potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+3 more)

### Community 41 - "entity-form-modal.tsx"
Cohesion: 0.10
Nodes (21): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps, sanksiDefaults() (+13 more)

### Community 42 - "utils.ts"
Cohesion: 0.13
Nodes (15): KartuIdentitasDetail, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, JenisKeahlianResponse, KeahlianDetail, KeahlianQuery (+7 more)

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.06
Nodes (24): SingleResultString, ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery (+16 more)

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
Nodes (14): boolOpt, sanksiConfig, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest (+6 more)

### Community 49 - "jenis-pelatihan.ts"
Cohesion: 0.22
Nodes (9): pendapatanNonPajakConfig, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse (+1 more)

### Community 50 - "pegawai-organisasi-table.tsx"
Cohesion: 0.33
Nodes (6): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, GajiBatchMasterResponse

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.21
Nodes (15): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, VerifikasiClient(), Skeleton(), BATCH_COLUMNS, STATUS_BADGE (+7 more)

### Community 52 - "profesi.ts"
Cohesion: 0.08
Nodes (27): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanQuery, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery (+19 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.09
Nodes (22): FormValues, KuotaFormSheet(), KuotaFormSheetProps, numField, schema, mockFetch(), okJson(), pickDateByLabel() (+14 more)

### Community 54 - "tunjangan.ts"
Cohesion: 0.19
Nodes (11): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+3 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.14
Nodes (7): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RiwayatLayout(), usePegawaiSession(), SingleResultPegawaiResponseSession

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.21
Nodes (12): KomponenDialogProps, GajiBatchMasterProsesPostRequest, GajiKomponenPostRequest, GajiKomponenPutRequest, GajiKomponenResponse, KomponenSearchParams, ListResultGajiKomponenMiniProjection, PageGajiKomponenResponse (+4 more)

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
Cohesion: 0.22
Nodes (9): parameterSettingConfig, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams (+1 more)

### Community 66 - "phdp.ts"
Cohesion: 0.24
Nodes (8): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, DataTableToolbar(), useProfilApproval()

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 69 - "crud-form.tsx"
Cohesion: 0.28
Nodes (5): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, useImportKuotaMutation()

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.15
Nodes (13): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues, normalizeFk() (+5 more)

### Community 71 - "pengajuan-klaim.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson()

### Community 72 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.27
Nodes (9): AppShell(), MODULE_ENTITY_MAP, MODULES, Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities() (+1 more)

### Community 73 - "edit-profil-sheet.test.tsx"
Cohesion: 0.20
Nodes (10): gradeConfig, GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery (+2 more)

### Community 74 - "kpi.ts"
Cohesion: 0.17
Nodes (13): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, UseKpiFormProps, GajiKpiResponse, KpiSearchParams (+5 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.16
Nodes (24): biodataColumns, DataPegawaiClient(), pegawaiColumns, KartuIdentitasPage(), KeahlianPage(), KeluargaPage(), PelatihanPage(), PendidikanPage() (+16 more)

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
Cohesion: 0.29
Nodes (6): ChangePasswordForm(), Data, schema, ProfilPage(), changePassword(), useChangePassword()

### Community 80 - "popover.tsx"
Cohesion: 0.07
Nodes (25): KartuIdentitasFormSheet(), normalizeFk(), KeahlianFormSheet(), normalizeFk(), KeluargaFormSheet(), normalizeFk(), normalizeFk(), PelatihanFormSheet() (+17 more)

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
Cohesion: 0.25
Nodes (8): KpiFormDialog(), UploadKpiDialog(), useKpiForm(), useCreateKpi(), useUpdateKpi(), useUploadKpi(), GajiKpiPostRequest, GajiKpiPutRequest

### Community 90 - "AuthProvider"
Cohesion: 0.12
Nodes (16): CreateUserDialog(), RoleAssignmentDialog(), RoleAssignmentDialogProps, useCreateUser(), useRoleAssignment(), useUserList(), AppwriteUser, AuthPostRequest (+8 more)

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.23
Nodes (9): DashboardClient(), DashboardPage(), SectionCrudSlot(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger() (+1 more)

### Community 92 - "jenis-kitas.ts"
Cohesion: 0.22
Nodes (9): golonganConfig, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+1 more)

### Community 93 - "riwayat-constants.ts"
Cohesion: 0.18
Nodes (14): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), Props, schema, normalizeFk(), useJabatanProfesiCascade(), useMutasiFormQueries() (+6 more)

### Community 94 - "create-batch-dialog.tsx"
Cohesion: 0.29
Nodes (6): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanDetail, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 95 - "KpiClient"
Cohesion: 0.21
Nodes (5): KpiClient(), mockSearchParams, metadata, useKpiList(), useDeleteKpi()

### Community 96 - "kuota-page-client.tsx"
Cohesion: 0.33
Nodes (5): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaQuery, PengalamanKerjaSearchParams, SingleResultPengalamanKerjaDetail

## Knowledge Gaps
- **563 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+558 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `button.tsx`, `fromPage`, `role-permission-dialog.tsx`, `pendukung-layout-client.tsx`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `kuota.ts`, `phdp.ts`, `kontrak-form-sheet.tsx`, `edit-gaji-sheet.test.tsx`, `popover.tsx`, `approvalStatusTone`, `section-right-panel.tsx`, `riwayat-constants.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `jenis-sp.ts`, `fromPage`, `data-table.tsx`, `role-permission-dialog.tsx`, `cn`, `section-left-panel.tsx`, `verifySession`, `pengajuan-page-client.tsx`, `useFkOptions`, `components/periode-filter.tsx`, `useKomponenForm.ts`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `kuota-form-sheet.test.tsx`, `pdf-viewer.test.tsx`, `pengajuan-form-sheet.tsx`, `login-form.tsx`, `phdp.ts`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `persetujuan-page-client.tsx`, `change-password-form.tsx`, `AuthProvider`, `section-right-panel.tsx`, `riwayat-constants.ts`, `KpiClient`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `Page` connect `PageQuery` to `_shared/index.ts`, `pengajuan.ts`, `role-permission-dialog.tsx`, `master-entity-types.ts`, `pegawai.ts`, `sidebar.tsx`, `riwayat.ts`, `batch.ts`, `proses-gaji-client.tsx`, `biodata.ts`, `EntityConfig`, `utils.ts`, `detail-dasar-gaji.ts`, `jenis-keahlian.ts`, `jenis-kitas.ts`, `sanksi.config.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `kuota-form-sheet.test.tsx`, `tunjangan.ts`, `data-pegawai-client.tsx`, `parameter-setting.ts`, `edit-profil-sheet.test.tsx`, `kpi.ts`, `persetujuan-page-client.tsx`, `persetujuan-page-client.test.tsx`, `AuthProvider`, `jenis-kitas.ts`, `create-batch-dialog.tsx`, `KpiClient`, `kuota-page-client.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _563 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10276679841897234 - nodes in this community are weakly interconnected._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07198228128460686 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12895927601809956 - nodes in this community are weakly interconnected._