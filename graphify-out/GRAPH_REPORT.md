# Graph Report - .  (2026-08-18)

## Corpus Check
- 0 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1579 nodes · 4975 edges · 83 communities (82 shown, 1 thin omitted)
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
- app/layout.tsx
- input-group.tsx
- pengajuan-page-client.test.tsx
- formatDate
- grade.config.ts
- edit-gaji-sheet.test.tsx
- Community 66
- vitest.setup.ts
- session.ts
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79

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
- `KuotaStrip()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx → src/lib/utils.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts
- `t()` --indirect_call--> `TerminasiFormSheet()`  [INFERRED]
  src/app/(app)/kepegawaian/dashboard/section-right-panel.tsx → src/app/(app)/kepegawaian/terminasi/terminasi-form-sheet.tsx
- `PendukungLayout()` --calls--> `throwIfNotOk()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/layout.tsx → src/lib/utils.ts
- `Rail()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (83 total, 1 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.05
Nodes (81): besok(), FormValues, PengajuanFormSheet(), schema, selisihHari(), FormValues, Props, schema (+73 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.07
Nodes (48): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+40 more)

### Community 2 - "Page"
Cohesion: 0.07
Nodes (46): FormValues, KuotaFormSheet(), numField, schema, toNum(), CrudLike, Editing, SectionCrudSlotProps (+38 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.07
Nodes (54): KuotaStrip(), AppShell(), MODULE_ENTITY_MAP, MODULES, ADR-0041, Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem() (+46 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.07
Nodes (40): CURRENT_YEAR, KuotaImportDialog(), KuotaImportDialogProps, YEAR_OPTIONS, CURRENT_YEAR, ADR-0040, YEAR_OPTIONS, ProfesiForm() (+32 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.08
Nodes (37): Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), Accordion(), AccordionContent(), AccordionItem() (+29 more)

### Community 6 - "cn"
Cohesion: 0.09
Nodes (28): KARTU_COLUMNS, val(), KEAHLIAN_COLUMNS, TINGKAT_LABEL, val(), KELUARGA_COLUMNS, val(), PELATIHAN_COLUMNS (+20 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.05
Nodes (36): SingleResultString, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams (+28 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.15
Nodes (25): ADR-0008, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField (+17 more)

### Community 9 - "batch.ts"
Cohesion: 0.09
Nodes (29): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage() (+21 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.09
Nodes (21): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, inter (+13 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.08
Nodes (32): PengajuanFormSheetProps, ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest (+24 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.14
Nodes (22): ADR-0001, ADR-0010, AccountSession, ADR-0041, appwriteRequest(), fetchAccount(), mintCache, mintJWT() (+14 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.07
Nodes (30): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+22 more)

### Community 15 - "sidebar.tsx"
Cohesion: 0.25
Nodes (26): KuotaPageClient(), PengajuanPageClient(), PersetujuanPageClient(), fetchSection(), DataPegawaiClient(), KartuIdentitasPage(), KeahlianPage(), KeluargaPage() (+18 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 17 - "useFkOptions"
Cohesion: 0.07
Nodes (25): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, PageProfileUpdateQuery (+17 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.16
Nodes (20): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+12 more)

### Community 19 - "hasPermission"
Cohesion: 0.16
Nodes (24): MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery, HariLiburListResponse (+16 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.11
Nodes (17): CURRENT_YEAR, PersetujuanPageClientProps, STATUS_ICONS, TabId, TABS, mockFetch(), okJson(), YEAR_OPTIONS (+9 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.25
Nodes (6): EntityFormModal(), MasterPageClient(), MASTER_ENTITY_CONFIGS, MasterEntityName, useMasterSearchParams(), useResource()

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.15
Nodes (20): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+12 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.08
Nodes (23): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+15 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.21
Nodes (22): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPostRequest (+14 more)

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.10
Nodes (14): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+6 more)

### Community 26 - "kontrak-form-sheet.tsx"
Cohesion: 0.17
Nodes (14): SanksiManager(), SanksiManagerProps, SanksiRow, Entity, MASTER_ENTITIES, FullSanksiPayload, useSanksiMutations(), Permission (+6 more)

### Community 27 - "makeConfig"
Cohesion: 0.20
Nodes (14): ApprovalAction, ApprovalConfirmDialog(), ApprovalConfirmDialogProps, ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+6 more)

### Community 28 - "master-entity-types.ts"
Cohesion: 0.13
Nodes (12): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), COLUMNS, FIELD_MAP, FieldDef, resolveValue() (+4 more)

### Community 29 - "SortObject"
Cohesion: 0.21
Nodes (9): KONTRAK_COLUMNS, val(), rp(), SK_COLUMNS, val(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak() (+1 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.17
Nodes (13): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest (+5 more)

### Community 31 - "command.tsx"
Cohesion: 0.20
Nodes (13): makeColumns(), useAllRoles(), UsersClient(), AppwriteUser, AuthPostRequest, PageResultPageUserResponse, PageUserResponse, Prefs (+5 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.16
Nodes (14): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanQuery, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery (+6 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.14
Nodes (14): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaDetail, PengalamanKerjaQuery (+6 more)

### Community 34 - "riwayat/cuti/page.tsx"
Cohesion: 0.21
Nodes (11): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+3 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 36 - "EntityConfig"
Cohesion: 0.15
Nodes (12): KuotaFormSheetProps, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams (+4 more)

### Community 37 - "hari-libur.ts"
Cohesion: 0.23
Nodes (11): CURRENT_YEAR, KuotaStrip(), PengajuanPageClientProps, STATUS_ICONS, StatusBadge(), ADR-0040, YEAR_OPTIONS, StatusBadge() (+3 more)

### Community 38 - "profil/page.tsx"
Cohesion: 0.18
Nodes (10): KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson() (+2 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.18
Nodes (11): MutasiLampiranCard(), Props, Props, RiwayatMutasiQuery, RiwayatTerminasiQuery, RiwayatSkResponse, GajiTunjanganResponse, GolonganResponse (+3 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.20
Nodes (10): KepegawaianSearchParams, SingleResultObject, RumahDinasSearchParams, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams, SingleResultGajiPotonganTkkResponse (+2 more)

### Community 41 - "profesi.ts"
Cohesion: 0.29
Nodes (7): EnumOption, HttpStatusText, HubunganKeluarga, JenisProfilUpdate, ListResultEnumOption, StatusPendidikanKeluarga, TingkatKemampuan

### Community 42 - "pendapatan-non-pajak.ts"
Cohesion: 0.22
Nodes (6): TerminasiFormSheet(), mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.18
Nodes (4): MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 44 - "types/_shared.ts"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 45 - "PageQuery"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.29
Nodes (6): CutiPengajuanPage(), CutiPersetujuanPage(), ADR-0041, DashboardClient(), DashboardPage(), getPegawaiSession

### Community 47 - "app/layout.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), ResizeObserverMock

### Community 48 - "button.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 49 - "kuota-import-dialog.tsx"
Cohesion: 0.33
Nodes (6): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable(), formatDate()

### Community 50 - "sanksi.ts"
Cohesion: 0.24
Nodes (8): hariLiburConfig, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 51 - "utils.ts"
Cohesion: 0.20
Nodes (9): GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery (+1 more)

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.20
Nodes (9): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery (+1 more)

### Community 53 - "profil/page.tsx"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail, KeahlianLampiranPostRequest, KeahlianPostRequest (+1 more)

### Community 54 - "pengalaman-kerja-form-sheet.tsx"
Cohesion: 0.22
Nodes (9): KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, ProfilKeluargaQuery, SingleResultProfilKeluargaDetail, JenjangPendidikanResponse, ProfilKeluargaLampiranPostRequest, ProfilKeluargaPostRequest (+1 more)

### Community 55 - "sk-form-sheet.tsx"
Cohesion: 0.20
Nodes (9): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail, LampiranProfilQuery, PelatihanLampiranPostRequest, PelatihanPostRequest (+1 more)

### Community 56 - "keluarga-form-sheet.tsx"
Cohesion: 0.36
Nodes (7): MUTASI_COLUMNS, PairCell(), rp(), SkCell(), val(), JENIS_MUTASI_OPTIONS, labelJenisMutasi()

### Community 57 - "GolonganResponse"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 58 - "Envelope"
Cohesion: 0.22
Nodes (8): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasPutRequest

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 60 - "app/layout.tsx"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 61 - "input-group.tsx"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 62 - "pengajuan-page-client.test.tsx"
Cohesion: 0.22
Nodes (8): KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasQuery, ListResultLampiranProfilQuery

### Community 63 - "formatDate"
Cohesion: 0.22
Nodes (8): PagePendidikanQuery, PageResultPagePendidikanQuery, SingleResultPendidikanQuery, PendidikanLampiranPostRequest, PendidikanPostRequest, PendidikanPutRequest, PendidikanQuery, SingleResultLampiranProfilQuery

### Community 64 - "grade.config.ts"
Cohesion: 0.25
Nodes (6): biodataColumns, FILTER_PARAMS, pegawaiColumns, TABS, PageParams, PageView

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 66 - "Community 66"
Cohesion: 0.25
Nodes (7): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, SingleResultRumahDinasQuery

### Community 67 - "vitest.setup.ts"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 68 - "session.ts"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 69 - "Community 69"
Cohesion: 0.38
Nodes (5): FileCell(), isImage(), isPdf(), SP_COLUMNS, val()

### Community 70 - "Community 70"
Cohesion: 0.29
Nodes (6): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, SavedResultLong

### Community 71 - "Community 71"
Cohesion: 0.29
Nodes (6): GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery, SortObject

### Community 72 - "Community 72"
Cohesion: 0.29
Nodes (6): JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery, DeletedResult

### Community 73 - "Community 73"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 74 - "Community 74"
Cohesion: 0.40
Nodes (3): LoginForm(), loginRequest(), useLogin()

### Community 75 - "Community 75"
Cohesion: 0.33
Nodes (5): JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (5): JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (5): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, StatusKepegawaian

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

## Knowledge Gaps
- **442 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+437 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.