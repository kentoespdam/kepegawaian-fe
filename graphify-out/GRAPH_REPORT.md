# Graph Report - kepegawaian-fe  (2026-08-18)

## Corpus Check
- 266 files · ~96,655 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1488 nodes · 4586 edges · 89 communities (88 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4b6bb1ca`
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
- utils.ts
- sk-form-sheet.tsx
- GolonganResponse
- pelatihan-form-sheet.tsx
- jenjang-pendidikan.ts
- level.ts
- dashboard-client.tsx
- PageableObject
- accountSession.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 182 edges
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
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `CommandSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (89 total, 1 thin omitted)

### Community 0 - "verifySession"
Cohesion: 0.14
Nodes (19): EntityFormModal(), MasterPageClient(), alasanBerhentiConfig, MASTER_ENTITY_CONFIGS, MasterEntityName, gradeConfig, jabatanConfig, jenisKeahlianConfig (+11 more)

### Community 1 - "pengalaman-kerja.ts"
Cohesion: 0.18
Nodes (10): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaDetail, PengalamanKerjaQuery, PengalamanKerjaSearchParams, SingleResultPengalamanKerjaDetail, ListResultLampiranProfilQuery, PengalamanKerjaPostRequest (+2 more)

### Community 2 - "Page"
Cohesion: 0.22
Nodes (9): hariLiburConfig, HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery (+1 more)

### Community 3 - "section-left-panel.tsx"
Cohesion: 0.05
Nodes (40): SectionLeftPanel(), KeluargaToolbar(), ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, StatusBadge() (+32 more)

### Community 4 - "keluarga-form-sheet.tsx"
Cohesion: 0.11
Nodes (19): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FormValues, KartuIdentitasFormSheet(), normalizeFk() (+11 more)

### Community 5 - "kartu-identitas/page.tsx"
Cohesion: 0.33
Nodes (6): TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable(), formatDate()

### Community 6 - "cn"
Cohesion: 0.08
Nodes (37): CutiLayout(), RAIL_ITEMS, KuotaStrip(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+29 more)

### Community 7 - "riwayat.ts"
Cohesion: 0.07
Nodes (27): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+19 more)

### Community 8 - "approval-client.tsx"
Cohesion: 0.20
Nodes (27): fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, DataPegawaiPage(), KartuIdentitasPage() (+19 more)

### Community 9 - "batch.ts"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (48): SectionCrudSlot(), CrudConfig, hubunganKeluarga(), jenisMutasi(), rp(), SectionRightPanel(), SECTIONS, val() (+40 more)

### Community 11 - "pengajuan.ts"
Cohesion: 0.08
Nodes (23): CutiApprovalMiniResponse, CutiApprovalPostRequest, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse (+15 more)

### Community 12 - "users-client.tsx"
Cohesion: 0.12
Nodes (25): makeColumns(), useAllRoles(), UsersClient(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+17 more)

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 14 - "jenjang-pendidikan.ts"
Cohesion: 0.22
Nodes (8): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, PageResultPageDasarGajiResponse, SingleResultDasarGajiResponse

### Community 15 - "sidebar.tsx"
Cohesion: 0.08
Nodes (39): AppShell(), MODULE_ENTITY_MAP, MODULES, SheetDescription(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+31 more)

### Community 16 - "_config-kit.ts"
Cohesion: 0.18
Nodes (16): ADR-0008, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField, simpleNameSchema (+8 more)

### Community 17 - "useFkOptions"
Cohesion: 0.19
Nodes (17): DataPegawaiToolbar(), labelMap(), PopoverFilterContent(), FormValues, Props, schema, SheetEditGaji(), toDefaults() (+9 more)

### Community 18 - "sp-form-sheet.tsx"
Cohesion: 0.08
Nodes (36): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, ActionType, getActionBadgeInfo(), MODULE_REGISTRY (+28 more)

### Community 19 - "hasPermission"
Cohesion: 0.10
Nodes (27): PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage() (+19 more)

