"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CONTACT_SUPPORT_EMAIL, mailtoSupportHref } from "@/lib/contact";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    window.location.href = `${mailtoSupportHref(`Contact from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    setSubmitted(true);
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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            {t("about.title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t("about.intro")}
          </p>
        </div>
      </SectionWrapper>

      {/* Mission + values */}
      <SectionWrapper className="border-t border-zinc-200/40 dark:border-zinc-800/40">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          {values.map((item, i) => (
            <motion.div
              key={item.titleKey}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {t(item.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper className="border-t border-zinc-200/40 dark:border-zinc-800/40">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                {t("about.getInTouch")}
              </h2>
              <p className="mt-4 text-zinc-500 dark:text-zinc-400">
                {t("about.getInTouchDesc")}
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("about.email")}</p>
                    <a
                      href={mailtoSupportHref()}
                      className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                      {CONTACT_SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("about.location")}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
                <div className="flex h-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
                  <div>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                      <Send size={20} className="text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("about.messageReady")}</h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {t("about.messageReadyDesc")}
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {t("about.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-100 dark:placeholder-zinc-500"
                      placeholder={t("about.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {t("about.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-100 dark:placeholder-zinc-500"
                      placeholder={t("about.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {t("about.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-100 dark:placeholder-zinc-500 resize-none"
                      placeholder={t("about.messagePlaceholder")}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t("about.sendMessage")}
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
