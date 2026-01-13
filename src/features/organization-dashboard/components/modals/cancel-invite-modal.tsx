import { useState } from "react"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { inviteUserSchema } from "../dashboard-page/org-invite-users-table"

type CancelInviteModalProps = {
    user: z.infer<typeof inviteUserSchema> | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CancelInviteModal({ user, open, onOpenChange }: CancelInviteModalProps) {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        setIsSuccess(true)
    }

    const handleClose = () => {
        onOpenChange(false)
        setTimeout(() => setIsSuccess(false), 300)
    }

    if (!user) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30 animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="mb-2 text-xl font-semibold tracking-tight">Invitation Cancelled</h2>
                        <p className="mb-6 max-w-[350px] text-sm text-balance text-muted-foreground">
                            The invitation for <span className="font-medium text-foreground">{user.name}</span> has been successfully cancelled.
                        </p>
                        <Button onClick={handleClose} className="min-w-[120px]">
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <div className="mx-auto mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <DialogTitle className="text-center">Cancel Invitation</DialogTitle>
                            <DialogDescription className="text-center text-balance">
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="py-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Are you sure you want to cancel the invitation for <span className="font-medium text-foreground">{user.name}</span>? They will no longer be able to join using the previous link.
                            </p>
                        </div>

                        <DialogFooter className="sm:justify-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="sm:w-32"
                            >
                                Keep Invite
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className="sm:w-32"
                            >
                                {isLoading ? "Cancelling..." : "Cancel Invite"}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
