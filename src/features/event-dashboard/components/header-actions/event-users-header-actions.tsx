import * as React from "react"
import {
    IconChevronDown,
    IconFilter,
    IconLayoutColumns,
    IconPlus,
    IconSearch,
    IconX,
} from "@tabler/icons-react"
import type { Table as TableType } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
    table: TableType<z.infer<typeof userSchema>> | null
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

    const hasActiveFilters = statusFilter !== 'all' || roleFilter !== 'all' || departmentFilter !== 'all'

    const clearAllFilters = () => {
        setStatusFilter('all')
        setRoleFilter('all')
        setDepartmentFilter('all')
    }

    return (
        <div className="flex w-full items-center gap-2">
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                        <IconFilter className={`size-4 ${hasActiveFilters ? 'text-blue-500' : ''}`} />
                        <span>Filters</span>
                        <IconChevronDown className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                    <div className="flex items-center justify-between px-2 py-1.5">
                        <DropdownMenuLabel className="p-0">Filter by Status</DropdownMenuLabel>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                onClick={clearAllFilters}
                            >
                                Clear All
                            </Button>
                        )}
                    </div>
                    <div className="px-2 py-1.5">
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="h-8 w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                    <div className="px-2 py-1.5">
                        <Select
                            value={roleFilter}
                            onValueChange={setRoleFilter}
                        >
                            <SelectTrigger className="h-8 w-full">
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
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
                    <div className="px-2 py-1.5">
                        <Select
                            value={departmentFilter}
                            onValueChange={setDepartmentFilter}
                        >
                            <SelectTrigger className="h-8 w-full">
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
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
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
        </div>
    )
}