### Community 20 - "pegawai.ts"
Cohesion: 0.15
Nodes (27): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest (+19 more)

### Community 21 - "keluarga.ts"
Cohesion: 0.20
Nodes (9): KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, ProfilKeluargaDetail, ProfilKeluargaQuery, SingleResultProfilKeluargaDetail, ProfilKeluargaLampiranPostRequest, ProfilKeluargaPostRequest (+1 more)

### Community 22 - "keluarga/page.tsx"
Cohesion: 0.10
Nodes (29): KARTU_COLUMNS, val(), KEAHLIAN_COLUMNS, TINGKAT_LABEL, val(), KELUARGA_COLUMNS, val(), PELATIHAN_COLUMNS (+21 more)

### Community 23 - "pendukung/layout.tsx"
Cohesion: 0.18
Nodes (18): ADR-0001, ADR-0010, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), resolveToken() (+10 more)

### Community 24 - "cuti/page.tsx"
Cohesion: 0.17
Nodes (15): MUTASI_COLUMNS, PairCell(), rp(), SkCell(), val(), rp(), SK_COLUMNS, val() (+7 more)

### Community 25 - "data-pegawai-client.tsx"
Cohesion: 0.23
Nodes (8): KONTRAK_COLUMNS, val(), SanksiManager(), SanksiManagerProps, SanksiRow, useSanksiMutations(), Permission, BE_PERMISSION_CATALOG

### Community 26 - "app-shell.tsx"
Cohesion: 0.12
Nodes (20): DataPegawaiToolbarProps, FilterDef, POPOVER_FILTERS, CrudFormProps, FKComboboxFilter(), Popover(), PopoverContent(), PopoverDescription() (+12 more)

### Community 27 - "jenis-sp.ts"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 28 - "master-entity-types.ts"
Cohesion: 0.15
Nodes (23): MasterEntityTypes, boolOpt, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GradeListResponse, GradePostRequest, JenisKeahlianListResponse (+15 more)

### Community 29 - "SortObject"
Cohesion: 0.11
Nodes (16): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil (+8 more)

### Community 30 - "cuti/page.test.tsx"
Cohesion: 0.09
Nodes (19): CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS (+11 more)

### Community 31 - "command.tsx"
Cohesion: 0.16
Nodes (19): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+11 more)

### Community 32 - "roles.test.tsx"
Cohesion: 0.08
Nodes (23): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+15 more)

### Community 33 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 34 - "sanksi/form.tsx"
Cohesion: 0.12
Nodes (13): inter, metadata, handleSessionExpired(), Providers(), useBadgeMutations(), resolveFkLabel(), useMasterTable(), UseMasterTableOpts (+5 more)

### Community 35 - "jabatan.ts"
Cohesion: 0.15
Nodes (18): CutiPengajuanMiniResponse, CutiPengajuanResponse, GradeQuery, JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanQuery, ListResultJabatanListResponse (+10 more)

### Community 36 - "riwayat-constants.ts"
Cohesion: 0.22
Nodes (10): Field(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Tooltip(), TooltipContent(), TooltipTrigger() (+2 more)

### Community 37 - "field-renderers.tsx"
Cohesion: 0.14
Nodes (19): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet() (+11 more)

### Community 38 - "JenisSk"
Cohesion: 0.22
Nodes (10): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest, RiwayatSkPutRequest, RiwayatTerminasiPostRequest (+2 more)

### Community 39 - "profesi/form.tsx"
Cohesion: 0.09
Nodes (25): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps, sanksiDefaults() (+17 more)

### Community 40 - "pdf-viewer.test.tsx"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "profesi.ts"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 42 - "sp/page.tsx"
Cohesion: 0.38
Nodes (5): FileCell(), isImage(), isPdf(), SP_COLUMNS, val()

### Community 43 - "jenis-keahlian.ts"
Cohesion: 0.29
Nodes (6): JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery, DeletedResult

### Community 44 - "types/_shared.ts"
Cohesion: 0.29
Nodes (7): EnumOption, HttpStatusText, HubunganKeluarga, JenisProfilUpdate, ListResultEnumOption, StatusPendidikanKeluarga, TingkatKemampuan

### Community 45 - "PageQuery"
Cohesion: 0.25
Nodes (8): JabatanSearchParams, JenisKitasSearchParams, ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery, PageQuery

### Community 46 - "detail-dasar-gaji.ts"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 47 - "golongan.ts"
Cohesion: 0.22
Nodes (9): golonganConfig, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+1 more)

