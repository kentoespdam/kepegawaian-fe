# Graph Report - kepegawaian-fe  (2026-11-24)

## Corpus Check
- 476 files · ~151,501 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ico 1, .css 1, (none) 1)

## Summary
- 2259 nodes · 8983 edges · 79 communities (74 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7b6b9f14`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- OrgChart
- jenis-sp.ts
- roles.ts
- button.tsx
- keluarga-client.tsx
- Skeleton
- kepegawaian.ts
- utils.ts
- slip-gaji-preview-dialog.tsx
- ref_tanstack_react_query
- pendukung-layout-client.tsx
- master-entity-types.ts
- entity-form-modal.tsx
- sidebar.tsx
- keahlian.ts
- hasPermission
- section-left-panel.tsx
- keahlian.config.ts
- org-chart.tsx
- tambahan-client.tsx
- client.ts
- dnp-page-client.tsx
- enum-labels.ts
- useDashboardSections.tsx
- throwIfNotOk
- penggajian-client.ts
- dropdown-menu.tsx
- sidebar-utils.ts
- riwayat.ts
- riwayat-layout-client.tsx
- ref_zod
- potongan-tkk.ts
- pegawai-organisasi-table.tsx
- providers.tsx
- useFkOptions
- employee.schema.ts
- ringkasan-panel.tsx
- ref_react
- command.tsx
- profil.ts
- sanksi.ts
- cuti-client.tsx
- sanksi/form.tsx
- pengajuan.ts
- tunjangan.ts
- cuti/page.test.tsx
- terminasi-client.tsx
- mutasi-client.tsx
- detail-dasar-gaji.ts
- sp-client.tsx
- input-group.tsx
- DataTable
- components/periode-filter.tsx
- kuota-form-sheet.test.tsx
- useMasterTable.ts
- kontrak-form-sheet.test.tsx
- master.schema.ts
- _shared/index.ts
- verifikasi-client.test.tsx
- rupiah
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- tambahan.schema.ts
- terminasi-form-sheet.test.tsx
- usePegawaiDashboard.ts
- date.ts
- crud-form.tsx
- tunjangan.config.ts
- crud-form.test.tsx
- kontrak-form-sheet.tsx
- pengajuan-page-client.tsx
- ref_sonner
- useKpiForm.ts
- PageQuery
- dashboard-sections.tsx
- field-renderers.tsx
- ref_vitest

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 191 edges
3. `throwIfNotOk()` - 89 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 86 edges
6. `verifySession` - 86 edges
7. `toApiParams()` - 72 edges
8. `Input()` - 63 edges
9. `DataTable()` - 61 edges
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

## Communities (79 total, 5 thin omitted)

### Community 0 - "OrgChart"
Cohesion: 0.07
Nodes (4): ChartState, d3-org-chart, NodeObject, OrgChart

### Community 1 - "jenis-sp.ts"
Cohesion: 0.09
Nodes (32): AlertDialogMedia(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem() (+24 more)

### Community 2 - "roles.ts"
Cohesion: 0.06
Nodes (39): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+31 more)

### Community 3 - "button.tsx"
Cohesion: 0.11
Nodes (50): SectionCrudSlot(), SignerPicker(), TerminasiFormSheet(), CreateBatchDialog(), CreateBatchDialogProps, FormValues, schema, KpiFormDialog() (+42 more)

### Community 4 - "keluarga-client.tsx"
Cohesion: 0.07
Nodes (36): PersetujuanPageClient(), KARTU_COLUMNS, KartuIdentitasPage(), KartuToolbar(), KEAHLIAN_COLUMNS, KeahlianPage(), KeahlianToolbar(), TINGKAT_LABEL (+28 more)

### Community 5 - "Skeleton"
Cohesion: 0.23
Nodes (15): COLUMN_NUMBERS, DukPageClient(), OrgChartView, SoPageClient(), SoPageSkeleton(), Card(), CardAction(), CardContent() (+7 more)

### Community 6 - "kepegawaian.ts"
Cohesion: 0.06
Nodes (33): KenaikanBerkalaResponse, KepegawaianSearchParams, KontrakResponse, ListResultSoResponse, LtaCountResponse, LtaResponse, SingleResultListDnpResponse, SingleResultListDukResponse (+25 more)

### Community 7 - "utils.ts"
Cohesion: 0.06
Nodes (99): FormValues, KuotaFormSheet(), numField, schema, toNum(), besok(), FormValues, PengajuanFormSheet() (+91 more)

### Community 8 - "slip-gaji-preview-dialog.tsx"
Cohesion: 0.11
Nodes (10): PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver (+2 more)

### Community 9 - "ref_tanstack_react_query"
Cohesion: 0.07
Nodes (32): KomponenTableProps, PegawaiDetailKomponenPanel, RincianGajiPanelProps, BatchContext, BatchProvider(), BatchState, useBatchContext(), penggajianKeys (+24 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.23
Nodes (10): ENABLED_CATEGORIES, Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail() (+2 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.04
Nodes (79): SignerPickerProps, MasterEntityTypes, CutiPengajuanMiniResponse, RiwayatSpQuery, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse (+71 more)

### Community 12 - "entity-form-modal.tsx"
Cohesion: 0.20
Nodes (14): DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema (+6 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.09
Nodes (38): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent() (+30 more)

### Community 14 - "keahlian.ts"
Cohesion: 0.10
Nodes (26): KartuIdentitasDetail, KartuIdentitasSearchParams, PageKartuIdentitasQuery, JenisKeahlianResponse, KeahlianDetail, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery (+18 more)

### Community 15 - "hasPermission"
Cohesion: 0.05
Nodes (76): ADR-0001, ADR-0010, ADR-0041, CutiKuotaPage(), CutiPersetujuanPage(), DashboardPage(), DataPegawaiPage(), PegawaiRootPage() (+68 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.27
Nodes (14): DashboardClient(), Field(), SectionLeftPanel(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger() (+6 more)

### Community 17 - "keahlian.config.ts"
Cohesion: 0.18
Nodes (20): EntityFormModalProps, FormField, keahlianFormFields, keahlianFormSchema, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig, keluargaFormFields, keluargaFormSchema (+12 more)

### Community 18 - "org-chart.tsx"
Cohesion: 0.26
Nodes (13): downloadFile(), exportHighDefChart(), ExportOptions, OrgChartProps, OrgChartView(), escapeHtml(), OrgChartNode, renderNodeContent() (+5 more)

### Community 19 - "tambahan-client.tsx"
Cohesion: 0.15
Nodes (37): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps (+29 more)

### Community 20 - "client.ts"
Cohesion: 0.29
Nodes (5): masterKeys, api, ApiError, SingleResultRiwayatMutasiQuery, SingleResultPegawaiResponseMutasiContext

### Community 21 - "dnp-page-client.tsx"
Cohesion: 0.24
Nodes (12): DnpGroup, DnpItemWithIndex, DnpPageClient(), formatDnpDate(), formatOrgGroupName(), getOrgSortOrder(), groupDnpByOrganisasi(), ExportReportOptions (+4 more)

### Community 22 - "enum-labels.ts"
Cohesion: 0.18
Nodes (14): biodataFormSchema, editFormFields, HUBUNGAN_KELUARGA_INT, hubunganKeluargaInt(), labelHubunganKeluarga(), labelStatusPendidikanKeluarga(), STATUS_APPROVAL, STATUS_KERJA (+6 more)

### Community 23 - "useDashboardSections.tsx"
Cohesion: 0.15
Nodes (21): SECTIONS, keahlianMutationUrl, keluargaMutationUrl, pelatihanMutationUrl, pendidikanMutationUrl, pengalamanKerjaMutationUrl, ACCORDION_TRIGGER_AFF, DashboardQuery (+13 more)

### Community 24 - "throwIfNotOk"
Cohesion: 0.08
Nodes (46): useCutiKuotaList(), useCutiPersetujuanList(), useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList() (+38 more)

### Community 25 - "penggajian-client.ts"
Cohesion: 0.21
Nodes (8): laporanKeys, LaporanSoParams, useLaporanSo(), createApiClient(), handle(), baseClient, fetchMock, PageResultPageGajiBatchMasterResponse

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.16
Nodes (14): Avatar(), AvatarFallback(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+6 more)

### Community 27 - "sidebar-utils.ts"
Cohesion: 0.39
Nodes (6): Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities(), MASTER_GATE

### Community 28 - "riwayat.ts"
Cohesion: 0.04
Nodes (73): Props, Props, KomponenDialogProps, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak (+65 more)

### Community 29 - "riwayat-layout-client.tsx"
Cohesion: 0.17
Nodes (12): Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RailSkeleton() (+4 more)

### Community 30 - "ref_zod"
Cohesion: 0.16
Nodes (24): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+16 more)

### Community 31 - "potongan-tkk.ts"
Cohesion: 0.23
Nodes (11): potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, PegawaiPatchGaji, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+3 more)

### Community 32 - "pegawai-organisasi-table.tsx"
Cohesion: 0.42
Nodes (6): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTableProps, KomponenTable(), fmtRupiah(), GajiBatchMasterResponse

### Community 33 - "providers.tsx"
Cohesion: 0.27
Nodes (5): inter, metadata, RootLayout(), handleSessionExpired(), Providers()

### Community 34 - "useFkOptions"
Cohesion: 0.24
Nodes (14): FormValues, schema, TambahPegawaiForm(), useJabatanByOrganisasi(), pegawaiKeys, GajiFormValues, schema, toDefaults() (+6 more)

### Community 35 - "employee.schema.ts"
Cohesion: 0.15
Nodes (12): BiodataFormInput, biodataFormSchema, KeahlianFormInput, keahlianFormSchema, KeluargaFormInput, keluargaFormSchema, PelatihanFormInput, pelatihanFormSchema (+4 more)

### Community 36 - "ringkasan-panel.tsx"
Cohesion: 0.30
Nodes (11): ActionButtons(), Field(), Props, RingkasanPanel(), SectionLabel(), SectionSkeleton(), labelAgama(), labelJk() (+3 more)

### Community 37 - "ref_react"
Cohesion: 0.15
Nodes (16): FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula(), INITIAL_KOMPONEN_FORM, KodeItem, KomponenFormState (+8 more)

### Community 38 - "command.tsx"
Cohesion: 0.31
Nodes (13): FKComboboxFilter(), FKComboboxFilterProps, FKCombobox(), FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+5 more)

### Community 39 - "profil.ts"
Cohesion: 0.08
Nodes (54): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse (+46 more)

### Community 40 - "sanksi.ts"
Cohesion: 0.17
Nodes (11): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+3 more)

### Community 41 - "cuti-client.tsx"
Cohesion: 0.12
Nodes (16): KuotaFormSheetProps, CURRENT_YEAR, CUTI_COLUMNS, CutiPage(), KuotaStrip(), STATUS_ICONS, ADR-0040, YEAR_OPTIONS (+8 more)

### Community 42 - "sanksi/form.tsx"
Cohesion: 0.18
Nodes (14): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+6 more)

### Community 43 - "pengajuan.ts"
Cohesion: 0.08
Nodes (26): KlaimFormSheetProps, PengajuanFormSheetProps, CutiApprovalMiniResponse, CutiApprovalPostRequest, CutiJenisResponse, CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest (+18 more)

### Community 44 - "tunjangan.ts"
Cohesion: 0.24
Nodes (8): GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 46 - "terminasi-client.tsx"
Cohesion: 0.31
Nodes (6): TerminasiClient(), queryClient, renderComponent(), TERMINASI_TABS, TerminasiTabId, useTerminasiTable()

### Community 47 - "mutasi-client.tsx"
Cohesion: 0.08
Nodes (33): RiwayatTab(), KONTRAK_COLUMNS, KontrakPage(), KontrakToolbar(), MutasiLampiranCard(), MUTASI_COLUMNS, MutasiPage(), PairCell() (+25 more)

### Community 48 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 49 - "sp-client.tsx"
Cohesion: 0.33
Nodes (7): Page(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpClient(), SpToolbar()

### Community 50 - "input-group.tsx"
Cohesion: 0.28
Nodes (7): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 51 - "DataTable"
Cohesion: 0.09
Nodes (26): CURRENT_YEAR, PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS, STATUS_OPTIONS, YEAR_OPTIONS, CrudLike, Editing (+18 more)

### Community 52 - "components/periode-filter.tsx"
Cohesion: 0.22
Nodes (9): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, useKpiList(), usePeriodeFilter() (+1 more)

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 54 - "useMasterTable.ts"
Cohesion: 0.31
Nodes (6): resolveFkLabel(), UseMasterTableOpts, buildTreeOptions(), computeSubtreeIds(), Computed, Resolved

### Community 55 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 56 - "master.schema.ts"
Cohesion: 0.33
Nodes (5): namaWajib, ProfesiInput, profesiSchema, SimpleNameInput, simpleNameSchema

### Community 57 - "_shared/index.ts"
Cohesion: 0.15
Nodes (11): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery, ListResultStatusPegawaiResponse (+3 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.06
Nodes (31): asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams (+23 more)

### Community 59 - "rupiah"
Cohesion: 0.50
Nodes (3): gradeConfig, rumahDinasConfig, rupiah()

### Community 60 - "login-form.tsx"
Cohesion: 0.31
Nodes (7): Data, LoginForm(), LoginPage(), loginRequest(), useLogin(), LoginFormData, loginSchema

### Community 61 - "pengajuan-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 63 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 64 - "usePegawaiDashboard.ts"
Cohesion: 0.50
Nodes (3): usePegawaiDashboard(), dashboardKeys, BiodataDashboardResponse

### Community 66 - "crud-form.tsx"
Cohesion: 0.16
Nodes (32): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS (+24 more)

### Community 67 - "tunjangan.config.ts"
Cohesion: 0.50
Nodes (3): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.14
Nodes (30): EntityFormModal(), BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClient(), ProsesGajiClientProps, STATUS_DOT, KOMPONEN_COLUMNS (+22 more)

### Community 71 - "pengajuan-page-client.tsx"
Cohesion: 0.09
Nodes (33): ADR-0043, CutiPengajuanPage(), MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), renderClient() (+25 more)

### Community 73 - "ref_sonner"
Cohesion: 0.20
Nodes (9): ChangePasswordForm(), Data, PasswordField(), schema, changePassword(), useChangePassword(), TerminasiFormValues, terminasiSchema (+1 more)

### Community 74 - "useKpiForm.ts"
Cohesion: 0.19
Nodes (13): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, useKpiForm(), UseKpiFormProps, useCreateKpi() (+5 more)

### Community 75 - "PageQuery"
Cohesion: 0.03
Nodes (117): ProfilSearchParams, SingleResultString, ApprovalSearchParams, PageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, PageCutiJenisResponse (+109 more)

### Community 84 - "dashboard-sections.tsx"
Cohesion: 0.19
Nodes (16): SectionCrudSlotProps, keahlianCrudConfig, pelatihanCrudConfig, pendidikanCrudConfig, pengalamanKerjaCrudConfig, boolStr(), hubunganKeluarga(), jenisMutasi() (+8 more)

### Community 105 - "field-renderers.tsx"
Cohesion: 0.18
Nodes (16): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), FieldDate(), toDate() (+8 more)

### Community 107 - "ref_vitest"
Cohesion: 0.05
Nodes (27): renderDialog(), mockFetch(), okJson(), renderClient(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson() (+19 more)

## Knowledge Gaps
- **12 isolated node(s):** `ADR-0040`, `ADR-0043`, `ADR-0040`, `ADR-0040`, `ADR-0008` (+7 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 679 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `roles.ts`, `button.tsx`, `Skeleton`, `utils.ts`, `slip-gaji-preview-dialog.tsx`, `ref_tanstack_react_query`, `pendukung-layout-client.tsx`, `entity-form-modal.tsx`, `sidebar.tsx`, `section-left-panel.tsx`, `org-chart.tsx`, `tambahan-client.tsx`, `dropdown-menu.tsx`, `riwayat-layout-client.tsx`, `pegawai-organisasi-table.tsx`, `ringkasan-panel.tsx`, `command.tsx`, `cuti-client.tsx`, `sanksi/form.tsx`, `input-group.tsx`, `DataTable`, `components/periode-filter.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `dashboard-sections.tsx`, `field-renderers.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **What connects `ADR-0040`, `ADR-0043`, `ADR-0040` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OrgChart` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Why does `Button()` connect `crud-form.tsx` to `jenis-sp.ts`, `roles.ts`, `button.tsx`, `keluarga-client.tsx`, `Skeleton`, `utils.ts`, `slip-gaji-preview-dialog.tsx`, `ref_tanstack_react_query`, `entity-form-modal.tsx`, `sidebar.tsx`, `hasPermission`, `section-left-panel.tsx`, `org-chart.tsx`, `tambahan-client.tsx`, `dnp-page-client.tsx`, `pegawai-organisasi-table.tsx`, `useFkOptions`, `ringkasan-panel.tsx`, `ref_react`, `command.tsx`, `sanksi/form.tsx`, `terminasi-client.tsx`, `mutasi-client.tsx`, `sp-client.tsx`, `input-group.tsx`, `DataTable`, `login-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `ref_sonner`, `field-renderers.tsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09047619047619047 - nodes in this community are weakly interconnected._
- **Why does `PageQuery` connect `PageQuery` to `roles.ts`, `kepegawaian.ts`, `profil.ts`, `sanksi.ts`, `ref_tanstack_react_query`, `master-entity-types.ts`, `pengajuan.ts`, `tunjangan.ts`, `keahlian.ts`, `detail-dasar-gaji.ts`, `_shared/index.ts`, `riwayat.ts`, `potongan-tkk.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `roles.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055191256830601096 - nodes in this community are weakly interconnected._