"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { getContactSubmitUrl } from "@/lib/api-url";
import { CONTACT_SUPPORT_EMAIL, mailtoSupportHref } from "@/lib/contact";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useTranslation();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(getContactSubmitUrl(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (!res.ok) {
        const fromValidation =
          payload.errors &&
          Object.values(payload.errors).flat().filter(Boolean)[0];
        setSubmitError(
          typeof fromValidation === "string"
            ? fromValidation
            : (payload.message ?? t("about.sendError")),
        );
        return;
      }
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(t("about.sendError"));
    } finally {
      setSubmitting(false);
    }
  }

  const values = [
    { titleKey: "about.mission", descKey: "about.missionDesc" },
    { titleKey: "about.aiFirst", descKey: "about.aiFirstDesc" },
    { titleKey: "about.builtForScale", descKey: "about.builtForScaleDesc" },
  ];

  return (
    <>
      {/* About */}
      <SectionWrapper className="pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("about.title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("about.intro")}
          </p>
        </div>
      </SectionWrapper>

      {/* Mission + values */}
      <SectionWrapper className="border-t border-border/50 dark:border-border/40">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          {values.map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {t(item.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper className="border-t border-border/50 dark:border-border/40">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("about.getInTouch")}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t("about.getInTouchDesc")}
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("about.email")}</p>
                    <a
                      href={mailtoSupportHref()}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {CONTACT_SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("about.location")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("about.locationValue")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-2xl border border-border bg-secondary/70 p-12 text-center dark:bg-secondary/30">
                  <div>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted">
                      <Send size={20} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{t("about.messageReady")}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t("about.messageReadyDesc")}
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-2xl border border-border bg-secondary/70 p-8 dark:bg-secondary/25"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-foreground/85"
                    >
                      {t("about.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/25"
                      placeholder={t("about.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground/85"
                    >
                      {t("about.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/25"
                      placeholder={t("about.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-foreground/85"
                    >
                      {t("about.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/25 resize-none"
                      placeholder={t("about.messagePlaceholder")}
                    />
                  </div>
                  {submitError ? (
                    <p className="text-sm text-destructive" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? t("about.sending") : t("about.sendMessage")}
                    <Send size={16} />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
