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
            <Card className="w-full max-w-[450px] mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-md dark:bg-zinc-950/90 overflow-hidden">
                <CardHeader className="flex flex-col items-center text-center space-y-3 pb-6 pt-8 px-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 mb-2 p-3 animate-in zoom-in duration-500">
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight">Check Your Email</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                        We've sent password reset instructions to <span className="font-semibold text-foreground">your email address</span>
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
        <Card className="w-full max-w-[450px] mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-md dark:bg-zinc-950/90 overflow-hidden">
            <CardHeader className="space-y-3 flex flex-col items-center text-center px-8">
                {/* <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-2">
                    <Mail className="w-8 h-8 text-primary" />
                </div> */}
                <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                    Forgot Password?
                </CardTitle>
                <CardDescription className="text-base leading-relaxed max-w-sm mx-auto text-muted-foreground/90">
                    No worries! Enter your email and we'll send you reset instructions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">


                    <form className={cn("grid gap-4", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-destructive/50 bg-destructive/5">
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email" className="text-sm font-medium">
                                    Email Address <span className="text-destructive">*</span>
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
