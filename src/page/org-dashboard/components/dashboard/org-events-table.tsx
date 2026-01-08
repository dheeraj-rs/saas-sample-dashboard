import * as React from "react"
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconCircleCheckFilled,
    IconEdit,
    IconLayoutColumns,
    IconLayoutGrid,
    IconList,
    IconLoader,
    IconPlus,
    IconTrendingUp,
    IconCalendar,
    IconMapPin,
    IconUsers,
    IconExternalLink,
    IconDotsVertical,

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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
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
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { CreateEventModal } from "../modals/create-event-modal"

export const schema = z.object({
    id: z.string(),
    name: z.string(),
    organization_name: z.string(),
    event_type: z.string(),
    status: z.string(),
    active_domain: z.string().optional(),
    registered: z.number(),
    description: z.string().optional(),
    location: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
})

const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
            return <TableCellViewer item={row.original} />
        },
        enableHiding: false,
    },
    {
        accessorKey: "organization_name",
        header: "Organization",
        cell: ({ row }) => (
            <div className="truncate font-medium">
                {row.original.organization_name}
            </div>
        ),
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize text-muted-foreground px-1.5 gap-1">
                {row.original.status === "active" || row.original.status === "upcoming" ? (
                    <IconCircleCheckFilled className="size-3 fill-green-500 dark:fill-green-400" />
                ) : (
                    <IconLoader className="size-3" />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "active_domain",
        header: "Active Domain",
        cell: ({ row }) => (
            <div className="max-w-[200px] truncate">
                {row.original.active_domain ? (
                    <a href={row.original.active_domain} target="_blank" rel="noreferrer" className="hover:underline">
                        {row.original.active_domain}
                    </a>
                ) : (
                    "-"
                )}
            </div>
        ),
    },
    {
        accessorKey: "start_date",
        header: "Date",
        cell: ({ row }) => (
            <div>
                {new Date(row.original.start_date).toLocaleDateString()} - {new Date(row.original.end_date).toLocaleDateString()}
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
                        className="data-[state=open]:bg-muted h-6 text-xs"
                    >
                        <IconEdit className="size-3" />
                        Actions
                        <IconChevronDown className="size-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

export function OrgEventsTable({
    data: initialData,
}: {
    data: z.infer<typeof schema>[]
}) {
    const [data] = React.useState(() => initialData)
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [view, setView] = React.useState<"table" | "card">("table")
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

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
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-6"
        >
            <div className="flex flex-col gap-3 px-4 lg:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                        <Input
                            placeholder="Search events..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="h-9 w-full max-w-[250px]"
                        />
                        <Select
                            value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                            onValueChange={(value) =>
                                table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
                            }
                        >
                            <SelectTrigger className="h-9 w-[150px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="past">Past</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex bg-muted/50 p-1 rounded-lg border">
                            <Button
                                variant={view === "table" ? "secondary" : "ghost"}
                                size="sm"
                                className="h-7 px-2"
                                onClick={() => setView("table")}
                            >
                                <IconList className="size-4 mr-1.5" />
                                <span className="text-xs font-medium">List</span>
                            </Button>
                            <Button
                                variant={view === "card" ? "secondary" : "ghost"}
                                size="sm"
                                className="h-7 px-2"
                                onClick={() => setView("card")}
                            >
                                <IconLayoutGrid className="size-4 mr-1.5" />
                                <span className="text-xs font-medium">Card</span>
                            </Button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9">
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
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <CreateEventModal
                            trigger={
                                <Button variant="outline" className="h-9">
                                    <IconPlus />
                                    <span className="hidden lg:inline">Create Event</span>
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>

            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                {view === "table" ? (
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
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Card key={row.id} className="group relative flex flex-col overflow-hidden transition-all hover:shadow-md">
                                    <CardHeader className="p-3 pb-1 space-y-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="space-y-1 min-w-0 flex-1">
                                                <CardTitle className="line-clamp-1 text-sm font-semibold leading-tight" title={row.original.name}>
                                                    {row.original.name}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="truncate max-w-[140px]" title={row.original.organization_name}>{row.original.organization_name}</span>
                                                    <span className="h-1 w-1 rounded-full bg-border shrink-0" />
                                                    <span className="shrink-0">{row.original.event_type}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-0 -mr-2 -mt-1 shrink-0">
                                                {row.original.active_domain && (
                                                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary" asChild>
                                                        <a href={row.original.active_domain} target="_blank" rel="noreferrer" title="Visit Site">
                                                            <IconExternalLink className="size-4" />
                                                        </a>
                                                    </Button>
                                                )}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                                                            <IconDotsVertical className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                                                        <DropdownMenuItem>Favorite</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-3 pt-3">
                                        <div className="flex items-end justify-between text-xs text-muted-foreground">
                                            <div className="flex flex-col gap-2 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <IconCalendar className="size-3.5 shrink-0" />
                                                    <span className="truncate">{new Date(row.original.start_date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <IconMapPin className="size-3.5 shrink-0" />
                                                    <span className="truncate max-w-[150px]" title={row.original.location}>{row.original.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md mb-0.5">
                                                <IconUsers className="size-3.5 shrink-0" />
                                                <span className="font-medium">{row.original.registered}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground border rounded-lg border-dashed">
                                No results found.
                            </div>
                        )}
                    </div>
                )}

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
            <TabsContent
                value="past-performance"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent
                value="focus-documents"
                className="flex flex-col px-4 lg:px-6"
            >
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs >
    )
}

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
    const isMobile = useIsMobile()

    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {item.name}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.name}</DrawerTitle>
                    <DrawerDescription>
                        {item.description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    {!isMobile && (
                        <>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 0,
                                        right: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        hide
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area
                                        dataKey="mobile"
                                        type="natural"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.6}
                                        stroke="var(--color-mobile)"
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.4}
                                        stroke="var(--color-desktop)"
                                        stackId="a"
                                    />
                                </AreaChart>
                            </ChartContainer>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="flex gap-2 leading-none font-medium">
                                    Trending up by 5.2% this month{" "}
                                    <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    Showing total visitors for the last 6 months.
                                </div>
                            </div>
                            <Separator />
                        </>
                    )}
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={item.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="event_type">Type</Label>
                                <Input id="event_type" defaultValue={item.event_type} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Input id="status" defaultValue={item.status} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="organization">Organization</Label>
                            <Input id="organization" defaultValue={item.organization_name} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={item.location} />
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
