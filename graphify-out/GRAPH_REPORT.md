# Graph Report - .  (2026-08-14)

## Corpus Check
- 261 files · ~92,651 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1470 nodes · 4498 edges · 74 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- section-right-panel.tsx
- button.tsx
- section-left-panel.tsx
- PegawaiResponseDetail
- master-config.ts
- mutasi-form-sheet.tsx
- verifySession
- profesi.ts
- cuti/page.test.tsx
- field-renderers.tsx
- useFkOptions
- entity-form-modal.tsx
- riwayat.ts
- sp-form-sheet.tsx
- Page
- SortObject
- cn
- hasPermission
- biodata.ts
- PageableObject
- batch.ts
- users-client.tsx
- sidebar-utils.ts
- command.tsx
- dropdown-menu.tsx
- pegawai.ts
- sanksi-manager.tsx
- detail-dasar-gaji.ts
- cuti/page.tsx
- profil.ts
- pendapatan-non-pajak.ts
- EntityConfig
- sanksi.ts
- pelatihan.ts
- pdf-viewer.test.tsx
- JabatanMiniResponse
- sanksi/form.tsx
- pendukung/layout.tsx
- pendidikan-form-sheet.tsx
- types/_shared.ts
- jenis-sp.ts
- kontrak-form-sheet.test.tsx
- utils.ts
- master-entity-types.ts
- PageQuery
- input-group.tsx
- mutasi/page.tsx
- profil/page.tsx
- client.ts
- login-form.tsx
- pengajuan.ts
- JenisSk
- hari-libur.config.ts
- jenis-keahlian.config.ts
- terminasi-client.tsx
- riwayat-constants.ts
- StatusKepegawaian
- Community 57
- Envelope
- phdp.ts
- tunjangan.ts
- keluarga.ts
- kartu-identitas.ts
- pengalaman-kerja.ts
- Community 64
- sp/page.tsx
- input.tsx
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71

