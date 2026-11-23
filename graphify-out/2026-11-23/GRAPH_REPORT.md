# Graph Report - kepegawaian-fe  (2026-10-12)

## Corpus Check
- 464 files · ~146,665 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2163 nodes · 6775 edges · 101 communities (97 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `59c5ba14`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- _shared/index.ts
- jenis-sp.ts
- keluarga-form-sheet.tsx
- button.tsx
- fromPage
- data-table.tsx
- formatDate
- pengajuan.ts
- role-permission-dialog.tsx
- users-client.tsx
- pendukung-layout-client.tsx
- master-entity-types.ts
- mutasi-form-sheet.tsx
- cn
- PageQuery
- hasPermission
- section-left-panel.tsx
- dashboard-sections.tsx
- verifySession
- pengajuan-page-client.tsx
- useFkOptions
- appwriteSession.ts
- components/periode-filter.tsx
- pegawai.ts
- grade.ts
- useKomponenForm.ts
- dropdown-menu.tsx
- sidebar.tsx
- riwayat.ts
- riwayat/cuti/page.tsx
- master-config.ts
- field-renderers.tsx
- components/rincian-gaji-panel.tsx
- batch.ts
- master.ts
- sidebar-utils.ts
- profile.ts
- proses-gaji-client.tsx
- command.tsx
- biodata.ts
- EntityConfig
- entity-form-modal.tsx
- utils.ts
- detail-dasar-gaji.ts
- alasan-berhenti.ts
- cuti/page.test.tsx
- jenis-keahlian.ts
- jenis-kitas.ts
- sanksi.config.ts
- jenis-pelatihan.ts
- pegawai-organisasi-table.tsx
- tambahan-client.tsx
- profesi.ts
- kuota-form-sheet.test.tsx
- tunjangan.ts
- pdf-viewer.test.tsx
- kuota.ts
- data-pegawai-client.tsx
- verifikasi-client.test.tsx
- pengajuan-form-sheet.tsx
- login-form.tsx
- pengajuan-form-sheet.test.tsx
- kontrak-form-sheet.test.tsx
- terminasi-form-sheet.test.tsx
- tambahan-client.test.tsx
- parameter-setting.ts
- phdp.ts
- persetujuan-client.test.tsx
- profil-update.ts
- crud-form.tsx
- kontrak-form-sheet.tsx
- pengajuan-klaim.test.tsx
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx
- kpi.ts
- persetujuan-page-client.tsx
- sk-form-sheet.test.tsx
- keahlian-form-sheet.tsx
- persetujuan-page-client.test.tsx
- change-password-form.tsx
- popover.tsx
- approvalStatusTone
- sk/page.test.tsx
- proses-gaji-client.test.tsx
- pengajuan-page-client.test.tsx
- AuthProvider
- section-right-panel.tsx
- jenis-kitas.ts
- riwayat-constants.ts
- KpiClient
- (app)/page.tsx
- kuota.ts
- klaim-form-schema.ts
- data-pegawai-client.tsx
- edit-gaji-sheet.test.tsx
- edit-profil-sheet.test.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 203 edges
2. `Button()` - 92 edges
3. `throwIfNotOk()` - 88 edges
4. `PageQuery` - 87 edges
5. `hasPermission()` - 82 edges
6. `verifySession` - 79 edges
7. `toApiParams()` - 72 edges
8. `fromPage()` - 56 edges
9. `Page` - 51 edges
10. `forbidden()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `CutiPengajuanPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/cuti/pengajuan/page.tsx → src/lib/auth/pegawaiSession.ts
- `DetailTab()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/(app)/cuti/persetujuan/detail-approval-dialog.tsx → src/lib/date.ts
- `CutiPersetujuanPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/cuti/persetujuan/page.tsx → src/lib/auth/pegawaiSession.ts
- `DashboardPage()` --calls--> `getPegawaiSession`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/page.tsx → src/lib/auth/pegawaiSession.ts
- `Field()` --calls--> `cn()`  [EXTRACTED]
  src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (101 total, 4 thin omitted)

### Community 0 - "_shared/index.ts"
Cohesion: 0.05
Nodes (51): ActionType, getActionBadgeInfo(), MODULE_REGISTRY, ModuleConfig, PERMISSION_DEFINITIONS, PermissionDefinition, resolveModuleConfig(), resolvePermissionMeta() (+43 more)

### Community 1 - "jenis-sp.ts"
Cohesion: 0.08
Nodes (38): JenisBadge(), KuotaStrip(), KuotaStrip(), AlertDialogMedia(), AlertDialogOverlay(), Avatar(), AvatarBadge(), AvatarFallback() (+30 more)

### Community 2 - "keluarga-form-sheet.tsx"
Cohesion: 0.17
Nodes (6): penggajianKeys, batchKeys, useKpiList(), baseClient, penggajianApi, fetchMock

### Community 3 - "button.tsx"
Cohesion: 0.13
Nodes (28): CURRENT_YEAR, KuotaImportDialogProps, YEAR_OPTIONS, SignerPicker(), CreateBatchDialog(), CreateBatchDialogProps, FormValues, schema (+20 more)

### Community 4 - "fromPage"
Cohesion: 0.06
Nodes (29): KARTU_COLUMNS, KartuIdentitasPage(), KEAHLIAN_COLUMNS, KeahlianPage(), TINGKAT_LABEL, KELUARGA_COLUMNS, KeluargaPage(), PELATIHAN_COLUMNS (+21 more)

### Community 5 - "data-table.tsx"
Cohesion: 0.16
Nodes (17): MasterPageClient(), alasanBerhentiConfig, MASTER_ENTITY_CONFIGS, MasterEntityName, gradeConfig, hariLiburConfig, jabatanConfig, jenisKeahlianConfig (+9 more)

### Community 6 - "formatDate"
Cohesion: 0.06
Nodes (33): KenaikanBerkalaResponse, KepegawaianSearchParams, KontrakResponse, LtaCountResponse, LtaResponse, SingleResultListDnpResponse, SingleResultListDukResponse, SingleResultListKenaikanBerkalaResponse (+25 more)

### Community 7 - "pengajuan.ts"
Cohesion: 0.07
Nodes (24): KuotaImportDialog(), KartuIdentitasFormSheet(), normalizeFk(), KeahlianFormSheet(), normalizeFk(), KeluargaFormSheet(), normalizeFk(), normalizeFk() (+16 more)

### Community 8 - "role-permission-dialog.tsx"
Cohesion: 0.12
Nodes (12): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions(), PdfViewerProps, buttonVariants (+4 more)

### Community 9 - "users-client.tsx"
Cohesion: 0.12
Nodes (15): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, ListResultGajiBatchMasterProsesResponse, ListResultGajiBatchMasterResponse, PageGajiBatchMasterProsesResponse (+7 more)

### Community 10 - "pendukung-layout-client.tsx"
Cohesion: 0.09
Nodes (15): ENABLED_CATEGORIES, HeaderError(), ITEM_ICONS, PAGE_TITLES, PendukungLayout(), Rail(), RAIL_ITEMS, HeaderError() (+7 more)

### Community 11 - "master-entity-types.ts"
Cohesion: 0.05
Nodes (59): MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery (+51 more)

### Community 12 - "mutasi-form-sheet.tsx"
Cohesion: 0.06
Nodes (34): MutasiFormSheet(), SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField (+26 more)

### Community 13 - "cn"
Cohesion: 0.07
Nodes (44): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarModule, SidebarSubGroup, SheetDescription(), Sidebar(), SidebarContent() (+36 more)

### Community 14 - "PageQuery"
Cohesion: 0.06
Nodes (41): GradeSearchParams, JenisKeahlianSearchParams, KpiSearchParams, BiodataSearchParams, KartuIdentitasDetail, KartuIdentitasSearchParams, PageKartuIdentitasQuery, PageResultPageKartuIdentitasQuery (+33 more)

### Community 15 - "hasPermission"
Cohesion: 0.17
Nodes (24): CutiKuotaPage(), DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), DNPReportPage(), DUKReportPage() (+16 more)

