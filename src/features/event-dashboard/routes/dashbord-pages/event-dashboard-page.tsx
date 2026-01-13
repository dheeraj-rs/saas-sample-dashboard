import { ChartAreaInteractive } from "../../components/dashboard-pages/chart-area-interactive"
import { StatsCards } from "../../components/dashboard-pages/stats-cards"
import { RecentEventsCard } from "../../components/dashboard-pages/recent-events-card"
import { EventStatusChart } from "../../components/dashboard-pages/event-status-chart"
import data from "../../data/events-data.json"
import EventDashboardLayout from "../../layouts/dashboard-layout"

export default function EventDashboardPage() {
    return (
        <EventDashboardLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
                    {/* Main Layout: Left and Right Columns */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* LEFT SIDE: Stats Cards + Event Registrations Chart */}
                        <div className="flex flex-col gap-6">
                            {/* Stats Cards - Small Height */}
                            <div>
                                <StatsCards events={data} />
                            </div>

                            {/* Event Registrations Chart - Large */}
                            <div className="flex-1">
                                <ChartAreaInteractive events={data} />
                            </div>
                        </div>

                        {/* RIGHT SIDE: Recent Events + Event Status Chart */}
                        <div className="flex flex-col gap-6">
                            {/* Recent Events - Same height as Event Status Chart */}
                            <div className="flex-1">
                                <RecentEventsCard events={data} />
                            </div>

                            {/* Event Status Distribution Chart - Same height as Recent Events */}
                            <div className="flex-1">
                                <EventStatusChart events={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EventDashboardLayout>
    )
}
