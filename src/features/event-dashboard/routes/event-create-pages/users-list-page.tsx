import * as React from "react"
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconCircleCheckFilled,
    IconLayoutColumns,
    IconLoader,
    IconPlus,
} from "@tabler/icons-react"
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    type Table as TableType,
} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import data from "../../data/users-data.json"
import EventDashboardLayout from "../../layouts/dashboard-layout"
import { useEventUsersFilterStore } from "@/store/event-users-filter.store"
import { EventUsersHeaderActions } from "../../components/header-actions/event-users-header-actions"

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    status: z.string(),
    department: z.string(),
    joined_date: z.string(),
    phone: z.string(),
})

const columns: ColumnDef<z.infer<typeof userSchema>>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <UserCellViewer user={row.original} />
        },
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div>
                {row.original.email}
            </div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize px-1.5">
                {row.original.role}
            </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize text-muted-foreground px-1.5 gap-1">
                {row.original.status === "active" ? (
                    <IconCircleCheckFilled className="size-3 fill-green-500 dark:fill-green-400" />
                ) : (
                    <IconLoader className="size-3" />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
            <div className="font-medium">
                {row.original.department}
            </div>
        ),
    },
    {
        accessorKey: "joined_date",
        header: "Joined Date",
        cell: ({ row }) => (
            <div>
                {new Date(row.original.joined_date).toLocaleDateString()}
            </div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="data-[state=open]:bg-muted h-6 text-xs border-primary"
                    >
                        Actions
                        <IconChevronDown className="size-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Deactivate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

function UserCellViewer({ user }: { user: z.infer<typeof userSchema> }) {
    const isMobile = useIsMobile()

    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {user.name}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{user.name}</DrawerTitle>
                    <DrawerDescription>
                        {user.email}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" defaultValue={user.role} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Input id="status" defaultValue={user.status} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="department">Department</Label>
                            <Input id="department" defaultValue={user.department} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" defaultValue={user.phone} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="joined_date">Joined Date</Label>
                            <Input id="joined_date" type="date" defaultValue={user.joined_date} />
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button>Save Changes</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function UsersDataTable({
    onTableReady,
}: {
    onTableReady?: (table: ReturnType<typeof useReactTable<z.infer<typeof userSchema>>>) => void
}) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    // Get filter values from Zustand store
    const { searchValue, statusFilter, roleFilter, departmentFilter, columnVisibility, setColumnVisibility } = useEventUsersFilterStore()

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: (updater) => {
            const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater
            setColumnVisibility(newVisibility)
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    // Sync Zustand store filters with table
    React.useEffect(() => {
        table.getColumn("name")?.setFilterValue(searchValue)
    }, [searchValue, table])

    React.useEffect(() => {
        table.getColumn("status")?.setFilterValue(statusFilter === "all" ? "" : statusFilter)
    }, [statusFilter, table])

    React.useEffect(() => {
        table.getColumn("role")?.setFilterValue(roleFilter === "all" ? "" : roleFilter)
    }, [roleFilter, table])

    React.useEffect(() => {
        table.getColumn("department")?.setFilterValue(departmentFilter === "all" ? "" : departmentFilter)
    }, [departmentFilter, table])

    React.useEffect(() => {
        if (onTableReady) {
            onTableReady(table)
        }
    }, [table, onTableReady])

    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-6"
        >
            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value))
                                }}
                            >
                                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                    <SelectValue
                                        placeholder={table.getState().pagination.pageSize}
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <IconChevronsLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <IconChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <IconChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <IconChevronsRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default function UsersListPage() {
    const [table, setTable] = React.useState<TableType<z.infer<typeof userSchema>> | null>(null)

    return (
        <EventDashboardLayout
            headerActions={<EventUsersHeaderActions table={table} />}
        >
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <UsersDataTable onTableReady={setTable} />
                    </div>
                </div>
            </div>
        </EventDashboardLayout>
    )
}
