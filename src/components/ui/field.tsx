import * as React from "react"
import { cn } from "@/lib/utils"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

const FieldGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("grid gap-6", className)}
        {...props}
    />
))
FieldGroup.displayName = "FieldGroup"

const Field = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
    />
))
Field.displayName = "Field"

const FieldLabel = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
))
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
FieldDescription.displayName = "FieldDescription"

const FieldSeparator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
        children?: React.ReactNode
    }
>(({ className, orientation = "horizontal", decorative = true, children, ...props }, ref) => (
    <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <SeparatorPrimitive.Root
                ref={ref}
                decorative={decorative}
                orientation={orientation}
                className={cn(
                    "shrink-0 bg-border",
                    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                    className
                )}
                {...props}
            />
        </div>
        {children && (
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    {children}
                </span>
            </div>
        )}
    </div>
))
FieldSeparator.displayName = "FieldSeparator"

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator }
