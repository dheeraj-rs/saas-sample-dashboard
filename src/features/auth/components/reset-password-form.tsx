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
import { Lock, Loader2, Eye, EyeOff, Check, ArrowLeft } from "lucide-react"

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
    const [token, setToken] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
        try {
            const response = await resetPassword({
                token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            })
            toast.success(response.data.message, { position: "top-right", duration: 4000 })
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
            <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2 p-3">
                        <img
                            src="/cp-logo.png"
                            alt="Conference Prime Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Invalid Link</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        This password reset link is invalid or has expired.
                    </p>
                </div>
                <Button type="button" className="w-full h-11" onClick={() => navigate('/forgot-password')}>
                    Request New Reset Link
                </Button>
            </form>
        )
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(handleResetPassword)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2 p-3">
                        <img
                            src="/cp-logo.png"
                            alt="Conference Prime Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your new password below
                    </p>
                </div>

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
                                    ? "border-destructive"
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
                    </div>
                    {errors.password && (
                        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
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
                                    ? "border-destructive"
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
                    </div>
                    {errors.password_confirmation && (
                        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </Field>

                <Field className="pt-2">
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
                        <Button variant="outline" type="button" className="w-full h-11 mt-2 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Button>
                    </Link>
                </Field>
            </FieldGroup>
        </form>
    )
}
