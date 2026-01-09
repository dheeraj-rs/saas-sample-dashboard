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
import { useState } from "react"
import { toast } from "sonner"
import { forgotPassword } from "@/services/auth.service"
import { Link } from "react-router"
import { Mail, Loader2, CheckCircle2, Send, ArrowLeft, Info, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const forgotPasswordSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await forgotPassword({ email: data.email })
            toast.success(response.data.message, { position: "top-right", duration: 4000 })
            setIsSuccess(true)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to send reset link"
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-md mx-auto shadow-sm border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
                <CardHeader className="flex flex-col items-center text-center space-y-2 pb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4 p-3 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Check Your Email</CardTitle>
                    <CardDescription className="text-base text-balance">
                        We have sent a password reset link to <span className="font-medium text-foreground">your email address</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950/50 p-4 text-sm text-green-800 dark:text-green-200 border border-green-200 dark:border-green-900">
                        <div className="flex items-center gap-2 font-medium mb-1">
                            <Info className="h-4 w-4" />
                            <p>Testing Information:</p>
                        </div>
                        <p className="text-xs opacity-90 break-all pl-6">
                            <Link
                                to="/reset-password?token=53c95c81dec7339d9800091ad575c457a3cad71803de9fe885e30d4ee2f96c49"
                                className="underline hover:no-underline"
                            >
                                /reset-password?token=53c95c81dec7339d9800091ad575c457a3cad71803de9fe885e30d4ee2f96c49
                            </Link>
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full h-11 gap-2 shadow-sm" variant="outline" asChild>
                        <Link to="/login">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        )
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
                    <h1 className="text-2xl font-bold tracking-tight">Forgot Password?</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email address and we'll send you a reset link
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

                {error && (
                    <div className="rounded-md bg-red-50 border border-red-200 p-3 flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                <Field>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 gap-2 font-medium transition-all hover:shadow-md"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending Link...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Send Reset Link
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
