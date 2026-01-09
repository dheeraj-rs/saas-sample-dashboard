import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputPassword } from "@/components/refine-ui/form/input-password"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { resetPassword } from "@/services/auth.service"
import { Link, useSearchParams, useNavigate } from "react-router"

const resetPasswordSchema = z.object({
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().nonempty("Password confirmation is required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [token, setToken] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    })

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token')
        if (!tokenFromUrl) {
            toast.error("Invalid reset link. Please request a new password reset.", {
                position: "top-right",
                duration: 4000
            })
            setTimeout(() => navigate('/forgot-password'), 2000)
        } else {
            setToken(tokenFromUrl)
        }
    }, [searchParams, navigate])

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        if (!token) {
            toast.error("Invalid reset token", { position: "top-right", duration: 4000 })
            return
        }
        setIsLoading(true)
        try {
            const response = await resetPassword({
                token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            })
            toast.success(response.data.message, { position: "top-right", duration: 4000 })
            setIsSuccess(true)
            setTimeout(() => navigate('/login'), 2000)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to reset password"
            toast.error(errorMessage, { position: "top-right", duration: 4000 })
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader>
                        <CardTitle>Invalid Reset Link</CardTitle>
                        <CardDescription>This password reset link is invalid or has expired.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/forgot-password">
                            <Button className="w-full">Request New Reset Link</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const SuccessView = () => (
        <div className="space-y-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4 text-sm text-green-800 dark:text-green-200">
                Your password has been reset. Redirecting to login...
            </div>
            <Link to="/login">
                <Button className="w-full">
                    Go to Login
                </Button>
            </Link>
        </div>
    )

    const ResetFormView = () => (
        <form onSubmit={handleSubmit(handleResetPassword)}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password <span className="text-destructive">*</span></Label>
                    <InputPassword
                        id="password"
                        placeholder="Enter new password"
                        {...register("password")}
                        disabled={isLoading}
                        className={errors.password ? "border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0" : "focus-visible:ring-0 focus-visible:ring-offset-0"}
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm Password <span className="text-destructive">*</span></Label>
                    <InputPassword
                        id="password_confirmation"
                        placeholder="Confirm new password"
                        {...register("password_confirmation")}
                        disabled={isLoading}
                        className={errors.password_confirmation ? "border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0" : "focus-visible:ring-0 focus-visible:ring-offset-0"}
                    />
                    {errors.password_confirmation && <p className="text-sm text-destructive">{errors.password_confirmation.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
                <Link to="/login">
                    <Button className="w-full" variant="outline" type="button">
                        Back to Login
                    </Button>
                </Link>
            </div>
        </form>
    )

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        {isSuccess
                            ? "Your password has been reset successfully"
                            : "Enter your new password below"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSuccess ? <SuccessView /> : <ResetFormView />}
                </CardContent>
            </Card>
        </div>
    )
}
