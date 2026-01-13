import {
    IconChevronDown,
    IconLayoutColumns,
    IconPlus,
    IconSearch,
    IconX,
} from "@tabler/icons-react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InviteUserModal } from "../modals/invite-user-modal"
import type { z } from "zod"
import type { inviteUserSchema } from "../dashboard-page/org-invite-users-table"
import { useInviteUsersFilterStore } from "@/store/invite-users-filter.store"

interface InviteUsersHeaderActionsProps {
    table: Table<z.infer<typeof inviteUserSchema>> | null
}

export function InviteUsersHeaderActions({ table }: InviteUsersHeaderActionsProps) {
    const { searchValue, statusFilter, columnVisibility, setSearchValue, setStatusFilter, setColumnVisibility } = useInviteUsersFilterStore()

    return (
        <>
            <div className="relative">
                <IconSearch className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="h-8 w-full max-w-[300px] pl-8 pr-8"
                />
                {searchValue && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 size-8 -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setSearchValue("")}
                    >
                        <IconX className="size-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                )}
            </div>
            <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
            >
                <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="invite_sent">Invite Sent</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
            {table && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                            <IconLayoutColumns />
                            <span className="hidden lg:inline">Customize Columns</span>
                            <span className="lg:hidden">Columns</span>
                            <IconChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) =>
                                    typeof column.accessorFn !== "undefined" &&
                                    column.getCanHide()
                            )
                            .map((column) => {
                                const isVisible = columnVisibility[column.id] !== false
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={isVisible}
                                        onCheckedChange={(value) => {
                                            // Update store directly
                                            const newVisibility = { ...columnVisibility, [column.id]: !!value }
                                            setColumnVisibility(newVisibility)
                                        }}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <InviteUserModal
                trigger={
                    <Button size="sm" className="h-8">
                        <IconPlus className="size-4" />
                        <span className="hidden sm:inline">Invite User</span>
                    </Button>
                }
            />
        </>
    )
}
