# Graph Report - /mnt/DATA/html/kepegawaian-fe/src  (2026-07-22)

## Corpus Check
- Corpus is ~24,331 words - fits in a single context window. You may not need a graph.

## Summary
- 546 nodes · 1561 edges · 26 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Components Base
- App Pages
- Entity Configs
- Form Components
- Master Entity Types
- Avatar UI
- Jabatan Types
- Alasan Berhenti Types
- Dropdown Menu UI
- Auth & Session
- Dialog Components
- Enum Utilities
- ComboBox UI
- Sanksi Types
- Pagination UI
- CRUD Form
- Input Group UI
- Data Table
- Jenis SP Types
- Card UI
- Grade Types
- Hari Libur Types
- Jenis Kitas Types
- Jenis Pelatihan Types
- Rumah Dinas Types
- Paging & Utilities

## God Nodes (most connected - your core abstractions)
1. `cn()` - 119 edges
2. `MasterEntityTypes` - 45 edges
3. `can()` - 42 edges
4. `getRoles()` - 38 edges
5. `verifySession` - 38 edges
6. `forbidden()` - 32 edges
7. `PageQuery` - 31 edges
8. `EntityConfig` - 25 edges
9. `MasterPageClient()` - 21 edges
10. `Button()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `AppLayout()` --calls--> `verifySession`  [EXTRACTED]
  src/app/(app)/layout.tsx → src/lib/auth/verifySession.ts
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

## Communities (26 total, 0 thin omitted)

### Community 0 - "UI Components Base"
Cohesion: 0.06
Nodes (39): AppLayout(), EntityFormModal(), inter, metadata, AppShell(), MODULE_ENTITY_MAP, MODULES, BadgeItem (+31 more)

### Community 1 - "App Pages"
Cohesion: 0.16
Nodes (32): AlasanBerhentiPage(), GolonganPage(), GradePage(), HariLiburPage(), JabatanPage(), JenisKeahlianPage(), JenisKitasPage(), JenisPelatihanPage() (+24 more)

### Community 2 - "Entity Configs"
Cohesion: 0.11
Nodes (34): EntityFormModalProps, FormField, Column, alasanBerhentiConfig, EntityConfig, FKSource, makeConfig(), namaWajib (+26 more)

### Community 3 - "Form Components"
Cohesion: 0.07
Nodes (33): ProfesiForm(), ProfesiFormProps, useFkOptions(), profesiDefaults(), ProfesiFormValues, profesiSchema, SanksiForm(), SanksiFormProps (+25 more)

### Community 4 - "Master Entity Types"
Cohesion: 0.11
Nodes (27): MasterEntityName, MasterEntityTypes, AlasanBerhentiListResponse, AlasanBerhentiPostRequest, AlasanBerhentiQuery, GolonganListResponse, GolonganPostRequest, GolonganQuery (+19 more)

### Community 5 - "Avatar UI"
Cohesion: 0.13
Nodes (24): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+16 more)

### Community 6 - "Jabatan Types"
Cohesion: 0.10
Nodes (25): JabatanListResponse, JabatanPostRequest, JabatanPutRequest, JabatanQuery, JabatanSearchParams, ListResultJabatanListResponse, ListResultJabatanQuery, PageResultPageJabatanQuery (+17 more)

### Community 7 - "Alasan Berhenti Types"
Cohesion: 0.11
Nodes (20): AlasanBerhentiSearchParams, ListResultAlasanBerhentiListResponse, PageResultPageAlasanBerhentiQuery, SingleResultAlasanBerhentiQuery, GolonganSearchParams, JenjangPendidikanPostRequest, JenjangPendidikanPutRequest, JenjangPendidikanResponse (+12 more)

### Community 8 - "Dropdown Menu UI"
Cohesion: 0.13
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+7 more)

### Community 9 - "Auth & Session"
Cohesion: 0.24
Nodes (13): ADR-0001, appwriteRequest(), fetchAccount(), mintCache, mintJWT(), readSession(), sessionCookieNames(), tokenCookieOptions() (+5 more)

### Community 10 - "Dialog Components"
Cohesion: 0.19
Nodes (12): ConfirmDeleteDialog(), ConfirmDeleteDialogProps, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+4 more)

### Community 11 - "Enum Utilities"
Cohesion: 0.23
Nodes (8): EnumEntity, NOTE: `api.listAll` already unwraps the envelope via `handle<T>` (returns `body., ListResultStatusPegawaiResponse, StatusPegawaiResponse, EnumOption, Envelope, HttpStatusText, ListResultEnumOption

### Community 12 - "ComboBox UI"
Cohesion: 0.27
Nodes (12): FKComboboxFilterProps, FKComboboxProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+4 more)

