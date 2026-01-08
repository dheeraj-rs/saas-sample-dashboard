import { OrgUsersTable } from "@/page/org-dashboard/components/dashboard/org-users-table"
import usersData from "@/page/event-dashboard/data/users-data.json"
import OrgDashboardLayout from "../../layout"

export default function ManageUsersPage() {
    return (
        <OrgDashboardLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <OrgUsersTable data={usersData} />
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
