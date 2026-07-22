# Graph Report - .  (2026-07-22)

## Corpus Check
- 151 files · ~50,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 886 nodes · 2383 edges · 52 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 119 edges
2. `PageQuery` - 79 edges
3. `MasterEntityTypes` - 46 edges
4. `Page` - 45 edges
5. `can()` - 42 edges
6. `Envelope` - 42 edges
7. `SortObject` - 40 edges
8. `PageableObject` - 40 edges
9. `DeletedResult` - 39 edges
10. `getRoles()` - 38 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CommandSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (52 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (66): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+58 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (39): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+31 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (34): EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (40): LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PageResultPageRiwayatKontrakQuery (+32 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (34): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+26 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (23): inter, metadata, BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, ConfirmDeleteDialog(), CrudForm() (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (26): RiwayatMutasiQuery, JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PegawaiBatchIdsRequest, PegawaiResponseDetail, PegawaiResponseRingkasan, RumahDinasResponse (+18 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (29): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+21 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (25): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse (+17 more)

### Community 9 - "Community 9"
Cohesion: 0.22
Nodes (23): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPatchRequest, BiodataPostRequest, BiodataPutRequest (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (14): EntityFormModal(), Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle() (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (13): ADR-0001, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions() (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (11): Data, LoginForm(), schema, DataTableToolbar(), DataTableToolbarProps, FilterField, FKSource, FKComboboxFilter() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.18
Nodes (12): ChangePasswordForm(), Data, schema, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+4 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (16): RiwayatSpQuery, JenisSpMiniResponse, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest (+8 more)

### Community 16 - "Community 16"
Cohesion: 0.13
Nodes (15): AlasanBerhentiSearchParams, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery, ListResultRumahDinasListResponse (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (10): ProfesiForm(), ProfesiFormProps, useFkOptions(), profesiDefaults(), ProfesiFormValues, profesiSchema, CrudFormProps, FKCombobox() (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.21
Nodes (11): ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.30
Nodes (11): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (12): JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams, ListResultLevelResponse (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.22
Nodes (8): cellContent(), DataTable(), DataTableProps, DataTablePagination(), DataTablePaginationProps, Button(), buttonVariants, Skeleton()

### Community 22 - "Community 22"
Cohesion: 0.21
Nodes (12): PegawaiPatchGaji, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams (+4 more)

### Community 23 - "Community 23"
Cohesion: 0.17
Nodes (12): DasarGaji, DetailDasarGaji, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.26
Nodes (9): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, MasterSwitch() (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (11): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.28
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 31 - "Community 31"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (8): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, ProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, SingleResultLampiranProfilQuery

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (8): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanLampiranPostRequest, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 34 - "Community 34"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 35 - "Community 35"
Cohesion: 0.22
Nodes (8): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (5): EnumEntity, NOTE: `api.listAll` already unwraps the envelope via `handle<T>` (returns `body., ListResultStatusPegawaiResponse, StatusPegawaiResponse, Envelope

### Community 37 - "Community 37"
Cohesion: 0.43
Nodes (5): fromPage(), PageParams, PageView, toApiParams(), Page

### Community 38 - "Community 38"
Cohesion: 0.25
Nodes (7): JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery, SanksiRow, SingleResultJenisSpQuery

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (7): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiPutRequest, OrganisasiSearchParams, PageOrganisasiQuery, PageResultPageOrganisasiQuery, SingleResultOrganisasiQuery

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (7): DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiSearchParams, ListResultDasarGajiResponse, PageDasarGajiResponse, SingleResultDasarGajiResponse, SingleResultPageDasarGajiResponse

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (7): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, LampiranProfilQuery

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, ListResultLampiranProfilQuery

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (6): GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery, SingleResultGolonganQuery, PageableObject

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery, SavedResultLong

### Community 47 - "Community 47"
Cohesion: 0.29
Nodes (6): JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery, SortObject

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (6): JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery, DeletedResult

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (6): JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery, PageEnvelope

### Community 50 - "Community 50"
Cohesion: 0.33
Nodes (6): LampiranProfilAcceptRequest, KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 51 - "Community 51"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

## Knowledge Gaps
- **300 isolated node(s):** `ProfesiFormProps`, `SanksiFormProps`, `SwitchField`, `schema`, `Data` (+295 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Page` connect `Community 37` to `Community 0`, `Community 2`, `Community 3`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 15`, `Community 16`, `Community 20`, `Community 22`, `Community 23`, `Community 25`, `Community 26`, `Community 27`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 4` to `Community 1`, `Community 5`, `Community 10`, `Community 11`, `Community 13`, `Community 14`, `Community 17`, `Community 18`, `Community 19`, `Community 21`, `Community 24`, `Community 28`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 16` to `Community 0`, `Community 3`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 15`, `Community 20`, `Community 22`, `Community 23`, `Community 25`, `Community 26`, `Community 27`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `ProfesiFormProps`, `SanksiFormProps`, `SwitchField` to the rest of the system?**
  _300 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05134575569358178 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12980769230769232 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10761705101327743 - nodes in this community are weakly interconnected._