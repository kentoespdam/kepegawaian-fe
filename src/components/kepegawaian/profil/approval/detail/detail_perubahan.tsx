"use client";

import { COMPONENT_CONFIG, type ProfileUpdateDetail } from "@_types/profil/profil-update";
import { memo } from "react";


interface DetailPerubahanProps<T> {
	tableName: string;
	data?: ProfileUpdateDetail<T>;
}

const DetailPerubahanInner = <T,>({
	tableName,
	data,
}: DetailPerubahanProps<T>) => {
	const config = COMPONENT_CONFIG[tableName.toLowerCase() as keyof typeof COMPONENT_CONFIG];

	if (!data || !config) {
		console.warn(`No configuration found for tableName: ${tableName}`);
		return null;
	}

	const Renderer = config.renderer as React.ComponentType<{ isNew: boolean; data?: T }>;

	return (
		<div className="grid grid-cols-2">
			<Renderer
				isNew={true}
				data={data.latestRevision}
			/>
			<Renderer
				isNew={false}
				data={data.previousRevision}
			/>
		</div>
	);
};

DetailPerubahanInner.displayName = "DetailPerubahanInner";

const DetailPerubahan = memo(DetailPerubahanInner) as <T>(
	props: DetailPerubahanProps<T>,
) => JSX.Element | null;

export default DetailPerubahan;