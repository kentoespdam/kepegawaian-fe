# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 270 files · ~99,051 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1511 nodes · 4686 edges · 68 communities (67 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98c1b067`
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
- app-shell.tsx
- jenis-sp.ts
- master-entity-types.ts
- SortObject
- cuti/page.test.tsx
- command.tsx
- roles.test.tsx
- terminasi-form-sheet.test.tsx
- sanksi/form.tsx
- jabatan.ts
- riwayat-constants.ts
- field-renderers.tsx
- JenisSk
- profesi/form.tsx
- pdf-viewer.test.tsx
- profesi.ts
- sp/page.tsx
- jenis-keahlian.ts
- types/_shared.ts
- PageQuery
- detail-dasar-gaji.ts
- button.tsx
- sanksi.ts
- utils.ts
- kontrak-form-sheet.test.tsx
- profil/page.tsx
- potongan-tkk.ts
- keahlian-form-sheet.tsx
- parameter-setting.ts
- Envelope
- phdp.ts
- tunjangan.ts
- input-group.tsx
- grade.config.ts
- edit-gaji-sheet.test.tsx
- organisasi.ts
- sk-form-sheet.tsx
- GolonganResponse
- pelatihan-form-sheet.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 182 edges
2. `PageQuery` - 85 edges
3. `Button()` - 57 edges
4. `hasPermission()` - 57 edges
5. `verifySession` - 57 edges
6. `Page` - 49 edges
7. `Envelope` - 48 edges
8. `MasterEntityTypes` - 45 edges
9. `SortObject` - 42 edges
10. `PageableObject` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AvatarImage()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (68 total, 1 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.14
Nodes (13): nameCol, simpleNameSchema, jenisKeahlianConfig, jenisKitasConfig, jenisPelatihanConfig, levelConfig, JenisKeahlianPostRequest, JenisKeahlianQuery (+5 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.10
Nodes (10): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS, PAGE_TITLES, Rail() (+2 more)

### Community 2 - "Page"
Cohesion: 0.50
Nodes (3): hariLiburConfig, HariLiburPostRequest, HariLiburQuery

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (39): Field(), SectionLeftPanel(), KeluargaToolbar(), StatusBadge(), Props, RingkasanPanel(), Accordion(), AccordionContent() (+31 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.10
Nodes (18): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, CURRENT_YEAR, FormValues (+10 more)

### Community 6 - "cn"
Cohesion: 0.08
Nodes (37): CutiLayout(), RAIL_ITEMS, KuotaStrip(), ChangePasswordForm(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink() (+29 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.08
Nodes (26): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+18 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.10
Nodes (37): KuotaPageClient(), fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, KartuIdentitasPage() (+29 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (48): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+40 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.17
Nodes (11): CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanPostRequest, CutiPengajuanPutRequest, KlaimCuti, PageCutiApprovalChainResponse, PageCutiPengajuanResponse, PageResultPageCutiApprovalChainResponse (+3 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.11
Nodes (25): RolePermissionDialogProps, makeColumns(), useAllRoles(), UsersClient(), AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+17 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.09
Nodes (21): JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams, ListResultLevelResponse (+13 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.09
Nodes (27): SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup() (+19 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.13
Nodes (23): ADR-0008, alasanBerhentiConfig, FKSource, makeConfig(), namaWajib, nameField, gradeConfig, jabatanConfig (+15 more)

### Community 17 - "useFkOptions"
Cohesion: 0.16
Nodes (20): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+12 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.15
Nodes (17): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+9 more)

### Community 19 - "hasPermission"
Cohesion: 0.11
Nodes (37): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage() (+29 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.19
Nodes (24): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+16 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.16
Nodes (18): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+10 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.07
Nodes (58): CURRENT_YEAR, YEAR_OPTIONS, CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, KARTU_COLUMNS (+50 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.09
Nodes (27): ADR-0001, ADR-0010, DashboardClient(), DashboardPage(), MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson() (+19 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.31
Nodes (8): EntityConfig, resolveFkLabel(), useMasterTable(), UseMasterTableOpts, buildTreeOptions(), computeSubtreeIds(), Computed, Resolved

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.14
Nodes (16): FileCell(), isImage(), isPdf(), SP_COLUMNS, val(), BadgeItem, BadgeManager(), BadgeManagerProps (+8 more)

### Community 26 - "app-shell.tsx"
Cohesion: 0.36
Nodes (6): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, Textarea()

### Community 27 - "jenis-sp.ts"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 28 - "master-entity-types.ts"
Cohesion: 0.14
Nodes (23): MasterEntityName, MasterEntityTypes, golonganConfig, boolOpt, sanksiConfig, AlasanBerhentiListResponse, GolonganListResponse, GolonganPostRequest (+15 more)

### Community 29 - "SortObject"
Cohesion: 0.14
Nodes (11): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, Envelope, PrefPermission, PagePrefRole, PageResultPagePrefRole, PrefRoleStoreRequest (+3 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.13
Nodes (13): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR (+5 more)

### Community 31 - "command.tsx"
Cohesion: 0.16
Nodes (19): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+11 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.09
Nodes (22): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+14 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 34 - "sanksi/form.tsx"
Cohesion: 0.13
Nodes (11): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), normalizeFk(), Props, schema, FullSanksiPayload, api (+3 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.25
Nodes (7): JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery, SingleResultJabatanQuery

### Community 36 - "riwayat-constants.ts"
Cohesion: 0.25
Nodes (7): CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse

### Community 37 - "field-renderers.tsx"
Cohesion: 0.14
Nodes (18): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FieldDate(), FieldFk(), FieldSelect() (+10 more)

### Community 38 - "JenisSk"
Cohesion: 0.16
Nodes (14): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest (+6 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.23
Nodes (10): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, FKCombobox() (+2 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.13
Nodes (15): profesiConfig, AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail (+7 more)

### Community 42 - "sp/page.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.06
Nodes (39): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery (+31 more)

### Community 44 - "types/_shared.ts"
Cohesion: 0.05
Nodes (63): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+55 more)

### Community 45 - "PageQuery"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 48 - "button.tsx"
Cohesion: 0.13
Nodes (14): FormValues, Props, schema, RFC-7807, Data, schema, Data, LoginForm() (+6 more)

### Community 50 - "sanksi.ts"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 51 - "utils.ts"
Cohesion: 0.17
Nodes (14): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox(), JENIS_AKSI_KONTRAK_OPTIONS (+6 more)

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "profil/page.tsx"
Cohesion: 0.14
Nodes (15): FormValues, schema, RFC-7807, EntityFormModal(), EntityFormModalProps, CrudForm(), LampiranUploadModal(), LampiranUploadModalProps (+7 more)

### Community 54 - "potongan-tkk.ts"
Cohesion: 0.40
Nodes (5): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, StatusKepegawaian

### Community 55 - "keahlian-form-sheet.tsx"
Cohesion: 0.25
Nodes (8): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, SingleResultKeahlianDetail

### Community 57 - "parameter-setting.ts"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 58 - "Envelope"
Cohesion: 0.22
Nodes (8): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, GajiPendapatanNonPajakResponse

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "tunjangan.ts"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 61 - "input-group.tsx"
Cohesion: 0.08
Nodes (27): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest (+19 more)

### Community 64 - "grade.config.ts"
Cohesion: 0.12
Nodes (16): FormValues, KuotaFormSheet(), KuotaFormSheetProps, numField, schema, mockFetch(), okJson(), pickDateByLabel() (+8 more)

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 70 - "organisasi.ts"
Cohesion: 0.10
Nodes (20): KepegawaianSearchParams, SingleResultObject, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery, JenisKitasSearchParams (+12 more)

### Community 80 - "sk-form-sheet.tsx"
Cohesion: 0.18
Nodes (11): FormValues, normalizeFk(), Props, schema, SkFormSheet(), fillRequiredFields(), mockFetch(), okJson() (+3 more)

### Community 81 - "GolonganResponse"
Cohesion: 0.15
Nodes (18): MutasiLampiranCard(), Props, Props, CutiJenisResponse, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatMutasiQuery, RiwayatTerminasiQuery (+10 more)

### Community 82 - "pelatihan-form-sheet.tsx"
Cohesion: 0.11
Nodes (23): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, FormValues, KeluargaFormSheet(), normalizeFk() (+15 more)

## Knowledge Gaps
- **419 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+414 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `pengalaman-kerja.ts`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `sp-form-sheet.tsx`, `keluarga.ts`, `keluarga/page.tsx`, `app-shell.tsx`, `command.tsx`, `sanksi/form.tsx`, `field-renderers.tsx`, `profesi/form.tsx`, `pdf-viewer.test.tsx`, `button.tsx`, `utils.ts`, `profil/page.tsx`, `pelatihan-form-sheet.tsx`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `organisasi.ts` to `riwayat.ts`, `batch.ts`, `pengajuan.ts`, `users-client.tsx`, `jenjang-pendidikan.ts`, `pegawai.ts`, `jenis-sp.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `riwayat-constants.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `detail-dasar-gaji.ts`, `sanksi.ts`, `parameter-setting.ts`, `Envelope`, `phdp.ts`, `tunjangan.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `Page` connect `jenjang-pendidikan.ts` to `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `pengajuan.ts`, `users-client.tsx`, `_config-kit.ts`, `pegawai.ts`, `jenis-sp.ts`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `riwayat-constants.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `detail-dasar-gaji.ts`, `sanksi.ts`, `parameter-setting.ts`, `Envelope`, `phdp.ts`, `tunjangan.ts`, `input-group.tsx`, `organisasi.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _419 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09881422924901186 - nodes in this community are weakly interconnected._
- **Should `section-left-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0815686274509804 - nodes in this community are weakly interconnected._