# Graph Report - kepegawaian-fe  (2026-11-23)

## Corpus Check
- 466 files · ~147,684 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ico 1, .css 1, (none) 1)

## Summary
- 2201 nodes · 8789 edges · 79 communities (73 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2b943828`
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
- ref_tanstack_react_query
- pendukung-layout-client.tsx
- master-entity-types.ts
- entity-form-modal.tsx
- cn
- Envelope
- hasPermission
- section-left-panel.tsx
- keahlian.config.ts
- usePendukungQueries.ts
- tambahan-client.tsx
- ref_sonner
- appwriteSession.ts
- _shared/index.ts
- useDashboardSections.tsx
- throwIfNotOk
- Button
- dropdown-menu.tsx
- sidebar-utils.ts
- riwayat.ts
- riwayat-layout-client.tsx
- ref_zod
- keahlian-form-sheet.tsx
- components/rincian-gaji-panel.tsx
- providers.tsx
- useFkOptions
- kepegawaian/usePegawaiSession.ts
- HttpError
- proses-gaji-client.tsx
- command.tsx
- biodata.ts
- profesi.ts
- persetujuan-page-client.tsx
- sanksi/form.tsx
- PageQuery
- sp-form-sheet.tsx
- cuti/page.test.tsx
- input-group.tsx
- DataTable
- sanksi.config.ts
- cuti-client.tsx
- slip-gaji-preview-dialog.tsx
- data-pegawai-client.tsx
- kuota-page-client.tsx
- kuota-form-sheet.test.tsx
- useUserList.ts
- ref_testing_library_user_event
- KpiClient
- data-pegawai-client.tsx
- verifikasi-client.test.tsx
- usePegawaiDashboard.ts
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- terminasi-form-sheet.test.tsx
- crud-form.tsx
- kontrak-form-sheet.tsx
- pengajuan-page-client.tsx
- utils.ts
- kpi.ts
- PageEnvelope
- popover.tsx
- dashboard-sections.tsx
- sk/page.test.tsx
- section-left-panel.tsx
- pengajuan.ts
- klaim-form-schema.ts
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 187 edges
3. `throwIfNotOk()` - 89 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 78 edges
6. `verifySession` - 78 edges
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
- `renderClient()` --calls--> `PersetujuanPageClient()`  [EXTRACTED]
  src/app/(app)/cuti/persetujuan/persetujuan-page-client.test.tsx → src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx
- `renderSheet()` --calls--> `KontrakFormSheet()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.test.tsx → src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.tsx

## Import Cycles
- None detected.

## Communities (79 total, 6 thin omitted)

### Community 0 - "roles-client.tsx"
Cohesion: 0.08
Nodes (37): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+29 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.10
Nodes (31): AlertDialogMedia(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem() (+23 more)

### Community 2 - "ref_vitest"
Cohesion: 0.08
Nodes (7): renderDialog(), queryClient, renderComponent(), mockSearchParams, MOCK_PROSES, usePeriodeFilter(), UsePeriodeFilterOptions

### Community 3 - "button.tsx"
Cohesion: 0.17
Nodes (34): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, SectionCrudSlot(), SignerPicker(), FormContainer(), CreateBatchDialog() (+26 more)

### Community 4 - "keluarga-client.tsx"
Cohesion: 0.12
Nodes (37): KARTU_COLUMNS, KartuIdentitasPage(), KartuToolbar(), KEAHLIAN_COLUMNS, KeahlianPage(), KeahlianToolbar(), TINGKAT_LABEL, KeluargaPage() (+29 more)

### Community 5 - "ref_next"
Cohesion: 0.13
Nodes (19): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+11 more)

### Community 6 - "kepegawaian.ts"
Cohesion: 0.06
Nodes (58): DnpGroup, DnpItemWithIndex, DnpPageClient(), formatDnpDate(), formatOrgGroupName(), getOrgSortOrder(), groupDnpByOrganisasi(), COLUMN_NUMBERS (+50 more)

### Community 7 - "field-renderers.tsx"
Cohesion: 0.18
Nodes (42): KuotaFormSheet(), Props, SheetEditGaji(), Props, SheetEditProfil(), FormValues, KartuIdentitasFormSheet(), normalizeFk() (+34 more)

### Community 8 - "kontrak-form-sheet.tsx"
Cohesion: 0.12
Nodes (19): FormValues, normalizeFk(), Props, schema, SectionLabel(), useGolonganOptions(), FormValues, normalizeFk() (+11 more)

### Community 9 - "ref_tanstack_react_query"
Cohesion: 0.08
Nodes (28): BatchContext, BatchProvider(), BatchState, useBatchContext(), penggajianKeys, useDeleteBatch(), useReprocessBatch(), batchKeys (+20 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.23
Nodes (10): ENABLED_CATEGORIES, Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail() (+2 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.03
Nodes (89): MasterEntityName, MasterEntityTypes, SingleResultString, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse (+81 more)

### Community 12 - "entity-form-modal.tsx"
Cohesion: 0.27
Nodes (8): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, ProfilDialogProps, Textarea(), useProfesiForm()

### Community 13 - "cn"
Cohesion: 0.11
Nodes (33): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SidebarContent(), SidebarContext, SidebarContextProps (+25 more)

### Community 14 - "Envelope"
Cohesion: 0.05
Nodes (63): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+55 more)

### Community 15 - "hasPermission"
Cohesion: 0.13
Nodes (29): ADR-0001, CutiKuotaPage(), CutiPengajuanPage(), CutiPersetujuanPage(), DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), DNPReportPage() (+21 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.12
Nodes (25): ActionButtons(), Field(), Props, RingkasanPanel(), SectionLabel(), SectionSkeleton(), biodataFormSchema, editFormFields (+17 more)

### Community 17 - "keahlian.config.ts"
Cohesion: 0.17
Nodes (21): EntityFormModalProps, FormField, keahlianFormFields, keahlianFormSchema, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig, keluargaFormFields, keluargaFormSchema (+13 more)

### Community 18 - "usePendukungQueries.ts"
Cohesion: 0.13
Nodes (14): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+6 more)

### Community 19 - "tambahan-client.tsx"
Cohesion: 0.15
Nodes (38): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps (+30 more)

### Community 20 - "ref_sonner"
Cohesion: 0.12
Nodes (18): FormValues, JENIS_SK_BY_MUTASI, Props, schema, SectionLabel(), SanksiManager(), SanksiManagerProps, SanksiRow (+10 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.16
Nodes (18): ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession() (+10 more)

### Community 22 - "_shared/index.ts"
Cohesion: 0.12
Nodes (13): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+5 more)

### Community 23 - "useDashboardSections.tsx"
Cohesion: 0.16
Nodes (21): keahlianMutationUrl, keluargaMutationUrl, pelatihanMutationUrl, pendidikanMutationUrl, pengalamanKerjaMutationUrl, profilKeys, DashboardQuery, useDashboardSections() (+13 more)

### Community 24 - "throwIfNotOk"
Cohesion: 0.16
Nodes (19): useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList(), useMutasiContextData(), useMutasiDetail() (+11 more)

### Community 25 - "Button"
Cohesion: 0.20
Nodes (13): ChangePasswordForm(), Data, PasswordField(), schema, RoleAssignmentDialog(), RoleAssignmentDialogProps, Button(), buttonVariants (+5 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (17): Avatar(), AvatarFallback(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+9 more)

### Community 27 - "sidebar-utils.ts"
Cohesion: 0.39
Nodes (6): Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities(), MASTER_GATE

### Community 28 - "riwayat.ts"
Cohesion: 0.04
Nodes (90): Props, Props, SignerPickerProps, Props, CutiPengajuanMiniResponse, AlasanBerhentiResponse, JenisAksiKontrak, ListResultRiwayatSkQuery (+82 more)

### Community 29 - "riwayat-layout-client.tsx"
Cohesion: 0.24
Nodes (10): Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RailSkeleton() (+2 more)

### Community 30 - "ref_zod"
Cohesion: 0.06
Nodes (54): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+46 more)

### Community 31 - "keahlian-form-sheet.tsx"
Cohesion: 0.29
Nodes (6): CURRENT_YEAR, FormValues, normalizeFk(), Props, schema, TINGKAT_OPTIONS

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.16
Nodes (13): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTableProps, MOCK_PEGAWAI, KomponenTable(), KomponenTableProps, PegawaiDetailKomponenPanel, RincianGajiPanel() (+5 more)

### Community 33 - "providers.tsx"
Cohesion: 0.27
Nodes (5): inter, metadata, RootLayout(), handleSessionExpired(), Providers()

### Community 34 - "useFkOptions"
Cohesion: 0.17
Nodes (19): FormValues, schema, TambahPegawaiForm(), useJabatanByOrganisasi(), pegawaiKeys, GajiFormValues, schema, toDefaults() (+11 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.33
Nodes (5): BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClientProps, STATUS_DOT

### Community 38 - "command.tsx"
Cohesion: 0.26
Nodes (15): FKComboboxFilter(), FKComboboxFilterProps, FKCombobox(), FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+7 more)

### Community 39 - "biodata.ts"
Cohesion: 0.16
Nodes (29): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest (+21 more)

### Community 40 - "profesi.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 41 - "persetujuan-page-client.tsx"
Cohesion: 0.16
Nodes (22): StatusBadge(), DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), RiwayatTab(), StatusBadge(), CURRENT_YEAR, PersetujuanPageClientProps (+14 more)

