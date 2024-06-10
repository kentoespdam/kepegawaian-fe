import { metadata } from "@app/layout";
import StatusPegawaiForm from "@app/master/status_pegawai/form";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { ChildrenNode } from "@lib/index";

type FormCardProps = {
    metadata: { title: string }
    children: React.ReactNode
}
const FormCard = ({ metadata, children }: FormCardProps) => {
    return (
        <Card className="mx-12 sm:mx-0 md:mx-48">
            <CardHeader>
                <CardTitle>{metadata.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default FormCard;