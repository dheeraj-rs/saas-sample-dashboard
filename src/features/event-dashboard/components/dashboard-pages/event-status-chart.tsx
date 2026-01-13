import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

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

interface EventStatusChartProps {
    events: Event[]
}

const COLORS = {
    active: "#22c55e",
    upcoming: "#3b82f6",
    past: "#6b7280",
    cancelled: "#ef4444",
}

export function EventStatusChart({ events }: EventStatusChartProps) {
    // Count events by status
    const statusCounts = events.reduce((acc, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const chartData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count,
        color: COLORS[status as keyof typeof COLORS],
    }))

    return (

        <Card className="h-full flex flex-col shadow-sm p-4">
            <div className="mb-4">
                <span className="text-sm font-semibold text-muted-foreground">Event Status Distribution</span>
            </div>
            <div className="flex-1 min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value, entry: any) => (
                                <span className="text-xs font-medium text-muted-foreground ml-1">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                    <div className="text-center">
                        <div className="text-2xl font-bold tracking-tight">{events.length}</div>
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Events</div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