### Community 16 - "section-left-panel.tsx"
Cohesion: 0.10
Nodes (31): Field(), SectionLeftPanel(), KeluargaToolbar(), Props, RingkasanPanel(), biodataFormSchema, editFormFields, usePegawaiDashboard() (+23 more)

### Community 17 - "dashboard-sections.tsx"
Cohesion: 0.05
Nodes (70): CrudLike, Editing, SectionCrudSlot(), SectionCrudSlotProps, SlotQuery, PdfViewer, SlipGajiPreviewDialog(), SlipGajiPreviewDialogProps (+62 more)

### Community 18 - "verifySession"
Cohesion: 0.08
Nodes (23): AppLayout(), AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage() (+15 more)

### Community 19 - "pengajuan-page-client.tsx"
Cohesion: 0.13
Nodes (22): ADR-0043, CURRENT_YEAR, PengajuanPageClientProps, STATUS_ICONS, YEAR_OPTIONS, makeColumns(), UsersClient(), ReprocessButton() (+14 more)

### Community 20 - "useFkOptions"
Cohesion: 0.10
Nodes (32): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), SheetEditProfil(), FormValues (+24 more)

### Community 21 - "appwriteSession.ts"
Cohesion: 0.17
Nodes (18): ADR-0001, ADR-0010, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), resolveToken() (+10 more)

