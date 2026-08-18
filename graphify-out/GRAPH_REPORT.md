# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 281 files · ~104,986 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1568 nodes · 4903 edges · 68 communities (66 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `05535fe1`
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
- input-group.tsx
- pengajuan-page-client.test.tsx
- grade.config.ts
- edit-gaji-sheet.test.tsx
- sk-form-sheet.tsx

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
10. `toApiParams()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (68 total, 2 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.19
Nodes (13): StatusBadge(), ApprovalAction, ApprovalConfirmDialog(), CURRENT_YEAR, PersetujuanPageClientProps, STATUS_ICONS, StatusBadge(), TabId (+5 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.10
Nodes (10): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS, PAGE_TITLES, Rail() (+2 more)

### Community 2 - "Page"
Cohesion: 0.10
Nodes (28): CutiLayout(), RAIL_ITEMS, KuotaStrip(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+20 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (36): CutiPengajuanPage(), CutiPersetujuanPage(), DashboardClient(), DashboardPage(), Field(), SectionLeftPanel(), KeluargaToolbar(), Props (+28 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.06
Nodes (58): FormValues, KuotaFormSheet(), numField, schema, toNum(), FormValues, PengajuanFormSheet(), schema (+50 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.36
Nodes (5): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable()

### Community 6 - "cn"
Cohesion: 0.17
Nodes (8): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FullSanksiPayload, api, ApiError

### Community 7 - "riwayat.ts"
Cohesion: 0.06
Nodes (42): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery (+34 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.18
Nodes (23): PengajuanPageClient(), PersetujuanPageClient(), fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS (+15 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (51): CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val(), EntityFormModalProps (+43 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.22
Nodes (17): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), EntityMeta, Home() (+9 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.17
Nodes (16): CURRENT_YEAR, KuotaStrip(), PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, ApprovalConfirmDialogProps, AlertDialog(), AlertDialogAction() (+8 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.09
Nodes (24): KepegawaianSearchParams, SingleResultObject, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse (+16 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.10
Nodes (24): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+16 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.10
Nodes (30): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+22 more)

### Community 17 - "useFkOptions"
Cohesion: 0.16
Nodes (20): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+12 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.22
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 19 - "hasPermission"
Cohesion: 0.16
Nodes (21): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+13 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.21
Nodes (22): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPostRequest (+14 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.16
Nodes (18): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+10 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.10
Nodes (27): CURRENT_YEAR, KuotaPageClient(), YEAR_OPTIONS, CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, YEAR_OPTIONS, MUTASI_COLUMNS (+19 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.08
Nodes (35): CrudLike, Editing, SectionCrudSlot(), SectionCrudSlotProps, SlotQuery, SectionConf, EntityFormModal(), ActionType (+27 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.28
Nodes (7): rumahDinasConfig, ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasPostRequest, RumahDinasQuery, SingleResultRumahDinasQuery

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 26 - "kontrak-form-sheet.tsx"
Cohesion: 0.32
Nodes (6): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions()

### Community 27 - "makeConfig"
Cohesion: 0.32
Nodes (6): FileCell(), isImage(), isPdf(), SP_COLUMNS, val(), FKComboboxFilter()

### Community 28 - "master-entity-types.ts"
Cohesion: 0.08
Nodes (43): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery (+35 more)

### Community 29 - "SortObject"
Cohesion: 0.20
Nodes (13): makeColumns(), useAllRoles(), UsersClient(), AppwriteUser, AuthPostRequest, PageUserResponse, Prefs, SavedResultAppwriteUser (+5 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.09
Nodes (20): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR (+12 more)

### Community 31 - "command.tsx"
Cohesion: 0.15
Nodes (20): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+12 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.08
Nodes (25): Props, GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext (+17 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 34 - "riwayat/cuti/page.tsx"
Cohesion: 0.07
Nodes (31): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery (+23 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.25
Nodes (7): JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery, SingleResultJabatanQuery

### Community 36 - "EntityConfig"
Cohesion: 0.25
Nodes (7): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery

### Community 37 - "hari-libur.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 38 - "profil/page.tsx"
Cohesion: 0.31
Nodes (8): ProfilPage(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 39 - "profesi/form.tsx"
Cohesion: 0.25
Nodes (7): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.13
Nodes (20): PengajuanFormSheetProps, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatTerminasiQuery, JabatanQuery, AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest (+12 more)

### Community 42 - "pendapatan-non-pajak.ts"
Cohesion: 0.08
Nodes (29): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps, sanksiDefaults() (+21 more)

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.09
Nodes (22): ListResultLampiranSkQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery, JenisKitasSearchParams (+14 more)

### Community 44 - "types/_shared.ts"
Cohesion: 0.05
Nodes (73): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+65 more)

### Community 45 - "PageQuery"
Cohesion: 0.13
Nodes (19): MutasiLampiranCard(), Props, RiwayatMutasiQuery, PegawaiPatchGaji, PegawaiResponseDetail, RiwayatSkResponse, GajiBatchMasterResponse, GajiPotonganTkkPostRequest (+11 more)

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 47 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 48 - "button.tsx"
Cohesion: 0.10
Nodes (24): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet() (+16 more)

### Community 49 - "kuota-import-dialog.tsx"
Cohesion: 0.25
Nodes (5): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, SelectItem()

### Community 50 - "sanksi.ts"
Cohesion: 0.12
Nodes (14): SingleResultString, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+6 more)

### Community 51 - "utils.ts"
Cohesion: 0.18
Nodes (12): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, PdfViewerProps (+4 more)

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "profil/page.tsx"
Cohesion: 0.07
Nodes (43): KARTU_COLUMNS, val(), KEAHLIAN_COLUMNS, TINGKAT_LABEL, val(), KELUARGA_COLUMNS, val(), PELATIHAN_COLUMNS (+35 more)

### Community 54 - "pengalaman-kerja-form-sheet.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 55 - "sk-form-sheet.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 57 - "GolonganResponse"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

### Community 58 - "Envelope"
Cohesion: 0.06
Nodes (36): KuotaFormSheetProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse (+28 more)

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 61 - "input-group.tsx"
Cohesion: 0.17
Nodes (11): CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanPostRequest, CutiPengajuanPutRequest, KlaimCuti, PageCutiApprovalChainResponse, PageCutiPengajuanResponse, PageResultPageCutiApprovalChainResponse (+3 more)

### Community 64 - "grade.config.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.16
Nodes (19): ADR-0001, ADR-0010, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), resolveToken() (+11 more)

### Community 80 - "sk-form-sheet.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

## Knowledge Gaps
- **433 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+428 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Page` to `verifySession`, `pengalaman-kerja.ts`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `keluarga.ts`, `keluarga/page.tsx`, `pendukung/layout.tsx`, `command.tsx`, `profil/page.tsx`, `pdf-viewer.test.tsx`, `pendapatan-non-pajak.ts`, `button.tsx`, `kuota-import-dialog.tsx`, `utils.ts`, `profil/page.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Page` connect `riwayat/cuti/page.tsx` to `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `jenjang-pendidikan.ts`, `sp-form-sheet.tsx`, `hasPermission`, `pegawai.ts`, `cuti/page.tsx`, `data-pegawai-client.tsx`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `EntityConfig`, `profesi/form.tsx`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `PageQuery`, `detail-dasar-gaji.ts`, `sanksi.ts`, `profil/page.tsx`, `Envelope`, `phdp.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `jenjang-pendidikan.ts` to `riwayat.ts`, `batch.ts`, `sp-form-sheet.tsx`, `pegawai.ts`, `cuti/page.tsx`, `data-pegawai-client.tsx`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `riwayat/cuti/page.tsx`, `jabatan.ts`, `EntityConfig`, `profesi/form.tsx`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `PageQuery`, `detail-dasar-gaji.ts`, `sanksi.ts`, `Envelope`, `phdp.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _433 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09881422924901186 - nodes in this community are weakly interconnected._
- **Should `Page` be split into smaller, more focused modules?**
  _Cohesion score 0.10416666666666667 - nodes in this community are weakly interconnected._
- **Should `section-left-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08235294117647059 - nodes in this community are weakly interconnected._