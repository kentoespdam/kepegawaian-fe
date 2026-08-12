# Graph Report - .  (2026-08-12)

## Corpus Check
- 222 files · ~75,757 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1338 nodes · 3514 edges · 76 communities
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 174 edges
2. `PageQuery` - 81 edges
3. `can()` - 48 edges
4. `Page` - 47 edges
5. `MasterEntityTypes` - 45 edges
6. `verifySession` - 45 edges
7. `getRoles()` - 44 edges
8. `Envelope` - 43 edges
9. `PageEnvelope` - 40 edges
10. `SortObject` - 40 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `CommandSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (76 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (73): ADR-0001, ADR-0008, DataPegawaiPage(), TambahPegawaiPage(), TerminasiPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModal() (+65 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (46): DashboardClient(), DashboardPage(), labelAgama(), labelJk(), labelKawin(), SectionBiodata(), SectionCard(), formatRp() (+38 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (40): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+32 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (37): AppShell(), MODULE_ENTITY_MAP, MODULES, Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (43): LampiranProfilAcceptRequest, LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery (+35 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (29): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, ConfirmDeleteDialog(), ConfirmDeleteDialogProps, CrudForm(), SanksiManager() (+21 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (33): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+25 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (28): RiwayatSearchParams, KepegawaianSearchParams, SingleResultObject, AlasanBerhentiSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse (+20 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (26): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, fkLabelMap(), labelMap(), POPOVER_FILTERS, STATUS_OPTIONS, statusKerjaLabel() (+18 more)

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (24): PopoverFilterContent(), FormValues, Props, schema, SheetEditGaji(), toDefaults(), useGajiProfilOptions(), EnumOption (+16 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (19): FormValues, Props, schema, SheetEditProfil(), toDefaults(), ProfesiForm(), ProfesiFormProps, profesiDefaults() (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (17): ChangePasswordForm(), Data, schema, Data, LoginForm(), schema, DataTableToolbar(), DataTableToolbarProps (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.17
Nodes (27): BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDashboardResponse, BiodataDetail, BiodataPatchRequest, BiodataPostRequest (+19 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (23): ApprovalSearchParams, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (17): FormValues, Props, schema, RFC-7807, LampiranCardProps, LampiranItem, PdfViewer, LampiranUploadModal() (+9 more)

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (19): labelJenisMutasi(), labelJenisSk(), PREVIEW, Row, SectionKarier(), useRiwayat(), biodataColumns, DataPegawaiClient() (+11 more)

### Community 16 - "Community 16"
Cohesion: 0.19
Nodes (18): Field(), SectionLeftPanel(), Props, RingkasanPanel(), biodataFormSchema, editFormFields, formatPendidikan(), labelAgama() (+10 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (18): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), normalizeFk(), Props, schema, FieldDate(), FieldFk() (+10 more)

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (23): CutiApprovalMiniResponse, CutiApprovalChainResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest, CutiPengajuanResponse, KlaimCuti (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (13): fetchSection(), hubunganKeluarga(), jenisMutasi(), rp(), SectionConf, SectionRightPanel(), SECTIONS, val() (+5 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (16): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext, PegawaiResponseSession (+8 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (12): CURRENT_YEAR, CUTI_COLUMNS, KuotaStrip(), STATUS_ICONS, StatusBadge(), YEAR_OPTIONS, approvalStatusTone(), labelApprovalStatus() (+4 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (8): KONTRAK_COLUMNS, KontrakPage(), val(), ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, SingleResultPegawaiResponseSession

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (10): Props, SkLampiranCard(), rp(), SK_COLUMNS, SkPage(), val(), JENIS_AKSI_KONTRAK_OPTIONS, JENIS_SK_OPTIONS (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (12): PageParams, PageView, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.28
Nodes (12): appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions(), config (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (15): DasarGaji, DasarGajiMiniResponse, DetailDasarGaji, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams (+7 more)

### Community 28 - "Community 28"
Cohesion: 0.21
Nodes (12): MutasiLampiranCard(), Props, MUTASI_COLUMNS, MutasiPage(), PairCell(), rp(), SkCell(), val() (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.18
Nodes (11): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, KEAHLIAN_COLUMNS (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (11): FormValues, KeluargaFormSheet(), normalizeFk(), Props, schema, HUBUNGAN_INT, KELUARGA_COLUMNS, KeluargaPage() (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.30
Nodes (11): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+3 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 33 - "Community 33"
Cohesion: 0.23
Nodes (9): Biodata, EnumOption, Golongan, HttpStatusText, Jabatan, KodePajak, ListResultEnumOption, Organisasi (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.23
Nodes (9): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, changePassword(), apiErrorMessage() (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.23
Nodes (10): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField, FKCombobox() (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (12): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+4 more)

### Community 38 - "Community 38"
Cohesion: 0.21
Nodes (12): RiwayatSkQuery, PegawaiPatchGaji, RiwayatSkResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.15
Nodes (11): GradeListResponse, GradePostRequest, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery (+3 more)

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPostRequest (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.21
Nodes (8): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, KARTU_COLUMNS, KartuIdentitasPage(), val()

### Community 42 - "Community 42"
Cohesion: 0.23
Nodes (7): PENDIDIKAN_COLUMNS, PendidikanPage(), val(), cellContent(), DataTable(), DataTableProps, Skeleton()

### Community 43 - "Community 43"
Cohesion: 0.21
Nodes (9): PENGALAMAN_KOLOM, PengalamanKerjaPage(), val(), CURRENT_YEAR, FormValues, normalizeFk(), PengalamanKerjaFormSheet(), Props (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.20
Nodes (5): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS

### Community 45 - "Community 45"
Cohesion: 0.24
Nodes (8): PELATIHAN_COLUMNS, PelatihanPage(), val(), FormValues, normalizeFk(), PelatihanFormSheet(), Props, schema

### Community 46 - "Community 46"
Cohesion: 0.20
Nodes (9): golonganConfig, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (10): ListResultOrganisasiListResponse, ListResultOrganisasiQuery, OrganisasiListResponse, OrganisasiPostRequest, OrganisasiPutRequest, OrganisasiQuery, OrganisasiSearchParams, PageOrganisasiQuery (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.27
Nodes (8): t(), FileCell(), isImage(), isPdf(), SP_COLUMNS, SpPage(), val(), SpFormSheet()

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (8): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR

### Community 51 - "Community 51"
Cohesion: 0.27
Nodes (7): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox()

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (9): JenisKeahlianResponse, KeahlianPostRequest, KeahlianPutRequest, KeahlianQuery, KeahlianSearchParams, PageKeahlianQuery, PageResultPageKeahlianQuery, SingleResultKeahlianDetail (+1 more)

### Community 54 - "Community 54"
Cohesion: 0.28
Nodes (5): inter, metadata, handleSessionExpired(), Providers(), ApiError

### Community 55 - "Community 55"
Cohesion: 0.28
Nodes (8): MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): JenisKeahlianListResponse, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKeahlianSearchParams, ListResultJenisKeahlianListResponse, PageJenisKeahlianQuery, PageResultPageJenisKeahlianQuery, SingleResultJenisKeahlianQuery

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageJenisKitasQuery, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageJenisPelatihanQuery, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, PageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (8): PagePengalamanKerjaQuery, PageResultPagePengalamanKerjaQuery, PengalamanKerjaPostRequest, PengalamanKerjaPutRequest, PengalamanKerjaQuery, PengalamanKerjaSearchParams, PengalamanLampiranPostRequest, SingleResultPengalamanKerjaDetail

### Community 62 - "Community 62"
Cohesion: 0.32
Nodes (6): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions()

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (7): KartuIdentitasPostRequest, KartuIdentitasPutRequest, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery, SingleResultKartuIdentitasDetail, ListResultLampiranProfilQuery

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (7): HubunganKeluarga, KeluargaSearchParams, PageProfilKeluargaQuery, PageResultPageProfilKeluargaQuery, SingleResultProfilKeluargaDetail, StatusPendidikanKeluarga, LampiranProfilQuery

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (7): PagePelatihanQuery, PageResultPagePelatihanQuery, PelatihanPostRequest, PelatihanPutRequest, PelatihanQuery, PelatihanSearchParams, SingleResultPelatihanDetail

### Community 66 - "Community 66"
Cohesion: 0.25
Nodes (7): PagePendidikanQuery, PageResultPagePendidikanQuery, PendidikanPostRequest, PendidikanPutRequest, PendidikanSearchParams, SingleResultPendidikanQuery, SingleResultLampiranProfilQuery

### Community 67 - "Community 67"
Cohesion: 0.40
Nodes (4): MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 68 - "Community 68"
Cohesion: 0.53
Nodes (5): MasterEntityName, GradeQuery, JabatanQuery, ProfesiDetail, LevelResponse

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (6): KartuIdentitasDetail, KeahlianDetail, ProfilKeluargaDetail, PelatihanDetail, PengalamanKerjaDetail, LampiranRow

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (6): KartuIdentitasLampiranPostRequest, KeahlianLampiranPostRequest, ProfilKeluargaLampiranPostRequest, PelatihanLampiranPostRequest, PendidikanLampiranPostRequest, JenisProfilUpdate

### Community 71 - "Community 71"
Cohesion: 0.60
Nodes (4): extractErrorMessage(), patchBiodata(), RFC-7807, useBiodataMutation()

## Knowledge Gaps
- **416 isolated node(s):** `PREVIEW`, `Row`, `TABS`, `FILTER_PARAMS`, `pegawaiColumns` (+411 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 2` to `Community 1`, `Community 3`, `Community 5`, `Community 8`, `Community 10`, `Community 11`, `Community 14`, `Community 16`, `Community 17`, `Community 19`, `Community 20`, `Community 22`, `Community 23`, `Community 31`, `Community 35`, `Community 36`, `Community 42`, `Community 44`, `Community 51`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `Page` connect `Community 25` to `Community 0`, `Community 1`, `Community 4`, `Community 6`, `Community 7`, `Community 12`, `Community 13`, `Community 18`, `Community 20`, `Community 21`, `Community 27`, `Community 33`, `Community 34`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 46`, `Community 47`, `Community 48`, `Community 52`, `Community 53`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 68`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `Community 7` to `Community 1`, `Community 4`, `Community 6`, `Community 12`, `Community 13`, `Community 18`, `Community 21`, `Community 25`, `Community 27`, `Community 33`, `Community 34`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 46`, `Community 47`, `Community 48`, `Community 52`, `Community 53`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 63`, `Community 64`, `Community 65`, `Community 66`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `PREVIEW`, `Row`, `TABS` to the rest of the system?**
  _416 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.062457661563473786 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08244680851063829 - nodes in this community are weakly interconnected._