"use client"

import EventDashboardLayout from "../../layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Ticket, DollarSign, Calendar, TrendingUp, ArrowRight, LayoutDashboard, FileText, MessageSquare, Mic, Gamepad2, Globe, Settings, ClipboardList, PenTool, BarChart3, Lock, Share2 } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- Mock Data for Single Event ---

const eventMetrics = {
    totalRevenue: 125400,
    registeredAttendees: 845,
    ticketsSold: 812
}

const registrationData = [
    { date: "Jan 01", count: 12 },
    { date: "Jan 03", count: 25 },
    { date: "Jan 05", count: 45 },
    { date: "Jan 07", count: 32 },
    { date: "Jan 09", count: 56 },
    { date: "Jan 11", count: 78 },
    { date: "Jan 13", count: 95 },
    { date: "Jan 15", count: 120 },
    { date: "Jan 17", count: 145 },
    { date: "Jan 19", count: 110 },
]

const ticketTypeData = [
    { name: "General", value: 450, fill: "#8b5cf6" },
    { name: "VIP", value: 120, fill: "#f59e0b" },
    { name: "Student", value: 242, fill: "#10b981" },
]

const dailyTicketSalesData = [
    { day: "Mon", tickets: 24 },
    { day: "Tue", tickets: 35 },
    { day: "Wed", tickets: 42 },
    { day: "Thu", tickets: 55 },
    { day: "Fri", tickets: 68 },
    { day: "Sat", tickets: 85 },
    { day: "Sun", tickets: 40 },
]

const recentRegistrations = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", type: "VIP", time: "2 mins ago" },
    { id: 2, name: "Michael Chen", email: "m.chen@tech.co", type: "General", time: "15 mins ago" },
    { id: 3, name: "Emma Wilson", email: "emma.w@univ.edu", type: "Student", time: "1 hour ago" },
    { id: 4, name: "James Rodriguez", email: "j.rod@design.io", type: "General", time: "2 hours ago" },
]

// --- Chart Configs ---

const registrationChartConfig = {
    registrations: {
        label: "Registrations",
        color: "#6366f1", // Indigo 500
    },
} satisfies ChartConfig

const ticketSalesConfig = {
    tickets: {
        label: "Sales",
        color: "#f59e0b", // Amber 500
    },
} satisfies ChartConfig

const ticketTypeConfig = {
    general: { label: "General", color: "#8b5cf6" },
    vip: { label: "VIP", color: "#f59e0b" },
    student: { label: "Student", color: "#10b981" },
} satisfies ChartConfig

export default function EventDashboardPage() {
    return (
        <EventDashboardLayout>
            <div className="flex flex-1 flex-col space-y-4 p-4 md:p-8 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">

                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Stats Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden group py-0">
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold uppercase tracking-wider group-hover:text-indigo-600 transition-colors">Event Revenue</p>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">${(eventMetrics.totalRevenue / 1000).toFixed(1)}k</div>
                                        </div>
                                        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg shrink-0">
                                            <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                    </div>
                                    {/* <div className="mt-1 flex items-center text-xs text-muted-foreground font-medium">
                                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                                        <span className="text-emerald-600">+12%</span>
                                        <span className="ml-1">vs target</span>
                                    </div> */}
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden group py-0">
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold uppercase tracking-wider group-hover:text-emerald-600 transition-colors">Attendees</p>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{eventMetrics.registeredAttendees}</div>
                                        </div>
                                        <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg shrink-0">
                                            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                    </div>
                                    {/* <div className="mt-1 flex items-center text-xs text-muted-foreground font-medium">
                                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                                        <span className="text-emerald-600">+45</span>
                                        <span className="ml-1">this week</span>
                                    </div> */}
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden group py-0">
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold uppercase tracking-wider group-hover:text-amber-600 transition-colors">Tickets Sold</p>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{eventMetrics.ticketsSold}</div>
                                        </div>
                                        <div className="p-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg shrink-0">
                                            <Ticket className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                    </div>
                                    {/* <div className="mt-1 flex items-center text-xs text-muted-foreground font-medium">
                                        <span className="text-emerald-600">96%</span>
                                        <span className="ml-1">conversion rate</span>
                                    </div> */}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Registration Trends Chart */}
                        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="text-xl">Registration Trends</CardTitle>
                                <CardDescription>Daily attendee registration growth</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ChartContainer config={registrationChartConfig} className="aspect-[16/9] w-full h-[300px]">
                                    <AreaChart data={registrationData} margin={{ left: 12, right: 12, top: 12 }}>
                                        <defs>
                                            <linearGradient id="fillRegistrations" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            stroke="#64748b"
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            stroke="#64748b"
                                        />
                                        <ChartTooltip cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} content={<ChartTooltipContent indicator="dot" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200 shadow-xl" />} />
                                        <Area
                                            dataKey="count"
                                            type="monotone"
                                            fill="url(#fillRegistrations)"
                                            fillOpacity={0.4}
                                            stroke="#6366f1"
                                            strokeWidth={3}
                                            activeDot={{ r: 6, strokeWidth: 0, fill: "#6366f1" }}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Ticket Types Breakdown */}
                        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="text-xl">Ticket Breakdown</CardTitle>
                                <CardDescription>Distribution by ticket category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={ticketTypeConfig} className="aspect-[16/5] w-full h-[200px]">
                                    <BarChart
                                        accessibilityLayer
                                        data={ticketTypeData}
                                        layout="vertical"
                                        margin={{ left: 0 }}
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
                                            {ticketTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Management Tools List */}
                        {/* Recent Registrations List */}
                        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-xl">Recent Registrations</CardTitle>
                                <CardDescription>Latest attendees to sign up</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="space-y-4">
                                    {recentRegistrations.map((attendee) => (
                                        <div
                                            key={attendee.id}
                                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                                {attendee.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">
                                                    {attendee.name}
                                                </div>
                                                <div className="text-[12px] text-muted-foreground truncate">
                                                    {attendee.email}
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${attendee.type === 'VIP'
                                                    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'
                                                    : attendee.type === 'Student'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
                                                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                                    }`}>
                                                    {attendee.type}
                                                </span>
                                                <div className="text-[10px] text-muted-foreground mt-1">
                                                    {attendee.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Daily Ticket Sales Chart */}
                        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="text-xl">Daily Sales</CardTitle>
                                <CardDescription>Recent ticket sales activity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={ticketSalesConfig} className="aspect-[16/8] w-full h-[200px]">
                                    <BarChart
                                        accessibilityLayer
                                        data={dailyTicketSalesData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                                        <Bar dataKey="tickets" fill="var(--color-tickets)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </EventDashboardLayout>
    )
}