### Community 42 - "sanksi/form.tsx"
Cohesion: 0.27
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 43 - "PageQuery"
Cohesion: 0.05
Nodes (46): KuotaFormSheetProps, useProfilApproval(), ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest (+38 more)

### Community 44 - "sp-form-sheet.tsx"
Cohesion: 0.18
Nodes (7): FormValues, Props, schema, SectionLabel(), SheetDescription(), SheetOverlay(), SheetPortal()

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 46 - "input-group.tsx"
Cohesion: 0.28
Nodes (7): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 47 - "DataTable"
Cohesion: 0.08
Nodes (25): KONTRAK_COLUMNS, KontrakToolbar(), MUTASI_COLUMNS, PairCell(), rp(), SkCell(), val(), SkLampiranCard() (+17 more)

### Community 48 - "sanksi.config.ts"
Cohesion: 0.15
Nodes (13): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+5 more)

### Community 49 - "cuti-client.tsx"
Cohesion: 0.06
Nodes (33): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, KELUARGA_COLUMNS, KeluargaToolbar(), PENGALAMAN_KOLOM, CURRENT_YEAR (+25 more)

### Community 50 - "slip-gaji-preview-dialog.tsx"
Cohesion: 0.29
Nodes (6): PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, PdfViewer(), PdfViewerProps, formatPeriode()

