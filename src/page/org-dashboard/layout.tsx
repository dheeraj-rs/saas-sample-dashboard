import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { OrgSidebar } from "@/page/org-dashboard/components/layout/org-sidebar"
import { OrgHeader } from "@/page/org-dashboard/components/layout/org-header"

export default function OrgDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout
            sidebar={<OrgSidebar />}
            header={<OrgHeader />}
        >
            {children}
        </DashboardLayout>
    )
}
