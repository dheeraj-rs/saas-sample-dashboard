import { ChartAreaInteractive } from "@/page/event-dashboard/components/dashboard/chart-area-interactive"
import { DataTable } from "@/page/event-dashboard/components/dashboard/data-table"
import { SectionCards } from "@/page/event-dashboard/components/dashboard/section-cards"
import ImportantToast from "../../components/custum-ui/toast/importent-tost"
import data from "./data/data.json"
import EventDashboardLayout from "./layout"

export default function EventDashboardPage() {
    return (
        <EventDashboardLayout>
            <ImportantToast />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <SectionCards />
                        <div className="px-2 sm:px-4 lg:px-6">
                            <ChartAreaInteractive />
                        </div>
                        <DataTable data={data} />
                    </div>
                </div>
            </div>
        </EventDashboardLayout>
    )
}
