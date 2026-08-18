# Graph Report - .  (2026-08-18)

## Corpus Check
- 0 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1581 nodes · 4979 edges · 69 communities (66 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- verifySession
- pengalaman-kerja.ts
- Page
- section-left-panel.tsx
- keluarga-form-sheet.tsx
- kartu-identitas/page.tsx
- cn
- riwayat.ts
- approval-client.tsx
- batch.ts
- section-right-panel.tsx
- pengajuan.ts
- users-client.tsx
- dropdown-menu.tsx
- jenjang-pendidikan.ts
- sidebar.tsx
- _config-kit.ts
- useFkOptions
- sp-form-sheet.tsx
- hasPermission
- pegawai.ts
- keluarga.ts
- keluarga/page.tsx
- pendukung/layout.tsx
- cuti/page.tsx
- data-pegawai-client.tsx
- kontrak-form-sheet.tsx
- makeConfig
- master-entity-types.ts
- SortObject
- cuti/page.test.tsx
- command.tsx
- roles.test.tsx
- terminasi-form-sheet.test.tsx
- riwayat/cuti/page.tsx
- jabatan.ts
- EntityConfig
- hari-libur.ts
- profil/page.tsx
- profesi/form.tsx
- pdf-viewer.test.tsx
- profesi.ts
- pendapatan-non-pajak.ts
- jenis-keahlian.ts
- types/_shared.ts
- PageQuery
- detail-dasar-gaji.ts
- app/layout.tsx
- button.tsx
- kuota-import-dialog.tsx
- sanksi.ts
- utils.ts
- kontrak-form-sheet.test.tsx
- profil/page.tsx
- pengalaman-kerja-form-sheet.tsx
- sk-form-sheet.tsx
- keluarga-form-sheet.tsx
- GolonganResponse
- Envelope
- phdp.ts
- Community 60
- input-group.tsx
- pengajuan-page-client.test.tsx
- Community 63
- grade.config.ts
- Community 66

## God Nodes (most connected - your core abstractions)
1. `cn()` - 190 edges
2. `PageQuery` - 85 edges
3. `Button()` - 61 edges
4. `hasPermission()` - 57 edges
5. `verifySession` - 57 edges
6. `Page` - 49 edges
7. `Envelope` - 48 edges
8. `apiErrorMessage()` - 46 edges
9. `MasterEntityTypes` - 45 edges
10. `throwIfNotOk()` - 44 edges

## Surprising Connections (you probably didn't know these)
- `KuotaFormSheet()` --indirect_call--> `t()`  [INFERRED]
  src/app/(app)/cuti/kuota/kuota-form-sheet.tsx → src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `DashboardPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/page.tsx → src/lib/auth/pegawaiSession.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/layout.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (69 total, 3 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.05
Nodes (67): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+59 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.04
Nodes (63): ListResultLampiranSkQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GolonganSearchParams, ListResultGolonganListResponse (+55 more)

### Community 2 - "Page"
Cohesion: 0.07
Nodes (48): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+40 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (39): DashboardClient(), DashboardPage(), Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), Accordion() (+31 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.09
Nodes (36): fetchSection(), KEAHLIAN_COLUMNS, KeahlianPage(), TINGKAT_LABEL, val(), KELUARGA_COLUMNS, KeluargaPage(), val() (+28 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.08
Nodes (36): FormValues, KuotaFormSheet(), numField, schema, toNum(), CURRENT_YEAR, KuotaImportDialogProps, YEAR_OPTIONS (+28 more)

### Community 6 - "cn"
Cohesion: 0.08
Nodes (39): CutiLayout(), RAIL_ITEMS, KuotaStrip(), ProfilPage(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink() (+31 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.14
Nodes (26): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+18 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.09
Nodes (28): ADR-0001, ADR-0010, MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson(), MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK (+20 more)

### Community 9 - "batch.ts"
Cohesion: 0.08
Nodes (34): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, StatusBadge(), ApprovalAction, ApprovalConfirmDialog(), CURRENT_YEAR (+26 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.15
Nodes (21): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+13 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.10
Nodes (39): MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery, GradeListResponse (+31 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.06
Nodes (34): KepegawaianSearchParams, SingleResultObject, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse (+26 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.09
Nodes (28): FormValues, PengajuanFormSheet(), schema, selisihHari(), FormValues, KeluargaFormSheet(), normalizeFk(), Props (+20 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.16
Nodes (23): CutiKuotaPage(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, DataPegawaiPage(), PendukungPage() (+15 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.11
Nodes (22): KARTU_COLUMNS, KartuIdentitasPage(), val(), PELATIHAN_COLUMNS, PelatihanPage(), val(), BadgeItem, BadgeManager() (+14 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 17 - "useFkOptions"
Cohesion: 0.09
Nodes (27): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+19 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.07
Nodes (30): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+22 more)

### Community 19 - "hasPermission"
Cohesion: 0.10
Nodes (27): PengajuanFormSheetProps, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatTerminasiQuery, JabatanPutRequest, JabatanQuery, JabatanSearchParams, ListResultJabatanListResponse (+19 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.10
Nodes (22): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, FormValues, normalizeFk(), PelatihanFormSheet() (+14 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.17
Nodes (25): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest (+17 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.18
Nodes (19): CURRENT_YEAR, KuotaStrip(), PengajuanPageClientProps, STATUS_ICONS, ADR-0040, YEAR_OPTIONS, ApprovalConfirmDialogProps, ConfirmDeleteDialogProps (+11 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.11
Nodes (17): KuotaImportDialog(), t(), CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema (+9 more)

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.11
Nodes (15): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+7 more)

### Community 26 - "kontrak-form-sheet.tsx"
Cohesion: 0.10
Nodes (21): RolePermissionDialogProps, PrefPermission, PrefRole, SavedResultString, PagePrefRole, PageResultPagePrefRole, PrefRoleStoreRequest, PrefRoleUpdateRequest (+13 more)

### Community 27 - "makeConfig"
Cohesion: 0.08
Nodes (20): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse (+12 more)

### Community 28 - "master-entity-types.ts"
Cohesion: 0.08
Nodes (23): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+15 more)

### Community 29 - "SortObject"
Cohesion: 0.15
Nodes (17): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, CrudFormProps, FKCombobox(), InputGroup() (+9 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.13
Nodes (13): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet() (+5 more)

### Community 31 - "command.tsx"
Cohesion: 0.10
Nodes (20): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+12 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.20
Nodes (17): DataPegawaiToolbar(), labelMap(), PopoverFilterContent(), FormValues, Props, schema, SheetEditGaji(), toDefaults() (+9 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.17
Nodes (16): AppLayout(), AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarMenu() (+8 more)

### Community 34 - "riwayat/cuti/page.tsx"
Cohesion: 0.16
Nodes (12): RFC-7807, RolesClient(), useAllPermissions(), useAllRoles(), PdfViewerProps, Button(), buttonVariants, Calendar() (+4 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.11
Nodes (16): KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+8 more)

### Community 36 - "EntityConfig"
Cohesion: 0.12
Nodes (17): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPostRequest, CutiKuotaPutRequest (+9 more)

### Community 37 - "hari-libur.ts"
Cohesion: 0.22
Nodes (12): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+4 more)

### Community 38 - "profil/page.tsx"
Cohesion: 0.24
Nodes (10): DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, FieldDate(), toDate(), toStr(), Label(), Popover() (+2 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.18
Nodes (11): FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), DataTableToolbar(), DataTableToolbarProps (+3 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.27
Nodes (12): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+4 more)

### Community 41 - "profesi.ts"
Cohesion: 0.18
Nodes (12): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest (+4 more)

### Community 42 - "pendapatan-non-pajak.ts"
Cohesion: 0.20
Nodes (7): KuotaFormSheetProps, mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock, CutiKuotaResponse

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 44 - "types/_shared.ts"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 45 - "PageQuery"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 47 - "app/layout.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 48 - "button.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 49 - "kuota-import-dialog.tsx"
Cohesion: 0.24
Nodes (9): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams, SingleResultGajiPotonganTkkResponse (+1 more)

### Community 50 - "sanksi.ts"
Cohesion: 0.25
Nodes (8): MutasiLampiranCard(), Props, RiwayatMutasiQuery, RiwayatSkResponse, GajiPotonganTkkResponse, GajiTunjanganResponse, GolonganResponse, ProfesiMiniResponse

### Community 51 - "utils.ts"
Cohesion: 0.33
Nodes (5): Data, LoginForm(), schema, loginRequest(), useLogin()

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 53 - "profil/page.tsx"
Cohesion: 0.22
Nodes (8): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, GajiPendapatanNonPajakResponse

### Community 54 - "pengalaman-kerja-form-sheet.tsx"
Cohesion: 0.22
Nodes (8): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil

### Community 55 - "sk-form-sheet.tsx"
Cohesion: 0.29
Nodes (7): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, SingleResultPendidikanQuery

### Community 56 - "keluarga-form-sheet.tsx"
Cohesion: 0.43
Nodes (6): MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val()

### Community 57 - "GolonganResponse"
Cohesion: 0.29
Nodes (6): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL

### Community 58 - "Envelope"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 59 - "phdp.ts"
Cohesion: 0.38
Nodes (5): CutiPengajuanPage(), PengajuanPageClient(), CutiPersetujuanPage(), PersetujuanPageClient(), getPegawaiSession

### Community 60 - "Community 60"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 61 - "input-group.tsx"
Cohesion: 0.48
Nodes (5): resolveFkLabel(), useMasterTable(), UseMasterTableOpts, buildTreeOptions(), computeSubtreeIds()

### Community 62 - "pengajuan-page-client.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

## Knowledge Gaps
- **441 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+436 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `Page`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `kartu-identitas/page.tsx`, `batch.ts`, `dropdown-menu.tsx`, `sidebar.tsx`, `useFkOptions`, `pegawai.ts`, `keluarga.ts`, `pendukung/layout.tsx`, `data-pegawai-client.tsx`, `SortObject`, `cuti/page.test.tsx`, `terminasi-form-sheet.test.tsx`, `riwayat/cuti/page.tsx`, `hari-libur.ts`, `profil/page.tsx`, `pdf-viewer.test.tsx`, `jenis-keahlian.ts`, `types/_shared.ts`, `GolonganResponse`, `phdp.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Page` connect `pengalaman-kerja.ts` to `verifySession`, `Page`, `keluarga-form-sheet.tsx`, `riwayat.ts`, `pengajuan.ts`, `users-client.tsx`, `_config-kit.ts`, `sp-form-sheet.tsx`, `hasPermission`, `keluarga/page.tsx`, `kontrak-form-sheet.tsx`, `makeConfig`, `master-entity-types.ts`, `command.tsx`, `EntityConfig`, `PageQuery`, `kuota-import-dialog.tsx`, `kontrak-form-sheet.test.tsx`, `profil/page.tsx`, `pengalaman-kerja-form-sheet.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `users-client.tsx` to `verifySession`, `pengalaman-kerja.ts`, `EntityConfig`, `PageQuery`, `_config-kit.ts`, `kuota-import-dialog.tsx`, `sp-form-sheet.tsx`, `hasPermission`, `kontrak-form-sheet.test.tsx`, `profil/page.tsx`, `keluarga/page.tsx`, `pengalaman-kerja-form-sheet.tsx`, `kontrak-form-sheet.tsx`, `makeConfig`, `master-entity-types.ts`, `command.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _441 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.04965920155793573 - nodes in this community are weakly interconnected._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0436036036036036 - nodes in this community are weakly interconnected._
- **Should `Page` be split into smaller, more focused modules?**
  _Cohesion score 0.07243195785776997 - nodes in this community are weakly interconnected._