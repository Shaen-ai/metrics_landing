"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import { MOTION_EASE } from "@/lib/motion";

export interface ProjectShowcaseCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaSameTab?: boolean;
  icon: LucideIcon;
  index: number;
  featured?: boolean;
  className?: string;
}

export function ProjectShowcaseCard({
  id,
  title,
  subtitle,
  description,
  features,
  ctaLabel,
  ctaHref,
  ctaSameTab = false,
  icon: Icon,
  index,
  featured = false,
  className,
}: ProjectShowcaseCardProps) {
  const reduceMotion = useReducedMotion();
  const titleId = `${id}-title`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: featured ? 0.98 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay: index * 0.1,
        duration: 0.65,
        ease: MOTION_EASE,
      }}
      className={cn(
        "group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl sm:min-h-[460px]",
        "border bg-card",
        featured
          ? "min-h-[480px] border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:min-h-[500px]"
          : "border-border",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:border-primary/40 dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]",
        className,
      )}
      aria-labelledby={titleId}
    >
      {featured && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent"
          aria-hidden
        />
      )}
      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <div
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:text-primary",
            featured ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon size={24} aria-hidden />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {subtitle}
        </p>
        <h3
          id={titleId}
          className="font-serif italic mt-2 text-2xl font-normal tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {description}
        </p>

        <ul className="mt-5 space-y-2.5 border-t border-border/50 pt-5 dark:border-border/40">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm text-foreground/85 transition-colors duration-300 group-hover:text-foreground"
            >
              <span
                className={cn(
                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                  featured ? "bg-primary/60 group-hover:bg-primary" : "bg-border group-hover:bg-primary",
                )}
                aria-hidden
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Button
            href={ctaHref}
            sameTab={ctaSameTab}
            className="w-full transition-transform duration-300 group-hover:scale-[1.02] sm:w-auto"
          >
            {ctaLabel}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