## God Nodes (most connected - your core abstractions)
1. `cn()` - 176 edges
2. `PageQuery` - 85 edges
3. `hasPermission()` - 55 edges
4. `verifySession` - 55 edges
5. `Button()` - 52 edges
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
- `AvatarImage()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (74 total, 0 thin omitted)

### Community 0 - "section-right-panel.tsx"
Cohesion: 0.07
Nodes (45): ADR-0001, ADR-0010, DashboardClient(), DashboardPage(), AppLayout(), AlasanBerhentiPage(), EntityFormModal(), GolonganPage() (+37 more)

### Community 1 - "button.tsx"
Cohesion: 0.05
Nodes (64): GajiProfilPostRequest, GajiProfilPutRequest, ListResultGajiProfilResponse, PageGajiProfilResponse, PageResultPageGajiProfilResponse, ProfilSearchParams, SingleResultGajiProfilResponse, KartuIdentitasDetail (+56 more)

### Community 2 - "section-left-panel.tsx"
Cohesion: 0.06
Nodes (51): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageAlasanBerhentiQuery, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GolonganSearchParams, ListResultGolonganListResponse, PageGolonganQuery (+43 more)

### Community 3 - "PegawaiResponseDetail"
Cohesion: 0.09
Nodes (35): Field(), SectionLeftPanel(), KeluargaToolbar(), StatusBadge(), Props, RingkasanPanel(), biodataFormSchema, editFormFields (+27 more)

### Community 4 - "master-config.ts"
Cohesion: 0.09
Nodes (32): FormValues, KartuIdentitasFormSheet(), normalizeFk(), Props, schema, FormValues, KeluargaFormSheet(), normalizeFk() (+24 more)

### Community 5 - "mutasi-form-sheet.tsx"
Cohesion: 0.13
Nodes (24): KARTU_COLUMNS, KEAHLIAN_COLUMNS, TINGKAT_LABEL, KELUARGA_COLUMNS, PELATIHAN_COLUMNS, PENDIDIKAN_COLUMNS, PENGALAMAN_KOLOM, KONTRAK_COLUMNS (+16 more)

### Community 6 - "verifySession"
Cohesion: 0.09
Nodes (33): KuotaStrip(), MasterSwitch(), MasterSwitchProps, Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+25 more)

### Community 7 - "profesi.ts"
Cohesion: 0.07
Nodes (33): AlasanBerhentiResponse, JenisAksiKontrak, JenisRiwayatKepegawaian, ListResultRiwayatSkQuery, PagePegawaiResponse, PageResultPagePegawaiResponse, PageResultPageRiwayatKontrakQuery, PageResultPageRiwayatMutasiQuery (+25 more)

### Community 8 - "cuti/page.test.tsx"
Cohesion: 0.12
Nodes (30): fetchSection(), biodataColumns, DataPegawaiClient(), FILTER_PARAMS, pegawaiColumns, TABS, KartuIdentitasPage(), val() (+22 more)

### Community 9 - "field-renderers.tsx"
Cohesion: 0.07
Nodes (31): BatchSearchParams, GajiBatchMasterPostRequest, GajiBatchMasterProsesPostRequest, GajiBatchMasterProsesResponse, GajiBatchRootErrorLogsResponse, GajiBatchRootLampiranMiniResponse, GajiBatchRootPostRequest, GajiBatchRootProcessRequest (+23 more)

### Community 10 - "useFkOptions"
Cohesion: 0.15
Nodes (23): CrudConfig, EntityFormModalProps, FormField, keahlianFormFields, keahlianFormSchema, TINGKAT_KEMAMPUAN_OPTIONS, keluargaCrudConfig, keluargaFormFields (+15 more)

### Community 11 - "entity-form-modal.tsx"
Cohesion: 0.08
Nodes (29): ApprovalSearchParams, CutiApprovalMiniResponse, CutiApprovalPostRequest, PageCutiApprovalMiniResponse, PageResultPageCutiApprovalMiniResponse, CutiJenisPostRequest, CutiJenisPutRequest, CutiJenisResponse (+21 more)

### Community 12 - "riwayat.ts"
Cohesion: 0.12
Nodes (25): makeColumns(), useAllRoles(), UsersClient(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent() (+17 more)

### Community 13 - "sp-form-sheet.tsx"
Cohesion: 0.10
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), DropdownMenu(), DropdownMenuCheckboxItem() (+13 more)

### Community 14 - "Page"
Cohesion: 0.07
Nodes (24): SingleResultString, JenjangPendidikanPutRequest, JenjangPendidikanSearchParams, ListResultJenjangPendidikanResponse, PageJenjangPendidikanResponse, PageResultPageJenjangPendidikanResponse, SingleResultJenjangPendidikanResponse, LevelSearchParams (+16 more)

### Community 15 - "SortObject"
Cohesion: 0.10
Nodes (24): SheetDescription(), Sidebar(), SidebarContext, SidebarContextProps, SidebarGroup(), SidebarGroupAction(), SidebarGroupContent(), SidebarGroupLabel() (+16 more)

### Community 16 - "cn"
Cohesion: 0.15
Nodes (19): ADR-0008, alasanBerhentiConfig, FKSource, makeConfig(), namaWajib, nameField, golonganConfig, jenisSpConfig (+11 more)

### Community 17 - "hasPermission"
Cohesion: 0.16
Nodes (21): DataPegawaiToolbar(), DataPegawaiToolbarProps, FilterDef, labelMap(), POPOVER_FILTERS, PopoverFilterContent(), FormValues, Props (+13 more)

### Community 18 - "biodata.ts"
Cohesion: 0.13
Nodes (17): CrudLike, Editing, SectionCrudSlotProps, SlotQuery, SectionConf, FormValues, Props, schema (+9 more)

### Community 19 - "PageableObject"
Cohesion: 0.24
Nodes (16): DataPegawaiPage(), PendukungPage(), RiwayatPage(), TambahPegawaiPage(), TerminasiPage(), ENTITY_ICONS, EntityMeta, Home() (+8 more)

### Community 20 - "batch.ts"
Cohesion: 0.08
Nodes (24): GradeResponse, JenisKitasResponse, KartuIdentitasMiniResponse, ListResultPegawaiListResponse, PagePegawaiTableResponse, PageResultPagePegawaiTableResponse, PegawaiBatchIdsRequest, PegawaiResponseMutasiContext (+16 more)

### Community 21 - "users-client.tsx"
Cohesion: 0.21
Nodes (23): BiodataPatchRequest, BiodataResponse, PegawaiPatchProfil, PegawaiPostRequest, PegawaiPutRequest, BiodataDetail, BiodataPostRequest, BiodataPutRequest (+15 more)

### Community 22 - "sidebar-utils.ts"
Cohesion: 0.16
Nodes (16): SectionRightPanel(), keahlianMutationUrl, keluargaMutationUrl, pendidikanMutationUrl, pengalamanKerjaMutationUrl, useSelfKeahlianMutation(), useSelfKeluargaMutation(), useSelfPelatihanMutation() (+8 more)

### Community 23 - "command.tsx"
Cohesion: 0.10
Nodes (10): ENABLED_CATEGORIES, ITEM_ICONS, PAGE_TITLES, Rail(), RAIL_ITEMS, ITEM_ICONS, PAGE_TITLES, Rail() (+2 more)

### Community 24 - "dropdown-menu.tsx"
Cohesion: 0.13
Nodes (16): CURRENT_YEAR, CUTI_COLUMNS, STATUS_ICONS, YEAR_OPTIONS, MUTASI_COLUMNS, PairCell(), rp(), SkCell() (+8 more)

### Community 25 - "pegawai.ts"
Cohesion: 0.12
Nodes (15): COLUMNS, FIELD_MAP, FieldDef, resolveValue(), STATUS_LABEL, BadgeItem, BadgeManager(), BadgeManagerProps (+7 more)

### Community 26 - "sanksi-manager.tsx"
Cohesion: 0.16
Nodes (18): AppShell(), MODULE_ENTITY_MAP, MODULES, SidebarContent(), SidebarFooter(), SidebarHeader(), SidebarInset(), SidebarMenu() (+10 more)

### Community 27 - "detail-dasar-gaji.ts"
Cohesion: 0.10
Nodes (19): KepegawaianSearchParams, SingleResultObject, JabatanSearchParams, JenisSpPutRequest, JenisSpSearchParams, ListResultJenisSpListResponse, PageJenisSpQuery, PageResultPageJenisSpQuery (+11 more)

### Community 28 - "cuti/page.tsx"
Cohesion: 0.17
Nodes (18): MasterEntityName, MasterEntityTypes, hariLiburConfig, jenisPelatihanConfig, AlasanBerhentiListResponse, GolonganListResponse, GradeListResponse, HariLiburListResponse (+10 more)

### Community 29 - "profil.ts"
Cohesion: 0.10
Nodes (18): PageProfileUpdateQuery, PageResultPageProfileUpdateQuery, ProfileUpdateQuery, ProfilUpdateAcceptRequest, ProfilUpdateDetailObject, ProfilUpdateSearchParams, SingleResultProfilUpdateDetailObject, StatusUpdateProfil (+10 more)

### Community 30 - "pendapatan-non-pajak.ts"
Cohesion: 0.12
Nodes (15): KUOTA_ROW, MOCK_KUOTA_ADDITIONAL, MOCK_KUOTA_PAGE_CONTENT, MOCK_PAGE, MOCK_ROWS, mockDefaultFetch(), okJson(), YEAR (+7 more)

### Community 31 - "EntityConfig"
Cohesion: 0.19
Nodes (16): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+8 more)

### Community 32 - "sanksi.ts"
Cohesion: 0.16
Nodes (13): SectionCrudSlot(), hubunganKeluarga(), jenisMutasi(), rp(), SECTIONS, val(), Accordion(), AccordionContent() (+5 more)

### Community 33 - "pelatihan.ts"
Cohesion: 0.13
Nodes (12): t(), SpFormSheet(), FormValues, Props, schema, TerminasiFormSheet(), mockFetch(), okJson() (+4 more)

### Community 34 - "pdf-viewer.test.tsx"
Cohesion: 0.18
Nodes (8): FormValues, Props, schema, SheetEditProfil(), toDefaults(), FullSanksiPayload, api, ApiError

### Community 35 - "JabatanMiniResponse"
Cohesion: 0.15
Nodes (15): jabatanConfig, GradeQuery, JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanQuery, ListResultJabatanListResponse, ListResultJabatanQuery (+7 more)

### Community 36 - "sanksi/form.tsx"
Cohesion: 0.20
Nodes (12): FormValues, JENIS_SK_BY_MUTASI, MutasiFormSheet(), normalizeFk(), Props, schema, JENIS_AKSI_KONTRAK_OPTIONS, JENIS_MUTASI_OPTIONS (+4 more)

### Community 37 - "pendukung/layout.tsx"
Cohesion: 0.18
Nodes (12): FieldDate(), FieldText(), FieldTextarea(), OPTIONS, toDate(), toStr(), Popover(), PopoverContent() (+4 more)

### Community 38 - "pendidikan-form-sheet.tsx"
Cohesion: 0.17
Nodes (13): Props, SkLampiranCard(), LampiranSkAcceptRequest, LampiranSkPostRequest, ListResultLampiranSkQuery, RiwayatMutasiPostRequest, RiwayatMutasiPutRequest, RiwayatSkPostRequest (+5 more)

### Community 39 - "types/_shared.ts"
Cohesion: 0.25
Nodes (9): ProfesiForm(), ProfesiFormProps, profesiDefaults(), ProfesiFormValues, profesiSchema, CrudFormProps, FKCombobox(), Label() (+1 more)

### Community 40 - "jenis-sp.ts"
Cohesion: 0.15
Nodes (6): PdfViewer(), PdfViewerProps, MOCK_PDF_BUFFER, mockCreateObjectURL, mockResizeObserver, mockRevokeObjectURL

### Community 41 - "kontrak-form-sheet.test.tsx"
Cohesion: 0.14
Nodes (13): AlatKerjaPostRequest, AlatKerjaRow, ApdPostRequest, ApdRow, GradeMiniResponse, ListResultProfesiListResponse, PageProfesiDetail, PageResultPageProfesiDetail (+5 more)

### Community 42 - "utils.ts"
Cohesion: 0.19
Nodes (9): FileCell(), isImage(), isPdf(), SP_COLUMNS, val(), DataTableToolbarProps, FilterField, FKSource (+1 more)

### Community 43 - "master-entity-types.ts"
Cohesion: 0.18
Nodes (10): nameCol, simpleNameSchema, jenisKeahlianConfig, jenisKitasConfig, levelConfig, JenisKeahlianPostRequest, JenisKeahlianQuery, JenisKitasPostRequest (+2 more)

### Community 44 - "PageQuery"
Cohesion: 0.17
Nodes (12): CutiKuotaImportRequest, CutiKuotaPegawaiResponse, CutiKuotaPostRequest, CutiKuotaPutRequest, CutiKuotaResponse, CutiKuotaSisa, KuotaSearchParams, PageCutiKuotaResponse (+4 more)

### Community 45 - "input-group.tsx"
Cohesion: 0.24
Nodes (8): calonPensiunColumns, sudahTerminasiColumns, TABS, TerminasiClient(), queryClient, TERMINASI_TABS, TerminasiTabId, useTerminasiTable()

### Community 46 - "mutasi/page.tsx"
Cohesion: 0.17
Nodes (11): DasarGajiMiniResponse, DetailDasarGajiNominal, DetailDasarGajiPostRequest, DetailDasarGajiPutRequest, DetailDasarGajiResponse, DetailDasarGajiSearchParams, ListResultDetailDasarGajiResponse, PageDetailDasarGajiResponse (+3 more)

### Community 47 - "profil/page.tsx"
Cohesion: 0.31
Nodes (7): RolesClient(), useAllPermissions(), useAllRoles(), Button(), buttonVariants, Calendar(), CalendarDayButton()

### Community 48 - "client.ts"
Cohesion: 0.27
Nodes (6): Data, LoginForm(), schema, Input(), loginRequest(), useLogin()

### Community 49 - "login-form.tsx"
Cohesion: 0.31
Nodes (8): EntityConfig, resolveFkLabel(), useMasterTable(), UseMasterTableOpts, buildTreeOptions(), computeSubtreeIds(), Computed, Resolved

### Community 50 - "pengajuan.ts"
Cohesion: 0.18
Nodes (10): JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiPutRequest (+2 more)

### Community 51 - "JenisSk"
Cohesion: 0.27
Nodes (7): FormValues, KontrakFormSheet(), normalizeFk(), Props, schema, useGolonganOptions(), Checkbox()

### Community 52 - "hari-libur.config.ts"
Cohesion: 0.24
Nodes (5): mockFetch(), okJson(), pickDateByLabel(), pickTodayInOpenPopover(), ResizeObserverMock

### Community 53 - "jenis-keahlian.config.ts"
Cohesion: 0.31
Nodes (8): ProfilPage(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 54 - "terminasi-client.tsx"
Cohesion: 0.22
Nodes (10): PegawaiListResponse, PegawaiPatchGaji, RiwayatSkResponse, GajiBatchMasterResponse, GajiPotonganTkkPostRequest, GajiPotonganTkkPutRequest, GajiPotonganTkkResponse, GajiTunjanganResponse (+2 more)

### Community 55 - "riwayat-constants.ts"
Cohesion: 0.25
Nodes (8): CURRENT_YEAR, FormValues, KeahlianFormSheet(), normalizeFk(), Props, schema, TINGKAT_OPTIONS, SingleResultKeahlianDetail

### Community 56 - "StatusKepegawaian"
Cohesion: 0.36
Nodes (7): SanksiForm(), SanksiFormProps, sanksiDefaults(), SanksiFormValues, sanksiSchema, SWITCH_LABELS, SwitchField

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): GajiParameterSettingPostRequest, GajiParameterSettingPutRequest, GajiParameterSettingResponse, ListResultGajiParameterSettingResponse, PageGajiParameterSettingResponse, PageResultPageGajiParameterSettingResponse, ParameterSettingSearchParams, SingleResultGajiParameterSettingResponse

### Community 58 - "Envelope"
Cohesion: 0.22
Nodes (8): GajiPendapatanNonPajakPostRequest, GajiPendapatanNonPajakPutRequest, ListResultGajiPendapatanNonPajakResponse, PageGajiPendapatanNonPajakResponse, PageResultPageGajiPendapatanNonPajakResponse, PendapatanNonPajakSearchParams, SingleResultGajiPendapatanNonPajakResponse, GajiPendapatanNonPajakResponse

### Community 59 - "phdp.ts"
Cohesion: 0.22
Nodes (8): GajiPhdpPostRequest, GajiPhdpPutRequest, GajiPhdpResponse, ListResultGajiPhdpResponse, PageGajiPhdpResponse, PageResultPageGajiPhdpResponse, PhdpSearchParams, SingleResultGajiPhdpResponse

### Community 60 - "tunjangan.ts"
Cohesion: 0.22
Nodes (8): GajiTunjanganPostRequest, GajiTunjanganPutRequest, JenisTunjangan, ListResultMapStringObject, PageGajiTunjanganResponse, PageResultPageGajiTunjanganResponse, SingleResultGajiTunjanganResponse, TunjanganSearchParams

### Community 61 - "keluarga.ts"
Cohesion: 0.29
Nodes (7): CURRENT_YEAR, FormValues, normalizeFk(), PendidikanFormSheet(), Props, schema, FieldFk()

### Community 62 - "kartu-identitas.ts"
Cohesion: 0.32
Nodes (6): FormValues, normalizeFk(), Props, schema, SkFormSheet(), useGolonganOptions()

### Community 63 - "pengalaman-kerja.ts"
Cohesion: 0.36
Nodes (5): ChangePasswordForm(), Data, schema, changePassword(), useChangePassword()

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (6): gradeConfig, rumahDinasConfig, rupiah(), GradePostRequest, RumahDinasPostRequest, RumahDinasQuery

### Community 65 - "sp/page.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_RUMAH_DINAS, mockFetch(), okJson()

### Community 66 - "input.tsx"
Cohesion: 0.33
Nodes (4): MOCK_DETAIL, MOCK_DETAIL_NO_SOFT_FK, mockFetch(), okJson()

### Community 67 - "Community 67"
Cohesion: 0.38
Nodes (4): inter, metadata, handleSessionExpired(), Providers()

### Community 68 - "Community 68"
Cohesion: 0.47
Nodes (4): fillRequiredFields(), mockFetch(), okJson(), pickTodayInOpenPopover()

### Community 69 - "Community 69"
Cohesion: 0.50
Nodes (4): MutasiLampiranCard(), Props, RiwayatMutasiQuery, ProfesiMiniResponse

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (4): boolOpt, sanksiConfig, SanksiPostRequest, SanksiQuery

### Community 71 - "Community 71"
Cohesion: 0.67
Nodes (3): extractErrorMessage(), RFC-7807, useAdminBiodataMutation()

## Knowledge Gaps
- **412 isolated node(s):** `SlotQuery`, `CrudLike`, `Editing`, `SECTIONS`, `schema` (+407 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `verifySession` to `PegawaiResponseDetail`, `master-config.ts`, `mutasi-form-sheet.tsx`, `cuti/page.test.tsx`, `riwayat.ts`, `sp-form-sheet.tsx`, `SortObject`, `biodata.ts`, `command.tsx`, `dropdown-menu.tsx`, `pegawai.ts`, `sanksi-manager.tsx`, `EntityConfig`, `sanksi.ts`, `sanksi/form.tsx`, `pendukung/layout.tsx`, `types/_shared.ts`, `jenis-sp.ts`, `profil/page.tsx`, `client.ts`, `JenisSk`, `jenis-keahlian.config.ts`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `Page` connect `section-left-panel.tsx` to `button.tsx`, `profesi.ts`, `cuti/page.test.tsx`, `field-renderers.tsx`, `entity-form-modal.tsx`, `riwayat.ts`, `Page`, `cn`, `batch.ts`, `users-client.tsx`, `detail-dasar-gaji.ts`, `cuti/page.tsx`, `profil.ts`, `sanksi.ts`, `JabatanMiniResponse`, `kontrak-form-sheet.test.tsx`, `PageQuery`, `mutasi/page.tsx`, `pengajuan.ts`, `Community 57`, `Envelope`, `phdp.ts`, `tunjangan.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `PageQuery` connect `detail-dasar-gaji.ts` to `button.tsx`, `section-left-panel.tsx`, `profesi.ts`, `field-renderers.tsx`, `entity-form-modal.tsx`, `riwayat.ts`, `Page`, `batch.ts`, `users-client.tsx`, `profil.ts`, `JabatanMiniResponse`, `kontrak-form-sheet.test.tsx`, `PageQuery`, `mutasi/page.tsx`, `pengajuan.ts`, `Community 57`, `Envelope`, `phdp.ts`, `tunjangan.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `SlotQuery`, `CrudLike`, `Editing` to the rest of the system?**
  _412 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `section-right-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07087719298245614 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05157894736842105 - nodes in this community are weakly interconnected._
- **Should `section-left-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.055191256830601096 - nodes in this community are weakly interconnected._