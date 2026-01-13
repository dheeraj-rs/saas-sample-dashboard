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
        <Card className="h-full flex flex-col shadow-sm p-3">
            <div className="mb-2 px-1 font-semibold text-base">
                Event Status Distribution
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
                <div className="flex-1 min-h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={65}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: "11px", marginTop: "5px" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2">
                    {chartData.map((item) => (
                        <div key={item.name} className="flex items-center gap-1.5">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <div className="text-[10px]">
                                <span className="font-medium">{item.value}</span>{" "}
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