### Community 22 - "components/periode-filter.tsx"
Cohesion: 0.30
Nodes (8): getYearOptions(), MONTH_OPTIONS, PeriodeFilter(), PeriodeFilterProps, PeriodeSelect(), PeriodeSelectProps, usePeriodeFilter(), UsePeriodeFilterOptions

### Community 23 - "pegawai.ts"
Cohesion: 0.12
Nodes (16): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiPatchGaji, PegawaiResponseMutasiContext (+8 more)

### Community 24 - "grade.ts"
Cohesion: 0.08
Nodes (45): PendidikanPage(), CutiPage(), KontrakPage(), MutasiPage(), SkClient(), SpClient(), useCutiKuotaList(), usePegawaiSession() (+37 more)

### Community 25 - "useKomponenForm.ts"
Cohesion: 0.19
Nodes (13): KomponenDialog(), FormulaEditor(), FormulaEditorProps, JENIS_LABEL, OPERATORS, appendKode(), formatFormula(), INITIAL_KOMPONEN_FORM (+5 more)

### Community 26 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 27 - "sidebar.tsx"
Cohesion: 0.27
Nodes (7): DukPageClient(), laporanKeys, useLaporanDnp(), useLaporanDuk(), handle(), DnpResponse, DukResponse

### Community 28 - "riwayat.ts"
Cohesion: 0.06
Nodes (47): MutasiLampiranCard(), Props, Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, AlasanBerhentiResponse (+39 more)

### Community 29 - "riwayat/cuti/page.tsx"
Cohesion: 0.36
Nodes (8): COLUMN_NUMBERS, Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 30 - "master-config.ts"
Cohesion: 0.28
Nodes (10): ADR-0008, EntityConfig, FKSource, makeConfig(), namaWajib, nameCol, nameField, simpleNameSchema (+2 more)

### Community 31 - "field-renderers.tsx"
Cohesion: 0.08
Nodes (49): FormValues, schema, Props, Props, FormValues, Props, schema, CURRENT_YEAR (+41 more)

### Community 32 - "components/rincian-gaji-panel.tsx"
Cohesion: 0.18
Nodes (7): KomponenTableProps, RincianGajiPanel(), RincianGajiPanelProps, MOCK_PROSES, TambahanDialog(), useBatchMasterProses(), GajiBatchMasterProsesResponse

### Community 33 - "batch.ts"
Cohesion: 0.18
Nodes (8): BatchContext, BatchProvider(), BatchState, useBatchContext(), Consumer(), MOCK_BATCH, useBatchInfo(), GajiBatchRootResponse

### Community 34 - "master.ts"
Cohesion: 0.14
Nodes (14): Props, RiwayatSpQuery, Biodata, EnumOption, Golongan, Grade, Jabatan, JenisSpMiniResponse (+6 more)

### Community 35 - "sidebar-utils.ts"
Cohesion: 0.22
Nodes (9): golonganConfig, GolonganListResponse, GolonganPostRequest, GolonganQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery, PageResultPageGolonganQuery (+1 more)

### Community 36 - "profile.ts"
Cohesion: 0.12
Nodes (25): HubunganKeluarga, JenisProfilUpdate, StatusPendidikanKeluarga, TingkatKemampuan, KartuIdentitasLampiranPostRequest, KartuIdentitasPostRequest, KartuIdentitasPutRequest, KeahlianLampiranPostRequest (+17 more)

### Community 37 - "proses-gaji-client.tsx"
Cohesion: 0.09
Nodes (24): CURRENT_YEAR, KuotaPageClient(), ADR-0040, YEAR_OPTIONS, CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, ADR-0040 (+16 more)

### Community 38 - "command.tsx"
Cohesion: 0.16
Nodes (19): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+11 more)

