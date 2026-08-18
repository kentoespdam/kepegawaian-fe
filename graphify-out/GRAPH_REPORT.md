# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 277 files · ~103,163 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1549 nodes · 4828 edges · 72 communities (69 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6b6c3e80`
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
- roles-client.tsx
- input-group.tsx
- pengajuan-page-client.test.tsx
- PegawaiResponse
- grade.config.ts
- edit-gaji-sheet.test.tsx
- sk-form-sheet.tsx
- GolonganResponse
- pelatihan-form-sheet.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 185 edges
2. `PageQuery` - 85 edges
3. `Button()` - 60 edges
4. `hasPermission()` - 57 edges
5. `verifySession` - 57 edges
6. `Page` - 49 edges
7. `Envelope` - 48 edges
8. `MasterEntityTypes` - 45 edges
9. `apiErrorMessage()` - 44 edges
10. `SortObject` - 42 edges

## Surprising Connections (you probably didn't know these)
- `CutiLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/layout.tsx → src/lib/utils.ts
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (72 total, 3 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.12
Nodes (17): COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, BadgeItem, BadgeManager(), BadgeManagerProps (+9 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.08
Nodes (15): CutiLayout(), RAIL_ITEMS, ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS (+7 more)

### Community 2 - "Page"
Cohesion: 0.09
Nodes (34): KuotaStrip(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb() (+26 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.09
Nodes (36): Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), Accordion(), AccordionContent(), AccordionItem() (+28 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.09
Nodes (27): FormValues, PengajuanFormSheet(), PengajuanFormSheetProps, schema, selisihHari(), FormValues, KartuIdentitasFormSheet(), normalizeFk() (+19 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.33
Nodes (6): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable(), formatDate()

### Community 6 - "cn"
Cohesion: 0.11
Nodes (16): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet() (+8 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.08
Nodes (26): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+18 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.13
Nodes (30): KuotaPageClient(), PengajuanPageClient(), fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS (+22 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.08
Nodes (47): CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val(), CrudFormProps (+39 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.22
Nodes (17): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), EntityMeta, Home() (+9 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.14
Nodes (23): CURRENT_YEAR, KuotaStrip(), PengajuanPageClientProps, STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, StatusBadge(), makeColumns() (+15 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.06
Nodes (33): KepegawaianSearchParams, SingleResultObject, AlasanBerhentiSearchParams, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse (+25 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.09
Nodes (25): Separator(), SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent() (+17 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.10
Nodes (29): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+21 more)

### Community 17 - "useFkOptions"
Cohesion: 0.16
Nodes (20): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+12 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.18
Nodes (15): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+7 more)

### Community 19 - "hasPermission"
Cohesion: 0.16
Nodes (21): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+13 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.17
Nodes (25): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest (+17 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.16
Nodes (18): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+10 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.11
Nodes (20): CURRENT_YEAR, YEAR_OPTIONS, CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, YEAR_OPTIONS, MUTASI_COLUMNS, PairCell() (+12 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.12
Nodes (17): CrudLike, Editing, SectionCrudSlot(), SectionCrudSlotProps, SlotQuery, SectionConf, LampiranCardProps, LampiranItem (+9 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.33
Nodes (5): Data, LoginForm(), schema, loginRequest(), useLogin()

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.12
Nodes (19): FormValues, KuotaFormSheet(), KuotaFormSheetProps, numField, schema, toNum(), t(), CURRENT_YEAR (+11 more)

### Community 26 - "kontrak-form-sheet.tsx"
Cohesion: 0.19
Nodes (13): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS (+5 more)

### Community 28 - "master-entity-types.ts"
Cohesion: 0.08
Nodes (44): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+36 more)

### Community 29 - "SortObject"
Cohesion: 0.08
Nodes (21): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, Envelope, PrefPermission, ListResultPrefRole, PagePrefRole, PageResultPagePrefRole (+13 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.13
Nodes (13): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR (+5 more)

### Community 31 - "command.tsx"
Cohesion: 0.30
Nodes (11): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+3 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.08
Nodes (23): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiPatchGaji, PegawaiResponseMutasiContext (+15 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 34 - "riwayat/cuti/page.tsx"
Cohesion: 0.10
Nodes (16): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse (+8 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.20
Nodes (11): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest, RiwayatTerminasiPostRequest (+3 more)

### Community 36 - "EntityConfig"
Cohesion: 0.24
Nodes (9): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+1 more)

### Community 37 - "hari-libur.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 38 - "profil/page.tsx"
Cohesion: 0.31
Nodes (8): ProfilPage(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 39 - "profesi/form.tsx"
Cohesion: 0.36
Nodes (7): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.09
Nodes (27): profesiConfig, CutiPengajuanMiniResponse, RiwayatTerminasiQuery, JabatanPutRequest, JabatanQuery, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery (+19 more)

### Community 42 - "pendapatan-non-pajak.ts"
Cohesion: 0.31
Nodes (7): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKCombobox(), Label()

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.05
Nodes (55): GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery (+47 more)

### Community 44 - "types/_shared.ts"
Cohesion: 0.05
Nodes (64): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+56 more)

### Community 45 - "PageQuery"
Cohesion: 0.27
Nodes (9): GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams, SingleResultGajiPotonganTkkResponse (+1 more)

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 47 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 48 - "button.tsx"
Cohesion: 0.11
Nodes (20): FormValues, Props, schema, RFC-7807, FormValues, schema, RFC-7807, FieldDate() (+12 more)

### Community 49 - "kuota-import-dialog.tsx"
Cohesion: 0.25
Nodes (5): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, DialogTitle()

### Community 50 - "sanksi.ts"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 51 - "utils.ts"
Cohesion: 0.25
Nodes (8): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, SingleResultKeahlianDetail

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "profil/page.tsx"
Cohesion: 0.11
Nodes (30): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, PENGALAMAN_KOLOM, KONTRAK_COLUMNS (+22 more)

### Community 54 - "pengalaman-kerja-form-sheet.tsx"
Cohesion: 0.25
Nodes (8): CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props, schema, FieldText(), SingleResultPengalamanKerjaDetail

### Community 55 - "sk-form-sheet.tsx"
Cohesion: 0.28
Nodes (7): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions(), SingleResultRiwayatSkQuery

### Community 56 - "keluarga-form-sheet.tsx"
Cohesion: 0.33
Nodes (6): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, SingleResultProfilKeluargaDetail

### Community 57 - "GolonganResponse"
Cohesion: 0.33
Nodes (6): Props, SkLampiranCard(), RiwayatSkQuery, RiwayatSkResponse, GajiTunjanganResponse, GolonganResponse

### Community 58 - "Envelope"
Cohesion: 0.08
Nodes (27): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest (+19 more)

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "roles-client.tsx"
Cohesion: 0.47
Nodes (4): RolesClient(), useAllPermissions(), useAllRoles(), ListResultPrefPermission

### Community 61 - "input-group.tsx"
Cohesion: 0.10
Nodes (20): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+12 more)

### Community 64 - "grade.config.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.07
Nodes (32): ADR-0001, ADR-0010, CutiPengajuanPage(), DashboardClient(), DashboardPage(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch() (+24 more)

### Community 80 - "sk-form-sheet.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 81 - "GolonganResponse"
Cohesion: 0.50
Nodes (4): MutasiLampiranCard(), Props, RiwayatMutasiQuery, ProfesiMiniResponse

### Community 82 - "pelatihan-form-sheet.tsx"
Cohesion: 0.29
Nodes (6): ChangePasswordForm(), Data, schema, Input(), changePassword(), useChangePassword()

## Knowledge Gaps
- **427 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+422 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Page` to `verifySession`, `pengalaman-kerja.ts`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `cn`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `sp-form-sheet.tsx`, `keluarga.ts`, `keluarga/page.tsx`, `pendukung/layout.tsx`, `command.tsx`, `EntityConfig`, `profil/page.tsx`, `pdf-viewer.test.tsx`, `pendapatan-non-pajak.ts`, `button.tsx`, `kuota-import-dialog.tsx`, `profil/page.tsx`, `roles-client.tsx`, `pelatihan-form-sheet.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `jenjang-pendidikan.ts` to `roles.test.tsx`, `riwayat/cuti/page.tsx`, `riwayat.ts`, `profesi.ts`, `batch.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `PageQuery`, `detail-dasar-gaji.ts`, `sanksi.ts`, `SortObject`, `pegawai.ts`, `Envelope`, `phdp.ts`, `master-entity-types.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `Page` connect `Envelope` to `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `jenjang-pendidikan.ts`, `hasPermission`, `pegawai.ts`, `keluarga/page.tsx`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `riwayat/cuti/page.tsx`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `PageQuery`, `detail-dasar-gaji.ts`, `sanksi.ts`, `phdp.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _427 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.11857707509881422 - nodes in this community are weakly interconnected._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `Page` be split into smaller, more focused modules?**
  _Cohesion score 0.08780487804878048 - nodes in this community are weakly interconnected._