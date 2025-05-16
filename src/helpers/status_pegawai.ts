export const getUrutStatusPegawai = (statusPegawai: string): number => {
	let result = 6;
	switch (statusPegawai) {
		case "PEGAWAI":
			result = 1;
			break;
		case "CAPEG":
			result = 2;
			break;
		case "HONORER":
			result = 3;
			break;
		case "CALON_HONORER":
			result = 4;
			break;
		case "KONTRAK":
			result = 5;
			break;
		default:
			result = 6;
			break;
	}
	return result;
};
