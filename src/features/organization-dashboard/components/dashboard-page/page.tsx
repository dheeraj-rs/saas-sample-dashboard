import { ChartAreaInteractive } from "@/features/event-dashboard/components/dashboard-pages/chart-area-interactive"
import { StatsCards } from "@/features/event-dashboard/components/dashboard-pages/stats-cards"
import { RecentEventsCard } from "@/features/event-dashboard/components/dashboard-pages/recent-events-card"
import { EventStatusChart } from "@/features/event-dashboard/components/dashboard-pages/event-status-chart"
import eventsData from "@/features/event-dashboard/data/events-data.json"

export default function OrgDashboard() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Main Layout: Left and Right Columns */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* LEFT SIDE: Stats Cards + Event Registrations Chart */}
                    <div className="flex flex-col gap-6">
                        {/* Stats Cards - Small Height */}
                        <div>
                            <StatsCards events={eventsData} />
                        </div>

                        {/* Event Registrations Chart - Large */}
                        <div className="flex-1">
                            <ChartAreaInteractive events={eventsData} />
                        </div>
                    </div>

                    {/* RIGHT SIDE: Recent Events + Event Status Chart */}
                    <div className="flex flex-col gap-6">
                        {/* Recent Events - Same height as Event Status Chart */}
                        <div className="flex-1">
                            <RecentEventsCard events={eventsData} />
                        </div>

                        {/* Event Status Distribution Chart - Same height as Recent Events */}
                        <div className="flex-1">
                            <EventStatusChart events={eventsData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}