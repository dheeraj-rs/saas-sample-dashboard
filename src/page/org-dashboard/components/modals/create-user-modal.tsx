import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, User, Mail, Building, Phone, Trophy, Activity } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const userFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    role: z.string({
        required_error: "Please select a role.",
    }),
    status: z.string({
        required_error: "Please select a status.",
    }),
    department: z.string({
        required_error: "Please select a department.",
    }),
    phone: z.string().optional(),
})

type UserFormValues = z.infer<typeof userFormSchema>

export function CreateUserModal({ trigger }: { trigger?: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const defaultValues: Partial<UserFormValues> = {
        status: "active",
    }

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues,
    })

    function onSubmit(data: UserFormValues) {
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
                {trigger ? (
                    trigger
                ) : (
                    <Button>
                        <Plus className="mr-2 size-4" />
                        Add User
                    </Button>
                )}
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
                            User <span className="font-medium text-foreground">"{form.getValues("name")}"</span> has been added successfully.
                        </p>
                        <Button onClick={handleClose} size="sm" className="min-w-[120px]">
                            OK
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                                Enter user details to add them to your organization.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input className="pl-9" placeholder="John Doe" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input className="pl-9" placeholder="john@example.com" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="role"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Role <span className="text-destructive">*</span></FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <div className="flex items-center gap-2">
                                                                        <Trophy className="h-4 w-4 text-muted-foreground" />
                                                                        <SelectValue placeholder="Select role" />
                                                                    </div>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Admin">Admin</SelectItem>
                                                                <SelectItem value="Manager">Manager</SelectItem>
                                                                <SelectItem value="Developer">Developer</SelectItem>
                                                                <SelectItem value="Designer">Designer</SelectItem>
                                                                <SelectItem value="Analyst">Analyst</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="department"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Department <span className="text-destructive">*</span></FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <div className="flex items-center gap-2">
                                                                        <Building className="h-4 w-4 text-muted-foreground" />
                                                                        <SelectValue placeholder="Select dept" />
                                                                    </div>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
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
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status <span className="text-destructive">*</span></FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <div className="flex items-center gap-2">
                                                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                                                        <SelectValue placeholder="Select status" />
                                                                    </div>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="active">Active</SelectItem>
                                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                                <SelectItem value="pending">Pending</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone (Optional)</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input className="pl-9" placeholder="+1 (555) 000-0000" {...field} />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        <Plus className="mr-2 size-4" />
                                        Add User
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
