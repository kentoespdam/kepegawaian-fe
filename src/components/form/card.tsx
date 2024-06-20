import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { cn } from "@lib/utils";

type FormCardProps = {
    metadata: { title: string }
    children: React.ReactNode,
    className?: string
}
const FormCard = ({ metadata, children, className }: FormCardProps) => {
    return (
        <Card className={cn("md:mx-24 lg:mx-96", className)}>
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