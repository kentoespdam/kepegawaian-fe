declare module "d3-org-chart" {
	export interface NodeObject<T> {
		data: T;
		id: string;
		parentId: string | null;
		depth: number;
		height: number;
		x: number;
		y: number;
		width: number;
		height: number;
		children?: NodeObject<T>[];
		_children?: NodeObject<T>[];
	}

	export interface ChartState<T> {
		allNodes: NodeObject<T>[];
		root: NodeObject<T>;
		svg?: unknown;
		centerG?: unknown;
	}

	export class OrgChart<T = Record<string, unknown>> {
		constructor();
		container(selector: string | HTMLElement): this;
		svgWidth(width: number): this;
		svgHeight(height: number): this;
		data(data: T[]): this;
		nodeId(accessor: (d: T) => string): this;
		parentNodeId(accessor: (d: T) => string | null): this;
		nodeWidth(accessor: (d: NodeObject<T>) => number): this;
		nodeHeight(accessor: (d: NodeObject<T>) => number): this;
		childrenMargin(accessor: (d: NodeObject<T>) => number): this;
		compactMarginBetween(accessor: (d: NodeObject<T>) => number): this;
		compactMarginPair(accessor: (d: NodeObject<T>) => number): this;
		neighbourMargin(accessor: (d: NodeObject<T>) => number): this;
		nodeContent(
			accessor: (d: NodeObject<T>, index: number, arr: NodeObject<T>[], state: ChartState<T>) => string,
		): this;
		render(): this;
		fit(params?: { nodes?: NodeObject<T>[]; duration?: number }): this;
		zoomIn(): this;
		zoomOut(): this;
		setHighlighted(nodeId: string | number): this;
		clearHighlighting(): this;
		expandId(nodeId: string | number): this;
		collapseId(nodeId: string | number): this;
		imageName(name: string): this;
		exportImg(params?: {
			full?: boolean;
			scale?: number;
			save?: boolean;
			backgroundColor?: string;
			onLoad?: (dataUrl: string) => void;
		}): void;
		exportSvg(): void;
		getChartState(): ChartState<T>;
	}
}
