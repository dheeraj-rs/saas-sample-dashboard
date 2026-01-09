import { OrgOverviewCards } from "./org-overview-cards"
import { OrgRecentActivity } from "./org-recent-activity"
import { OrgRevenueChart } from "./org-revenue-chart"
import eventsData from "@/pages/event-dashboard/data/events-data.json"
import orgData from "../../data/org-data.json"

export default function OrgDashboard() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                    <OrgOverviewCards data={orgData.overview} events={eventsData} />
                    <div className="grid grid-cols-1 gap-4 px-2 sm:px-4 lg:grid-cols-3 lg:px-6">
                        <OrgRevenueChart data={orgData.revenueHistory} />
                        <OrgRecentActivity data={orgData.recentActivity} />
                    </div>
                </div>
            </div>
        </div>
    )
}