import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { resetPassword } from "@/features/auth/services/auth.service"
import { Link, useSearchParams, useNavigate } from "react-router"
import { Lock, Loader2, Eye, EyeOff, Check, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const resetPasswordSchema = z.object({
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().nonempty("Password confirmation is required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onTouched",
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
        setError(null)
        try {
            const response = await resetPassword({
                token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            })
            toast.success(response.data.message, { position: "top-right", duration: 4000 })
            setIsSuccess(true)
            // Removed auto navigation to show the success state
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to reset password"
            setError(errorMessage)
            toast.error(errorMessage, { position: "top-right", duration: 4000 })
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <Card className="w-full max-w-[400px] mx-auto shadow-lg border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
                <CardHeader className="flex flex-col items-center text-center space-y-2 pb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-2 p-2 ring-4 ring-destructive/5">
                        <AlertCircle className="w-6 h-6 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Invalid Link</CardTitle>
                    <CardDescription className="text-base text-balance">
                        This password reset link is invalid or has expired.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full h-11" onClick={() => navigate('/forgot-password')}>
                        Request New Reset Link
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-[400px] mx-auto shadow-sm border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
                <CardHeader className="flex flex-col items-center text-center space-y-2 pb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-2 p-2 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Password Reset Complete</CardTitle>
                    <CardDescription className="text-base text-balance">
                        Your password has been successfully updated. You can now login with your new password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <Button className="w-full h-11 gap-2 shadow-sm font-medium" asChild>
                        <Link to="/login">
                            Go to Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-[400px] mx-auto shadow-lg border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
            <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 p-2 ring-4 ring-primary/5">
                    <img
                        src="/cp-logo.png"
                        alt="Conference Prime Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
                <CardDescription className="text-base text-balance max-w-xs mx-auto">
                    Enter your new password below
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className={cn("grid gap-4", className)} {...props} onSubmit={handleSubmit(handleResetPassword)}>

                    {error && (
                        <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="password" className="text-sm font-medium">
                                New Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    {...register("password")}
                                    disabled={isLoading}
                                    className={cn(
                                        "pl-10 pr-10 h-11 transition-all focus-visible:ring-0 focus-visible:ring-offset-0",
                                        errors.password
                                            ? "border-destructive bg-destructive/5"
                                            : "focus-visible:ring-primary/20"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    disabled={isLoading}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                                {errors.password && (
                                    <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-destructive">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                            {errors.password && (
                                <p className="text-xs text-destructive flex items-center gap-1 mt-1 font-medium">
                                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                                    {errors.password.message}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password_confirmation" className="text-sm font-medium">
                                Confirm Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    {...register("password_confirmation")}
                                    disabled={isLoading}
                                    className={cn(
                                        "pl-10 pr-10 h-11 transition-all focus-visible:ring-0 focus-visible:ring-offset-0",
                                        errors.password_confirmation
                                            ? "border-destructive bg-destructive/5"
                                            : "focus-visible:ring-primary/20"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    disabled={isLoading}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                                {errors.password_confirmation && (
                                    <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-destructive">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                            {errors.password_confirmation && (
                                <p className="text-xs text-destructive flex items-center gap-1 mt-1 font-medium">
                                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                                    {errors.password_confirmation.message}
                                </p>
                            )}
                        </Field>

                        <div className="flex flex-col gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 gap-2 font-medium transition-all hover:shadow-md"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Resetting...
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Reset Password
                                    </>
                                )}
                            </Button>
                            <Link to="/login" className="w-full">
                                <Button variant="ghost" type="button" className="w-full h-11 gap-2 text-muted-foreground hover:text-foreground">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card >
    )
}
