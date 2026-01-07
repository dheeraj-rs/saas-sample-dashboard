import { IconCirclePlusFilled } from "@tabler/icons-react"

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAppConfigStore } from "@/store/app-config.store"

export function OrgHeader() {
    const { showToast } = useAppConfigStore()

    return (
        <header className="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb homePath="/org-dashboard" />
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        size="sm"
                        className="h-7 flex"
                        onClick={() => {
                            showToast('Add new employee to the organization', 'info')
                        }}
                    >
                        <IconCirclePlusFilled />
                        <span className="hidden sm:inline">New Event</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
