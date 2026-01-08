import * as React from "react"
import { Check, ChevronDown, Plus, Search } from "lucide-react"
import { useNavigate } from "react-router"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Team } from "@/components/layouts/dashboard-layout.types"

export function OrgSwitcher({ organizations, events }: { organizations: Team[], events?: Team[] }) {
    const { isMobile } = useSidebar()
    const [activeOrg, setActiveOrg] = React.useState(organizations[0])
    const navigate = useNavigate()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild className="py-0">
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-full w-full focus-visible:ring-0"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                                <span className="text-sm font-semibold">{activeOrg.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <div className="flex items-center gap-1">
                                    <span className="truncate font-semibold">{activeOrg.name}</span>
                                    <ChevronDown className="size-3 text-muted-foreground" />
                                </div>
                                <span className="truncate text-xs text-muted-foreground">{activeOrg.plan}</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <SidebarMenuAction className="bg-transparent -translate-y-1/4 right-1 h-8 w-8 flex items-center justify-center hover:bg-sidebar-accent text-sidebar-foreground/70">
                        <Search className="size-4" />
                    </SidebarMenuAction>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 text-muted-foreground text-xs">
                            Organizations
                        </DropdownMenuLabel>
                        {organizations.map((org, index) => (
                            <DropdownMenuItem
                                key={org.name}
                                onClick={() => setActiveOrg(org)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-7 items-center justify-center rounded-sm border">
                                    <org.logo className="size-4 shrink-0" />
                                </div>
                                {org.name}
                                {activeOrg.name === org.name ? (
                                    <Check className="ml-auto size-4 text-blue-600" />
                                ) : (
                                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                                )}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Add organization</div>
                        </DropdownMenuItem>
                        {events && events.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="p-0 text-muted-foreground text-xs">
                                    Events
                                </DropdownMenuLabel>
                                {events.map((event) => (
                                    <DropdownMenuItem
                                        key={event.name}
                                        className="gap-2 p-2"
                                        onClick={() => navigate("/event-dashboard")}
                                    >
                                        <div className="flex size-7 items-center justify-center rounded-sm border">
                                            <event.logo className="size-4 shrink-0" />
                                        </div>
                                        {event.name}
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
