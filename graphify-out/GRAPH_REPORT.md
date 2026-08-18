# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 272 files · ~99,902 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1519 nodes · 4715 edges · 60 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe5f70a4`
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
- master-entity-types.ts
- SortObject
- cuti/page.test.tsx
- command.tsx
- roles.test.tsx
- terminasi-form-sheet.test.tsx
- jabatan.ts
- profesi/form.tsx
- pdf-viewer.test.tsx
- profesi.ts
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
3. `Button()` - 58 edges
4. `hasPermission()` - 57 edges
5. `verifySession` - 57 edges
6. `Page` - 49 edges
7. `Envelope` - 48 edges
8. `MasterEntityTypes` - 45 edges
9. `SortObject` - 42 edges
10. `PageableObject` - 42 edges

## Surprising Connections (you probably didn't know these)
- `KuotaFormSheet()` --indirect_call--> `t()`  [INFERRED]
  src/app/(app)/cuti/kuota/kuota-form-sheet.tsx → src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx
- `CutiLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/layout.tsx → src/lib/utils.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/cuti/page.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (60 total, 0 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.22
Nodes (17): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), EntityMeta, Home() (+9 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 2 - "Page"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (38): Field(), SectionLeftPanel(), KeluargaToolbar(), StatusBadge(), Props, RingkasanPanel(), Accordion(), AccordionContent() (+30 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.05
Nodes (81): t(), FormValues, Props, schema, SheetEditProfil(), toDefaults(), FormValues, KartuIdentitasFormSheet() (+73 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.33
Nodes (6): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable(), formatDate()

### Community 6 - "cn"
Cohesion: 0.28
Nodes (7): golonganConfig, GolonganPostRequest, GolonganQuery, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery

### Community 7 - "riwayat.ts"
Cohesion: 0.06
Nodes (42): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery (+34 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.12
Nodes (31): KuotaPageClient(), fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, KartuIdentitasPage() (+23 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (49): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+41 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.29
Nodes (6): GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery

### Community 12 - "users-client.tsx"
Cohesion: 0.10
Nodes (26): RolePermissionDialogProps, makeColumns(), useAllRoles(), UsersClient(), AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+18 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.07
Nodes (29): ListResultLampiranSkQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams (+21 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.07
Nodes (50): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), ScrollArea() (+42 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.12
Nodes (28): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+20 more)

### Community 17 - "useFkOptions"
Cohesion: 0.11
Nodes (25): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+17 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.21
Nodes (11): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+3 more)

### Community 19 - "hasPermission"
Cohesion: 0.06
Nodes (55): ADR-0001, ADR-0010, DashboardClient(), DashboardPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModal(), GolonganPage() (+47 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.21
Nodes (22): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPostRequest (+14 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.24
Nodes (10): AppShell(), MODULE_ENTITY_MAP, MODULES, Entity, MASTER_ENTITIES, entityGate(), entityHref(), filterVisibleEntities() (+2 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.09
Nodes (31): CURRENT_YEAR, YEAR_OPTIONS, CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, YEAR_OPTIONS, MUTASI_COLUMNS (+23 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 24 - "cuti/page.tsx"
Cohesion: 0.40
Nodes (3): LoginForm(), loginRequest(), useLogin()

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.19
Nodes (9): FileCell(), isImage(), isPdf(), SP_COLUMNS, val(), DataTableToolbarProps, FilterField, FKSource (+1 more)

### Community 28 - "master-entity-types.ts"
Cohesion: 0.11
Nodes (34): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GradeListResponse, GradePostRequest (+26 more)

### Community 29 - "SortObject"
Cohesion: 0.12
Nodes (12): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, Envelope, ListResultPrefPermission, ListResultPrefRole, PagePrefRole, PageResultPagePrefRole (+4 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.08
Nodes (21): KARTU_COLUMNS, val(), KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+13 more)

### Community 31 - "command.tsx"
Cohesion: 0.11
Nodes (26): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKComboboxFilterProps, FKCombobox(), FKComboboxProps (+18 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.08
Nodes (23): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+15 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 35 - "jabatan.ts"
Cohesion: 0.18
Nodes (13): jabatanConfig, JabatanPostRequest, JabatanPutRequest, JabatanQuery, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery (+5 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.10
Nodes (16): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, inter (+8 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.18
Nodes (4): MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.14
Nodes (13): profesiConfig, AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail (+5 more)

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.08
Nodes (23): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse (+15 more)

### Community 44 - "types/_shared.ts"
Cohesion: 0.05
Nodes (73): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+65 more)

### Community 45 - "PageQuery"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 48 - "button.tsx"
Cohesion: 0.08
Nodes (38): FormValues, KuotaFormSheet(), numField, schema, toNum(), CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps (+30 more)

### Community 50 - "sanksi.ts"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 51 - "utils.ts"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "profil/page.tsx"
Cohesion: 0.08
Nodes (31): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, KEAHLIAN_COLUMNS, TINGKAT_LABEL, val() (+23 more)

### Community 54 - "potongan-tkk.ts"
Cohesion: 0.40
Nodes (5): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, StatusKepegawaian

### Community 57 - "parameter-setting.ts"
Cohesion: 0.09
Nodes (22): KepegawaianSearchParams, SingleResultObject, GolonganSearchParams, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery (+14 more)

### Community 58 - "Envelope"
Cohesion: 0.08
Nodes (23): HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse (+15 more)

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "tunjangan.ts"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 61 - "input-group.tsx"
Cohesion: 0.06
Nodes (41): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse (+33 more)

### Community 64 - "grade.config.ts"
Cohesion: 0.20
Nodes (7): KuotaFormSheetProps, mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock, CutiKuotaResponse

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 70 - "organisasi.ts"
Cohesion: 0.25
Nodes (7): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery

### Community 80 - "sk-form-sheet.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 81 - "GolonganResponse"
Cohesion: 0.18
Nodes (11): MutasiLampiranCard(), Props, Props, RiwayatMutasiQuery, RiwayatTerminasiQuery, RiwayatSkResponse, GajiPotonganTkkResponse, GajiTunjanganResponse (+3 more)

### Community 82 - "pelatihan-form-sheet.tsx"
Cohesion: 0.15
Nodes (9): CutiLayout(), RAIL_ITEMS, ChangePasswordForm(), PdfViewer(), PdfViewerProps, Checkbox(), changePassword(), useChangePassword() (+1 more)

## Knowledge Gaps
- **422 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+417 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `sidebar.tsx` to `pengalaman-kerja.ts`, `Page`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `profesi/form.tsx`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `button.tsx`, `useFkOptions`, `pelatihan-form-sheet.tsx`, `sp-form-sheet.tsx`, `hasPermission`, `profil/page.tsx`, `keluarga/page.tsx`, `keluarga.ts`, `command.tsx`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `Page` connect `Envelope` to `cn`, `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `pengajuan.ts`, `users-client.tsx`, `jenjang-pendidikan.ts`, `_config-kit.ts`, `pegawai.ts`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `detail-dasar-gaji.ts`, `sanksi.ts`, `parameter-setting.ts`, `phdp.ts`, `tunjangan.ts`, `input-group.tsx`, `organisasi.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `parameter-setting.ts` to `cn`, `riwayat.ts`, `batch.ts`, `pengajuan.ts`, `users-client.tsx`, `jenjang-pendidikan.ts`, `pegawai.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `detail-dasar-gaji.ts`, `sanksi.ts`, `Envelope`, `phdp.ts`, `tunjangan.ts`, `input-group.tsx`, `organisasi.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _422 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `section-left-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08489795918367347 - nodes in this community are weakly interconnected._
- **Should `keluarga-form-sheet.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.052564102564102565 - nodes in this community are weakly interconnected._
- **Should `riwayat.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05813953488372093 - nodes in this community are weakly interconnected._