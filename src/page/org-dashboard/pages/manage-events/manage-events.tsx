import { OrgEventsTable } from "@/page/org-dashboard/components/dashboard/org-events-table"
import eventsData from "@/page/event-dashboard/data/events-data.json"
import OrgDashboardLayout from "../../layout"

export default function ManageEventsPage() {
    return (
        <OrgDashboardLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6">
                            <div>
                                <h1 className="text-2xl font-bold">Manage Events</h1>
                                <p className="text-muted-foreground">View and manage all organization events</p>
                            </div>
                        </div>
                        <OrgEventsTable data={eventsData} />
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
