import { useState } from "react"
import type { Table } from "@tanstack/react-table"
import type { z } from "zod"
import usersData from "@/features/org-dashboard/data/invite-users-data.json"
import OrgDashboardLayout from "../../layouts/dashboard-layout"
import { OrgInviteUsersTable, inviteUserSchema } from "../../components/dashboard-page/org-invite-users-table"
import { InviteUsersHeaderActions } from "../../components/header-actions/invite-users-header-actions"

export default function InviteUsersPage() {
    const [table, setTable] = useState<Table<z.infer<typeof inviteUserSchema>> | null>(null)

    return (
        <OrgDashboardLayout
            headerActions={<InviteUsersHeaderActions table={table} />}
        >
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <OrgInviteUsersTable data={usersData} onTableReady={setTable} />
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