### Community 51 - "data-pegawai-client.tsx"
Cohesion: 0.36
Nodes (6): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai()

### Community 52 - "kuota-page-client.tsx"
Cohesion: 0.38
Nodes (6): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, useCutiKuotaList(), useDeleteKuotaMutation()

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 54 - "useUserList.ts"
Cohesion: 0.40
Nodes (3): useUserList(), PageResultPageUserResponse, UserPatchStatusRequest

### Community 55 - "ref_testing_library_user_event"
Cohesion: 0.07
Nodes (20): mockFetch(), okJson(), renderClient(), mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet() (+12 more)

### Community 56 - "KpiClient"
Cohesion: 0.67
Nodes (3): KpiClient(), KpiPage(), metadata

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.17
Nodes (14): KomponenDialogProps, KomponenFormState, GajiBatchMasterProsesPostRequest, GajiKomponenPostRequest, GajiKomponenPutRequest, GajiKomponenResponse, KomponenSearchParams, ListResultGajiKomponenMiniProjection (+6 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.06
Nodes (32): asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams (+24 more)

### Community 60 - "login-form.tsx"
Cohesion: 0.23
Nodes (7): Data, LoginForm(), LoginPage(), loginRequest(), useLogin(), LoginFormData, loginSchema

### Community 61 - "pengajuan-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 63 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 66 - "crud-form.tsx"
Cohesion: 0.14
Nodes (31): PersetujuanPageClient(), Chip(), DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent() (+23 more)

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.14
Nodes (24): PengalamanToolbar(), EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), KomponenPage(), ParameterSettingPage(), ParameterSettingClient(), PendapatanNonPajakPage() (+16 more)

