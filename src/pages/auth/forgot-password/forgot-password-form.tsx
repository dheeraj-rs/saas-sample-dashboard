import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { forgotPassword } from "@/services/auth.service"
import { Link } from "react-router"

const forgotPasswordSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        try {
            const response = await forgotPassword({ email: data.email })
            toast.success(response.data.message, { position: "top-right", duration: 4000 })
            setIsSuccess(true)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to send reset link"
            toast.error(errorMessage, { position: "top-right", duration: 4000 })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        {isSuccess
                            ? "Check your email for the password reset link"
                            : "Enter your email address and we'll send you a reset link"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSuccess ? (
                        <div className="space-y-4">
                            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4 text-sm text-green-800 dark:text-green-200">
                                <p className="mb-2">We have emailed your password reset link. Please check your inbox.</p>
                                <p className="text-xs opacity-75 mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                                    <strong>For testing:</strong> Click the link below to reset your password
                                </p>
                                <Link
                                    to="/reset-password?token=53c95c81dec7339d9800091ad575c457a3cad71803de9fe885e30d4ee2f96c49"
                                    className="text-xs block mt-2 underline break-all text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
                                >
                                    /reset-password?token=53c95c81dec7339d9800091ad575c457a3cad71803de9fe885e30d4ee2f96c49
                                </Link>
                            </div>
                            <Link to="/login">
                                <Button className="w-full" variant="outline">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
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
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Sending..." : "Send Reset Link"}
                                </Button>
                                <Link to="/login">
                                    <Button className="w-full" variant="outline" type="button">
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
