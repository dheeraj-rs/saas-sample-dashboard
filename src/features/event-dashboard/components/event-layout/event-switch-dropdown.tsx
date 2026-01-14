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
} from "@/components/ui/sidebar"
import { Team } from "@/components/layouts/dashboard-layout.types"
import { allEvents } from "@/data/events"

export function EventSwitchDropdown({ events, organizations }: { events: Team[], organizations?: Team[] }) {
    const [activeEvent, setActiveEvent] = React.useState(events[0])
    const navigate = useNavigate()

    // Get event type from the active event by looking it up in allEvents
    const getEventType = () => {
        const fullEvent = allEvents.find(e => e.name === activeEvent.name)
        if (fullEvent?.eventType) {
            return fullEvent.eventType.charAt(0).toUpperCase() + fullEvent.eventType.slice(1)
        }
        return "Event"
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild className="py-1">
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-full w-full focus-visible:ring-0"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-border text-sidebar-foreground">
                                <span className="text-sm font-semibold">{activeEvent.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                                <div className="flex items-center gap-1 min-w-0">
                                    <span className="truncate font-semibold">{activeEvent.name}</span>
                                    <ChevronDown className="size-3 text-muted-foreground shrink-0" />
                                </div>
                                <span className="truncate text-xs text-muted-foreground">{getEventType()}</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <SidebarMenuAction className="bg-transparent -translate-y-1/4 right-1 h-8 w-8 flex items-center justify-center hover:bg-sidebar-accent text-sidebar-foreground/70">
                        <Search className="size-4" />
                    </SidebarMenuAction>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-sidebar text-sidebar-foreground border-sidebar-border"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 text-sidebar-muted-foreground text-xs">
                            Events
                        </DropdownMenuLabel>
                        {events.map((event, index) => (
                            <DropdownMenuItem
                                key={event.id || event.name}
                                onClick={() => setActiveEvent(event)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-7 items-center justify-center rounded-sm border border-sidebar-border">
                                    <event.logo className="size-4 shrink-0" />
                                </div>
                                <div className="flex-1 min-w-0 truncate">{event.name}</div>
                                {activeEvent.name === event.name ? (
                                    <Check className="ml-auto size-4 text-sidebar-primary" />
                                ) : (
                                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                                )}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border border-sidebar-border bg-sidebar-accent">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-sidebar-muted-foreground">Add event</div>
                        </DropdownMenuItem>
                        {organizations && organizations.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="p-0 text-sidebar-muted-foreground text-xs">
                                    Organizations
                                </DropdownMenuLabel>
                                {organizations.map((org) => (
                                    <DropdownMenuItem
                                        key={org.name}
                                        className="gap-2 p-2"
                                        onClick={() => navigate("/organization-dashboard")}
                                    >
                                        <div className="flex size-7 items-center justify-center rounded-sm border border-sidebar-border">
                                            <org.logo className="size-4 shrink-0" />
                                        </div>
                                        <div className="flex-1 min-w-0 truncate">{org.name}</div>
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
