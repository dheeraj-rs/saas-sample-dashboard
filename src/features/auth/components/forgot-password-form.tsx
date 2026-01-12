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
import { forgotPassword } from "@/features/auth/services/auth.service"
import { Link } from "react-router"
import { Mail, Loader2, CheckCircle2, Send, ArrowLeft, Info, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Simple Apple Icon Component since it's not in Lucide
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.89 3.66-.84 2.61.12 4.28 1.54 4.9 3.05-4.3 1.83-3.66 7.42.06 9.4zM12.08 6.4c0-1.63.8-3.28 2.11-4.4-1.8.03-3.7.99-4.29 2.52-.51 1.27-.1 2.58.59 3.25.76.71 1.59.85 1.59-1.37z" />
    </svg>
)

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

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
            <Card className="w-full max-w-[400px] mx-auto shadow-sm border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
                <CardHeader className="flex flex-col items-center text-center space-y-2 pb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-2 p-2 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Check Your Email</CardTitle>
                    <CardDescription className="text-base text-balance">
                        We have sent a password reset link to <span className="font-medium text-foreground">your email address</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
        <Card className="w-full max-w-[400px] mx-auto shadow-lg border-0 bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
            <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 p-2 ring-4 ring-primary/5">
                    <img
                        src="/cp-logo.png"
                        alt="Conference Prime Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Forgot Password?</CardTitle>
                <CardDescription className="text-base text-balance max-w-xs mx-auto">
                    Enter your email address and we'll send you a reset link
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full h-11 gap-2 font-medium" disabled={isLoading} asChild>
                            <Link to="/login">
                                <GoogleIcon className="h-5 w-5 mr-2" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Sign in</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full h-11 gap-2 font-medium" disabled={isLoading} asChild>
                            <Link to="/login">
                                <AppleIcon className="h-5 w-5 mr-2" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Sign in</span>
                            </Link>
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-zinc-950 px-2 text-muted-foreground">
                                Or by email
                            </span>
                        </div>
                    </div>

                    <form className={cn("grid gap-4", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
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
                                <FieldLabel htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </FieldLabel>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        {...register("email")}
                                        disabled={isLoading}
                                        className={cn(
                                            "h-11 transition-all pr-10",
                                            errors.email
                                                ? "border-destructive bg-destructive/5 focus-visible:ring-destructive/20"
                                                : "focus-visible:ring-primary/20"
                                        )}
                                    />
                                    {errors.email && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-destructive">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-destructive flex items-center gap-1 mt-1 font-medium">
                                        {errors.email.message}
                                    </p>
                                )}
                            </Field>

                            <div className="flex flex-col gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 gap-2 font-medium text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
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
                                    <Button variant="ghost" type="button" className="w-full h-11 gap-2 text-muted-foreground hover:text-foreground">
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}
