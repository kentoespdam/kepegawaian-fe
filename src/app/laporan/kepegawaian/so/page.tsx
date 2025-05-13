import { API_URL } from "@lib/utils";

const fetchSo = async () => {
	const res = await fetch(
		`${API_URL}/laporan/kepegawaian/so?script_url=/go.js`,
		{
			headers: {
				"cache-control": "no-cache",
			},
		},
	);
	return await res.text();
};

export const metadata = {
	title: "Struktur Organisasi",
};
const StrukturOrganisasiPage = async () => {
	const so = await fetchSo();
	return (
		// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
		<div dangerouslySetInnerHTML={{ __html: so }} className="w-auto h-auto" />
	);
};

export default StrukturOrganisasiPage;
