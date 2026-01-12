import { useState } from "react"
import type { Table } from "@tanstack/react-table"
import type { z } from "zod"
import usersData from "@/features/org-dashboard/data/users-data.json"
import OrgDashboardLayout from "../../layouts/dashboard-layout"
import { OrgUsersTable, userSchema } from "../../components/dashboard-page/org-users-table"
import { ManageUsersHeaderActions } from "../../components/header-actions/manage-users-header-actions"

export default function ManageUsersPage() {
    const [table, setTable] = useState<Table<z.infer<typeof userSchema>> | null>(null)

    return (
        <OrgDashboardLayout
            headerActions={<ManageUsersHeaderActions table={table} />}
        >
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <OrgUsersTable data={usersData} onTableReady={setTable} />
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
