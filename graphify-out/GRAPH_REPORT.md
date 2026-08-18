# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 280 files · ~105,328 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1575 nodes · 4971 edges · 68 communities (67 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa7d3034`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- app/layout.tsx
- input-group.tsx
- pengajuan-page-client.test.tsx
- formatDate
- grade.config.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 188 edges
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
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/layout.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts
- `RiwayatLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (68 total, 1 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.05
Nodes (68): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+60 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.05
Nodes (48): ListResultLampiranSkQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery, HariLiburSearchParams, ListResultHariLiburListResponse (+40 more)

### Community 2 - "Page"
Cohesion: 0.07
Nodes (48): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+40 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.07
Nodes (40): CutiPengajuanPage(), CutiPersetujuanPage(), DashboardClient(), DashboardPage(), Field(), SectionLeftPanel(), KeluargaToolbar(), Props (+32 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.12
Nodes (28): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, SectionCrudSlotProps, fetchSection(), SectionConf, KartuIdentitasPage() (+20 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.08
Nodes (34): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, CrudLike, Editing, SlotQuery, FilterStatus (+26 more)

### Community 6 - "cn"
Cohesion: 0.07
Nodes (38): KuotaStrip(), KuotaStrip(), MasterSwitch(), MasterSwitchProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup() (+30 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.10
Nodes (30): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+22 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.16
Nodes (19): ADR-0001, ADR-0010, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), resolveToken() (+11 more)

### Community 9 - "batch.ts"
Cohesion: 0.13
Nodes (20): CURRENT_YEAR, PersetujuanPageClientProps, STATUS_ICONS, TabId, TABS, YEAR_OPTIONS, MUTASI_COLUMNS, MutasiPage() (+12 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.17
Nodes (21): AlasanBerhentiPage(), EntityFormModal(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+13 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.08
Nodes (45): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+37 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.12
Nodes (14): LevelSearchParams, ListResultLevelResponse, PageLevelResponse, PageResultPageLevelResponse, SingleResultLevelResponse, DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse (+6 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (13): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues, normalizeFk() (+5 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.20
Nodes (19): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), PengalamanKerjaPage(), val(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage() (+11 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.15
Nodes (20): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, PENGALAMAN_KOLOM, ConfirmDeleteDialog() (+12 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 17 - "useFkOptions"
Cohesion: 0.07
Nodes (38): AppLayout(), AppShell(), MODULE_ENTITY_MAP, MODULES, SheetDescription(), Sidebar(), SidebarContent(), SidebarContext (+30 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.06
Nodes (42): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery (+34 more)

### Community 19 - "hasPermission"
Cohesion: 0.10
Nodes (26): PengajuanFormSheetProps, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatTerminasiQuery, JabatanPutRequest, JabatanQuery, ListResultJabatanListResponse, ListResultJabatanQuery (+18 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.06
Nodes (60): FormValues, KuotaFormSheet(), numField, schema, toNum(), besok(), FormValues, PengajuanFormSheet() (+52 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.21
Nodes (22): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPostRequest (+14 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.11
Nodes (28): ApprovalAction, ApprovalConfirmDialog(), ApprovalConfirmDialogProps, makeColumns(), useAllRoles(), UsersClient(), ConfirmDeleteDialogProps, AlertDialog() (+20 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.10
Nodes (14): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+6 more)

### Community 26 - "kontrak-form-sheet.tsx"
Cohesion: 0.11
Nodes (21): CURRENT_YEAR, PengajuanPageClientProps, STATUS_ICONS, StatusBadge(), ADR-0040, YEAR_OPTIONS, StatusBadge(), CURRENT_YEAR (+13 more)

### Community 27 - "makeConfig"
Cohesion: 0.09
Nodes (23): KepegawaianSearchParams, SingleResultObject, AlasanBerhentiSearchParams, GradeSearchParams, JabatanSearchParams, JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse (+15 more)

### Community 28 - "master-entity-types.ts"
Cohesion: 0.08
Nodes (25): Props, GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext (+17 more)

### Community 29 - "SortObject"
Cohesion: 0.36
Nodes (6): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, Textarea()

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.10
Nodes (16): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet() (+8 more)

### Community 31 - "command.tsx"
Cohesion: 0.10
Nodes (19): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+11 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.20
Nodes (17): DataPegawaiToolbar(), labelMap(), PopoverFilterContent(), FormValues, Props, schema, SheetEditGaji(), toDefaults() (+9 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.52
Nodes (5): entityGate(), entityHref(), filterVisibleEntities(), MASTER_GATE, SidebarEntity

### Community 34 - "riwayat/cuti/page.tsx"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.12
Nodes (15): KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson() (+7 more)

### Community 36 - "EntityConfig"
Cohesion: 0.06
Nodes (35): KuotaFormSheetProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPostRequest (+27 more)

### Community 37 - "hari-libur.ts"
Cohesion: 0.21
Nodes (11): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+3 more)

### Community 38 - "profil/page.tsx"
Cohesion: 0.10
Nodes (24): DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, FormValues, Props, schema, RFC-7807, Data (+16 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.19
Nodes (10): FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), DataTableToolbarProps, FilterField (+2 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.27
Nodes (12): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+4 more)

### Community 41 - "profesi.ts"
Cohesion: 0.31
Nodes (8): ProfilPage(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 42 - "pendapatan-non-pajak.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.36
Nodes (7): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField

### Community 44 - "types/_shared.ts"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 45 - "PageQuery"
Cohesion: 0.12
Nodes (14): SingleResultString, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+6 more)

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), ResizeObserverMock

### Community 47 - "app/layout.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 48 - "button.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 49 - "kuota-import-dialog.tsx"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 50 - "sanksi.ts"
Cohesion: 0.15
Nodes (15): MutasiLampiranCard(), Props, RiwayatMutasiQuery, PegawaiPatchGaji, PegawaiResponseDetail, RiwayatSkResponse, GajiBatchMasterResponse, GajiPotonganTkkPostRequest (+7 more)

### Community 51 - "utils.ts"
Cohesion: 0.25
Nodes (7): gradeConfig, GradeQuery, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 53 - "profil/page.tsx"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 54 - "pengalaman-kerja-form-sheet.tsx"
Cohesion: 0.25
Nodes (7): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery

### Community 55 - "sk-form-sheet.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 56 - "keluarga-form-sheet.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 57 - "GolonganResponse"
Cohesion: 0.12
Nodes (18): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, ApprovalClient(), COLUMNS, FIELD_MAP (+10 more)

### Community 58 - "Envelope"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 60 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 61 - "input-group.tsx"
Cohesion: 0.33
Nodes (5): JenjangPendidikanPutRequest, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse

### Community 62 - "pengajuan-page-client.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 63 - "formatDate"
Cohesion: 0.16
Nodes (9): PengajuanPageClient(), mockFetch(), okJson(), PersetujuanPageClient(), mockFetch(), okJson(), TerminasiClient(), queryClient (+1 more)

### Community 64 - "grade.config.ts"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

## Knowledge Gaps
- **438 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+433 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `Page`, `section-left-panel.tsx`, `kartu-identitas/page.tsx`, `batch.ts`, `dropdown-menu.tsx`, `sidebar.tsx`, `useFkOptions`, `pegawai.ts`, `keluarga.ts`, `pendukung/layout.tsx`, `data-pegawai-client.tsx`, `kontrak-form-sheet.tsx`, `SortObject`, `cuti/page.test.tsx`, `hari-libur.ts`, `profil/page.tsx`, `pdf-viewer.test.tsx`, `profesi.ts`, `types/_shared.ts`, `kuota-import-dialog.tsx`, `GolonganResponse`, `formatDate`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `makeConfig` to `verifySession`, `pengalaman-kerja.ts`, `pengajuan.ts`, `users-client.tsx`, `_config-kit.ts`, `sp-form-sheet.tsx`, `hasPermission`, `keluarga/page.tsx`, `pendukung/layout.tsx`, `master-entity-types.ts`, `command.tsx`, `riwayat/cuti/page.tsx`, `EntityConfig`, `PageQuery`, `utils.ts`, `kontrak-form-sheet.test.tsx`, `profil/page.tsx`, `pengalaman-kerja-form-sheet.tsx`, `input-group.tsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `Page` connect `pengalaman-kerja.ts` to `verifySession`, `Page`, `keluarga-form-sheet.tsx`, `section-right-panel.tsx`, `pengajuan.ts`, `users-client.tsx`, `_config-kit.ts`, `sp-form-sheet.tsx`, `hasPermission`, `keluarga/page.tsx`, `pendukung/layout.tsx`, `makeConfig`, `master-entity-types.ts`, `command.tsx`, `riwayat/cuti/page.tsx`, `EntityConfig`, `PageQuery`, `utils.ts`, `kontrak-form-sheet.test.tsx`, `profil/page.tsx`, `pengalaman-kerja-form-sheet.tsx`, `input-group.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _438 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.049473684210526316 - nodes in this community are weakly interconnected._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Page` be split into smaller, more focused modules?**
  _Cohesion score 0.07243195785776997 - nodes in this community are weakly interconnected._