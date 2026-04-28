"use client";

import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  /** When true, same-tab navigation for http(s) links (e.g. billing redirect to API). */
  sameTab?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-[var(--gradient-to)] text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:brightness-[1.05]",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:brightness-[0.97] dark:hover:brightness-110",
  ghost:
    "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, sameTab = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
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
