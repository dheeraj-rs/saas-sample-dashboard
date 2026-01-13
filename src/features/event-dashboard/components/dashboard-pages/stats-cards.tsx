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
    metrics?: {
        totalUsers: number
        activeUsers: number
        totalTickets?: number
        totalRevenue?: number
    }
}

export function StatsCards({ events, metrics }: StatsCardsProps) {
    const totalUsers = metrics?.totalUsers ?? 1250
    const activeUsers = metrics?.activeUsers ?? 890
    const totalTickets = metrics?.totalTickets ?? events.reduce((sum, e) => sum + e.registered, 0)
    const totalRevenue = metrics?.totalRevenue ?? totalTickets * 150

    // Helper to format numbers compactly (e.g., 1.2K, 2.5M)
    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
        }
        return num.toLocaleString()
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Users & Active Users Card */}
            <Card className="shadow-sm p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                        Total Users
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <IconUsers className="h-4 w-4 text-primary" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold tracking-tight">{totalUsers.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground font-medium">registered</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs mt-2">
                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                            <IconTrendingUp className="h-3 w-3" />
                            <span className="font-semibold">{activeUsers.toLocaleString()}</span>
                        </div>
                        <span className="text-muted-foreground/80">Active now</span>
                    </div>
                </div>
            </Card>

            {/* Tickets Card */}
            <Card className="shadow-sm p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                        Ticket Sales
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                        <IconTicket className="h-4 w-4 text-blue-600" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold tracking-tight">{totalTickets.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground font-medium">sold</div>
                    </div>
                    <div className="text-xs text-muted-foreground/80 mt-2">
                        Across <span className="font-medium text-foreground">{events.length}</span> active events
                    </div>
                </div>
            </Card>

            {/* Revenue Card */}
            <Card className="shadow-sm p-4">
                <div className="flex flex-row items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                        Total Revenue
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                        <IconTrendingUp className="h-4 w-4 text-emerald-600" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold tracking-tight">${formatNumber(totalRevenue)}</div>
                        <div className="text-xs text-muted-foreground font-medium">gross</div>
                    </div>
                    <div className="text-xs text-muted-foreground/80 mt-2">
                        <span className="font-medium text-foreground">${totalRevenue.toLocaleString()}</span> generated
                    </div>
                </div>
            </Card>
        </div>
    )
}
