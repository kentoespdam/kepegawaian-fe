export const base64toBlob = (base64: string, mime: string) => {
	const byteCharacters = atob(base64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	return new Blob([byteArray], { type: mime });
};

// change date format to indonesian ${hari}, ${tanggal} ${bulan} ${tahun}
export const dateToIndonesian = (date?: string) => {
	if (!date) return "";
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return "";
	return `${d.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})}`;
};
