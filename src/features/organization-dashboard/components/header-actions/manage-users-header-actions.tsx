import * as React from "react"
import {
    IconChevronDown,
    IconLayoutColumns,
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
import type { z } from "zod"
import type { userSchema } from "../dashboard-page/org-users-table"
import { useManageUsersFilterStore } from "@/store/manage-users-filter.store"

interface ManageUsersHeaderActionsProps {
    table: Table<z.infer<typeof userSchema>> | null
}

export function ManageUsersHeaderActions({ table }: ManageUsersHeaderActionsProps) {
    const { searchValue, statusFilter, columnVisibility, setSearchValue, setStatusFilter, setColumnVisibility } = useManageUsersFilterStore()

    return (
        <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <IconSearch className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="h-9 w-full max-w-[300px] pl-8 pr-8"
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
                    <SelectTrigger className="h-9 w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {table && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 ml-auto">
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
                                // Read visibility from store, defaulting to true if not set
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
        </div>
    )
}