### Community 39 - "biodata.ts"
Cohesion: 0.22
Nodes (23): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+15 more)

### Community 40 - "EntityConfig"
Cohesion: 0.22
Nodes (9): potonganTkkConfig, STATUS_KEPEGAWAIAN_OPTIONS, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, PageGajiPotonganTkkResponse, PageResultPageGajiPotonganTkkResponse, PotonganTkkSearchParams (+1 more)

### Community 41 - "entity-form-modal.tsx"
Cohesion: 0.13
Nodes (18): DetailApprovalDialog(), DetailApprovalDialogProps, DetailTab(), RiwayatTab(), ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues (+10 more)

### Community 42 - "utils.ts"
Cohesion: 0.07
Nodes (35): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, CutiPengajuanKlaimPostRequest, CutiPengajuanMiniResponse, CutiPengajuanPostRequest, CutiPengajuanPutRequest (+27 more)

### Community 43 - "detail-dasar-gaji.ts"
Cohesion: 0.18
Nodes (10): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+2 more)

### Community 44 - "alasan-berhenti.ts"
Cohesion: 0.15
Nodes (12): BiodataFormInput, biodataFormSchema, KeahlianFormInput, keahlianFormSchema, KeluargaFormInput, keluargaFormSchema, PelatihanFormInput, pelatihanFormSchema (+4 more)

### Community 45 - "cuti/page.test.tsx"
Cohesion: 0.16
Nodes (11): Page(), KUOTA_PREV_ROW, KUOTA_ROW, MOCK_KUOTA_PAGE_CONTENT, MOCK_KUOTA_PREV_IGNORED, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch() (+3 more)

### Community 46 - "jenis-keahlian.ts"
Cohesion: 0.14
Nodes (13): extractErrorMessage(), RFC-7807, useAdminBiodataMutation(), extractErrorMessage(), RFC-7807, useSelfBiodataMutation(), GajiProfilPostRequest, GajiProfilPutRequest (+5 more)

### Community 47 - "jenis-kitas.ts"
Cohesion: 0.24
Nodes (5): FileCell(), isImage(), isPdf(), SP_COLUMNS, FKComboboxFilter()

### Community 48 - "sanksi.config.ts"
Cohesion: 0.15
Nodes (13): boolOpt, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList (+5 more)

### Community 49 - "jenis-pelatihan.ts"
Cohesion: 0.22
Nodes (9): pendapatanNonPajakConfig, GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse (+1 more)

### Community 50 - "pegawai-organisasi-table.tsx"
Cohesion: 0.23
Nodes (9): OrganisasiTableGroup(), OrganisasiTableGroupProps, PegawaiOrganisasiTable(), PegawaiOrganisasiTableProps, MOCK_PEGAWAI, KomponenTable(), fmtRupiah(), rupiah() (+1 more)

### Community 51 - "tambahan-client.tsx"
Cohesion: 0.18
Nodes (18): PersetujuanClient(), PersetujuanClientProps, TambahanClient(), TambahanClientProps, STATUS_BADGE, STATUS_LABEL, VerifikasiClient(), VerifikasiClientProps (+10 more)

### Community 52 - "profesi.ts"
Cohesion: 0.24
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageHariLiburQuery, PageResultPageHariLiburQuery, SingleResultHariLiburQuery

### Community 53 - "kuota-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 54 - "tunjangan.ts"
Cohesion: 0.18
Nodes (11): JENIS_TUNJANGAN_OPTIONS, tunjanganConfig, GajiTunjanganPostRequest, GajiTunjanganPutRequest, GajiTunjanganResponse, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse (+3 more)

### Community 55 - "pdf-viewer.test.tsx"
Cohesion: 0.17
Nodes (5): PdfViewer(), MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 56 - "kuota.ts"
Cohesion: 0.22
Nodes (9): CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse, JenisSearchParams, ListResultCutiJenisMiniResponse, PageCutiJenisResponse, PageResultPageCutiJenisResponse, SingleResultCutiJenisResponse (+1 more)

### Community 57 - "data-pegawai-client.tsx"
Cohesion: 0.19
Nodes (13): KomponenDialogProps, KomponenFormState, GajiBatchMasterProsesPostRequest, GajiKomponenPostRequest, GajiKomponenPutRequest, GajiKomponenResponse, KomponenSearchParams, ListResultGajiKomponenMiniProjection (+5 more)

