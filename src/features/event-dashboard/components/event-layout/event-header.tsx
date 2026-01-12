import { IconCirclePlusFilled } from "@tabler/icons-react"

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAppConfigStore } from "@/store/app-config.store"

export function EventHeader({ actions }: { actions?: React.ReactNode }) {
    const { showToast } = useAppConfigStore()

    return (
        <header className="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb homePath="/event-dashboard" />
                <div className="ml-auto flex items-center gap-2">
                    {actions || (
                        <Button
                            size="sm"
                            className="h-7 flex"
                            onClick={() => {
                                showToast('This is an important notification. Please review carefully.', 'warning')
                            }}
                        >
                            <IconCirclePlusFilled />
                            <span className="hidden sm:inline">Quick Create</span>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

