import {
    IconBuilding,
    IconCalendarEvent,
    IconChartBar,
    IconCreditCard,
    IconTrendingUp,
    IconUsers,
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

interface OrgOverviewCardsProps {
    data: OverviewStats
}

export function OrgOverviewCards({ data }: OrgOverviewCardsProps) {
    // Mock percentage changes
    const revenueGrowth = 12.5
    const eventGrowth = 8.2
    const memberGrowth = 5.0

    return (
        <div className="grid grid-cols-1 gap-3 px-2 sm:gap-4 sm:px-4 lg:px-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {/* Revenue Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        ${data.totalRevenue.toLocaleString()}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <IconTrendingUp className="size-3 mr-1" />
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

            {/* Active Events Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Active Events</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {data.activeEvents}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconCalendarEvent className="size-3 mr-1" />
                            Running
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        {data.totalEvents} Total Events
                    </div>
                    <div className="text-muted-foreground">
                        +{eventGrowth}% new events this month
                    </div>
                </CardFooter>
            </Card>

            {/* Team Members Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Team Members</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {data.teamMembers}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconUsers className="size-3 mr-1" />
                            Active
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Organization Stats
                    </div>
                    <div className="text-muted-foreground">
                        +{memberGrowth}% growth in team size
                    </div>
                </CardFooter>
            </Card>

            {/* Current Plan Card */}
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription className="text-default">Current Plan</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {data.activePlan}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <IconCreditCard className="size-3 mr-1" />
                            Active
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Subscription Status
                    </div>
                    <div className="text-muted-foreground">
                        Next billing date: Feb 1, 2026
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
