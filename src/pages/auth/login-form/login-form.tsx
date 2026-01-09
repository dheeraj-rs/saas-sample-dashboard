import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputPassword } from "@/components/refine-ui/form/input-password"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuthStore } from "@/store/auth.store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { toast } from "sonner"

type LoginFormData = z.infer<typeof loginSchema>

const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
    password: z.string().nonempty("Password is required"),
})


export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const navigate = useNavigate()

    const { login, isLoading, error, setError, isAuthenticated } = useAuthStore()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/event-dashboard")
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-right", duration: 4000 })
            setError(null)
        }
    }, [error, setError])

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
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    {...register("email")}
                                    disabled={isLoading}
                                    className={errors.email ? "border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0" : "focus-visible:ring-0 focus-visible:ring-offset-0"}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                                    <a href="/forgot-password" className="ml-auto inline-block text-primary text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <InputPassword
                                    id="password"
                                    {...register("password")}
                                    disabled={isLoading}
                                    className={errors.password ? "border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0" : "focus-visible:ring-0 focus-visible:ring-offset-0"}
                                />
                                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
