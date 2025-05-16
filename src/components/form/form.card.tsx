import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { cn } from "@lib/utils";

type FormCardProps = {
    metadata: { title: string }
    children: React.ReactNode,
    className?: string
}
const FormCard = ({ metadata, children, className }: FormCardProps) => {
    return (
        <Card className={cn("mx-6 sm:mx-6 md:mx-12 lg:mx-24", className)}>
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