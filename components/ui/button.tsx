import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer select-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0",
        outline: "border border-slate-300 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 hover:-translate-y-0.5 active:translate-y-0",
        ghost: "hover:bg-slate-100 hover:text-slate-900 hover:-translate-y-0.5 active:translate-y-0",
        link: "text-blue-600 underline-offset-4 hover:underline",
        primary:
          "bg-pg-navy text-white hover:bg-[#1e3461] hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10 active:before:opacity-20",
        "brand-primary":
          "bg-pg-navy text-white hover:bg-[#1e3461] shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-[1.02] active:translate-y-0 transition-all duration-300 font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:opacity-0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        "brand-secondary":
          "bg-pg-sky text-pg-navy hover:bg-[#7bb3e3] shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-[1.02] active:translate-y-0 transition-all duration-300 font-semibold",
        "brand-outline":
          "border-2 border-pg-navy text-pg-navy hover:bg-pg-navy hover:text-white bg-transparent shadow-md hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-[1.02] active:translate-y-0 transition-all duration-300 font-semibold",
        "brand-ghost":
          "text-pg-navy hover:bg-[rgba(36,60,116,0.1)] hover:text-pg-navy transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0 font-medium",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-xs",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-base",
        xl: "h-14 px-8 py-4 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
        "icon-xl": "h-14 w-14 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, className }))

    if (href) {
      return (
        <a href={href} className={buttonClasses} {...(props as any)}>
          {props.children}
        </a>
      )
    }

    return <button className={buttonClasses} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
