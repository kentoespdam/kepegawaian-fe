# Graph Report - kepegawaian-fe  (2026-08-14)

## Corpus Check
- 264 files · ~96,362 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1483 nodes · 4580 edges · 79 communities (78 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f6a67c3`
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
- golongan.ts
- button.tsx
- keahlian.ts
- sanksi.ts
- utils.ts
- kontrak-form-sheet.test.tsx
- profil/page.tsx
- potongan-tkk.ts
- keahlian-form-sheet.tsx
- pelatihan.ts
- parameter-setting.ts
- Envelope
- phdp.ts
- tunjangan.ts
- input-group.tsx
- kartu-identitas.ts
- pendidikan.ts
- grade.config.ts
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx
- profil.ts
- sk-form-sheet.test.tsx
- mutasi/lampiran-card.tsx
- organisasi.ts
- GolonganResponse
- SavedResultLong
- grade.ts
- PageableObject
- DeletedResult
- RiwayatSpQuery

## God Nodes (most connected - your core abstractions)
1. `cn()` - 180 edges
2. `PageQuery` - 85 edges
3. `Button()` - 55 edges
4. `hasPermission()` - 55 edges
5. `verifySession` - 55 edges
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
- `CalendarDayButton()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/calendar.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (79 total, 1 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.05
Nodes (65): ADR-0001, ADR-0010, DashboardClient(), DashboardPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModal(), GolonganPage() (+57 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.14
Nodes (14): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaDetail, PengalamanKerjaQuery (+6 more)

### Community 2 - "Page"
Cohesion: 0.25
Nodes (7): HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery, Page, PageEnvelope

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.08
Nodes (39): Field(), SectionLeftPanel(), KeluargaToolbar(), StatusBadge(), Props, RingkasanPanel(), Accordion(), AccordionContent() (+31 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.09
Nodes (32): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, FormValues, KeluargaFormSheet(), normalizeFk() (+24 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.09
Nodes (24): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, KARTU_COLUMNS, val(), PENGALAMAN_KOLOM (+16 more)

### Community 6 - "cn"
Cohesion: 0.08
Nodes (36): KuotaStrip(), AlertDialogMedia(), AlertDialogOverlay(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+28 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.07
Nodes (29): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+21 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.15
Nodes (25): fetchSection(), DataPegawaiClient(), KartuIdentitasPage(), KeahlianPage(), KeluargaPage(), PelatihanPage(), PendidikanPage(), PengalamanKerjaPage() (+17 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (49): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+41 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.10
Nodes (20): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+12 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.25
Nodes (12): makeColumns(), useAllRoles(), UsersClient(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+4 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.09
Nodes (20): JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams, ListResultLevelResponse (+12 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.10
Nodes (24): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+16 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.24
Nodes (11): ADR-0008, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField, simpleNameSchema (+3 more)

### Community 17 - "useFkOptions"
Cohesion: 0.12
Nodes (26): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+18 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.11
Nodes (24): FormValues, Props, schema, RFC-7807, FormValues, schema, RFC-7807, Data (+16 more)

### Community 19 - "hasPermission"
Cohesion: 0.23
Nodes (16): DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), EntityMeta, Home(), MASTER_CATEGORIES (+8 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.07
Nodes (48): Props, extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, BiodataResponse, GradeResponse, JenisKitasResponse (+40 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.22
Nodes (9): KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, ProfilKeluargaQuery, SingleResultProfilKeluargaDetail, JenjangPendidikanResponse, ProfilKeluargaLampiranPostRequest, ProfilKeluargaPostRequest (+1 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.10
Nodes (22): KEAHLIAN_COLUMNS, TINGKAT_LABEL, val(), KELUARGA_COLUMNS, val(), PELATIHAN_COLUMNS, val(), PENDIDIKAN_COLUMNS (+14 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.10
Nodes (10): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS, PAGE_TITLES, Rail() (+2 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.10
Nodes (21): CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, YEAR_OPTIONS, MUTASI_COLUMNS, PairCell(), rp(), SkCell() (+13 more)

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.18
Nodes (9): biodataColumns, FILTER_PARAMS, pegawaiColumns, TABS, BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema (+1 more)

### Community 26 - "app-shell.tsx"
Cohesion: 0.16
Nodes (18): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+10 more)

### Community 27 - "jenis-sp.ts"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 28 - "master-entity-types.ts"
Cohesion: 0.12
Nodes (31): MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GradeListResponse, GradePostRequest, HariLiburListResponse (+23 more)

### Community 29 - "SortObject"
Cohesion: 0.05
Nodes (44): ApprovalSearchParams, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest (+36 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.13
Nodes (13): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR (+5 more)

### Community 31 - "command.tsx"
Cohesion: 0.27
Nodes (12): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+4 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.21
Nodes (11): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+3 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 34 - "sanksi/form.tsx"
Cohesion: 0.10
Nodes (16): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, inter (+8 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.15
Nodes (20): CutiApprovalMiniResponse, CutiPengajuanMiniResponse, CutiPengajuanResponse, RiwayatTerminasiQuery, JabatanPostRequest, JabatanPutRequest, JabatanQuery, JabatanSearchParams (+12 more)

### Community 36 - "riwayat-constants.ts"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 37 - "field-renderers.tsx"
Cohesion: 0.14
Nodes (19): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet() (+11 more)

### Community 38 - "JenisSk"
Cohesion: 0.20
Nodes (11): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest, RiwayatTerminasiPostRequest (+3 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.31
Nodes (7): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, FKCombobox(), Textarea()

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.15
Nodes (12): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+4 more)

### Community 42 - "sp/page.tsx"
Cohesion: 0.38
Nodes (5): FileCell(), isImage(), isPdf(), SP_COLUMNS, val()

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.29
Nodes (6): JenisKeahlianPostRequest, JenisKeahlianQuery, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 44 - "types/_shared.ts"
Cohesion: 0.29
Nodes (7): EnumOption, HttpStatusText, HubunganKeluarga, JenisProfilUpdate, ListResultEnumOption, StatusPendidikanKeluarga, TingkatKemampuan

### Community 45 - "PageQuery"
Cohesion: 0.22
Nodes (9): KepegawaianSearchParams, SingleResultObject, JenisKeahlianSearchParams, ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery (+1 more)

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 47 - "golongan.ts"
Cohesion: 0.24
Nodes (8): golonganConfig, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery

### Community 48 - "button.tsx"
Cohesion: 0.22
Nodes (9): Data, LoginForm(), schema, Button(), buttonVariants, Calendar(), CalendarDayButton(), loginRequest() (+1 more)

### Community 49 - "keahlian.ts"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail, KeahlianLampiranPostRequest, KeahlianPostRequest (+1 more)

### Community 50 - "sanksi.ts"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 51 - "utils.ts"
Cohesion: 0.11
Nodes (22): t(), FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), FormValues (+14 more)

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "profil/page.tsx"
Cohesion: 0.31
Nodes (8): ProfilPage(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 54 - "potongan-tkk.ts"
Cohesion: 0.24
Nodes (10): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams (+2 more)

### Community 55 - "keahlian-form-sheet.tsx"
Cohesion: 0.29
Nodes (7): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS

### Community 56 - "pelatihan.ts"
Cohesion: 0.20
Nodes (9): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail, ListResultLampiranProfilQuery, PelatihanLampiranPostRequest, PelatihanPostRequest (+1 more)

### Community 57 - "parameter-setting.ts"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 58 - "Envelope"
Cohesion: 0.13
Nodes (12): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse (+4 more)

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "tunjangan.ts"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 61 - "input-group.tsx"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 62 - "kartu-identitas.ts"
Cohesion: 0.22
Nodes (8): KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, SingleResultLampiranProfilQuery

### Community 63 - "pendidikan.ts"
Cohesion: 0.22
Nodes (8): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery, PendidikanLampiranPostRequest, PendidikanPostRequest, PendidikanPutRequest

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 66 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 67 - "profil.ts"
Cohesion: 0.25
Nodes (7): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse

### Community 68 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 69 - "mutasi/lampiran-card.tsx"
Cohesion: 0.50
Nodes (4): MutasiLampiranCard(), Props, RiwayatMutasiQuery, ProfesiMiniResponse

### Community 70 - "organisasi.ts"
Cohesion: 0.25
Nodes (7): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery

### Community 71 - "GolonganResponse"
Cohesion: 0.33
Nodes (6): Props, SkLampiranCard(), RiwayatSkQuery, RiwayatSkResponse, GajiTunjanganResponse, GolonganResponse

### Community 74 - "SavedResultLong"
Cohesion: 0.29
Nodes (6): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, SavedResultLong

### Community 75 - "grade.ts"
Cohesion: 0.29
Nodes (6): GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery

### Community 76 - "PageableObject"
Cohesion: 0.29
Nodes (6): JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery, PageableObject

### Community 77 - "DeletedResult"
Cohesion: 0.29
Nodes (6): JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery, DeletedResult

### Community 78 - "RiwayatSpQuery"
Cohesion: 0.67
Nodes (3): RiwayatSpQuery, JenisSpMiniResponse, SanksiMiniResponse

## Knowledge Gaps
- **415 isolated node(s):** `SlotQuery`, `CrudLike`, `Editing`, `SECTIONS`, `schema` (+410 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `kartu-identitas/page.tsx`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `useFkOptions`, `sp-form-sheet.tsx`, `keluarga/page.tsx`, `pendukung/layout.tsx`, `cuti/page.tsx`, `app-shell.tsx`, `command.tsx`, `roles.test.tsx`, `sanksi/form.tsx`, `field-renderers.tsx`, `profesi/form.tsx`, `pdf-viewer.test.tsx`, `button.tsx`, `utils.ts`, `profil/page.tsx`, `input-group.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `Page` connect `Page` to `verifySession`, `pengalaman-kerja.ts`, `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `pengajuan.ts`, `jenjang-pendidikan.ts`, `pegawai.ts`, `keluarga.ts`, `jenis-sp.ts`, `master-entity-types.ts`, `SortObject`, `jabatan.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `PageQuery`, `detail-dasar-gaji.ts`, `golongan.ts`, `keahlian.ts`, `sanksi.ts`, `potongan-tkk.ts`, `pelatihan.ts`, `parameter-setting.ts`, `Envelope`, `phdp.ts`, `tunjangan.ts`, `kartu-identitas.ts`, `pendidikan.ts`, `profil.ts`, `organisasi.ts`, `SavedResultLong`, `grade.ts`, `PageableObject`, `DeletedResult`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `PageQuery` to `pengalaman-kerja.ts`, `Page`, `riwayat.ts`, `batch.ts`, `pengajuan.ts`, `jenjang-pendidikan.ts`, `pegawai.ts`, `keluarga.ts`, `jenis-sp.ts`, `SortObject`, `jabatan.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `detail-dasar-gaji.ts`, `golongan.ts`, `keahlian.ts`, `sanksi.ts`, `potongan-tkk.ts`, `pelatihan.ts`, `parameter-setting.ts`, `Envelope`, `phdp.ts`, `tunjangan.ts`, `kartu-identitas.ts`, `pendidikan.ts`, `profil.ts`, `organisasi.ts`, `SavedResultLong`, `grade.ts`, `PageableObject`, `DeletedResult`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `SlotQuery`, `CrudLike`, `Editing` to the rest of the system?**
  _415 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.051756785188302123 - nodes in this community are weakly interconnected._
- **Should `pengalaman-kerja.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `section-left-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0815686274509804 - nodes in this community are weakly interconnected._