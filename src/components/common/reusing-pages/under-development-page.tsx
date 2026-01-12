import { EmptyPageLayout } from "./empty-page-layout";

interface UnderDevelopmentProps {
    pageName?: string;
}

export default function UnderDevelopmentPage({ pageName }: UnderDevelopmentProps) {
    return (
        <div
            className="flex h-full w-full flex-col items-center justify-center min-h-[calc(100vh-100px)] font-ibm"
        >
            <EmptyPageLayout
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
        </div>
    )
}
