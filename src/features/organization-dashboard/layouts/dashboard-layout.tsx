import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { OrgSidebar } from "../components/org-layout/org-sidebar"
import { OrgHeader } from "../components/org-layout/org-header"
import ImportantToast from "@/components/common/toast/important-toast"

export default function OrgDashboardLayout({
    children,
    headerActions
}: {
    children: React.ReactNode
    headerActions?: React.ReactNode
}) {
    return (
        <DashboardLayout
            sidebar={<OrgSidebar />}
            header={<OrgHeader actions={headerActions} />}
        >
            <ImportantToast />
            {children}
        </DashboardLayout>
    )
}
