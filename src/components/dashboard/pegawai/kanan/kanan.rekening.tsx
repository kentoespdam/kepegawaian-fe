import { AccordionItem, AccordionTrigger } from "@components/ui/accordion";

const KananDataRekening = () => {
    return (
		<AccordionItem value="data-keluarga">
			<AccordionTrigger className="p-2 bg-primary text-primary-foreground">
				Daftar Keluarga
			</AccordionTrigger>
		</AccordionItem>
	);
}

export default KananDataRekening;