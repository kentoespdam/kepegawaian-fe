# Graph Report - kepegawaian-fe  (2026-10-05)

## Corpus Check
- 446 files · ~142,877 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2092 nodes · 6597 edges · 91 communities (87 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d6c18eed`
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
3. `throwIfNotOk()` - 88 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 78 edges
6. `verifySession` - 75 edges
7. `toApiParams()` - 72 edges
8. `fromPage()` - 56 edges
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
Nodes (50): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+42 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.15
Nodes (18): besok(), FormValues, PengajuanFormSheet(), schema, selisihHari(), KartuIdentitasFormSheet(), normalizeFk(), KeahlianFormSheet() (+10 more)

### Community 3 - "button.tsx"
Cohesion: 0.12
Nodes (35): CURRENT_YEAR, KuotaImportDialogProps, YEAR_OPTIONS, DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), CrudLike, Editing (+27 more)

### Community 4 - "fromPage"
Cohesion: 0.07
Nodes (21): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, LampiranCard(), LampiranCardProps (+13 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.20
Nodes (17): EntityFormModal(), KOMPONEN_COLUMNS, ParameterSettingClient(), PendapatanNonPajakClient(), PotonganTkkClient(), TunjanganClient(), ConfirmDeleteDialog(), ConfirmDeleteDialogProps (+9 more)

### Community 6 - "formatDate"
Cohesion: 0.17
Nodes (10): PersetujuanPageClient(), RW_OPTIONS, mockFetch(), okJson(), TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId (+2 more)

### Community 7 - "pengajuan.ts"
Cohesion: 0.07
Nodes (28): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+20 more)

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.11
Nodes (26): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+18 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.08
Nodes (26): CreateUserDialog(), CreateUserDialogProps, RoleAssignmentDialog(), RoleAssignmentDialogProps, systemKeys, useCreateUser(), useRoleAssignment(), useUserList() (+18 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.09
Nodes (15): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+7 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.04
Nodes (73): MasterEntityTypes, RiwayatTerminasiQuery, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery (+65 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.11
Nodes (18): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), Props, schema, FormValues, Props, schema (+10 more)

### Community 13 - "cn"
Cohesion: 0.06
Nodes (44): JenisBadge(), KuotaStrip(), KuotaStrip(), MasterSwitch(), MasterSwitchProps, AlertDialogMedia(), AlertDialogOverlay(), Breadcrumb() (+36 more)

### Community 14 - "PageQuery"
Cohesion: 0.06
Nodes (25): SingleResultString, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse (+17 more)

### Community 15 - "hasPermission"
Cohesion: 0.11
Nodes (23): CutiKuotaPage(), CutiPengajuanPage(), CutiPersetujuanPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage() (+15 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.07
Nodes (43): DashboardClient(), DashboardPage(), SectionCrudSlot(), Field(), SectionLeftPanel(), SectionRightPanel(), KeluargaToolbar(), Props (+35 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.05
Nodes (66): SectionCrudSlotProps, SignerPicker(), EntityFormModalProps, FormField, keahlianCrudConfig, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl (+58 more)

### Community 18 - "verifySession"
Cohesion: 0.12
Nodes (24): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+16 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.14
Nodes (23): ADR-0043, CURRENT_YEAR, PengajuanPageClient(), PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, makeColumns(), UsersClient() (+15 more)

### Community 20 - "useFkOptions"
Cohesion: 0.13
Nodes (26): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), SheetEditProfil(), FormValues (+18 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.13
Nodes (22): ADR-0001, ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+14 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.21
Nodes (9): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, useKpiList(), usePeriodeFilter() (+1 more)

### Community 23 - "pegawai.ts"
Cohesion: 0.12
Nodes (15): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+7 more)

### Community 24 - "grade.ts"
Cohesion: 0.10
Nodes (31): KuotaPageClient(), RiwayatTab(), useCutiKuotaList(), useDeleteKuotaMutation(), useSaveKuotaMutation(), useCutiDetailApproval(), useCutiPersetujuanList(), usePegawaiSession() (+23 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.10
Nodes (26): KomponenDialog(), KomponenDialogProps, FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula() (+18 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.10
Nodes (24): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+16 more)

### Community 28 - "riwayat.ts"
Cohesion: 0.06
Nodes (45): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse (+37 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.16
Nodes (8): FileCell(), isImage(), isPdf(), SP_COLUMNS, DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter()

### Community 30 - "master-config.ts"
Cohesion: 0.13
Nodes (27): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+19 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.10
Nodes (35): FormValues, KuotaFormSheet(), numField, schema, toNum(), Props, Props, FormValues (+27 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.16
Nodes (8): KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, penggajianKeys, batchKeys, useBatchMasterProses(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.08
Nodes (25): BatchContext, BatchProvider(), BatchState, useBatchContext(), useDeleteBatch(), Consumer(), MOCK_BATCH, useBatchInfo() (+17 more)

### Community 34 - "master.ts"
Cohesion: 0.14
Nodes (14): Props, RiwayatSpQuery, Biodata, EnumOption, Golongan, Grade, Jabatan, JenisSpMiniResponse (+6 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.15
Nodes (20): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SidebarContent(), SidebarFooter(), SidebarHeader() (+12 more)

### Community 36 - "profile.ts"
Cohesion: 0.12
Nodes (25): HubunganKeluarga, JenisProfilUpdate, StatusPendidikanKeluarga, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest (+17 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.08
Nodes (37): CURRENT_YEAR, ADR-0040, YEAR_OPTIONS, CURRENT_YEAR, PersetujuanPageClientProps, STATUS_ICONS, STATUS_OPTIONS, YEAR_OPTIONS (+29 more)

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
Cohesion: 0.09
Nodes (24): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps, sanksiDefaults() (+16 more)

### Community 42 - "utils.ts"
Cohesion: 0.18
Nodes (7): TerminasiFormSheet(), useTerminasiForm(), HttpError, RFC-7807, TerminasiFormValues, terminasiSchema, ListResultPegawaiListResponse

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.07
Nodes (31): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, KepegawaianSearchParams, SingleResultObject, JenisKeahlianSearchParams (+23 more)

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
Cohesion: 0.27
Nodes (8): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, KomponenTable(), fmtRupiah(), GajiBatchMasterResponse

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.14
Nodes (20): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps (+12 more)

### Community 52 - "profesi.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.10
Nodes (16): KuotaFormSheetProps, mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock, CutiKuotaImportRequest, CutiKuotaPostRequest (+8 more)

### Community 54 - "tunjangan.ts"
Cohesion: 0.17
Nodes (13): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, RiwayatSkResponse, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject (+5 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.20
Nodes (9): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery (+1 more)

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.36
Nodes (6): biodataColumns, pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai(), PegawaiTableResponse

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "pengajuan-form-sheet.tsx"
Cohesion: 0.32
Nodes (10): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, PengajuanFormSheetProps (+2 more)

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
Cohesion: 0.28
Nodes (7): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, useProfilApproval()

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

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
Cohesion: 0.08
Nodes (31): SignerPickerProps, KpiFormDialog(), KpiFormDialogProps, UploadKpiDialog(), KpiClient(), mockSearchParams, metadata, KPI_COLUMNS (+23 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.15
Nodes (23): DataPegawaiClient(), KartuIdentitasPage(), KeahlianPage(), KeluargaPage(), PelatihanPage(), PendidikanPage(), PENGALAMAN_KOLOM, PengalamanKerjaPage() (+15 more)

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 77 - "keahlian-form-sheet.tsx"
Cohesion: 0.33
Nodes (5): namaWajib, ProfesiInput, profesiSchema, SimpleNameInput, simpleNameSchema

### Community 79 - "change-password-form.tsx"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 80 - "popover.tsx"
Cohesion: 0.14
Nodes (17): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, FieldDate(), FieldSelect(), FieldTextarea() (+9 more)

### Community 81 - "approvalStatusTone"
Cohesion: 0.53
Nodes (6): StatusBadge(), StatusBadge(), StatusBadge(), StatusBadge(), approvalStatusTone(), labelApprovalStatus()

### Community 87 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 88 - "proses-gaji-client.test.tsx"
Cohesion: 0.20
Nodes (3): MOCK_BATCH, mockSearchParams, AuthProvider()

## Knowledge Gaps
- **528 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+523 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `button.tsx`, `fromPage`, `role-permission-dialog.tsx`, `pendukung-layout-client.tsx`, `mutasi-form-sheet.tsx`, `section-left-panel.tsx`, `dashboard-sections.tsx`, `pengajuan-page-client.tsx`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `sidebar-utils.ts`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `utils.ts`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `phdp.ts`, `kontrak-form-sheet.tsx`, `persetujuan-page-client.tsx`, `popover.tsx`, `approvalStatusTone`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `keluarga-form-sheet.tsx`, `fromPage`, `data-table.tsx`, `formatDate`, `role-permission-dialog.tsx`, `users-client.tsx`, `mutasi-form-sheet.tsx`, `cn`, `section-left-panel.tsx`, `verifySession`, `pengajuan-page-client.tsx`, `useFkOptions`, `useKomponenForm.ts`, `sidebar.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `pengajuan-form-sheet.tsx`, `login-form.tsx`, `phdp.ts`, `kontrak-form-sheet.tsx`, `kpi.ts`, `persetujuan-page-client.tsx`, `change-password-form.tsx`, `popover.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `detail-dasar-gaji.ts` to `_shared/index.ts`, `jenis-sp.ts`, `pengajuan.ts`, `users-client.tsx`, `master-entity-types.ts`, `PageQuery`, `dashboard-sections.tsx`, `pegawai.ts`, `useKomponenForm.ts`, `riwayat.ts`, `batch.ts`, `biodata.ts`, `EntityConfig`, `jenis-keahlian.ts`, `jenis-kitas.ts`, `sanksi.config.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `kuota-form-sheet.test.tsx`, `tunjangan.ts`, `kuota.ts`, `parameter-setting.ts`, `kpi.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _528 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05026300409117475 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12012987012987013 - nodes in this community are weakly interconnected._
- **Should `fromPage` be split into smaller, more focused modules?**
  _Cohesion score 0.06868686868686869 - nodes in this community are weakly interconnected._