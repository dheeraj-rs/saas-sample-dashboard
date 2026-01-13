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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Users & Active Users Card */}
            <Card className="shadow-sm p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">
                        Users
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <IconUsers className="h-4 w-4 text-primary" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs mt-1">
                        <div className="flex items-center gap-1 text-green-600">
                            <IconTrendingUp className="h-3 w-3" />
                            <span className="font-medium">{activeUsers}</span>
                        </div>
                        <span className="text-muted-foreground">Active Users</span>
                    </div>
                </div>
            </Card>

            {/* Tickets Card */}
            <Card className="shadow-sm p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">
                        Tickets
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                        <IconTicket className="h-4 w-4 text-blue-500" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">{totalTickets.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Sold</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Across {events.length} events
                    </div>
                </div>
            </Card>

            {/* Revenue Card */}
            <Card className="shadow-sm p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">
                        Revenue
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                        <IconTrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        ${totalRevenue.toLocaleString()} generated
                    </div>
                </div>
            </Card>
        </div>
    )
}
