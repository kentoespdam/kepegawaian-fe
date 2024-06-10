import { Skeleton } from "@components/ui/skeleton";

const LoadingProfile = () => {
    return (
        <div className="flex items-center gap-3 py-2">
            <div className="flex flex-col">
                <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
        </div>
    );
}

export default LoadingProfile;