### Community 48 - "button.tsx"
Cohesion: 0.33
Nodes (5): Data, LoginForm(), schema, loginRequest(), useLogin()

### Community 49 - "keahlian.ts"
Cohesion: 0.18
Nodes (10): JenisKeahlianResponse, KeahlianDetail, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail, KeahlianLampiranPostRequest (+2 more)

### Community 50 - "sanksi.ts"
Cohesion: 0.15
Nodes (13): RiwayatSpQuery, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+5 more)

### Community 51 - "utils.ts"
Cohesion: 0.27
Nodes (7): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox()

### Community 52 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "profil/page.tsx"
Cohesion: 0.19
Nodes (9): FormValues, Props, schema, RFC-7807, FormValues, schema, RFC-7807, Separator() (+1 more)

### Community 54 - "potongan-tkk.ts"
Cohesion: 0.24
Nodes (9): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams, SingleResultGajiPotonganTkkResponse (+1 more)

### Community 55 - "keahlian-form-sheet.tsx"
Cohesion: 0.29
Nodes (7): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS

### Community 56 - "pelatihan.ts"
Cohesion: 0.22
Nodes (9): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanDetail, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail, LampiranRow, PelatihanLampiranPostRequest (+1 more)

### Community 57 - "parameter-setting.ts"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 58 - "Envelope"
Cohesion: 0.11
Nodes (14): SingleResultString, KepegawaianSearchParams, SingleResultObject, ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse (+6 more)

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "tunjangan.ts"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 61 - "input-group.tsx"
Cohesion: 0.17
Nodes (12): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+4 more)

### Community 62 - "kartu-identitas.ts"
Cohesion: 0.20
Nodes (9): KartuIdentitasDetail, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest (+1 more)

### Community 63 - "pendidikan.ts"
Cohesion: 0.22
Nodes (8): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanSearchParams, SingleResultPendidikanQuery, LampiranProfilQuery, PendidikanLampiranPostRequest, PendidikanPostRequest, PendidikanPutRequest

### Community 64 - "grade.config.ts"
Cohesion: 0.24
Nodes (10): t(), CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, SpFormSheet() (+2 more)

### Community 65 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 66 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 67 - "profil.ts"
Cohesion: 0.22
Nodes (8): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, PelatihanPostRequest

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
Cohesion: 0.67
Nodes (3): Props, SkLampiranCard(), RiwayatSkQuery

### Community 74 - "SavedResultLong"
Cohesion: 0.29
Nodes (6): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, SortObject

### Community 75 - "grade.ts"
Cohesion: 0.29
Nodes (6): GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery

### Community 76 - "PageableObject"
Cohesion: 0.29
Nodes (6): ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery, Page, PageEnvelope

### Community 77 - "DeletedResult"
Cohesion: 0.29
Nodes (6): JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery, SavedResultLong

### Community 78 - "RiwayatSpQuery"
Cohesion: 0.20
Nodes (7): COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, PageParams, PageView

### Community 79 - "utils.ts"
Cohesion: 0.36
Nodes (5): PdfViewerProps, Button(), buttonVariants, Calendar(), RFC-7807

### Community 80 - "sk-form-sheet.tsx"
Cohesion: 0.32
Nodes (6): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions()

### Community 81 - "GolonganResponse"
Cohesion: 0.25
Nodes (8): Props, RiwayatTerminasiQuery, RiwayatSkResponse, GajiPotonganTkkResponse, GajiTunjanganResponse, GolonganResponse, LampiranSkQuery, PegawaiResponse

