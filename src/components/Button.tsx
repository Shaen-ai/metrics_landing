"use client";

import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  /** When true, same-tab navigation for http(s) links (e.g. billing redirect to API). */
  sameTab?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "group/btn bg-muted text-foreground border border-border hover:border-primary hover:bg-secondary [&_svg]:text-muted-foreground hover:[&_svg]:text-primary",
  secondary:
    "group/btn bg-card text-foreground border border-border hover:border-primary/50 hover:bg-muted [&_svg]:text-muted-foreground hover:[&_svg]:text-primary/80",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, sameTab = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      className,
    );

    if (href) {
      const external =
        href.startsWith("http://") || href.startsWith("https://");
      const newTab = external && !sameTab;
      return (
        <a
          href={href}
          className={classes}
          onClick={props.onClick as React.MouseEventHandler<HTMLElement> | undefined}
          {...(newTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
