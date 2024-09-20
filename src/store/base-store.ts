export interface BaseSelectedStore {
	selectedDataId: number;
	setSelectedDataId: (id: number) => void;
}
export interface BaseDeleteStore {
	openDelete: boolean;
	setOpenDelete: (val: boolean) => void;
}
export interface SelectedHandlerStore
	extends BaseSelectedStore,
		BaseDeleteStore {
	open: boolean;
	setOpen: (val: boolean) => void;
}
