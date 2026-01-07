import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Plus, Building2, MapPin, LayoutTemplate, Activity } from "lucide-react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const eventFormSchema = z.object({
    name: z.string().min(2, {
        message: "Event name must be at least 2 characters.",
    }),
    organization: z.string().min(1, {
        message: "Organization name is required.",
    }),
    type: z.string({
        required_error: "Please select an event type.",
    }),
    status: z.string({
        required_error: "Please select a status.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    dateRange: z.object({
        from: z.date({
            required_error: "Start date is required.",
        }),
        to: z.date({
            required_error: "End date is required.",
        }),
    }),
})

type EventFormValues = z.infer<typeof eventFormSchema>

export function CreateEventModal() {
    const [open, setOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const defaultValues: Partial<EventFormValues> = {
        organization: "Conference Prime", // Pre-filled active organization
        status: "draft",
    }

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues,
    })

    function onSubmit(data: EventFormValues) {
        // toast.success("Event created successfully", {
        //     description: `${data.name} has been scheduled.`,
        // })
        console.log("Form submitted:", data)
        setIsSuccess(true)
    }

    const handleClose = () => {
        setOpen(false)
        setIsSuccess(false)
        form.reset()
    }

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            handleClose()
        } else {
            setOpen(value)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 size-4" />
                    Create New Event
                </Button>
            </DialogTrigger>
            <DialogContent className={isSuccess ? "sm:max-w-[425px]" : "sm:max-w-[600px]"}>
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-8 w-8 text-green-600 dark:text-green-400"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-semibold tracking-tight">Success!</h2>
                        <p className="mb-6 max-w-[350px] text-sm text-muted-foreground">
                            Your event <span className="font-medium text-foreground">"{form.getValues("name")}"</span> has been created successfully.
                        </p>
                        <Button onClick={handleClose} size="sm" className="min-w-[120px]">
                            OK
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Create New Event</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a new event for your organization.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span>
                                Creating event for <span className="font-medium text-foreground">Conference Prime</span>
                            </span>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">Event Details</h3>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Event Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Annual Tech Summit" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Event Type</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <div className="flex items-center gap-2">
                                                                        <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                                                                        <SelectValue placeholder="Select type" />
                                                                    </div>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="conference">Conference</SelectItem>
                                                                <SelectItem value="summit">Summit</SelectItem>
                                                                <SelectItem value="workshop">Workshop</SelectItem>
                                                                <SelectItem value="symposium">Symposium</SelectItem>
                                                                <SelectItem value="expo">Expo</SelectItem>
                                                                <SelectItem value="forum">Forum</SelectItem>
                                                                <SelectItem value="seminar">Seminar</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <div className="flex items-center gap-2">
                                                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                                                        <SelectValue placeholder="Select status" />
                                                                    </div>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="draft">Draft</SelectItem>
                                                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                                                <SelectItem value="active">Active</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">Schedule & Location</h3>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input className="pl-9" placeholder="City, Country or Venue" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="dateRange"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date Range</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value?.from ? (
                                                                        field.value.to ? (
                                                                            <>
                                                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                                                {format(field.value.to, "LLL dd, y")}
                                                                            </>
                                                                        ) : (
                                                                            format(field.value.from, "LLL dd, y")
                                                                        )
                                                                    ) : (
                                                                        <span>Pick a date range</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                initialFocus
                                                                mode="range"
                                                                defaultMonth={field.value?.from}
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                numberOfMonths={2}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create Event</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
