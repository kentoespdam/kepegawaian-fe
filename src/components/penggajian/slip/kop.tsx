import Image from "next/image";
import logo from "@public/images/logo_pdam.png";
const SlipGajiKop = () => {
	return (
		<div className="flex items-center">
			<Image
				src={logo}
				alt="logo"
				width={200}
				className="object-contain w-[210px]"
			/>
			<div className="w-full grid gap-0 justify-center items-center">
				<span className="text-center font-bold text-xl">
					PERUSAHAAN UMUM DAERAH AIR MUNUM TIRTA SATRIA
				</span>
				<span className="text-center font-bold text-xl">
					KABUPATEN BANYUMAS
				</span>
				<span className="text-center text-sm">Jl. Prof. Dr. Suharso No. 52 PURWOKERTO 53114</span>
				<span className="text-center text-sm">Telp. 0281-632324 Fax. 0281-641654</span>
				<span className="text-center text-sm">
					Website: www.pdambanyumas.com E-mail: pdam_banyumas@yahoo.com
				</span>
			</div>
		</div>
	);
};

export default SlipGajiKop;