### Community 71 - "pengajuan-page-client.tsx"
Cohesion: 0.13
Nodes (20): ADR-0043, MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), renderClient(), CURRENT_YEAR (+12 more)

### Community 73 - "utils.ts"
Cohesion: 0.08
Nodes (24): FormValues, numField, schema, toNum(), CURRENT_YEAR, FormValues, normalizeFk(), Props (+16 more)

### Community 74 - "kpi.ts"
Cohesion: 0.08
Nodes (34): KpiFormDialogProps, FormulaEditorProps, JENIS_LABEL, OPERATORS, KPI_COLUMNS, KpiFormValues, kpiSchema, appendKode() (+26 more)

### Community 75 - "PageEnvelope"
Cohesion: 0.04
Nodes (66): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse (+58 more)

### Community 84 - "dashboard-sections.tsx"
Cohesion: 0.22
Nodes (13): keahlianCrudConfig, pelatihanCrudConfig, pendidikanCrudConfig, pengalamanKerjaCrudConfig, boolStr(), hubunganKeluarga(), jenisMutasi(), jenisSk() (+5 more)

### Community 88 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 91 - "section-left-panel.tsx"
Cohesion: 0.16
Nodes (22): DashboardClient(), DashboardPage(), Field(), SectionLeftPanel(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem() (+14 more)

### Community 101 - "pengajuan.ts"
Cohesion: 0.10
Nodes (19): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+11 more)

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.19
Nodes (18): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+10 more)

### Community 107 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson(), renderSheet()

### Community 109 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson(), renderSheet()

## Knowledge Gaps
- **12 isolated node(s):** `ADR-0040`, `ADR-0043`, `ADR-0040`, `ADR-0040`, `ADR-0008` (+7 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 652 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `roles-client.tsx`, `button.tsx`, `keluarga-client.tsx`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `pendukung-layout-client.tsx`, `entity-form-modal.tsx`, `cn`, `section-left-panel.tsx`, `tambahan-client.tsx`, `ref_sonner`, `Button`, `dropdown-menu.tsx`, `riwayat-layout-client.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `sanksi/form.tsx`, `sp-form-sheet.tsx`, `input-group.tsx`, `cuti-client.tsx`, `slip-gaji-preview-dialog.tsx`, `crud-form.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `dashboard-sections.tsx`, `section-left-panel.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **What connects `ADR-0040`, `ADR-0043`, `ADR-0040` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `roles-client.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07542087542087542 - nodes in this community are weakly interconnected._
- **Why does `Button()` connect `Button` to `roles-client.tsx`, `jenis-sp.ts`, `button.tsx`, `keluarga-client.tsx`, `ref_next`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `entity-form-modal.tsx`, `cn`, `section-left-panel.tsx`, `tambahan-client.tsx`, `ref_sonner`, `keahlian-form-sheet.tsx`, `components/rincian-gaji-panel.tsx`, `useFkOptions`, `proses-gaji-client.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `sanksi/form.tsx`, `sp-form-sheet.tsx`, `input-group.tsx`, `DataTable`, `cuti-client.tsx`, `slip-gaji-preview-dialog.tsx`, `kuota-page-client.tsx`, `KpiClient`, `login-form.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `kpi.ts`, `section-left-panel.tsx`, `klaim-form-schema.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09682539682539683 - nodes in this community are weakly interconnected._
- **Why does `PageQuery` connect `PageQuery` to `roles-client.tsx`, `pengajuan.ts`, `kepegawaian.ts`, `biodata.ts`, `profesi.ts`, `ref_tanstack_react_query`, `kpi.ts`, `master-entity-types.ts`, `PageEnvelope`, `Envelope`, `sanksi.config.ts`, `_shared/index.ts`, `data-pegawai-client.tsx`, `riwayat.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `ref_vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.07948717948717948 - nodes in this community are weakly interconnected._