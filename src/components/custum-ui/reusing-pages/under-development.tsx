import { EmptyPage } from "./empty-page";

interface UnderDevelopmentProps {
    pageName?: string;
}

export function UnderDevelopment({ pageName }: UnderDevelopmentProps) {
    return (
        <EmptyPage
            title={pageName ? `${pageName} Page Under Development` : "Page Under Development"}
            description="Our developers are currently creating this page. Please check back later for updates."
            image={
                <img
                    src="/svg/undraw_under-construction_hdrn.svg"
                    alt="Page Under Construction"
                    className="h-full w-full object-contain"
                />
            }
        />
    )
}
