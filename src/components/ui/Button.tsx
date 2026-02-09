import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-[#0a0a0a] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:-translate-y-0.5",
                secondary:
                    "bg-[#151515] text-[#fafafa] border border-[#262626] hover:bg-[#1a1a1a] hover:border-[#3a3a3a]",
                ghost:
                    "text-[#a1a1aa] hover:bg-[#151515] hover:text-[#fafafa]",
                destructive:
                    "bg-[#ef4444] text-white hover:bg-[#dc2626]",
                outline:
                    "border border-[#262626] bg-transparent text-[#fafafa] hover:bg-[#151515] hover:border-[#3a3a3a]",
                link:
                    "text-[#EAB308] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
