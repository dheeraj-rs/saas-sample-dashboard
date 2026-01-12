import * as React from "react"
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
import type { z } from "zod"
import type { userSchema } from "../../routes/event-create-pages/users-list-page"
import { useEventUsersFilterStore } from "@/store/event-users-filter.store"

interface EventUsersHeaderActionsProps {
    table: Table<z.infer<typeof userSchema>> | null
}

export function EventUsersHeaderActions({ table }: EventUsersHeaderActionsProps) {
    const {
        searchValue,
        statusFilter,
        roleFilter,
        departmentFilter,
        columnVisibility,
        setSearchValue,
        setStatusFilter,
        setRoleFilter,
        setDepartmentFilter,
        setColumnVisibility
    } = useEventUsersFilterStore()

    return (
        <>
            <div className="relative">
                <IconSearch className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="h-8 w-full max-w-[200px] pl-8 pr-8"
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
                <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
            >
                <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
            >
                <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
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
            <Button variant="outline" size="sm" className="h-8">
                <IconPlus />
                <span className="hidden lg:inline">Add User</span>
            </Button>
        </>
    )
}
