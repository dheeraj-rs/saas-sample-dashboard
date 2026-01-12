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
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useAuthStore } from "@/features/auth/store/auth.store"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
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

    const { login, isLoading, error, isAuthenticated } = useAuthStore()

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
        <div className={cn("grid gap-6 w-full max-w-[400px] mx-auto", className)}>
            <div className="flex flex-col items-start text-center gap-2 mb-6">
                <div className="flex items-center justify-center h-16 mb-2">
                    <img
                        src="/cp-logo-name.png"
                        alt="Conference Prime"
                        className="h-full w-auto object-contain"
                    />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Login to Dashboard</h1>
                <p className="text-muted-foreground text-sm">
                    Welcome back! Please enter your details.
                </p>
            </div>

            <form className="flex flex-col gap-5" {...props} onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-destructive/50 bg-destructive/5">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Authentication Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <FieldGroup className="gap-4">
                    <Field>
                        <FieldLabel htmlFor="email" className="text-sm font-semibold">
                            Email Address <span className="text-destructive">*</span>
                        </FieldLabel>
                        <div className="relative group">
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                                disabled={isLoading}
                                className={cn(
                                    "h-11 pl-4 pr-10 transition-all bg-muted/20 border-muted-foreground/20 group-hover:border-primary/50 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/20",
                                    errors.email && "border-destructive bg-destructive/5 focus-visible:ring-destructive/20"
                                )}
                            />
                            {errors.email && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-destructive">
                                    <AlertCircle className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                        {errors.email && (
                            <p className="text-xs text-destructive flex items-center gap-1 mt-1.5 font-medium">
                                <span className="w-1 h-1 rounded-full bg-destructive" />
                                {errors.email.message}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password" className="text-sm font-semibold">
                                Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Link to="/forgot-password"
                                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative group">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                disabled={isLoading}
                                className={cn(
                                    "h-11 pl-4 pr-10 transition-all bg-muted/20 border-muted-foreground/20 group-hover:border-primary/50 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/20",
                                    errors.password && "border-destructive bg-destructive/5 focus-visible:ring-destructive/20"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors p-1"
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
                            <p className="text-xs text-destructive flex items-center gap-1 mt-1.5 font-medium">
                                <span className="w-1 h-1 rounded-full bg-destructive" />
                                {errors.password.message}
                            </p>
                        )}
                    </Field>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 gap-2 font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}
