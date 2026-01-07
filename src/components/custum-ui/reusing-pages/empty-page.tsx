import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface EmptyPageProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    image?: ReactNode;
    className?: string;
}

export function EmptyPage({
    title,
    description,
    actionLabel,
    onAction,
    image,
    className
}: EmptyPageProps) {
    return (
        <div className={cn("flex min-h-[400px] flex-col items-center justify-center p-8 text-center animate-in fade-in-50", className)}>
            <div className="mx-auto mb-2 flex h-40 w-40 items-center justify-center rounded-full bg-muted/20 md:h-64 md:w-64">
                {image ? image : (
                    <img
                        src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/Work%20in%20progress/work_in_progress.png"
                        alt="Under Construction"
                        className="h-full w-full object-contain opacity-80"
                    />
                )}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground w-full max-w-sm mx-auto">
                {description}
            </p>
            {actionLabel && onAction && (
                <div className="mt-6">
                    <Button onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}
