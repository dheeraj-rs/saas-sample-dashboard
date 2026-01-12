import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Upload, HelpCircle, Camera } from "lucide-react"
import { toast } from "sonner"

import { useAuthStore } from "@/features/auth/store/auth.store"
import * as authService from "@/features/auth/services/auth.service"
import OrgDashboardLayout from "../../layouts/dashboard-layout"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
})

const passwordFormSchema = z.object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
})

export default function ProfilePage() {
    const { user, token, setUser } = useAuthStore()
    const [isProfileLoading, setIsProfileLoading] = useState(false)
    const [isSecurityLoading, setIsSecurityLoading] = useState(false)

    // Profile Form
    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user?.name || "",
        },
    })

    // Password Form
    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    })

    if (!user) return null

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const onProfileSubmit = async (data: z.infer<typeof profileFormSchema>) => {
        setIsProfileLoading(true)
        try {
            const response = await authService.updateProfile({ name: data.name })
            if (response.status === "success" && token) {
                setUser(response.data.user, token)
                toast.success("Profile details updated successfully")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile")
        } finally {
            setIsProfileLoading(false)
        }
    }

    const onPasswordSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
        setIsSecurityLoading(true)
        try {
            const response = await authService.changePassword({
                current_password: data.current_password,
                password: data.password,
                password_confirmation: data.password_confirmation
            })
            if (response.status === "success") {
                toast.success(response.data.message)
                passwordForm.reset()
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to change password")
        } finally {
            setIsSecurityLoading(false)
        }
    }

    const handleFileUpload = (_e: React.ChangeEvent<HTMLInputElement>) => {
        toast.info("Upload functionality coming soon", {
            description: "Drag and drop support will be added in the next update."
        })
    }

    return (
        <OrgDashboardLayout>
            <div className="p-6 space-y-6">
                {/* <div>
                    <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your personal information and security preferences</p>
                </div> */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card className="h-fit">
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-sm">Personal Info</h3>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Unique details used for identification.</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Update your display name. Email is managed by your organization.
                                            </p>
                                        </div>

                                        <FormField
                                            control={profileForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Display Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your display name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                value={user.email}
                                                disabled
                                                className="bg-muted"
                                            />
                                            <p className="text-[0.8rem] text-muted-foreground">
                                                Contact your administrator to change your email address.
                                            </p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-sm">Profile Picture</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                This is where people will see your actual face.
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-6">
                                            <div className="relative group cursor-pointer">
                                                <Avatar className="h-24 w-24 border rounded-full shrink-0">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback className="text-2xl bg-muted">
                                                        {getInitials(user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Camera className="h-6 w-6 text-white" />
                                                </div>
                                                <Input
                                                    type="file"
                                                    accept="image/svg+xml,image/jpeg,image/png"
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>

                                            <div className="flex-1 w-full">
                                                <Label
                                                    htmlFor="avatar-upload"
                                                    className="cursor-pointer flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-input p-6 text-center hover:bg-muted/50 transition-colors w-full"
                                                >
                                                    <div className="space-y-2">
                                                        <div className="p-2 bg-muted rounded-full w-fit mx-auto">
                                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                        <div className="text-sm">
                                                            <span className="font-semibold text-primary">Click to upload</span>
                                                            <span className="text-muted-foreground"> or drag and drop</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">
                                                            SVG, JPG, PNG (max 10MB)
                                                        </p>
                                                    </div>
                                                    <Input
                                                        id="avatar-upload"
                                                        type="file"
                                                        accept="image/svg+xml,image/jpeg,image/png"
                                                        onChange={handleFileUpload}
                                                        className="hidden"
                                                    />
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button type="submit" disabled={isProfileLoading}>
                                            {isProfileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <Card className="h-fit">
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-sm">Change Password</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Ensure your account is secure by using a strong password.
                                            </p>
                                        </div>

                                        <FormField
                                            control={passwordForm.control}
                                            name="current_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Current Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={passwordForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={passwordForm.control}
                                            name="password_confirmation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button type="submit" disabled={isSecurityLoading}>
                                            {isSecurityLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Update Password
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
