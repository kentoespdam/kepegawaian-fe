# Graph Report - kepegawaian-fe  (2026-11-23)

## Corpus Check
- 466 files · ~147,865 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .ico 1, .css 1, (none) 1)

## Summary
- 2201 nodes · 8819 edges · 78 communities (73 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2b943828`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- role-permission-dialog.tsx
- jenis-sp.ts
- ref_tanstack_react_query
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
- app-shell.tsx
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
- ref_react
- command.tsx
- pegawai.ts
- PageableObject
- persetujuan-page-client.tsx
- sanksi/form.tsx
- SortObject
- tunjangan.ts
- cuti/page.test.tsx
- terminasi-client.tsx
- cuti-client.tsx
- verifikasi-client.test.tsx
- sk-form-sheet.test.tsx
- permission-config.ts
- data-pegawai-client.tsx
- usePeriodeFilter.ts
- kuota-form-sheet.test.tsx
- users.ts
- kontrak-form-sheet.test.tsx
- pengalaman-kerja.config.ts
- data-pegawai-client.tsx
- verifikasi-client.test.tsx
- useAdminBiodataMutation.ts
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- tambahan.schema.ts
- terminasi-form-sheet.test.tsx
- crud-form.tsx
- kontrak-form-sheet.tsx
- pengajuan-page-client.tsx
- utils.ts
- kpi.ts
- PageEnvelope
- dashboard-sections.tsx
- sk/page.test.tsx
- SavedResultLong
- klaim-form-schema.ts
- ref_vitest
- edit-profil-sheet.test.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 187 edges
3. `throwIfNotOk()` - 89 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 84 edges
6. `verifySession` - 84 edges
7. `toApiParams()` - 72 edges
8. `DataTable()` - 61 edges
9. `Input()` - 61 edges
10. `ConfirmDeleteDialog()` - 58 edges

## Surprising Connections (you probably didn't know these)
- `renderSheet()` --calls--> `KuotaFormSheet()`  [EXTRACTED]
  src/app/(app)/cuti/kuota/kuota-form-sheet.test.tsx → src/app/(app)/cuti/kuota/kuota-form-sheet.tsx
- `renderSheet()` --calls--> `PengajuanFormSheet()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.test.tsx → src/app/(app)/cuti/pengajuan/pengajuan-form-sheet.tsx
- `renderClient()` --calls--> `PersetujuanPageClient()`  [EXTRACTED]
  src/app/(app)/cuti/persetujuan/persetujuan-page-client.test.tsx → src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx
- `renderSheet()` --calls--> `KontrakFormSheet()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.test.tsx → src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/kontrak/kontrak-form-sheet.tsx
- `renderSheet()` --calls--> `SkFormSheet()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/sk-form-sheet.test.tsx → src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/sk/sk-form-sheet.tsx

## Import Cycles
- None detected.

## Communities (78 total, 5 thin omitted)

### Community 0 - "role-permission-dialog.tsx"
Cohesion: 0.16
Nodes (20): getActionBadgeInfo(), resolveModuleConfig(), resolvePermissionMeta(), filterGroups(), FilterStatus, groupByModule(), parsePermissions(), PermissionDialogHeader() (+12 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.10
Nodes (30): AlertDialogMedia(), AvatarBadge(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem() (+22 more)

### Community 2 - "ref_tanstack_react_query"
Cohesion: 0.13
Nodes (12): DialogHeaderProps, CreateUserDialogProps, systemKeys, PrefRole, ListResultPrefRole, PagePrefRole, PageResultPagePrefRole, PrefRoleStoreRequest (+4 more)

### Community 3 - "button.tsx"
Cohesion: 0.17
Nodes (35): SectionCrudSlot(), SignerPicker(), FormContainer(), CreateBatchDialog(), CreateBatchDialogProps, FormValues, schema, KpiFormDialog() (+27 more)

### Community 4 - "keluarga-client.tsx"
Cohesion: 0.08
Nodes (54): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, KARTU_COLUMNS, KartuIdentitasPage(), KartuToolbar(), KEAHLIAN_COLUMNS (+46 more)

### Community 5 - "ref_next"
Cohesion: 0.14
Nodes (17): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+9 more)

### Community 6 - "kepegawaian.ts"
Cohesion: 0.05
Nodes (58): DnpGroup, DnpItemWithIndex, DnpPageClient(), formatDnpDate(), formatOrgGroupName(), getOrgSortOrder(), groupDnpByOrganisasi(), COLUMN_NUMBERS (+50 more)

### Community 7 - "field-renderers.tsx"
Cohesion: 0.17
Nodes (43): KuotaFormSheet(), Props, SheetEditGaji(), Props, SheetEditProfil(), KartuIdentitasFormSheet(), KeahlianFormSheet(), FormValues (+35 more)

### Community 8 - "kontrak-form-sheet.tsx"
Cohesion: 0.12
Nodes (19): FormValues, normalizeFk(), Props, schema, SectionLabel(), useGolonganOptions(), FormValues, normalizeFk() (+11 more)

### Community 9 - "ref_tanstack_react_query"
Cohesion: 0.08
Nodes (25): BATCH_COLUMNS, STATUS_OPTIONS, penggajianKeys, useDeleteBatch(), useReprocessBatch(), batchKeys, useBatchInfo(), BatchSearchParams (+17 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.23
Nodes (10): ENABLED_CATEGORIES, Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail() (+2 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.04
Nodes (87): MasterEntityName, MasterEntityTypes, SingleResultString, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse (+79 more)

### Community 12 - "entity-form-modal.tsx"
Cohesion: 0.17
Nodes (14): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, InputGroupAddon(), inputGroupAddonVariants, InputGroupButton() (+6 more)

### Community 13 - "cn"
Cohesion: 0.13
Nodes (18): SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel(), SidebarInput(), SidebarMenuAction() (+10 more)

### Community 14 - "Envelope"
Cohesion: 0.05
Nodes (63): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+55 more)

### Community 15 - "hasPermission"
Cohesion: 0.16
Nodes (31): ADR-0001, CutiKuotaPage(), CutiPersetujuanPage(), DataPegawaiPage(), PegawaiRootPage(), PendukungRootPage(), RiwayatRootPage(), TambahPegawaiPage() (+23 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (48): DashboardClient(), DashboardPage(), Field(), SectionLeftPanel(), SectionRightPanel(), ActionButtons(), Field(), Props (+40 more)

### Community 17 - "keahlian.config.ts"
Cohesion: 0.17
Nodes (20): EntityFormModalProps, FormField, keahlianFormFields, keahlianFormSchema, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig, keluargaFormFields, keluargaFormSchema (+12 more)

### Community 18 - "usePendukungQueries.ts"
Cohesion: 0.13
Nodes (14): useKartuIdentitasDetail(), useKartuIdentitasList(), useKeahlianDetail(), useKeahlianList(), useKeluargaDetail(), useKeluargaList(), usePelatihanDetail(), usePelatihanList() (+6 more)

### Community 19 - "tambahan-client.tsx"
Cohesion: 0.22
Nodes (27): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, makeColumns(), UsersClient(), ReprocessButton(), ReprocessButtonProps (+19 more)

### Community 20 - "ref_sonner"
Cohesion: 0.12
Nodes (17): FormValues, JENIS_SK_BY_MUTASI, Props, schema, SectionLabel(), SanksiManagerProps, SanksiRow, masterKeys (+9 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.16
Nodes (18): ADR-0010, ADR-0041, AccountSession, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession() (+10 more)

### Community 22 - "app-shell.tsx"
Cohesion: 0.20
Nodes (16): AppLayout(), AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SidebarContent(), SidebarFooter() (+8 more)

### Community 23 - "useDashboardSections.tsx"
Cohesion: 0.17
Nodes (20): keahlianMutationUrl, keluargaMutationUrl, pelatihanMutationUrl, pendidikanMutationUrl, profilKeys, DashboardQuery, useDashboardSections(), UseDashboardSectionsReturn (+12 more)

### Community 24 - "throwIfNotOk"
Cohesion: 0.16
Nodes (19): useCutiKuotaPegawai(), useCutiList(), useCutiPegawaiList(), useKontrakDetail(), useKontrakList(), useKontrakPegawaiList(), useMutasiContextData(), useMutasiDetail() (+11 more)

### Community 25 - "Button"
Cohesion: 0.25
Nodes (7): ChangePasswordForm(), Data, PasswordField(), schema, buttonVariants, Calendar(), CalendarDayButton()

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (17): Avatar(), AvatarFallback(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+9 more)

### Community 27 - "sidebar-utils.ts"
Cohesion: 0.39
Nodes (6): Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities(), MASTER_GATE

### Community 28 - "riwayat.ts"
Cohesion: 0.05
Nodes (52): Props, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, ListResultRiwayatSkQuery, PagePegawaiResponse (+44 more)

### Community 29 - "riwayat-layout-client.tsx"
Cohesion: 0.24
Nodes (10): Header(), HeaderError(), HeaderSkeleton(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, RailSkeleton() (+2 more)

### Community 30 - "ref_zod"
Cohesion: 0.06
Nodes (54): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+46 more)

### Community 31 - "keahlian-form-sheet.tsx"
Cohesion: 0.15
Nodes (9): CURRENT_YEAR, FormValues, normalizeFk(), Props, schema, TINGKAT_OPTIONS, SheetDescription(), SheetOverlay() (+1 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.12
Nodes (20): STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps, OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps (+12 more)

### Community 33 - "providers.tsx"
Cohesion: 0.27
Nodes (5): inter, metadata, RootLayout(), handleSessionExpired(), Providers()

### Community 34 - "useFkOptions"
Cohesion: 0.17
Nodes (19): FormValues, schema, TambahPegawaiForm(), useJabatanByOrganisasi(), pegawaiKeys, GajiFormValues, schema, toDefaults() (+11 more)

### Community 37 - "ref_react"
Cohesion: 0.19
Nodes (6): BatchContext, BatchProvider(), BatchState, useBatchContext(), Consumer(), MOCK_BATCH

### Community 38 - "command.tsx"
Cohesion: 0.31
Nodes (13): FKComboboxFilter(), FKComboboxFilterProps, FKCombobox(), FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+5 more)

### Community 39 - "pegawai.ts"
Cohesion: 0.07
Nodes (58): SignerPickerProps, Props, BiodataPatchRequest, BiodataResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse (+50 more)

### Community 40 - "PageableObject"
Cohesion: 0.19
Nodes (10): useProfilApproval(), PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject (+2 more)

### Community 41 - "persetujuan-page-client.tsx"
Cohesion: 0.16
Nodes (23): StatusBadge(), DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), RiwayatTab(), StatusBadge(), CURRENT_YEAR, PersetujuanPageClient() (+15 more)

### Community 42 - "sanksi/form.tsx"
Cohesion: 0.27
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 43 - "SortObject"
Cohesion: 0.07
Nodes (30): KuotaFormSheetProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPostRequest (+22 more)

### Community 44 - "tunjangan.ts"
Cohesion: 0.22
Nodes (9): GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse (+1 more)

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 46 - "terminasi-client.tsx"
Cohesion: 0.31
Nodes (6): TerminasiClient(), queryClient, renderComponent(), TERMINASI_TABS, TerminasiTabId, useTerminasiTable()

### Community 47 - "cuti-client.tsx"
Cohesion: 0.05
Nodes (46): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS (+38 more)

### Community 48 - "verifikasi-client.test.tsx"
Cohesion: 0.22
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 49 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (5): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover(), renderSheet()

### Community 50 - "permission-config.ts"
Cohesion: 0.33
Nodes (5): ActionType, MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition

### Community 51 - "data-pegawai-client.tsx"
Cohesion: 0.36
Nodes (6): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai()

### Community 52 - "usePeriodeFilter.ts"
Cohesion: 0.47
Nodes (4): MONTH_OPTIONS, useVerifikasiFilters(), usePeriodeFilter(), UsePeriodeFilterOptions

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 54 - "users.ts"
Cohesion: 0.16
Nodes (11): RoleAssignmentDialogProps, useUserList(), AppwriteUser, PageResultPageUserResponse, PageUserResponse, Prefs, SavedResultAppwriteUser, SimpleGrantedAuthority (+3 more)

### Community 55 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 56 - "pengalaman-kerja.config.ts"
Cohesion: 0.50
Nodes (3): pengalamanKerjaCrudConfig, pengalamanKerjaFormFields, pengalamanKerjaMutationUrl

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.11
Nodes (18): KomponenDialogProps, KomponenFormState, ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiBatchMasterProsesPostRequest, GajiKomponenPostRequest, GajiKomponenPutRequest, GajiKomponenResponse (+10 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.05
Nodes (33): mockFetch(), okJson(), renderClient(), mockSearchParams, asPage(), createWrapper(), CURRENT_MONTH, CURRENT_YEAR (+25 more)

### Community 59 - "useAdminBiodataMutation.ts"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

### Community 60 - "login-form.tsx"
Cohesion: 0.13
Nodes (13): PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps, Data, LoginForm(), LoginPage(), PdfViewer(), PdfViewerProps (+5 more)

### Community 61 - "pengajuan-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 63 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (6): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), renderSheet(), ResizeObserverMock

### Community 66 - "crud-form.tsx"
Cohesion: 0.11
Nodes (36): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, renderDialog(), YEAR_OPTIONS, Chip(), DataPegawaiToolbar(), DataPegawaiToolbarProps (+28 more)

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.11
Nodes (27): EntityFormModal(), BASE_COLUMNS, formatPeriodeIndo(), parseYearMonth(), ProsesGajiClientProps, STATUS_DOT, KOMPONEN_COLUMNS, KomponenClient() (+19 more)

### Community 71 - "pengajuan-page-client.tsx"
Cohesion: 0.12
Nodes (21): ADR-0043, CutiPengajuanPage(), MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson(), renderClient() (+13 more)

### Community 73 - "utils.ts"
Cohesion: 0.07
Nodes (29): FormValues, numField, schema, toNum(), FormValues, normalizeFk(), Props, schema (+21 more)

### Community 74 - "kpi.ts"
Cohesion: 0.07
Nodes (36): KpiFormDialogProps, KpiPage(), metadata, FormulaEditorProps, JENIS_LABEL, OPERATORS, KPI_COLUMNS, KpiFormValues (+28 more)

### Community 75 - "PageEnvelope"
Cohesion: 0.04
Nodes (65): RiwayatSearchParams, JenisKeahlianSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse (+57 more)

### Community 84 - "dashboard-sections.tsx"
Cohesion: 0.24
Nodes (13): SECTIONS, keahlianCrudConfig, pelatihanCrudConfig, pendidikanCrudConfig, boolStr(), hubunganKeluarga(), jenisMutasi(), jenisSk() (+5 more)

### Community 88 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 101 - "SavedResultLong"
Cohesion: 0.05
Nodes (54): Props, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse (+46 more)

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.19
Nodes (18): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+10 more)

### Community 107 - "ref_vitest"
Cohesion: 0.18
Nodes (7): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson(), renderSheet(), formatDateCustom(), formatDateDotted()

### Community 109 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson(), renderSheet()

## Knowledge Gaps
- **12 isolated node(s):** `ADR-0040`, `ADR-0043`, `ADR-0040`, `ADR-0040`, `ADR-0008` (+7 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 649 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `role-permission-dialog.tsx`, `button.tsx`, `keluarga-client.tsx`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `pendukung-layout-client.tsx`, `entity-form-modal.tsx`, `cn`, `section-left-panel.tsx`, `tambahan-client.tsx`, `ref_sonner`, `app-shell.tsx`, `Button`, `dropdown-menu.tsx`, `riwayat-layout-client.tsx`, `keahlian-form-sheet.tsx`, `components/rincian-gaji-panel.tsx`, `command.tsx`, `persetujuan-page-client.tsx`, `sanksi/form.tsx`, `cuti-client.tsx`, `login-form.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `dashboard-sections.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **What connects `ADR-0040`, `ADR-0043`, `ADR-0040` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10158730158730159 - nodes in this community are weakly interconnected._
- **Why does `Button()` connect `button.tsx` to `role-permission-dialog.tsx`, `jenis-sp.ts`, `keluarga-client.tsx`, `ref_next`, `kepegawaian.ts`, `field-renderers.tsx`, `kontrak-form-sheet.tsx`, `entity-form-modal.tsx`, `cn`, `section-left-panel.tsx`, `tambahan-client.tsx`, `ref_sonner`, `app-shell.tsx`, `Button`, `keahlian-form-sheet.tsx`, `components/rincian-gaji-panel.tsx`, `useFkOptions`, `command.tsx`, `persetujuan-page-client.tsx`, `sanksi/form.tsx`, `terminasi-client.tsx`, `cuti-client.tsx`, `login-form.tsx`, `crud-form.tsx`, `kontrak-form-sheet.tsx`, `pengajuan-page-client.tsx`, `utils.ts`, `kpi.ts`, `klaim-form-schema.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `ref_tanstack_react_query` be split into smaller, more focused modules?**
  _Cohesion score 0.13054187192118227 - nodes in this community are weakly interconnected._
- **Why does `PageQuery` connect `PageEnvelope` to `ref_tanstack_react_query`, `SavedResultLong`, `kepegawaian.ts`, `pegawai.ts`, `PageableObject`, `ref_tanstack_react_query`, `kpi.ts`, `SortObject`, `master-entity-types.ts`, `tunjangan.ts`, `Envelope`, `users.ts`, `data-pegawai-client.tsx`, `riwayat.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `keluarga-client.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07706374085684431 - nodes in this community are weakly interconnected._