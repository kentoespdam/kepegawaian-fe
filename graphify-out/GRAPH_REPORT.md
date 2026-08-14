# Graph Report - .  (2026-08-14)

## Corpus Check
- 0 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1538 nodes · 4254 edges · 78 communities (77 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.52)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74

## God Nodes (most connected - your core abstractions)
1. `cn()` - 174 edges
2. `PageQuery` - 87 edges
3. `forbidden()` - 66 edges
4. `can()` - 60 edges
5. `hasPermission()` - 55 edges
6. `Page` - 50 edges
7. `Envelope` - 49 edges
8. `MasterEntityTypes` - 45 edges
9. `verifySession` - 45 edges
10. `getRoles()` - 44 edges

## Surprising Connections (you probably didn't know these)
- `Can()` --calls--> `can()`  [EXTRACTED]
  src/components/can.tsx → src/lib/auth/can.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (78 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (56): RFC-7807, CrudLike, Editing, SectionCrudSlot(), SectionCrudSlotProps, SlotQuery, CrudConfig, fetchSection() (+48 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (44): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), CURRENT_YEAR, CUTI_COLUMNS, CutiPage(), KuotaStrip(), STATUS_ICONS (+36 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (48): Field(), SectionLeftPanel(), FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, HUBUNGAN_INT (+40 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (44): ADR-0001, DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard() (+36 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (33): ADR-0008, EntityFormModalProps, FormField, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib (+25 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (38): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FormValues, KontrakFormSheet() (+30 more)

### Community 6 - "Community 6"
Cohesion: 0.20
Nodes (28): DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage() (+20 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (46): CutiApprovalPostRequest, CutiJenisResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest, CutiPengajuanResponse (+38 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (33): KARTU_COLUMNS, KartuIdentitasPage(), val(), KEAHLIAN_COLUMNS, KeahlianPage(), TINGKAT_LABEL, val(), KeluargaPage() (+25 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (40): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+32 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (31): PopoverFilterContent(), FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), FormValues (+23 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (28): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, STATUS_OPTIONS, statusKerjaLabel() (+20 more)

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (38): LampiranSkAcceptRequest, LampiranSkPostRequest, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse (+30 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (27): t(), FormValues, Props, schema, SpFormSheet(), RFC-7807, EntityFormModal(), BadgeItem (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.06
Nodes (31): LevelPostRequest, LevelSearchParams, ListResultLevelResponse, PageLevelResponse, PageResultPageLevelResponse, SingleResultLevelResponse, DasarGajiPostRequest, DasarGajiPutRequest (+23 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (27): KepegawaianSearchParams, SingleResultObject, GradeListResponse, GradePostRequest, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery (+19 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (24): Separator(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+16 more)

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (18): biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, PendukungPage(), RiwayatPage(), AppLayout() (+10 more)

### Community 18 - "Community 18"
Cohesion: 0.17
Nodes (27): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest (+19 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (24): ApprovalSearchParams, CutiApprovalMiniResponse, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest (+16 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (23): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+15 more)

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (19): RolesClient(), useAllPermissions(), useAllRoles(), makeColumns(), useAllRoles(), UsersClient(), PrefRole, ListResultPrefPermission (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.15
Nodes (19): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (18): FKComboboxFilterProps, FKComboboxProps, Button(), buttonVariants, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+10 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.09
Nodes (21): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+13 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (14): SanksiManager(), SanksiManagerProps, SanksiRow, Badge(), badgeVariants, Sheet(), SheetContent(), SheetDescription() (+6 more)

### Community 27 - "Community 27"
Cohesion: 0.16
Nodes (12): PELATIHAN_COLUMNS, PelatihanPage(), val(), Can(), ALL, PERMISSIONS, BE_PERMISSION_CATALOG, VIEW (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (15): ApprovalClient(), COLUMNS, FIELD_MAP, FieldDef, flattenForDiff(), resolveValue(), STATUS_LABEL, PageProfileUpdateQuery (+7 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (15): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasLampiranPostRequest (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (13): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse (+5 more)

### Community 31 - "Community 31"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 32 - "Community 32"
Cohesion: 0.14
Nodes (15): RiwayatSpQuery, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+7 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (14): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PagePelatihanQuery, PelatihanDetail, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest (+6 more)

### Community 34 - "Community 34"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 35 - "Community 35"
Cohesion: 0.17
Nodes (13): RiwayatMutasiQuery, RiwayatSkQuery, PegawaiListResponse, PegawaiPatchGaji, RiwayatSkResponse, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest (+5 more)

### Community 36 - "Community 36"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 38 - "Community 38"
Cohesion: 0.24
Nodes (9): MasterEntityName, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.33
Nodes (6): EnumOption, HttpStatusText, HubunganKeluarga, ListResultEnumOption, StatusPendidikanKeluarga, TingkatKemampuan

### Community 40 - "Community 40"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 41 - "Community 41"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (4): ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 43 - "Community 43"
Cohesion: 0.24
Nodes (9): MasterEntityTypes, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.20
Nodes (9): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianSearchParams, PageKeahlianQuery, TingkatKemampuan, KeahlianLampiranPostRequest, KeahlianPostRequest (+1 more)

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (8): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, SingleResultKeahlianDetail

### Community 47 - "Community 47"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 48 - "Community 48"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (5): Data, LoginForm(), schema, loginRequest(), useLogin()

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (8): CutiJenisPostRequest, CutiJenisPutRequest, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse, DeletedResult

### Community 51 - "Community 51"
Cohesion: 0.25
Nodes (8): LampiranProfilAcceptRequest, ListResultLampiranSkQuery, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, PengalamanLampiranPostRequest, JenisProfilUpdate, LampiranSkQuery

### Community 52 - "Community 52"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (8): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (8): JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, SavedResultLong

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (8): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, StatusPendidikanKeluarga, LampiranProfilQuery, ProfilKeluargaLampiranPostRequest, ProfilKeluargaPostRequest, ProfilKeluargaPutRequest

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (8): PagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, ListResultLampiranProfilQuery, PendidikanLampiranPostRequest, PendidikanPostRequest, PendidikanPutRequest

### Community 63 - "Community 63"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaSearchParams, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanLampiranPostRequest, SingleResultLampiranProfilQuery

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (7): CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props, schema, SingleResultPengalamanKerjaDetail

### Community 65 - "Community 65"
Cohesion: 0.36
Nodes (6): FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val()

### Community 66 - "Community 66"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 67 - "Community 67"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 68 - "Community 68"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (6): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, SingleResultKartuIdentitasDetail

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (6): FormValues, normalizeFk(), PelatihanFormSheet(), Props, schema, SingleResultPelatihanDetail

### Community 71 - "Community 71"
Cohesion: 0.29
Nodes (6): PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams, SingleResultGajiPotonganTkkResponse, PageableObject, PageEnvelope

### Community 72 - "Community 72"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 73 - "Community 73"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

## Knowledge Gaps
- **442 isolated node(s):** `PREVIEW`, `Row`, `FILTER_PARAMS`, `pegawaiColumns`, `biodataColumns` (+437 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 9` to `Community 0`, `Community 1`, `Community 2`, `Community 3`, `Community 36`, `Community 5`, `Community 37`, `Community 42`, `Community 11`, `Community 13`, `Community 47`, `Community 16`, `Community 22`, `Community 23`, `Community 24`, `Community 26`, `Community 31`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 74` to `Community 0`, `Community 3`, `Community 4`, `Community 7`, `Community 12`, `Community 14`, `Community 15`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 25`, `Community 28`, `Community 29`, `Community 30`, `Community 32`, `Community 33`, `Community 38`, `Community 39`, `Community 40`, `Community 43`, `Community 44`, `Community 45`, `Community 50`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 71`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 15` to `Community 7`, `Community 12`, `Community 14`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 25`, `Community 28`, `Community 29`, `Community 30`, `Community 32`, `Community 33`, `Community 38`, `Community 39`, `Community 40`, `Community 43`, `Community 44`, `Community 45`, `Community 50`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 71`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `FILTER_PARAMS` to the rest of the system?**
  _442 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0609009009009009 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0629800307219662 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06821787414066631 - nodes in this community are weakly interconnected._