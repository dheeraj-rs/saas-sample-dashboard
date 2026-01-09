import { UnderDevelopment } from "@/components/common/reusing-pages/under-development"
import EventDashboardLayout from "../../layouts/dashboard-layout"

export default function PriceSlabsPage() {
    return (
        <EventDashboardLayout>
            <div className="flex h-full w-full flex-col items-center justify-center min-h-[calc(100vh-100px)]">
                <UnderDevelopment pageName="Price Slabs" />
            </div>
        </EventDashboardLayout>
    )
}