### Community 13 - "Sanksi Types"
Cohesion: 0.14
Nodes (13): JenisSpMiniResponse, JenisSpSimple, ListResultSanksiJenisSpList, ListResultSanksiQuery, PageResultPageSanksiQuery, PatchSanksiJenisSpRequest, SanksiJenisSpList, SanksiMiniResponse (+5 more)

### Community 14 - "Pagination UI"
Cohesion: 0.19
Nodes (7): DataTablePagination(), DataTablePaginationProps, Button(), buttonVariants, SheetDescription(), SheetFooter(), SheetOverlay()

### Community 15 - "CRUD Form"
Cohesion: 0.23
Nodes (10): CrudFormProps, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator() (+2 more)

### Community 16 - "Input Group UI"
Cohesion: 0.24
Nodes (9): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+1 more)

### Community 17 - "Data Table"
Cohesion: 0.27
Nodes (5): cellContent(), DataTable(), DataTableProps, Separator(), Skeleton()

### Community 18 - "Jenis SP Types"
Cohesion: 0.20
Nodes (9): JenisSpListResponse, JenisSpPostRequest, JenisSpPutRequest, JenisSpQuery, JenisSpSearchParams, ListResultJenisSpListResponse, PageResultPageJenisSpQuery, SanksiRow (+1 more)

### Community 19 - "Card UI"
Cohesion: 0.36
Nodes (7): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 20 - "Grade Types"
Cohesion: 0.22
Nodes (8): GradeListResponse, GradePostRequest, GradeQuery, GradeSearchParams, ListResultGradeListResponse, ListResultGradeQuery, PageResultPageGradeQuery, SingleResultGradeQuery

### Community 21 - "Hari Libur Types"
Cohesion: 0.22
Nodes (8): HariLiburListResponse, HariLiburPostRequest, HariLiburQuery, HariLiburSearchParams, ListResultHariLiburListResponse, PageResultPageHariLiburQuery, SingleResultHariLiburQuery, SavedResultLong

### Community 22 - "Jenis Kitas Types"
Cohesion: 0.22
Nodes (8): JenisKitasListResponse, JenisKitasPostRequest, JenisKitasQuery, JenisKitasSearchParams, ListResultJenisKitasListResponse, PageResultPageJenisKitasQuery, SingleResultJenisKitasQuery, PageEnvelope

### Community 23 - "Jenis Pelatihan Types"
Cohesion: 0.22
Nodes (8): JenisPelatihanListResponse, JenisPelatihanPostRequest, JenisPelatihanQuery, JenisPelatihanSearchParams, ListResultJenisPelatihanListResponse, PageResultPageJenisPelatihanQuery, SingleResultJenisPelatihanQuery, PageableObject

### Community 24 - "Rumah Dinas Types"
Cohesion: 0.22
Nodes (8): ListResultRumahDinasListResponse, PageResultPageRumahDinasQuery, RumahDinasListResponse, RumahDinasPostRequest, RumahDinasQuery, RumahDinasSearchParams, SingleResultRumahDinasQuery, SortObject

### Community 25 - "Paging & Utilities"
Cohesion: 0.43
Nodes (5): fromPage(), PageParams, PageView, toApiParams(), Page

## Knowledge Gaps
- **106 isolated node(s):** `ProfesiFormProps`, `SanksiFormProps`, `SwitchField`, `schema`, `Data` (+101 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Avatar UI` to `UI Components Base`, `Form Components`, `Dropdown Menu UI`, `Dialog Components`, `ComboBox UI`, `Pagination UI`, `CRUD Form`, `Input Group UI`, `Data Table`, `Card UI`?**
  _High betweenness centrality (0.251) - this node is a cross-community bridge._
- **Why does `Button()` connect `Pagination UI` to `UI Components Base`, `App Pages`, `Form Components`, `Avatar UI`, `Dialog Components`, `ComboBox UI`, `CRUD Form`, `Input Group UI`, `Data Table`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `MasterEntityTypes` connect `Master Entity Types` to `App Pages`, `Jabatan Types`, `Alasan Berhenti Types`, `Sanksi Types`, `Jenis SP Types`, `Grade Types`, `Hari Libur Types`, `Jenis Kitas Types`, `Jenis Pelatihan Types`, `Rumah Dinas Types`, `Paging & Utilities`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **What connects `ProfesiFormProps`, `SanksiFormProps`, `SwitchField` to the rest of the system?**
  _106 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Components Base` be split into smaller, more focused modules?**
  _Cohesion score 0.05649717514124294 - nodes in this community are weakly interconnected._
- **Should `Entity Configs` be split into smaller, more focused modules?**
  _Cohesion score 0.10761705101327743 - nodes in this community are weakly interconnected._
- **Should `Form Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06717687074829932 - nodes in this community are weakly interconnected._