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
import { LogIn, Mail, Lock, Loader2, KeyRound, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { Link } from "@refinedev/core"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type LoginFormData = z.infer<typeof loginSchema>

const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
    password: z.string().nonempty("Password is required"),
})


export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const { login, isLoading, error, setError, isAuthenticated } = useAuthStore()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/event-dashboard")
        }
    }, [isAuthenticated, navigate])

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data)
            toast.success("Login successful! Redirecting...", { position: "top-right", duration: 2000 })
            navigate("/event-dashboard")
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2 p-3">
                        <img
                            src="/cp-logo.png"
                            alt="Conference Prime Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome Back to Confrance Prime!</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your credentials to access your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                            disabled={isLoading}
                            className={cn(
                                "pl-10 h-11 transition-all focus-visible:ring-0 focus-visible:ring-offset-0",
                                errors.email
                                    ? "border-destructive"
                                    : "focus-visible:ring-primary/20"
                            )}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                            {errors.email.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password" className="text-sm font-medium">
                            Password <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Link to="/forgot-password"
                            className="text-xs text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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

                {error && (
                    <div className="rounded-md bg-red-50 border border-red-200 p-3 flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                <Field className="pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 gap-2 font-medium transition-all hover:shadow-md"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            <>
                                <LogIn className="h-4 w-4" />
                                Login
                            </>
                        )}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}
