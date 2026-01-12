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
    IconMailForward,
    IconX,
    IconClock,
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
} from "@tanstack/react-table"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
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
import { InviteUserModal } from "../modals/invite-user-modal"
import { ResendInviteModal } from "../modals/resend-invite-modal"
import { CancelInviteModal } from "../modals/cancel-invite-modal"
import { useInviteUsersFilterStore } from "@/store/invite-users-filter.store"

export const inviteUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    status: z.string(),
    invite_sent_date: z.string().optional(),
    invite_expiring_date: z.string().optional(),
})

const columns: ColumnDef<z.infer<typeof inviteUserSchema>>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
            let icon = <IconLoader className="size-3" />;
            let className = "capitalize text-muted-foreground px-1.5 gap-1";

            if (status === "active") {
                variant = "outline";
                icon = <IconCircleCheckFilled className="size-3 fill-green-500 dark:fill-green-400" />;
            } else if (status === "invite_sent") {
                variant = "outline";
                className = "capitalize text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 px-1.5 gap-1";
                icon = <IconMailForward className="size-3" />;
            } else if (status === "rejected") {
                variant = "outline";
                className = "capitalize text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 px-1.5 gap-1";
                icon = <IconX className="size-3" />;
            } else if (status === "pending") {
                variant = "outline";
                className = "capitalize text-yellow-600 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 px-1.5 gap-1";
                icon = <IconClock className="size-3" />;
            }

            return (
                <Badge variant={variant} className={className}>
                    {icon}
                    {status.replace("_", " ")}
                </Badge>
            );
        },
    },
    {
        accessorKey: "invite_sent_date",
        header: "Invite Sent Date",
        cell: ({ row }) => (
            <div>
                {row.original.invite_sent_date ? new Date(row.original.invite_sent_date).toLocaleDateString() : "-"}
            </div>
        ),
    },
    {
        accessorKey: "invite_expiring_date",
        header: "Invite Expiring Date",
        cell: ({ row }) => (
            <div>
                {row.original.invite_expiring_date ? new Date(row.original.invite_expiring_date).toLocaleDateString() : "-"}
            </div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row, table }) => <ActionsCell row={row} table={table} />,
    },
]

function ActionsCell({ row, table }: { row: any, table: any }) {
    const meta = table.options.meta as { onResend: (user: any) => void, onCancel: (user: any) => void }

    return (
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
                <DropdownMenuItem onClick={() => meta?.onResend(row.original)}>
                    Resend Invite
                </DropdownMenuItem>
                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => meta?.onCancel(row.original)}
                >
                    Cancel Invite
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function UserCellViewer({ user }: { user: z.infer<typeof inviteUserSchema> }) {
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
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="status">Status</Label>
                            <Input id="status" defaultValue={user.status} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="invite_sent">Invite Sent</Label>
                            <Input id="invite_sent" defaultValue={user.invite_sent_date || "-"} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="invite_expiry">Invite Expires</Label>
                            <Input id="invite_expiry" defaultValue={user.invite_expiring_date || "-"} />
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

export function OrgInviteUsersTable({
    data: initialData,
    onTableReady,
}: {
    data: z.infer<typeof inviteUserSchema>[]
    onTableReady?: (table: ReturnType<typeof useReactTable<z.infer<typeof inviteUserSchema>>>) => void
}) {
    const [data] = React.useState(() => initialData)
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
    const { searchValue, statusFilter, columnVisibility, setColumnVisibility } = useInviteUsersFilterStore()

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
            console.log('Column visibility changing:', { old: columnVisibility, new: newVisibility })
            setColumnVisibility(newVisibility)
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        meta: {
            onResend: (user: any) => setResendUser(user),
            onCancel: (user: any) => setCancelUser(user),
        }
    })

    const [resendUser, setResendUser] = React.useState<z.infer<typeof inviteUserSchema> | null>(null)
    const [cancelUser, setCancelUser] = React.useState<z.infer<typeof inviteUserSchema> | null>(null)

    // Sync Zustand store filters with table
    React.useEffect(() => {
        table.getColumn("name")?.setFilterValue(searchValue)
    }, [searchValue, table])

    React.useEffect(() => {
        table.getColumn("status")?.setFilterValue(statusFilter === "all" ? "" : statusFilter)
    }, [statusFilter, table])

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

            <ResendInviteModal
                user={resendUser}
                open={!!resendUser}
                onOpenChange={(open) => !open && setResendUser(null)}
            />

            <CancelInviteModal
                user={cancelUser}
                open={!!cancelUser}
                onOpenChange={(open) => !open && setCancelUser(null)}
            />
        </Tabs>
    )
}
