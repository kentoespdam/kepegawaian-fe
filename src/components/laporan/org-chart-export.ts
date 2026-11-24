import type { OrgChart } from "d3-org-chart";
import { jsPDF } from "jspdf";
import type { OrgChartNode } from "./org-chart-utils";

export interface ExportOptions {
	format: "pdf" | "png" | "jpeg" | "svg";
	scale?: number;
	fileName?: string;
}

export function downloadFile(url: string, filename: string): void {
	const link = document.createElement("a");
	link.download = filename;
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * Ekspor bagan organisasi dalam resolusi tinggi (PDF / JPG / PNG / SVG).
 * Menggunakan clone SVG dan Data URI untuk mencegah kanvas menjadi tainted (SecurityError di Chromium).
 */
export function exportHighDefChart(
	chart: OrgChart<OrgChartNode> | null,
	options: ExportOptions,
	callbacks?: {
		onSuccess?: () => void;
		onError?: (err: unknown) => void;
	},
): void {
	if (!chart) return;

	try {
		const state = chart.getChartState();
		const svgElement = (state.svg as unknown as { node?: () => SVGSVGElement })?.node?.() ?? null;
		const centerG = (state.centerG as unknown as { node?: () => SVGGElement })?.node?.() ?? null;

		if (!svgElement || !centerG) {
			throw new Error("Elemen SVG bagan tidak ditemukan");
		}

		// Hitung batas bounding box aktual dari seluruh diagram
		const bbox = centerG.getBBox();
		const padding = 60;
		const contentX = bbox.x - padding;
		const contentY = bbox.y - padding;
		const contentWidth = Math.max(800, Math.ceil(bbox.width + padding * 2));
		const contentHeight = Math.max(600, Math.ceil(bbox.height + padding * 2));

		// Kloning SVG agar tidak mengganggu tampilan DOM aktif
		const cloneSvg = svgElement.cloneNode(true) as SVGSVGElement;

		// Hapus transformasi zoom/pan pada kontainer dalam agar kembali ke skala natural 100%
		const chartG = cloneSvg.querySelector(".chart") as SVGGElement | null;
		if (chartG) {
			chartG.removeAttribute("transform");
		}

		// Sesuaikan viewBox dan ukuran cloneSvg persis membingkai seluruh diagram
		cloneSvg.setAttribute("viewBox", `${contentX} ${contentY} ${contentWidth} ${contentHeight}`);
		cloneSvg.setAttribute("width", String(contentWidth));
		cloneSvg.setAttribute("height", String(contentHeight));
		cloneSvg.setAttribute("style", `background-color: #ffffff; width: ${contentWidth}px; height: ${contentHeight}px;`);

		const xmlns = "http://www.w3.org/2000/xmlns/";
		const xlinkns = "http://www.w3.org/1999/xlink";
		const svgns = "http://www.w3.org/2000/svg";
		cloneSvg.setAttributeNS(xmlns, "xmlns", svgns);
		cloneSvg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);

		const styleEl = document.createElementNS(svgns, "style");
		styleEl.textContent = `
			* {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
				box-sizing: border-box;
			}
		`;
		cloneSvg.insertBefore(styleEl, cloneSvg.firstChild);

		// Netralkan fragment url() jika mengarah ke window.location (mencegah cross-origin taint)
		if (typeof window !== "undefined") {
			const fragment = `${window.location.href}#`;
			const walker = document.createTreeWalker(cloneSvg, NodeFilter.SHOW_ELEMENT, null);
			while (walker.nextNode()) {
				const el = walker.currentNode as Element;
				for (const attr of Array.from(el.attributes)) {
					if (attr.value.includes(fragment)) {
						attr.value = attr.value.replaceAll(fragment, "#");
					}
				}
			}
		}

		const serializer = new XMLSerializer();
		let svgString = serializer.serializeToString(cloneSvg);
		svgString = `<?xml version="1.0" standalone="no"?>\r\n${svgString}`;
		const fileName = options.fileName ?? "struktur-organisasi-perumdam";

		// Jika format SVG, langsung unduh file vektor murni
		if (options.format === "svg") {
			const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
			const downloadUrl = URL.createObjectURL(svgBlob);
			downloadFile(downloadUrl, `${fileName}.svg`);
			URL.revokeObjectURL(downloadUrl);
			callbacks?.onSuccess?.();
			return;
		}

		// Skala rasterisasi (default 2 untuk Retina/HD display, dibatasi agar tidak melampaui batas batas canvas browser)
		const requestedScale = options.scale ?? 2;
		const maxDimension = 12000;
		const scale = Math.min(requestedScale, maxDimension / Math.max(contentWidth, contentHeight));

		const canvasWidth = Math.round(contentWidth * scale);
		const canvasHeight = Math.round(contentHeight * scale);

		const canvas = document.createElement("canvas");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Gagal menginisialisasi Canvas 2D context");
		}

		// Menggunakan Data URI dengan encodeURIComponent agar canvas tidak menjadi tainted di Chromium
		const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
		const image = new Image();

		image.onload = () => {
			try {
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, canvasWidth, canvasHeight);
				ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

				if (options.format === "pdf") {
					const isLandscape = contentWidth >= contentHeight;
					const pdf = new jsPDF({
						orientation: isLandscape ? "landscape" : "portrait",
						unit: "pt",
						format: [contentWidth, contentHeight],
						compress: true,
					});

					const imgData = canvas.toDataURL("image/jpeg", 0.95);
					pdf.addImage(imgData, "JPEG", 0, 0, contentWidth, contentHeight, undefined, "FAST");
					pdf.save(`${fileName}.pdf`);
				} else if (options.format === "jpeg") {
					const jpegData = canvas.toDataURL("image/jpeg", 0.95);
					downloadFile(jpegData, `${fileName}.jpg`);
				} else {
					// PNG
					const pngData = canvas.toDataURL("image/png", 1.0);
					downloadFile(pngData, `${fileName}.png`);
				}

				callbacks?.onSuccess?.();
			} catch (err) {
				callbacks?.onError?.(err);
			}
		};

		image.onerror = (err) => {
			callbacks?.onError?.(err);
		};

		image.src = svgDataUrl;
	} catch (err) {
		callbacks?.onError?.(err);
	}
}
