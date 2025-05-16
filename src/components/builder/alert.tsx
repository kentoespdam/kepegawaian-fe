import { Alert, AlertDescription } from "@components/ui/alert";
import { cn } from "@lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				primary: "bg-primary text-primary-foreground",
				destructive:
					"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				warning: "bg-warning text-warning-foreground",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

type AlertProps = {
	message: string | string[];
} & VariantProps<typeof alertVariants>;

const AlertBuilder = ({ message, variant }: AlertProps) => {
	return (
		<Alert className={cn(alertVariants({ variant }))}>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
};

export default AlertBuilder;
