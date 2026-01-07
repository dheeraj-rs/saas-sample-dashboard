import * as React from "react"
import { ChevronDown, Plus, Search } from "lucide-react"

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

export function TeamSwitcher({ teams }: { teams: Team[] }) {
    const { isMobile } = useSidebar()
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

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
                                <span className="text-sm font-semibold">{activeTeam.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <div className="flex items-center gap-1">
                                    <span className="truncate font-semibold">{activeTeam.name}</span>
                                    <ChevronDown className="size-3 text-muted-foreground" />
                                </div>
                                <span className="truncate text-xs text-muted-foreground">{activeTeam.plan}</span>
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
                            Teams
                        </DropdownMenuLabel>
                        {teams.map((team, index) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => setActiveTeam(team)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-7 items-center justify-center rounded-sm border">
                                    <team.logo className="size-4 shrink-0" />
                                </div>
                                {team.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Add team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