### Community 58 - "verifikasi-client.test.tsx"
Cohesion: 0.20
Nodes (9): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_MASTER_INTERLEAVED, MOCK_PROSES, mockFetch() (+1 more)

### Community 59 - "pengajuan-form-sheet.tsx"
Cohesion: 0.20
Nodes (9): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageJabatanQuery, PageResultPageJabatanQuery (+1 more)

### Community 60 - "login-form.tsx"
Cohesion: 0.29
Nodes (6): Data, LoginForm(), loginRequest(), useLogin(), LoginFormData, loginSchema

### Community 61 - "pengajuan-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTomorrowInOpenPopover(), ResizeObserverMock

### Community 62 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 63 - "terminasi-form-sheet.test.tsx"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 64 - "tambahan-client.test.tsx"
Cohesion: 0.22
Nodes (8): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, MOCK_PROSES, mockFetch(), mockSearchParams

### Community 65 - "parameter-setting.ts"
Cohesion: 0.22
Nodes (9): parameterSettingConfig, GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams (+1 more)

### Community 66 - "phdp.ts"
Cohesion: 0.33
Nodes (5): MUTASI_COLUMNS, PairCell(), rp(), SkCell(), val()

### Community 67 - "persetujuan-client.test.tsx"
Cohesion: 0.25
Nodes (7): asPage(), CURRENT_MONTH, CURRENT_YEAR, MOCK_BATCH, MOCK_MASTER, mockFetch(), mockSearchParams

### Community 68 - "profil-update.ts"
Cohesion: 0.40
Nodes (4): ADR-0041, AccountSession, MeResponse, SingleResultMeResponse

### Community 69 - "crud-form.tsx"
Cohesion: 0.40
Nodes (4): DnpPageClient(), ExportReportOptions, useAsyncReportExport(), ReportJobResponse

### Community 70 - "kontrak-form-sheet.tsx"
Cohesion: 0.13
Nodes (31): EntityFormModal(), KOMPONEN_COLUMNS, KomponenClient(), ParameterSettingClient(), PendapatanNonPajakClient(), PotonganTkkClient(), TunjanganClient(), ApprovalClient() (+23 more)

### Community 71 - "pengajuan-klaim.test.tsx"
Cohesion: 0.33
Nodes (5): MOCK_APPROVED_CLAIMED, MOCK_KLAIM, MOCK_PENGAJUAN, mockFetch(), okJson()

### Community 72 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 73 - "edit-profil-sheet.test.tsx"
Cohesion: 0.15
Nodes (14): FormValues, KuotaFormSheet(), KuotaFormSheetProps, numField, schema, toNum(), SignerPickerProps, TerminasiFormSheet() (+6 more)

### Community 74 - "kpi.ts"
Cohesion: 0.14
Nodes (19): KpiFormDialogProps, KPI_COLUMNS, KpiFormValues, kpiSchema, SelectedPegawaiInfo, useKpiForm(), UseKpiFormProps, useCreateKpi() (+11 more)

### Community 75 - "persetujuan-page-client.tsx"
Cohesion: 0.08
Nodes (22): JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelPostRequest (+14 more)

### Community 76 - "sk-form-sheet.test.tsx"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 77 - "keahlian-form-sheet.tsx"
Cohesion: 0.33
Nodes (5): namaWajib, ProfesiInput, profesiSchema, SimpleNameInput, simpleNameSchema

### Community 78 - "persetujuan-page-client.test.tsx"
Cohesion: 0.06
Nodes (27): SingleResultString, ListResultStatusPegawaiResponse, StatusPegawaiResponse, DasarGajiPostRequest, DasarGajiPutRequest, DasarGajiResponse, DasarGajiSearchParams, ListResultDasarGajiResponse (+19 more)

### Community 79 - "change-password-form.tsx"
Cohesion: 0.40
Nodes (5): BadgeItem, BadgeManager(), BadgeManagerProps, badgeSchema, useBadgeMutations()

### Community 81 - "approvalStatusTone"
Cohesion: 0.53
Nodes (6): StatusBadge(), StatusBadge(), StatusBadge(), StatusBadge(), approvalStatusTone(), labelApprovalStatus()

### Community 87 - "sk/page.test.tsx"
Cohesion: 0.32
Nodes (5): Page(), MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson()

### Community 88 - "proses-gaji-client.test.tsx"
Cohesion: 0.20
Nodes (3): MOCK_BATCH, mockSearchParams, AuthProvider()

