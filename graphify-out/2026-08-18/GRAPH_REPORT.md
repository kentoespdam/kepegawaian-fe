# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 275 files · ~101,514 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1533 nodes · 4785 edges · 64 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f767482`
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
- sanksi.ts
- utils.ts
- kontrak-form-sheet.test.tsx
- profil/page.tsx
- Envelope
- phdp.ts
- input-group.tsx
- grade.config.ts
- edit-gaji-sheet.test.tsx
- sk-form-sheet.tsx
- GolonganResponse
- pelatihan-form-sheet.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 185 edges
2. `PageQuery` - 85 edges
3. `Button()` - 59 edges
4. `hasPermission()` - 57 edges
5. `verifySession` - 57 edges
6. `Page` - 49 edges
7. `Envelope` - 48 edges
8. `MasterEntityTypes` - 45 edges
9. `apiErrorMessage()` - 42 edges
10. `SortObject` - 42 edges

## Surprising Connections (you probably didn't know these)
- `KuotaFormSheet()` --indirect_call--> `t()`  [INFERRED]
  src/app/(app)/cuti/kuota/kuota-form-sheet.tsx → src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx
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

## Communities (64 total, 0 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.12
Nodes (17): COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, BadgeItem, BadgeManagerProps, badgeSchema (+9 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.10
Nodes (10): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS, PAGE_TITLES, Rail() (+2 more)

### Community 2 - "Page"
Cohesion: 0.07
Nodes (41): CutiLayout(), RAIL_ITEMS, KuotaStrip(), KuotaStrip(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup() (+33 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.09
Nodes (36): Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), Accordion(), AccordionContent(), AccordionItem() (+28 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.08
Nodes (38): FormValues, Props, schema, FormValues, Props, schema, CURRENT_YEAR, FormValues (+30 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.20
Nodes (9): PengajuanPageClient(), mockFetch(), okJson(), TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable() (+1 more)

### Community 6 - "cn"
Cohesion: 0.13
Nodes (14): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), normalizeFk(), Props, schema, ProfesiForm(), ProfesiFormProps (+6 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.06
Nodes (42): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery (+34 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.19
Nodes (28): KuotaPageClient(), CutiKuotaPage(), fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS (+20 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (30): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+22 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (50): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+42 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.17
Nodes (14): alasanBerhentiConfig, namaWajib, nameField, jabatanConfig, jenisSpConfig, jenjangPendidikanConfig, organisasiConfig, AlasanBerhentiPostRequest (+6 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.17
Nodes (19): CURRENT_YEAR, PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, makeColumns(), useAllRoles(), UsersClient(), ConfirmDeleteDialogProps (+11 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.07
Nodes (31): KepegawaianSearchParams, SingleResultObject, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse (+23 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.10
Nodes (24): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+16 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.14
Nodes (15): ADR-0008, FKSource, nameCol, simpleNameSchema, jenisKeahlianConfig, jenisKitasConfig, jenisPelatihanConfig, levelConfig (+7 more)

### Community 17 - "useFkOptions"
Cohesion: 0.13
Nodes (27): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+19 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.21
Nodes (11): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+3 more)

### Community 19 - "hasPermission"
Cohesion: 0.06
Nodes (56): ADR-0001, ADR-0010, CutiPengajuanPage(), DashboardClient(), DashboardPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage() (+48 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.40
Nodes (14): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+6 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.16
Nodes (18): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+10 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.15
Nodes (17): CURRENT_YEAR, YEAR_OPTIONS, MUTASI_COLUMNS, PairCell(), rp(), SkCell(), val(), rp() (+9 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 24 - "cuti/page.tsx"
Cohesion: 0.40
Nodes (3): LoginForm(), loginRequest(), useLogin()

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.19
Nodes (9): FileCell(), isImage(), isPdf(), SP_COLUMNS, val(), DataTableToolbarProps, FilterField, FKSource (+1 more)

### Community 26 - "kontrak-form-sheet.tsx"
Cohesion: 0.15
Nodes (13): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues, normalizeFk() (+5 more)

### Community 27 - "makeConfig"
Cohesion: 0.15
Nodes (11): makeConfig(), gradeConfig, rumahDinasConfig, boolOpt, sanksiConfig, rupiah(), GradePostRequest, RumahDinasPostRequest (+3 more)

### Community 28 - "master-entity-types.ts"
Cohesion: 0.18
Nodes (21): MasterEntityName, MasterEntityTypes, golonganConfig, AlasanBerhentiListResponse, GolonganListResponse, GolonganPostRequest, GolonganQuery, GradeListResponse (+13 more)

### Community 29 - "SortObject"
Cohesion: 0.08
Nodes (24): RolePermissionDialogProps, SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, Envelope, PrefPermission, PrefRole, ListResultPrefPermission (+16 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.13
Nodes (13): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR (+5 more)

### Community 31 - "command.tsx"
Cohesion: 0.15
Nodes (20): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+12 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.08
Nodes (23): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+15 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 34 - "riwayat/cuti/page.tsx"
Cohesion: 0.21
Nodes (10): StatusBadge(), CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus() (+2 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.11
Nodes (15): JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery, SingleResultJabatanQuery, BiodataSearchParams (+7 more)

### Community 36 - "EntityConfig"
Cohesion: 0.31
Nodes (8): EntityConfig, resolveFkLabel(), useMasterTable(), UseMasterTableOpts, buildTreeOptions(), computeSubtreeIds(), Computed, Resolved

### Community 37 - "hari-libur.ts"
Cohesion: 0.22
Nodes (9): hariLiburConfig, HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery (+1 more)

### Community 38 - "profil/page.tsx"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 39 - "profesi/form.tsx"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.13
Nodes (14): profesiConfig, AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail (+6 more)

### Community 42 - "pendapatan-non-pajak.ts"
Cohesion: 0.25
Nodes (7): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.05
Nodes (48): ListResultLampiranSkQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GradeSearchParams, ListResultGradeListResponse (+40 more)

### Community 44 - "types/_shared.ts"
Cohesion: 0.05
Nodes (71): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+63 more)

### Community 45 - "PageQuery"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 47 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 48 - "button.tsx"
Cohesion: 0.11
Nodes (34): FormValues, KuotaFormSheet(), numField, schema, toNum(), CURRENT_YEAR, KuotaImportDialogProps, YEAR_OPTIONS (+26 more)

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
Nodes (36): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, KARTU_COLUMNS, val(), KEAHLIAN_COLUMNS (+28 more)

### Community 58 - "Envelope"
Cohesion: 0.06
Nodes (30): GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery, JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse (+22 more)

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 61 - "input-group.tsx"
Cohesion: 0.06
Nodes (42): KuotaFormSheetProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest (+34 more)

### Community 64 - "grade.config.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.14
Nodes (12): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson(), PegawaiPatchGaji, PegawaiResponseDetail, GajiBatchMasterResponse, GajiPotonganTkkPostRequest (+4 more)

### Community 80 - "sk-form-sheet.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 81 - "GolonganResponse"
Cohesion: 0.20
Nodes (10): MutasiLampiranCard(), Props, Props, RiwayatMutasiQuery, RiwayatTerminasiQuery, RiwayatSkResponse, GajiPotonganTkkResponse, GajiTunjanganResponse (+2 more)

### Community 82 - "pelatihan-form-sheet.tsx"
Cohesion: 0.08
Nodes (21): KuotaImportDialog(), t(), SheetEditProfil(), toDefaults(), KartuIdentitasFormSheet(), normalizeFk(), KeluargaFormSheet(), normalizeFk() (+13 more)

## Knowledge Gaps
- **426 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Page` to `verifySession`, `pengalaman-kerja.ts`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `cn`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `useFkOptions`, `sp-form-sheet.tsx`, `keluarga.ts`, `keluarga/page.tsx`, `kontrak-form-sheet.tsx`, `command.tsx`, `riwayat/cuti/page.tsx`, `profil/page.tsx`, `profesi/form.tsx`, `pdf-viewer.test.tsx`, `button.tsx`, `profil/page.tsx`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `jenjang-pendidikan.ts` to `roles.test.tsx`, `jabatan.ts`, `hari-libur.ts`, `riwayat.ts`, `profesi.ts`, `batch.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `pendapatan-non-pajak.ts`, `detail-dasar-gaji.ts`, `sanksi.ts`, `SortObject`, `Envelope`, `phdp.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `Page` connect `Envelope` to `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `pengajuan.ts`, `jenjang-pendidikan.ts`, `keluarga/page.tsx`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `hari-libur.ts`, `profesi.ts`, `pendapatan-non-pajak.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `detail-dasar-gaji.ts`, `sanksi.ts`, `phdp.ts`, `input-group.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.11692307692307692 - nodes in this community are weakly interconnected._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09881422924901186 - nodes in this community are weakly interconnected._
- **Should `Page` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._