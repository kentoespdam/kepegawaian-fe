import type { CvComponentProps } from ".";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import Image from "next/image";

const CvLeftPhoto = ({ pegawai }: CvComponentProps) => {
	return (
		<div className="grid gap-4">
			<div className="w-full flex justify-center ">
				<div className="w-[120px] h-[120px] flex justify-center items-center p-1 border-4 rounded-full">
					<Avatar className="h-[100px] w-[100px]">
						<Image
							src={
								pegawai.biodata.fotoProfil
									? pegawai.biodata.fotoProfil
									: "https://github.com/shadcn.png"
							}
							alt="Employee Photo"
							loading="lazy"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
						<AvatarFallback>ID</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="grid justify-center gap-2">
				<span className="text-center font-bold">{pegawai?.biodata.nama}</span>
				<span className="text-center text-sm font-thin">
					{pegawai?.jabatan.nama}
				</span>
			</div>
		</div>
	);
};

export default CvLeftPhoto;