### Community 91 - "section-right-panel.tsx"
Cohesion: 0.29
Nodes (7): DashboardClient(), DashboardPage(), SectionRightPanel(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 93 - "riwayat-constants.ts"
Cohesion: 0.50
Nodes (6): JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak(), labelJenisMutasi(), labelJenisSk()

### Community 95 - "KpiClient"
Cohesion: 0.24
Nodes (6): KpiFormDialog(), UploadKpiDialog(), KpiClient(), mockSearchParams, metadata, useDeleteKpi()

### Community 98 - "(app)/page.tsx"
Cohesion: 0.13
Nodes (15): CutiPersetujuanPage(), CURRENT_YEAR, PersetujuanPageClient(), PersetujuanPageClientProps, RW_OPTIONS, STATUS_ICONS, STATUS_OPTIONS, YEAR_OPTIONS (+7 more)

### Community 101 - "kuota.ts"
Cohesion: 0.18
Nodes (10): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse, PageResultCutiKuotaPegawaiResponse (+2 more)

### Community 105 - "klaim-form-schema.ts"
Cohesion: 0.13
Nodes (20): generateListHari(), hitungHari(), klaimFormSchema(), KlaimFormValues, ASAL, KlaimFormSheet(), KlaimFormSheetProps, besok() (+12 more)

### Community 106 - "data-pegawai-client.tsx"
Cohesion: 0.39
Nodes (6): biodataColumns, DataPegawaiClient(), pegawaiColumns, FILTER_PARAMS, TABS, useDataPegawai()

### Community 107 - "edit-gaji-sheet.test.tsx"
Cohesion: 0.29
Nodes (5): SheetEditGaji(), MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 109 - "edit-profil-sheet.test.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

## Knowledge Gaps
- **562 isolated node(s):** `numField`, `schema`, `FormValues`, `CURRENT_YEAR`, `YEAR_OPTIONS` (+557 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `jenis-sp.ts` to `_shared/index.ts`, `button.tsx`, `fromPage`, `role-permission-dialog.tsx`, `pendukung-layout-client.tsx`, `mutasi-form-sheet.tsx`, `cn`, `section-left-panel.tsx`, `dashboard-sections.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `components/periode-filter.tsx`, `dropdown-menu.tsx`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `pdf-viewer.test.tsx`, `kontrak-form-sheet.tsx`, `approvalStatusTone`, `section-right-panel.tsx`, `(app)/page.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `_shared/index.ts`, `jenis-sp.ts`, `fromPage`, `data-table.tsx`, `role-permission-dialog.tsx`, `mutasi-form-sheet.tsx`, `cn`, `section-left-panel.tsx`, `dashboard-sections.tsx`, `pengajuan-page-client.tsx`, `useFkOptions`, `useKomponenForm.ts`, `riwayat/cuti/page.tsx`, `field-renderers.tsx`, `components/rincian-gaji-panel.tsx`, `proses-gaji-client.tsx`, `command.tsx`, `entity-form-modal.tsx`, `jenis-kitas.ts`, `pegawai-organisasi-table.tsx`, `tambahan-client.tsx`, `login-form.tsx`, `phdp.ts`, `kontrak-form-sheet.tsx`, `edit-profil-sheet.test.tsx`, `section-right-panel.tsx`, `KpiClient`, `(app)/page.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `PageQuery` to `_shared/index.ts`, `formatDate`, `users-client.tsx`, `master-entity-types.ts`, `pegawai.ts`, `riwayat.ts`, `sidebar-utils.ts`, `biodata.ts`, `EntityConfig`, `utils.ts`, `detail-dasar-gaji.ts`, `jenis-keahlian.ts`, `sanksi.config.ts`, `jenis-pelatihan.ts`, `profesi.ts`, `tunjangan.ts`, `kuota.ts`, `data-pegawai-client.tsx`, `pengajuan-form-sheet.tsx`, `parameter-setting.ts`, `edit-gaji-sheet.test.tsx`, `kpi.ts`, `persetujuan-page-client.tsx`, `persetujuan-page-client.test.tsx`, `kuota.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `numField`, `schema`, `FormValues` to the rest of the system?**
  _562 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `_shared/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.052289815447710185 - nodes in this community are weakly interconnected._
- **Should `jenis-sp.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07751937984496124 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1320754716981132 - nodes in this community are weakly interconnected._