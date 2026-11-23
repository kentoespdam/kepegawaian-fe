# Graph Report - kepegawaian-fe  (2026-11-23)

## Corpus Check
- 465 files · ~147,686 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ico 1, .css 1, (none) 1)

## Summary
- 2199 nodes · 8806 edges · 85 communities (80 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5192fee7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- roles-client.tsx
- jenis-sp.ts
- ref_vitest
- button.tsx
- keluarga-client.tsx
- ref_next
- kepegawaian.ts
- field-renderers.tsx
- kontrak-form-sheet.tsx
- users-client.tsx
- pendukung-layout-client.tsx
- master-entity-types.ts
- Input
- cn
- Envelope
- hasPermission
- section-left-panel.tsx
- keahlian.config.ts
- usePendukungQueries.ts
- pengajuan-page-client.tsx
- ref_sonner
- appwriteSession.ts
- components/periode-filter.tsx
- useDashboardSections.tsx
- throwIfNotOk
- ref_react
- dropdown-menu.tsx
- sidebar-utils.ts
- riwayat.ts
- riwayat-layout-client.tsx
- ref_zod
- keahlian-form-sheet.tsx
- ref_tanstack_react_query
- providers.tsx
- useFkOptions
- kepegawaian/usePegawaiSession.ts
- HttpError
- proses-gaji-client.tsx
- command.tsx
- biodata.ts
- potongan-tkk.ts
- persetujuan-page-client.tsx
- employee.schema.ts
- users.ts
- useBatchInfo.test.tsx
- cuti/page.test.tsx
- input-group.tsx
- DataTable
- sanksi.config.ts
- approval-client.tsx
- pegawai-organisasi-table.tsx
- tambahan-client.tsx
- pengajuan-klaim.test.tsx
- kuota-form-sheet.test.tsx
- tunjangan.ts
- ref_testing_library_user_event
- master.schema.ts
- data-pegawai-client.tsx
- verifikasi-client.test.tsx
- usePegawaiDashboard.ts
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- kontrak-form-sheet.test.tsx
- terminasi-form-sheet.test.tsx
- tambahan-client.test.tsx
- useAdminBiodataMutation.ts
- crud-form.tsx
- useSelfBiodataMutation.ts
- kontrak-form-sheet.tsx
- pengajuan-page-client.tsx
- utils.ts
- kpi.ts
- PageQuery
- sk-form-sheet.test.tsx
- popover.tsx
- dashboard-sections.tsx
- sk/page.test.tsx
- section-right-panel.tsx
- pengajuan.ts
- klaim-form-schema.ts
- data-pegawai-client.tsx
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 187 edges
3. `throwIfNotOk()` - 89 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 82 edges
6. `verifySession` - 82 edges
7. `toApiParams()` - 72 edges
8. `DataTable()` - 61 edges
9. `Input()` - 61 edges
10. `ConfirmDeleteDialog()` - 58 edges

## Surprising Connections (you probably didn't know these)
- `renderSheet()` --calls--> `KuotaFormSheet()`  [EXTRACTED]
  src/app/(app)/cuti/kuota/kuota-form-sheet.test.tsx → src/app/(app)/cuti/kuota/kuota-form-sheet.tsx
- `renderDialog()` --calls--> `KuotaImportDialog()`  [EXTRACTED]
  src/app/(app)/cuti/kuota/kuota-import-dialog.test.tsx → src/app/(app)/cuti/kuota/kuota-import-dialog.tsx
- `renderSheet()` --calls--> `PengajuanFormSheet()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.test.tsx → src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx
- `renderClient()` --calls--> `PengajuanPageClient()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-klaim.test.tsx → src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx
- `renderClient()` --calls--> `PengajuanPageClient()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.test.tsx → src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx

## Import Cycles
- None detected.

## Communities (85 total, 5 thin omitted)

### Community 0 - "roles-client.tsx"
Cohesion: 0.07
Nodes (40): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+32 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.11
Nodes (26): MasterSwitch(), MasterSwitchProps, AlertDialogMedia(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb() (+18 more)

### Community 2 - "ref_vitest"
Cohesion: 0.08
Nodes (6): renderDialog(), queryClient, renderComponent(), mockSearchParams, MOCK_PEGAWAI, MOCK_PROSES

### Community 3 - "button.tsx"
Cohesion: 0.10
Nodes (36): CrudLike, Editing, SectionCrudSlot(), SlotQuery, PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, SignerPicker() (+28 more)

### Community 4 - "keluarga-client.tsx"
Cohesion: 0.10
Nodes (38): KARTU_COLUMNS, KartuIdentitasPage(), KartuToolbar(), KEAHLIAN_COLUMNS, KeahlianPage(), KeahlianToolbar(), TINGKAT_LABEL, KELUARGA_COLUMNS (+30 more)

### Community 5 - "ref_next"
Cohesion: 0.12
Nodes (17): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+9 more)

### Community 6 - "kepegawaian.ts"
Cohesion: 0.05
Nodes (58): DnpGroup, DnpItemWithIndex, DnpPageClient(), formatDnpDate(), formatOrgGroupName(), getOrgSortOrder(), groupDnpByOrganisasi(), COLUMN_NUMBERS (+50 more)

### Community 7 - "field-renderers.tsx"
Cohesion: 0.18
Nodes (42): KuotaFormSheet(), Props, SheetEditGaji(), Props, SheetEditProfil(), KartuIdentitasFormSheet(), KeahlianFormSheet(), FormValues (+34 more)

### Community 8 - "kontrak-form-sheet.tsx"
Cohesion: 0.12
Nodes (19): FormValues, normalizeFk(), Props, schema, SectionLabel(), useGolonganOptions(), FormValues, normalizeFk() (+11 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.09
Nodes (19): useBatchAction(), useDeleteBatch(), useReprocessBatch(), BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse (+11 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.23
Nodes (10): ENABLED_CATEGORIES, Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail() (+2 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.05
Nodes (73): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery (+65 more)

### Community 12 - "Input"
Cohesion: 0.12
Nodes (26): FormContainer(), ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps (+18 more)

### Community 13 - "cn"
Cohesion: 0.10
Nodes (35): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent() (+27 more)

### Community 14 - "Envelope"
Cohesion: 0.07
Nodes (49): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+41 more)

### Community 15 - "hasPermission"
Cohesion: 0.17
Nodes (29): CutiKuotaPage(), CutiPengajuanPage(), CutiPersetujuanPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage() (+21 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.11
Nodes (33): Field(), SectionLeftPanel(), ActionButtons(), Field(), Props, RingkasanPanel(), SectionLabel(), SectionSkeleton() (+25 more)

### Community 17 - "keahlian.config.ts"
Cohesion: 0.12
Nodes (27): EntityFormModalProps, FormField, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig, keluargaFormFields (+19 more)

### Community 18 - "usePendukungQueries.ts"
Cohesion: 0.07
Nodes (26): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+18 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.34
Nodes (19): PersetujuanClient(), TambahanClient(), makeColumns(), UsersClient(), ReprocessButton(), ReprocessButtonProps, VerifyButton(), VerifyButtonProps (+11 more)

### Community 20 - "ref_sonner"
Cohesion: 0.11
Nodes (19): FormValues, JENIS_SK_BY_MUTASI, Props, schema, SectionLabel(), SanksiManagerProps, SanksiRow, masterKeys (+11 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.13
Nodes (23): ADR-0001, ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+15 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.28
Nodes (9): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, useVerifikasiFilters(), usePeriodeFilter() (+1 more)

### Community 23 - "useDashboardSections.tsx"
Cohesion: 0.19
Nodes (19): profilKeys, DashboardQuery, useDashboardSections(), UseDashboardSectionsReturn, useSelfKeahlianMutation(), useSelfKeluargaMutation(), useSelfPelatihanMutation(), useSelfPendidikanMutation() (+11 more)

### Community 24 - "throwIfNotOk"
Cohesion: 0.14
Nodes (21): useCutiDetailApproval(), useCutiPersetujuanList(), useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList() (+13 more)

### Community 25 - "ref_react"
Cohesion: 0.20
Nodes (11): ProfilDialog(), ProfilDialogProps, FormulaEditor(), JENIS_LABEL, OPERATORS, buttonVariants, Calendar(), CalendarDayButton() (+3 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (17): Avatar(), AvatarFallback(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+9 more)

### Community 27 - "sidebar-utils.ts"
Cohesion: 0.39
Nodes (6): Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities(), MASTER_GATE

### Community 28 - "riwayat.ts"
Cohesion: 0.04
Nodes (77): Props, Props, SignerPickerProps, Props, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse (+69 more)

### Community 29 - "riwayat-layout-client.tsx"
Cohesion: 0.24
Nodes (10): Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RailSkeleton() (+2 more)

### Community 30 - "ref_zod"
Cohesion: 0.11
Nodes (33): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+25 more)

### Community 31 - "keahlian-form-sheet.tsx"
Cohesion: 0.08
Nodes (22): FormValues, normalizeFk(), Props, schema, CURRENT_YEAR, FormValues, normalizeFk(), Props (+14 more)

### Community 32 - "ref_tanstack_react_query"
Cohesion: 0.14
Nodes (10): KomponenTableProps, PegawaiDetailKomponenPanel, RincianGajiPanelProps, penggajianKeys, batchKeys, useBatchMasterProses(), useKpiList(), penggajianApi (+2 more)

### Community 33 - "providers.tsx"
Cohesion: 0.27
Nodes (5): inter, metadata, RootLayout(), handleSessionExpired(), Providers()

### Community 34 - "useFkOptions"
Cohesion: 0.24
Nodes (15): FormValues, schema, TambahPegawaiForm(), useJabatanByOrganisasi(), pegawaiKeys, GajiFormValues, schema, toDefaults() (+7 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.33
Nodes (5): BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClientProps, STATUS_DOT

### Community 38 - "command.tsx"
Cohesion: 0.27
Nodes (14): FKComboboxFilter(), FKComboboxFilterProps, FKCombobox(), FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+6 more)

### Community 39 - "biodata.ts"
Cohesion: 0.18
Nodes (27): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+19 more)

### Community 40 - "potongan-tkk.ts"
Cohesion: 0.23
Nodes (11): potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+3 more)

### Community 41 - "persetujuan-page-client.tsx"
Cohesion: 0.14
Nodes (24): StatusBadge(), DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), RiwayatTab(), StatusBadge(), CURRENT_YEAR, PersetujuanPageClientProps (+16 more)

### Community 42 - "employee.schema.ts"
Cohesion: 0.15
Nodes (12): BiodataFormInput, biodataFormSchema, KeahlianFormInput, keahlianFormSchema, KeluargaFormInput, keluargaFormSchema, PelatihanFormInput, pelatihanFormSchema (+4 more)

### Community 43 - "users.ts"
Cohesion: 0.20
Nodes (10): useUserList(), AppwriteUser, AuthPostRequest, PageResultPageUserResponse, PageUserResponse, Prefs, SavedResultAppwriteUser, SimpleGrantedAuthority (+2 more)

### Community 44 - "useBatchInfo.test.tsx"
Cohesion: 0.27
Nodes (7): BatchContext, BatchProvider(), BatchState, useBatchContext(), Consumer(), MOCK_BATCH, useBatchInfo()

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 46 - "input-group.tsx"
Cohesion: 0.28
Nodes (7): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 47 - "DataTable"
Cohesion: 0.06
Nodes (37): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, ADR-0040, YEAR_OPTIONS, KONTRAK_COLUMNS, KontrakToolbar() (+29 more)

### Community 48 - "sanksi.config.ts"
Cohesion: 0.12
Nodes (14): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+6 more)

### Community 49 - "approval-client.tsx"
Cohesion: 0.32
Nodes (7): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, useProfilApproval()

### Community 50 - "pegawai-organisasi-table.tsx"
Cohesion: 0.36
Nodes (6): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTableProps, KomponenTable(), fmtRupiah(), GajiBatchMasterResponse

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.18
Nodes (17): PersetujuanClientProps, TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, PegawaiOrganisasiTable(), RincianGajiPanel() (+9 more)

### Community 52 - "pengajuan-klaim.test.tsx"
Cohesion: 0.33
Nodes (6): MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), renderClient()

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 54 - "tunjangan.ts"
Cohesion: 0.19
Nodes (11): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+3 more)

### Community 55 - "ref_testing_library_user_event"
Cohesion: 0.10
Nodes (11): mockFetch(), okJson(), renderClient(), mockFetch(), okJson(), fields, schema, MOCK_PDF_BUFFER (+3 more)

### Community 56 - "master.schema.ts"
Cohesion: 0.33
Nodes (5): namaWajib, ProfesiInput, profesiSchema, SimpleNameInput, simpleNameSchema

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.13
Nodes (19): KomponenDialogProps, FormulaEditorProps, appendKode(), INITIAL_KOMPONEN_FORM, KodeItem, KomponenFormState, KODE_ROUTES, useKomponenForm() (+11 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.08
Nodes (23): asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams (+15 more)

### Community 59 - "usePegawaiDashboard.ts"
Cohesion: 0.50
Nodes (3): usePegawaiDashboard(), dashboardKeys, BiodataDashboardResponse

### Community 60 - "login-form.tsx"
Cohesion: 0.31
Nodes (7): Data, LoginForm(), LoginPage(), loginRequest(), useLogin(), LoginFormData, loginSchema

### Community 61 - "pengajuan-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 62 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 63 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 64 - "tambahan-client.test.tsx"
Cohesion: 0.22
Nodes (9): asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_PROSES, mockFetch() (+1 more)

### Community 65 - "useAdminBiodataMutation.ts"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

### Community 66 - "crud-form.tsx"
Cohesion: 0.10
Nodes (45): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS (+37 more)

### Community 67 - "useSelfBiodataMutation.ts"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useSelfBiodataMutation()

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.14
Nodes (26): EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), KomponenPage(), ParameterSettingPage(), ParameterSettingClient(), PendapatanNonPajakPage(), PendapatanNonPajakClient() (+18 more)

### Community 71 - "pengajuan-page-client.tsx"
Cohesion: 0.24
Nodes (11): ADR-0043, CURRENT_YEAR, JenisBadge(), KuotaStrip(), PengajuanPageClient(), PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS (+3 more)

### Community 73 - "utils.ts"
Cohesion: 0.11
Nodes (17): FormValues, KuotaFormSheetProps, numField, schema, toNum(), useSaveKuotaMutation(), cutiKeys, changePassword() (+9 more)

### Community 74 - "kpi.ts"
Cohesion: 0.10
Nodes (25): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, useKpiForm(), UseKpiFormProps, useCreateKpi() (+17 more)

### Community 75 - "PageQuery"
Cohesion: 0.03
Nodes (116): SingleResultString, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GolonganSearchParams, GradeSearchParams (+108 more)

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (5): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover(), renderSheet()

### Community 84 - "dashboard-sections.tsx"
Cohesion: 0.20
Nodes (15): SectionCrudSlotProps, keahlianCrudConfig, pelatihanCrudConfig, pendidikanCrudConfig, boolStr(), formatPeriode(), hubunganKeluarga(), jenisMutasi() (+7 more)

### Community 88 - "sk/page.test.tsx"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.31
Nodes (9): DashboardClient(), DashboardPage(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), SECTIONS (+1 more)

### Community 101 - "pengajuan.ts"
Cohesion: 0.06
Nodes (39): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse (+31 more)

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.19
Nodes (18): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+10 more)

### Community 106 - "data-pegawai-client.tsx"
Cohesion: 0.36
Nodes (6): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai()

### Community 107 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson(), renderSheet()

### Community 109 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson(), renderSheet()

## Knowledge Gaps
- **12 isolated node(s):** `ADR-0040`, `ADR-0043`, `ADR-0040`, `ADR-0040`, `ADR-0008` (+7 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 649 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `roles-client.tsx`, `button.tsx`, `keluarga-client.tsx`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `pendukung-layout-client.tsx`, `Input`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `ref_sonner`, `components/periode-filter.tsx`, `ref_react`, `dropdown-menu.tsx`, `riwayat-layout-client.tsx`, `keahlian-form-sheet.tsx`, `ref_tanstack_react_query`, `proses-gaji-client.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `input-group.tsx`, `DataTable`, `approval-client.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `crud-form.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `dashboard-sections.tsx`, `section-right-panel.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `ADR-0040`, `ADR-0043`, `ADR-0040` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `roles-client.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07486338797814207 - nodes in this community are weakly interconnected._
- **Why does `Button()` connect `crud-form.tsx` to `roles-client.tsx`, `jenis-sp.ts`, `button.tsx`, `keluarga-client.tsx`, `ref_next`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `Input`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `ref_sonner`, `ref_react`, `keahlian-form-sheet.tsx`, `ref_tanstack_react_query`, `useFkOptions`, `proses-gaji-client.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `input-group.tsx`, `DataTable`, `approval-client.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `login-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `section-right-panel.tsx`, `klaim-form-schema.ts`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11397849462365592 - nodes in this community are weakly interconnected._
- **Why does `PageQuery` connect `PageQuery` to `roles-client.tsx`, `pengajuan.ts`, `kepegawaian.ts`, `biodata.ts`, `potongan-tkk.ts`, `users-client.tsx`, `kpi.ts`, `master-entity-types.ts`, `users.ts`, `Envelope`, `sanksi.config.ts`, `tunjangan.ts`, `data-pegawai-client.tsx`, `riwayat.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `ref_vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.07936507936507936 - nodes in this community are weakly interconnected._