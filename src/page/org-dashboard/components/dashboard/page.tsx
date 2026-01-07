import { OrgOverviewCards } from "./org-overview-cards"
import { OrgRecentActivity } from "./org-recent-activity"
import { OrgRevenueChart } from "./org-revenue-chart"
import orgData from "./data/org-data.json"

export default function OrgDashboard() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                    {/* Top Stats Cards */}
                    <OrgOverviewCards data={orgData.overview} />

                    <div className="grid grid-cols-1 gap-4 px-2 sm:px-4 lg:grid-cols-3 lg:px-6">
                        {/* Revenue Chart - Takes up 2 columns on large screens */}
                        <OrgRevenueChart data={orgData.revenueHistory} />

                        {/* Recent Activity - Takes up 1 column on large screens */}
                        <OrgRecentActivity data={orgData.recentActivity} />
                    </div>
                </div>
            </div>
        </div>
    )
}