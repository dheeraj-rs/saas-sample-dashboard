"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { orgMetrics, orgEvents } from "../../data/org-dashboard-data"
import { Users, Ticket, DollarSign, Calendar, TrendingUp, ArrowRight } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

// Mock Data for Charts
const revenueData = [
    { month: "Jan", revenue: 180000 },
    { month: "Feb", revenue: 220000 },
    { month: "Mar", revenue: 200000 },
    { month: "Apr", revenue: 240000 },
    { month: "May", revenue: 280000 },
    { month: "Jun", revenue: 310000 },
    { month: "Jul", revenue: 290000 },
    { month: "Aug", revenue: 350000 },
    { month: "Sep", revenue: 380000 },
    { month: "Oct", revenue: 420000 },
    { month: "Nov", revenue: 450000 },
    { month: "Dec", revenue: 480000 },
]

const eventTypeData = [
    { name: "Conference", value: 35, fill: "#8b5cf6" }, // Violet 500
    { name: "Summit", value: 25, fill: "#06b6d4" },    // Cyan 500
    { name: "Workshop", value: 20, fill: "#10b981" },  // Emerald 500
    { name: "Meetup", value: 10, fill: "#f59e0b" },    // Amber 500
    { name: "Other", value: 10, fill: "#64748b" },     // Slate 500
]

const ticketSalesData = [
    { day: "Mon", tickets: 120 },
    { day: "Tue", tickets: 150 },
    { day: "Wed", tickets: 180 },
    { day: "Thu", tickets: 220 },
    { day: "Fri", tickets: 280 },
    { day: "Sat", tickets: 350 },
    { day: "Sun", tickets: 190 },
]

const revenueChartConfig = {
    revenue: {
        label: "Revenue",
        color: "#6366f1", // Indigo 500
    },
} satisfies ChartConfig

const ticketSalesConfig = {
    tickets: {
        label: "Tickets",
        color: "#f59e0b", // Amber 500
    },
} satisfies ChartConfig

const eventTypeConfig = {
    conference: {
        label: "Conference",
        color: "#8b5cf6",
    },
    summit: {
        label: "Summit",
        color: "#06b6d4",
    },
    workshop: {
        label: "Workshop",
        color: "#10b981",
    },
    meetup: {
        label: "Meetup",
        color: "#f59e0b",
    },
    other: {
        label: "Other",
        color: "#64748b",
    },
} satisfies ChartConfig

export default function OrgDashboard() {
    // Slice reduced to make room for the new chart
    const recentEvents = orgEvents
        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
        .slice(0, 4)

    return (
        <div className="flex flex-1 flex-col space-y-4 p-4 md:p-8 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500 bg-white dark:bg-slate-900 overflow-hidden group py-0">
                            <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold uppercase tracking-wider group-hover:text-indigo-600 transition-colors">Total Revenue</p>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">${(orgMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
                                    </div>
                                    <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg shrink-0">
                                        <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                                <div className="mt-1 flex items-center text-xs text-muted-foreground font-medium">
                                    <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                                    <span className="text-emerald-600">+20.1%</span>
                                    <span className="ml-1">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900 overflow-hidden group py-0">
                            <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold uppercase tracking-wider group-hover:text-emerald-600 transition-colors">Active Users</p>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">+{orgMetrics.activeUsers.toLocaleString()}</div>
                                    </div>
                                    <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg shrink-0">
                                        <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                                <div className="mt-1 flex items-center text-xs text-muted-foreground font-medium">
                                    <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                                    <span className="text-emerald-600">+12.5%</span>
                                    <span className="ml-1">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500 bg-white dark:bg-slate-900 overflow-hidden group py-0">
                            <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold uppercase tracking-wider group-hover:text-amber-600 transition-colors">Total Tickets</p>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">+{orgMetrics.totalTickets.toLocaleString()}</div>
                                    </div>
                                    <div className="p-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg shrink-0">
                                        <Ticket className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                                <div className="mt-1 flex items-center text-xs text-muted-foreground font-medium">
                                    <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                                    <span className="text-emerald-600">+19%</span>
                                    <span className="ml-1">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle className="text-xl">Revenue Overview</CardTitle>
                            <CardDescription>
                                Monthly revenue performance for the current year.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ChartContainer config={revenueChartConfig} className="aspect-[16/9] w-full h-[300px]">
                                <AreaChart data={revenueData} margin={{ left: 12, right: 12, top: 12 }}>
                                    <defs>
                                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        stroke="#64748b"
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                        stroke="#64748b"
                                    />
                                    <ChartTooltip cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} content={<ChartTooltipContent indicator="dot" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200 shadow-xl" />} />
                                    <Area
                                        dataKey="revenue"
                                        type="monotone"
                                        fill="url(#fillRevenue)"
                                        fillOpacity={0.4}
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: "#6366f1" }}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle className="text-xl">Event Distribution</CardTitle>
                            <CardDescription>Breakdown by event type</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={eventTypeConfig} className="aspect-[16/5] w-full h-[200px]">
                                <BarChart
                                    accessibilityLayer
                                    data={eventTypeData}
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                    }}
                                >
                                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        stroke="#64748b"
                                        fontSize={13}
                                        fontWeight={500}
                                        width={80}
                                    />
                                    <XAxis dataKey="value" type="number" hide />
                                    <ChartTooltip
                                        cursor={{ fill: 'transparent' }}
                                        content={<ChartTooltipContent indicator="dot" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-xl" />}
                                    />
                                    <Bar dataKey="value" layout="vertical" radius={[0, 4, 4, 0]} barSize={24}>
                                        {eventTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-xl">Recent Events</CardTitle>
                            <CardDescription>
                                A list of the most recently created and updated events.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-4">
                                {recentEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                    >
                                        {event.logoUrl ? (
                                            <img
                                                src={event.logoUrl}
                                                alt={event.name}
                                                className="w-10 h-10 rounded-lg object-contain opacity-90"
                                            />
                                        ) : (
                                            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        )}
                                        <div className="flex-1 text-left min-w-0">
                                            <div className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">
                                                {event.name}
                                            </div>
                                            <div className="text-[13px] text-muted-foreground flex items-center gap-3 mt-1">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5 opacity-70" />
                                                    {new Date(event.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Users className="h-3.5 w-3.5 opacity-70" />
                                                    {event.registered}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="transition-opacity">
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* NEW: Ticket Sales Trend Chart */}
                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle className="text-xl">Daily Ticket Trends</CardTitle>
                            <CardDescription>Sales over last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={ticketSalesConfig} className="aspect-[16/7] w-full h-[200px]">
                                <BarChart
                                    accessibilityLayer
                                    data={ticketSalesData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        stroke="#64748b"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={12}
                                        stroke="#64748b"
                                    />
                                    <ChartTooltip
                                        cursor={{ fill: '#f59e0b', opacity: 0.1 }}
                                        content={<ChartTooltipContent indicator="dot" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-xl" />}
                                    />
                                    <Bar dataKey="tickets" fill="var(--color-tickets)" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}