### Community 82 - "pelatihan-form-sheet.tsx"
Cohesion: 0.33
Nodes (6): FormValues, normalizeFk(), PelatihanFormSheet(), Props, schema, SheetTitle()

### Community 83 - "jenjang-pendidikan.ts"
Cohesion: 0.29
Nodes (6): JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse

### Community 84 - "level.ts"
Cohesion: 0.29
Nodes (6): LevelSearchParams, ListResultLevelResponse, PageLevelResponse, PageResultPageLevelResponse, SingleResultLevelResponse, SavedResultListLong

### Community 85 - "dashboard-client.tsx"
Cohesion: 0.60
Nodes (3): DashboardClient(), DashboardPage(), getPegawaiSession

### Community 86 - "PageableObject"
Cohesion: 0.40
Nodes (4): ApprovalSearchParams, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, PageableObject

## Knowledge Gaps
- **416 isolated node(s):** `RAIL_ITEMS`, `SlotQuery`, `CrudLike`, `Editing`, `SECTIONS` (+411 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `approval-client.tsx`, `section-right-panel.tsx`, `users-client.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `sp-form-sheet.tsx`, `keluarga/page.tsx`, `app-shell.tsx`, `cuti/page.test.tsx`, `command.tsx`, `riwayat-constants.ts`, `field-renderers.tsx`, `profesi/form.tsx`, `pdf-viewer.test.tsx`, `utils.ts`, `profil/page.tsx`, `RiwayatSpQuery`, `utils.ts`, `pelatihan-form-sheet.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `Page` connect `PageableObject` to `verifySession`, `pengalaman-kerja.ts`, `Page`, `riwayat.ts`, `approval-client.tsx`, `batch.ts`, `section-right-panel.tsx`, `pengajuan.ts`, `users-client.tsx`, `jenjang-pendidikan.ts`, `pegawai.ts`, `keluarga.ts`, `jenis-sp.ts`, `master-entity-types.ts`, `SortObject`, `roles.test.tsx`, `jabatan.ts`, `profesi.ts`, `jenis-keahlian.ts`, `types/_shared.ts`, `PageQuery`, `detail-dasar-gaji.ts`, `golongan.ts`, `keahlian.ts`, `sanksi.ts`, `potongan-tkk.ts`, `pelatihan.ts`, `parameter-setting.ts`, `Envelope`, `phdp.ts`, `tunjangan.ts`, `input-group.tsx`, `kartu-identitas.ts`, `pendidikan.ts`, `profil.ts`, `organisasi.ts`, `SavedResultLong`, `grade.ts`, `DeletedResult`, `RiwayatSpQuery`, `jenjang-pendidikan.ts`, `level.ts`, `PageableObject`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `Button()` connect `utils.ts` to `verifySession`, `section-left-panel.tsx`, `keluarga-form-sheet.tsx`, `kartu-identitas/page.tsx`, `cn`, `users-client.tsx`, `sidebar.tsx`, `useFkOptions`, `sp-form-sheet.tsx`, `keluarga/page.tsx`, `cuti/page.tsx`, `data-pegawai-client.tsx`, `app-shell.tsx`, `command.tsx`, `field-renderers.tsx`, `profesi/form.tsx`, `sp/page.tsx`, `button.tsx`, `utils.ts`, `profil/page.tsx`, `keahlian-form-sheet.tsx`, `grade.config.ts`, `RiwayatSpQuery`, `sk-form-sheet.tsx`, `pelatihan-form-sheet.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `RAIL_ITEMS`, `SlotQuery`, `CrudLike` to the rest of the system?**
  _416 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `verifySession` be split into smaller, more focused modules?**
  _Cohesion score 0.1422475106685633 - nodes in this community are weakly interconnected._
- **Should `section-left-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05182443151771549 - nodes in this community are weakly interconnected._
- **Should `keluarga-form-sheet.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11384615384615385 - nodes in this community are weakly interconnected._