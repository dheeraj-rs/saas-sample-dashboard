import {
    IconCalendarEvent,
    IconChartBar,
    IconCreditCard,
    IconTicket,
    IconTrendingUp,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface OverviewStats {
    totalRevenue: number
    activeEvents: number
    totalEvents: number
    teamMembers: number
    activePlan: string
}

interface Event {
    id: string
    name: string
    organization_name: string
    event_type: string
    status: string
    active_domain?: string
    registered: number
    description?: string
    location: string
    start_date: string
    end_date: string
    created_at: string
    updated_at: string
}

interface OrgOverviewCardsProps {
    data: OverviewStats
    events?: Event[]
}

export function OrgOverviewCards({ data, events = [] }: OrgOverviewCardsProps) {
    // Calculate statistics from events data
    const totalEvents = events.length
    const activeEvents = events.filter(e => e.status === "active").length
    const upcomingEvents = events.filter(e => e.status === "upcoming").length

    // Calculate percentage of active events
    const activePercentage = totalEvents > 0 ? ((activeEvents / totalEvents) * 100).toFixed(1) : "0"

    // Mock percentage changes
    const revenueGrowth = 12.5

    return (
        <div className="grid grid-cols-1 gap-3 px-2 sm:gap-4 sm:px-4 lg:px-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {/* Total Events Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Total Events</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalEvents}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconCalendarEvent className="size-3 mr-1" />
                            All Time
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {activeEvents} Active Events
                    </div>
                    <div className="text-muted-foreground">
                        {upcomingEvents} upcoming events scheduled
                    </div>
                </CardFooter>
            </Card>

            {/* Active Events Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Active Events</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {activeEvents}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp className="size-3 mr-1" />
                            {activePercentage}%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Currently running
                    </div>
                    <div className="text-muted-foreground">
                        {activePercentage}% of total events are active
                    </div>
                </CardFooter>
            </Card>

            {/* Upcoming Events Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Upcoming Events</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {upcomingEvents}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTicket className="size-3 mr-1" />
                            Scheduled
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Events in pipeline
                    </div>
                    <div className="text-muted-foreground">
                        Ready for registration
                    </div>
                </CardFooter>
            </Card>

            {/* Revenue Card (Kept from existing Org Dashboard) */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        ${data.totalRevenue.toLocaleString()}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <IconChartBar className="size-3 mr-1" />
                            +{revenueGrowth}%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Financial Performance
                    </div>
                    <div className="text-muted-foreground">
                        Total earnings across all events
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
