import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function OrgHeader({ actions }: { actions?: React.ReactNode }) {
    return (
        <header className="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb homePath="/organization-dashboard" />
                <div className="ml-auto flex items-center gap-2">
                    {actions}
                </div>
            </div>
        </header>
    )
}
