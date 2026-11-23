# Graph Report - kepegawaian-fe  (2026-11-23)

## Corpus Check
- 465 files · ~147,541 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ico 1, .css 1, (none) 1)

## Summary
- 2197 nodes · 8800 edges · 78 communities (73 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `80a481a2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- _shared/index.ts
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
- sanksi/form.tsx
- cn
- Envelope
- hasPermission
- section-left-panel.tsx
- dashboard-sections.tsx
- usePendukungQueries.ts
- pengajuan-page-client.tsx
- useFkOptions
- appwriteSession.ts
- components/periode-filter.tsx
- roles-client.tsx
- throwIfNotOk
- useKomponenForm.ts
- dropdown-menu.tsx
- pendidikan-client.tsx
- riwayat.ts
- riwayat-layout-client.tsx
- ref_zod
- SheetContent
- ref_tanstack_react_query
- providers.tsx
- mutasi-form-sheet.tsx
- kepegawaian/usePegawaiSession.ts
- HttpError
- proses-gaji-client.tsx
- command.tsx
- biodata.ts
- persetujuan-page-client.tsx
- pengajuan.ts
- detail-dasar-gaji.ts
- cuti/page.test.tsx
- DataTable
- sanksi.config.ts
- Skeleton
- tambahan-client.tsx
- kuota-form-sheet.test.tsx
- DeletedResult
- pdf-viewer.test.tsx
- data-pegawai-client.tsx
- verifikasi-client.test.tsx
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- kontrak-form-sheet.test.tsx
- terminasi-form-sheet.test.tsx
- tambahan-client.test.tsx
- crud-form.tsx
- persetujuan-client.test.tsx
- kontrak-form-sheet.tsx
- pengajuan-page-client.tsx
- utils.ts
- kpi.ts
- PageQuery
- sk-form-sheet.test.tsx
- popover.tsx
- ref_lucide_react
- ref_testing_library_user_event
- section-right-panel.tsx
- toApiParams
- SortObject
- klaim-form-schema.ts
- cuti-client.tsx
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
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.test.tsx → src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx
- `renderSheet()` --calls--> `KontrakFormSheet()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.test.tsx → src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.tsx

## Import Cycles
- None detected.

## Communities (78 total, 5 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.08
Nodes (25): DialogHeaderProps, RolePermissionDialogProps, CreateUserDialogProps, RoleAssignmentDialogProps, systemKeys, PrefPermission, PrefRole, ListResultPrefPermission (+17 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.13
Nodes (24): AlertDialogMedia(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem() (+16 more)

### Community 2 - "ref_vitest"
Cohesion: 0.09
Nodes (5): renderDialog(), mockFetch(), okJson(), mockSearchParams, MOCK_PEGAWAI

### Community 3 - "button.tsx"
Cohesion: 0.16
Nodes (37): CrudLike, Editing, SectionCrudSlot(), SlotQuery, SignerPicker(), SignerPickerProps, FormContainer(), CreateBatchDialog() (+29 more)

### Community 4 - "keluarga-client.tsx"
Cohesion: 0.09
Nodes (20): KEAHLIAN_COLUMNS, KeahlianPage(), KeahlianToolbar(), TINGKAT_LABEL, KELUARGA_COLUMNS, KeluargaPage(), KeluargaToolbar(), PELATIHAN_COLUMNS (+12 more)

### Community 5 - "ref_next"
Cohesion: 0.14
Nodes (17): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+9 more)

### Community 6 - "kepegawaian.ts"
Cohesion: 0.05
Nodes (56): DnpGroup, DnpItemWithIndex, DnpPageClient(), formatDnpDate(), groupDnpByOrganisasi(), COLUMN_NUMBERS, DukPageClient(), Card() (+48 more)

### Community 7 - "field-renderers.tsx"
Cohesion: 0.16
Nodes (26): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, FormValues, KeluargaFormSheet(), normalizeFk() (+18 more)

### Community 8 - "kontrak-form-sheet.tsx"
Cohesion: 0.13
Nodes (21): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, SectionLabel(), useGolonganOptions(), FormValues (+13 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.10
Nodes (19): BatchContext, BatchProvider(), BatchState, BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest (+11 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.23
Nodes (10): ENABLED_CATEGORIES, Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail() (+2 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.03
Nodes (108): MasterEntityName, MasterEntityTypes, CutiPengajuanMiniResponse, RiwayatSpQuery, RiwayatTerminasiQuery, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery (+100 more)

### Community 12 - "sanksi/form.tsx"
Cohesion: 0.27
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 13 - "cn"
Cohesion: 0.08
Nodes (41): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent() (+33 more)

### Community 14 - "Envelope"
Cohesion: 0.07
Nodes (55): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, SingleResultString (+47 more)

### Community 15 - "hasPermission"
Cohesion: 0.19
Nodes (27): CutiKuotaPage(), CutiPersetujuanPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), DNPReportPage() (+19 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.10
Nodes (36): Field(), SectionLeftPanel(), ActionButtons(), Field(), Props, RingkasanPanel(), SectionLabel(), SectionSkeleton() (+28 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.06
Nodes (58): SectionCrudSlotProps, EntityFormModalProps, FormField, SECTIONS, keahlianCrudConfig, keahlianFormFields, keahlianFormSchema, keahlianMutationUrl (+50 more)

### Community 18 - "usePendukungQueries.ts"
Cohesion: 0.07
Nodes (26): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+18 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.32
Nodes (20): PersetujuanClient(), TambahanClient(), makeColumns(), UsersClient(), ReprocessButton(), ReprocessButtonProps, VerifyButton(), VerifyButtonProps (+12 more)

### Community 20 - "useFkOptions"
Cohesion: 0.12
Nodes (23): FormValues, schema, TambahPegawaiForm(), useJabatanByOrganisasi(), masterKeys, pegawaiKeys, GajiFormValues, schema (+15 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.13
Nodes (23): ADR-0001, ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+15 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.33
Nodes (9): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, useVerifikasiFilters(), usePeriodeFilter() (+1 more)

### Community 23 - "roles-client.tsx"
Cohesion: 0.15
Nodes (22): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+14 more)

### Community 24 - "throwIfNotOk"
Cohesion: 0.16
Nodes (19): useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList(), useMutasiContextData(), useMutasiDetail() (+11 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.21
Nodes (12): FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula(), INITIAL_KOMPONEN_FORM, KodeItem (+4 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (17): Avatar(), AvatarFallback(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+9 more)

### Community 27 - "pendidikan-client.tsx"
Cohesion: 0.20
Nodes (7): PENDIDIKAN_COLUMNS, PendidikanPage(), PendidikanToolbar(), BE_PERMISSION_CATALOG, entityGate(), filterVisibleEntities(), MASTER_GATE

### Community 28 - "riwayat.ts"
Cohesion: 0.04
Nodes (75): Props, Props, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, ListResultRiwayatSkQuery (+67 more)

### Community 29 - "riwayat-layout-client.tsx"
Cohesion: 0.24
Nodes (10): Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RailSkeleton() (+2 more)

### Community 30 - "ref_zod"
Cohesion: 0.06
Nodes (53): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+45 more)

### Community 31 - "SheetContent"
Cohesion: 0.13
Nodes (30): KuotaFormSheet(), Props, SheetEditGaji(), Props, SheetEditProfil(), CURRENT_YEAR, FormValues, KeahlianFormSheet() (+22 more)

### Community 32 - "ref_tanstack_react_query"
Cohesion: 0.13
Nodes (11): KomponenTableProps, PegawaiDetailKomponenPanel, MOCK_PROSES, useBatchContext(), penggajianKeys, useProfesiForm(), useBatchMasterProses(), Consumer() (+3 more)

### Community 33 - "providers.tsx"
Cohesion: 0.27
Nodes (5): inter, metadata, RootLayout(), handleSessionExpired(), Providers()

### Community 34 - "mutasi-form-sheet.tsx"
Cohesion: 0.29
Nodes (9): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), Props, schema, SectionLabel(), normalizeFk(), useJabatanProfesiCascade() (+1 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.16
Nodes (11): BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClient(), ProsesGajiClientProps, STATUS_DOT, STATUS_OPTIONS, useBatchAction() (+3 more)

### Community 38 - "command.tsx"
Cohesion: 0.12
Nodes (27): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKComboboxFilter(), FKComboboxFilterProps, FKCombobox() (+19 more)

### Community 39 - "biodata.ts"
Cohesion: 0.15
Nodes (28): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest (+20 more)

### Community 41 - "persetujuan-page-client.tsx"
Cohesion: 0.14
Nodes (26): StatusBadge(), DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), RiwayatTab(), StatusBadge(), CURRENT_YEAR, PersetujuanPageClientProps (+18 more)

### Community 42 - "pengajuan.ts"
Cohesion: 0.15
Nodes (12): CutiJenisResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanPostRequest, CutiPengajuanPutRequest, KlaimCuti, PageCutiApprovalChainResponse, PageCutiPengajuanResponse, PageResultPageCutiApprovalChainResponse (+4 more)

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.12
Nodes (14): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+6 more)

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 47 - "DataTable"
Cohesion: 0.09
Nodes (32): KONTRAK_COLUMNS, KontrakPage(), KontrakToolbar(), MutasiLampiranCard(), MUTASI_COLUMNS, MutasiPage(), PairCell(), rp() (+24 more)

### Community 48 - "sanksi.config.ts"
Cohesion: 0.14
Nodes (14): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+6 more)

### Community 50 - "Skeleton"
Cohesion: 0.17
Nodes (14): STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps (+6 more)

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.23
Nodes (10): PersetujuanClientProps, TambahanClientProps, BATCH_COLUMNS, STATUS_BADGE, STATUS_LABELS, batchKeys, useBatchList(), useBatchMasterList() (+2 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 54 - "DeletedResult"
Cohesion: 0.11
Nodes (21): PegawaiPatchGaji, RiwayatSkResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams (+13 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.18
Nodes (4): MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.17
Nodes (14): KomponenDialogProps, KomponenFormState, GajiBatchMasterProsesPostRequest, GajiKomponenPostRequest, GajiKomponenPutRequest, GajiKomponenResponse, KomponenSearchParams, ListResultGajiKomponenMiniProjection (+6 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (10): asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES (+2 more)

### Community 60 - "login-form.tsx"
Cohesion: 0.17
Nodes (12): Data, LoginForm(), LoginPage(), BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, useBadgeMutations() (+4 more)

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

### Community 66 - "crud-form.tsx"
Cohesion: 0.10
Nodes (38): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, PersetujuanPageClient(), renderClient(), Chip(), DataPegawaiToolbar() (+30 more)

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (8): asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.12
Nodes (33): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), KomponenPage() (+25 more)

### Community 71 - "pengajuan-page-client.tsx"
Cohesion: 0.14
Nodes (18): ADR-0043, CutiPengajuanPage(), MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), renderClient() (+10 more)

### Community 73 - "utils.ts"
Cohesion: 0.08
Nodes (25): FormValues, KuotaFormSheetProps, numField, schema, toNum(), CURRENT_YEAR, FormValues, normalizeFk() (+17 more)

### Community 74 - "kpi.ts"
Cohesion: 0.11
Nodes (26): KpiFormDialogProps, KpiClient(), KpiPage(), metadata, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo (+18 more)

### Community 75 - "PageQuery"
Cohesion: 0.04
Nodes (63): parameterSettingConfig, CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+55 more)

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (5): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover(), renderSheet()

### Community 84 - "ref_lucide_react"
Cohesion: 0.11
Nodes (17): PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, ChangePasswordForm(), Data, PasswordField(), schema, LampiranCardProps (+9 more)

### Community 88 - "ref_testing_library_user_event"
Cohesion: 0.11
Nodes (14): mockFetch(), okJson(), renderClient(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), createWrapper() (+6 more)

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.35
Nodes (8): DashboardClient(), DashboardPage(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), ACCORDION_TRIGGER_AFF

### Community 98 - "toApiParams"
Cohesion: 0.29
Nodes (7): TerminasiClient(), queryClient, renderComponent(), TERMINASI_TABS, TerminasiTabId, useTerminasiTable(), toApiParams()

### Community 101 - "SortObject"
Cohesion: 0.09
Nodes (26): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest (+18 more)

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.19
Nodes (18): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+10 more)

### Community 106 - "cuti-client.tsx"
Cohesion: 0.09
Nodes (28): biodataColumns, DataPegawaiClient(), pegawaiColumns, KARTU_COLUMNS, KartuIdentitasPage(), KartuToolbar(), CURRENT_YEAR, CUTI_COLUMNS (+20 more)

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

- **Why does `Button()` connect `button.tsx` to `jenis-sp.ts`, `keluarga-client.tsx`, `ref_next`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `sanksi/form.tsx`, `cn`, `section-left-panel.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `roles-client.tsx`, `useKomponenForm.ts`, `pendidikan-client.tsx`, `SheetContent`, `ref_tanstack_react_query`, `mutasi-form-sheet.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `DataTable`, `Skeleton`, `tambahan-client.tsx`, `login-form.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `kpi.ts`, `ref_lucide_react`, `section-right-panel.tsx`, `toApiParams`, `klaim-form-schema.ts`, `cuti-client.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `ADR-0040`, `ADR-0043`, `ADR-0040` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08478513356562137 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `jenis-sp.ts` to `button.tsx`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `pendukung-layout-client.tsx`, `sanksi/form.tsx`, `cn`, `section-left-panel.tsx`, `dashboard-sections.tsx`, `pengajuan-page-client.tsx`, `components/periode-filter.tsx`, `roles-client.tsx`, `dropdown-menu.tsx`, `riwayat-layout-client.tsx`, `SheetContent`, `ref_tanstack_react_query`, `mutasi-form-sheet.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `DataTable`, `Skeleton`, `crud-form.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `ref_lucide_react`, `section-right-panel.tsx`, `cuti-client.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12962962962962962 - nodes in this community are weakly interconnected._
- **Why does `Page` connect `master-entity-types.ts` to `_shared/index.ts`, `SortObject`, `kontrak-form-sheet.tsx`, `biodata.ts`, `users-client.tsx`, `kpi.ts`, `PageQuery`, `pengajuan.ts`, `detail-dasar-gaji.ts`, `Envelope`, `sanksi.config.ts`, `dashboard-sections.tsx`, `tambahan-client.tsx`, `DeletedResult`, `data-pegawai-client.tsx`, `riwayat.ts`, `ref_zod`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `ref_vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.0907258064516129 - nodes in this community are weakly interconnected._