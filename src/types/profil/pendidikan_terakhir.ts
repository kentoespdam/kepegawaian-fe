export interface PendidikanTerakhir {
	id: number;
	nama: string;
	seq: number;
}

export const findPendidikanTerakhirValue = (
	list: PendidikanTerakhir[],
	id: number | string | null,
): PendidikanTerakhir | undefined => list.find((item) => item.id === id);
