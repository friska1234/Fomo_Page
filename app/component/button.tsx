import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/lib/utils';
const buttonVariants = cva("base-class", {
    variants: {
        variant: {  // ✅ Correct key
            default: "bg-blue-500 text-white",
            destructive: "bg-red-500 text-white",
            outline: "border border-gray-500",
            secondary: "bg-gray-500 text-white",
            ghost: "text-gray-500",
            link: "underline text-blue-500",
        },
        size: {
            default: "py-2 px-4",
            sm: "py-1 px-2",
            lg: "py-3 px-6",
            icon: "p-2",
        },
    },
});


export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
