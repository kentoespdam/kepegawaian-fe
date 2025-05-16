import type {
	KomponenGajiMini,
	KomponenGajiSchema,
} from "@_types/penggajian/komponen";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import type { UseFormReturn } from "react-hook-form";

interface AvailableCodeButtonProps {
	availableCode: KomponenGajiMini[];
	form: UseFormReturn<KomponenGajiSchema>;
	currentCode?: string;
}

const AvailableCodeButton = ({
	availableCode,
	form,
	currentCode,
}: AvailableCodeButtonProps) => {
	const formula = form.watch("formula");

	const operatorClick = (item: string) => {
		form.setValue("formula", `${formula}${item} `);
		form.setFocus("formula");
	};

	const kodeClick = (item: KomponenGajiMini) => {
		form.setValue("formula", `${formula}${item.kode} `);
		form.setFocus("formula");
	};

	return (
		<div className="grid gap-2">
			<Label>Operator</Label>
			<div className="flex gap-2">
				<TooltipBuilder text="tambah">
					<Button size={"sm"} type="button" onClick={() => operatorClick("+")}>
						+
					</Button>
				</TooltipBuilder>
				<TooltipBuilder text="Kurang">
					<Button size={"sm"} type="button" onClick={() => operatorClick("-")}>
						-
					</Button>
				</TooltipBuilder>
				<TooltipBuilder text="Kali">
					<Button size={"sm"} type="button" onClick={() => operatorClick("*")}>
						*
					</Button>
				</TooltipBuilder>
				<TooltipBuilder text="Bagi">
					<Button size={"sm"} type="button" onClick={() => operatorClick("/")}>
						/
					</Button>
				</TooltipBuilder>
				<TooltipBuilder text="Buka Kurung">
					<Button size={"sm"} type="button" onClick={() => operatorClick("(")}>
						(
					</Button>
				</TooltipBuilder>
				<TooltipBuilder text="Tutup Kurung">
					<Button size={"sm"} type="button" onClick={() => operatorClick(")")}>
						)
					</Button>
				</TooltipBuilder>
			</div>
			<Label>Available Kode</Label>
			<div className="max-w-full flex flex-wrap gap-2">
				{availableCode.map((item) =>
					item.kode === currentCode ? null : (
						<div key={item.kode}>
							<TooltipBuilder text={item.nama}>
								<Button
									size={"sm"}
									onClick={() => kodeClick(item)}
									type="button"
								>
									{item.kode}
								</Button>
							</TooltipBuilder>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default AvailableCodeButton;
