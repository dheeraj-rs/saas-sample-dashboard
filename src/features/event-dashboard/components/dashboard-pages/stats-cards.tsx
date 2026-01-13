import { IconTicket, IconTrendingUp, IconUsers } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface StatsCardsProps {
    events: Event[]
}

export function StatsCards({ events }: StatsCardsProps) {
    const totalUsers = 1250
    const activeUsers = 890
    const totalTickets = events.reduce((sum, e) => sum + e.registered, 0)
    const totalRevenue = totalTickets * 150

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Users & Active Users Card */}
            <Card className="shadow-sm p-2">
                <div className="flex flex-row items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                        Users
                    </span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <IconUsers className="h-3 w-3 text-primary" />
                    </div>
                </div>
                <div className="space-y-0">
                    <div className="flex items-baseline gap-1.5">
                        <div className="text-2xl font-bold leading-none">{totalUsers.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground">Total</div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] mt-0.5 leading-none">
                        <div className="flex items-center gap-0.5 text-green-600">
                            <IconTrendingUp className="h-2.5 w-2.5" />
                            <span className="font-medium">{activeUsers}</span>
                        </div>
                        <span className="text-muted-foreground">Active Users</span>
                    </div>
                </div>
            </Card>

            {/* Tickets Card */}
            <Card className="shadow-sm py-2 px-3">
                <div className="flex flex-row items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-muted-foreground">
                        Tickets
                    </span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10">
                        <IconTicket className="h-3 w-3 text-blue-500" />
                    </div>
                </div>
                <div className="space-y-0">
                    <div className="flex items-baseline gap-1.5">
                        <div className="text-2xl font-bold leading-none">{totalTickets.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground">Sold</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                        Across {events.length} events
                    </div>
                </div>
            </Card>

            {/* Revenue Card */}
            <Card className="shadow-sm p-2">
                <div className="flex flex-row items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-muted-foreground">
                        Revenue
                    </span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                        <IconTrendingUp className="h-3 w-3 text-green-500" />
                    </div>
                </div>
                <div className="space-y-0">
                    <div className="flex items-baseline gap-1.5">
                        <div className="text-2xl font-bold leading-none">${(totalRevenue / 1000).toFixed(1)}K</div>
                        <div className="text-[10px] text-muted-foreground">Total</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                        ${totalRevenue.toLocaleString()} generated
                    </div>
                </div>
            </Card>
        </div>
    )
}
