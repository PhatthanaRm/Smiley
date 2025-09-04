import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // SMILEY brand variants
        smiley: "bg-gradient-to-r from-smiley-mango to-smiley-strawberry text-white hover:shadow-lg hover:scale-105 !text-white",
        smileyOutline: "bg-white text-smiley-mango border-2 border-smiley-mango hover:bg-smiley-mango hover:text-white",
        smileyAccent: "bg-smiley-yuzu text-white hover:bg-smiley-yuzu/90 hover:scale-105 !text-white",
        // Enhanced colorful variants
        rainbow: "bg-gradient-to-r from-smiley-mango via-smiley-strawberry to-smiley-yuzu text-white hover:shadow-lg hover:scale-105 !text-white",
        sunset: "bg-gradient-to-r from-smiley-mango to-smiley-strawberry text-white hover:shadow-lg hover:scale-105 !text-white",
        ocean: "bg-gradient-to-r from-smiley-mint to-smiley-blueberry text-white hover:shadow-lg hover:scale-105 !text-white",
        tropical: "bg-gradient-to-r from-smiley-mango to-smiley-lime to-smiley-cyan text-white hover:shadow-lg hover:scale-105 !text-white",
        fruit: "bg-gradient-to-r from-smiley-mango via-smiley-strawberry via-smiley-yuzu to-smiley-mint text-white hover:shadow-lg hover:scale-105 !text-white",
        candy: "bg-gradient-to-r from-smiley-strawberry via-smiley-coral to-smiley-yuzu text-white hover:shadow-lg hover:scale-105 !text-white",
        // Colorful outline variants
        rainbowOutline: "bg-white text-smiley-mango border-2 border-smiley-mango hover:bg-gradient-to-r hover:from-smiley-mango hover:via-smiley-strawberry hover:to-smiley-yuzu hover:text-white",
        sunsetOutline: "bg-white text-smiley-mango border-2 border-smiley-mango hover:bg-gradient-to-r hover:from-smiley-mango hover:to-smiley-strawberry hover:text-white",
        oceanOutline: "bg-white text-smiley-blueberry border-2 border-smiley-blueberry hover:bg-gradient-to-r hover:from-smiley-mint hover:to-smiley-blueberry hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        xl: "h-14 rounded-full px-10 text-lg",
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








