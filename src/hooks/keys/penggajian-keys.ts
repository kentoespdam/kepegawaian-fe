/** Query key factory for penggajian (payroll) data. */
export const penggajianKeys = {
	all: ["penggajian"] as const,

	batch: {
		all: () => [...penggajianKeys.all, "batch"] as const,
		detail: (id: string) => [...penggajianKeys.batch.all(), id] as const,
	},
} as const;
