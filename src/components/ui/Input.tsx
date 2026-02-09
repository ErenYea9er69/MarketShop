import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-[10px] border bg-[#151515] px-4 py-2 text-sm text-[#fafafa] transition-all duration-200",
                        "border-[#262626] placeholder:text-[#71717a]",
                        "focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[rgba(234,179,8,0.1)]",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-[#ef4444] focus:border-[#ef4444] focus:ring-[rgba(239,68,68,0.1)]",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-xs text-[#ef4444]">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
