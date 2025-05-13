"use client";
import * as go from "gojs";
import { ReactDiagram, ReactOverview } from "gojs-react";
import { useState } from "react";
import SearchSOForm from "./form.search";

const SoComponent = ({ so }: { so: StrukturOrganisasi[] }) => {
	const [diagram, setDiagram] = useState<go.Diagram | null>(null);

	const nameGenerator = (data: Record<string, unknown>) => {
		return data.name ? `(${data.name}) \n ${data.nik}` : "";
	};

	function findLevelColor(node: go.Node) {
		return node.data.level - 1;
	}

	const initComponent = () => {
		const myDiagram = new go.Diagram({
			initialDocumentSpot: go.Spot.TopCenter,
			initialViewportSpot: go.Spot.TopCenter,
			allowCopy: false,
			allowDelete: false,
			allowMove: false,
			initialAutoScale: go.AutoScale.UniformToFill,
			maxSelectionCount: 1, // users can select only one part at a time
			validCycle: go.CycleMode.DestinationTree, // make sure users can only create trees
			layout: new go.TreeLayout({
				treeStyle: go.TreeStyle.LastParents,
				angle: 90,
				layerSpacing: 80,
				alternateAngle: 0,
				alternateAlignment: go.TreeAlignment.Start,
				alternateNodeIndent: 20,
				alternateNodeIndentPastParent: 1,
				alternateNodeSpacing: 20,
				alternateLayerSpacing: 40,
				alternateLayerSpacingParentOverlap: 1,
				alternatePortSpot: new go.Spot(0.001, 1, 20, 0),
				alternateChildPortSpot: go.Spot.Left,
			}),
			"undoManager.isEnabled": true, // enable undo & redo
			// "themeManager.changesDivBackground": true,
			// "themeManager.currentTheme": "light",
		});

		myDiagram.themeManager.set("light", {
			colors: {
				background: "#fff",
				text: "#111827",
				textHighlight: "#11a8cd",
				subtext: "#6b7280",
				badge: "#f0fdf4",
				badgeBorder: "#16a34a33",
				badgeText: "#15803d",
				divider: "#6b7280",
				shadow: "#9ca3af",
				tooltip: "#1f2937",
				levels: [
					"#AC193D",
					"#2672EC",
					"#8C0095",
					"#5133AB",
					"#008299",
					"#D24726",
					"#008A00",
					"#094AB2",
				],
				dragOver: "#f0f9ff",
				link: "#9ca3af",
				div: "#f3f4f6",
			},
			fonts: {
				name: "500 0.875rem InterVariable, sans-serif",
				normal: "0.875rem InterVariable, sans-serif",
				badge: "500 0.75rem InterVariable, sans-serif",
				link: "600 0.875rem InterVariable, sans-serif",
			},
		});

		myDiagram.nodeTemplate = new go.Node(go.Panel.Spot, {
			isShadowed: true,
			shadowOffset: new go.Point(0, 2),
			selectionObjectName: "BODY",
		})
			.add(
				new go.Panel(go.Panel.Auto, { name: "BODY" }).add(
					new go.Shape("RoundedRectangle", {
						name: "SHAPE",
						strokeWidth: 0,
						portId: "",
						spot1: go.Spot.TopLeft,
						spot2: go.Spot.BottomRight,
					})
						.theme("fill", "background")
						.bindObject("fill", "isHighlighted", (s) =>
							s ? "#f0fdf4" : "#fff",
						),
					new go.Panel(go.Panel.Table, {
						alignment: go.Spot.Center,
						defaultAlignment: go.Spot.Center,
						stretch: go.Stretch.Horizontal,
						padding: new go.Margin(10, 10, 10, 10),
						minSize: new go.Size(250, 50),
					}).add(
						new go.TextBlock({
							name: "NAME",
							row: 0,
							alignment: go.Spot.Center,
							editable: false,
						})
							.bindTwoWay("text", "jabatan")
							.theme("stroke", "text")
							.theme("font", "name"),
						new go.TextBlock({
							name: "NIK",
							row: 1,
							alignment: go.Spot.Center,
							editable: false,
							textAlign: "center",
							margin: new go.Margin(15, 0, 0, 0),
						})
							.bindTwoWay("text", "", nameGenerator)
							.theme("stroke", "subtext")
							.theme("font", "normal"),
					),
				), // end Auto Panel
				new go.Shape("RoundedLeftRectangle", {
					alignment: go.Spot.Left,
					alignmentFocus: go.Spot.Left,
					stretch: go.Stretch.Vertical,
					width: 6,
					strokeWidth: 0,
				}).themeObject("fill", "", "levels", findLevelColor),
			)
			.theme("shadowColor", "shadow")
			// for sorting, have the Node.text be the data.name
			.bind("text", "name");

		myDiagram.linkTemplate = new go.Link({
			routing: go.Routing.Orthogonal,
			layerName: "Background",
			corner: 5,
		}).add(new go.Shape({ strokeWidth: 2 }).theme("stroke", "link"));

		// setMyDiagram(diagram);
		myDiagram.model = new go.TreeModel({
			nodeParentKeyProperty: "boss",
			nodeDataArray: so,
		});

		setDiagram(myDiagram);

		return myDiagram;
	};

	return (
		<div className="grid gap-2">
			<SearchSOForm diagram={diagram} />
			<div className="relative">
				<ReactOverview
					divClassName="absolute w-[200px] h-[100px] top-[10px] left-[10px] bg-white z-[3] border"
					observedDiagram={diagram}
				/>
				<ReactDiagram
					initDiagram={initComponent}
					divClassName="w-full h-[700px] border"
					nodeDataArray={so}
				/>
			</div>
		</div>
	);
};

export default SoComponent;
