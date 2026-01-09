import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { OrgSidebar } from "@/pages/org-dashboard/components/org-layout/org-sidebar"
import { OrgHeader } from "@/pages/org-dashboard/components/org-layout/org-header"
import ImportantToast from "@/components/custum-ui/toast/important-toast"

export default function OrgDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout
            sidebar={<OrgSidebar />}
            header={<OrgHeader />}
        >
            <ImportantToast />
            {children}
        </DashboardLayout>
    )
}
