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
        smiley: "bg-gradient-to-r from-smiely-mango to-smiely-strawberry text-white hover:shadow-lg hover:scale-105 !text-white",
        smileyOutline: "bg-white text-smiely-mango border-2 border-smiely-mango hover:bg-smiely-mango hover:text-white",
        smileyAccent: "bg-smiely-yuzu text-white hover:bg-smiely-yuzu/90 hover:scale-105 !text-white",
        // Enhanced colorful variants
        rainbow: "bg-rainbow-gradient text-white hover:shadow-rainbow hover:scale-105 !text-white",
        sunset: "bg-sunset-gradient text-white hover:shadow-sunset hover:scale-105 !text-white",
        ocean: "bg-ocean-gradient text-white hover:shadow-fruit hover:scale-105 !text-white",
        tropical: "bg-tropical-gradient text-white hover:shadow-rainbow hover:scale-105 !text-white",
        fruit: "bg-fruit-burst text-white hover:colorful-glow hover:scale-105 !text-white",
        candy: "bg-candy-gradient text-white hover:shadow-rainbow hover:scale-105 !text-white",
        // Colorful outline variants
        rainbowOutline: "bg-white text-transparent bg-clip-text bg-rainbow-gradient border-2 border-transparent bg-gradient-to-r from-smiely-mango via-smiely-strawberry to-smiely-yuzu bg-clip-border hover:bg-rainbow-gradient hover:text-white",
        sunsetOutline: "bg-white text-smiely-mango border-2 border-smiely-mango hover:bg-sunset-gradient hover:text-white",
        oceanOutline: "bg-white text-smiely-blueberry border-2 border-smiely-blueberry hover:bg-ocean-gradient hover:text-white",
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








