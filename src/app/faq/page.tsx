"use client";

import { motion } from "framer-motion";
import { AccordionItem } from "@/components/AccordionItem";
import { Button } from "@/components/Button";
import { SectionWrapper } from "@/components/SectionWrapper";
import { mailtoSupportHref } from "@/lib/contact";
import { fadeUpInitial, fadeUpVisible, motionTransition, usePrefersReducedMotion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/** FAQ entry 7 removed — skip index 7 when rendering Platform Q&As. */
const PLATFORM_FAQ_INDICES = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12] as const;

const platformFaqKeys = PLATFORM_FAQ_INDICES.map((i) => ({
  qKey: `faq.q${i}`,
  aKey: `faq.a${i}`,
}));

const vistaFaqKeys = [1, 2, 3, 4, 5].map((i) => ({
  qKey: `faq.vista.q${i}`,
  aKey: `faq.vista.a${i}`,
}));

export default function FAQPage() {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <>
      <SectionWrapper className="pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="font-serif italic text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
              {t("faq.title")}
            </h1>
            <p className="mt-4 text-muted-foreground">{t("faq.subtitle")}</p>
          </div>

          <motion.div
            initial={fadeUpInitial(reduceMotion)}
            whileInView={fadeUpVisible}
            viewport={{ once: true }}
            transition={motionTransition(0)}
            className="mt-16"
          >
            <AccordionItem
              question={t("faq.umbrella.q1")}
              answer={t("faq.umbrella.a1")}
              defaultOpen
            />
          </motion.div>

          <motion.div
            initial={fadeUpInitial(reduceMotion)}
            whileInView={fadeUpVisible}
            viewport={{ once: true }}
            transition={motionTransition(0.08)}
            className="mt-12"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t("faq.vista.sectionTitle")}
            </h2>
            {vistaFaqKeys.map((item, i) => (
              <AccordionItem
                key={item.qKey}
                question={t(item.qKey)}
                answer={t(item.aKey)}
                defaultOpen={i === 0}
              />
            ))}
          </motion.div>

          <motion.div
            initial={fadeUpInitial(reduceMotion)}
            whileInView={fadeUpVisible}
            viewport={{ once: true }}
            transition={motionTransition(0.16)}
            className="mt-12"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {t("faq.platform.sectionTitle")}
            </h2>
            {platformFaqKeys.map((item) => (
              <AccordionItem
                key={item.qKey}
                question={t(item.qKey)}
                answer={t(item.aKey)}
              />
            ))}
          </motion.div>

          <div className="mt-16 rounded-2xl border border-border bg-secondary/70 p-8 text-center dark:bg-secondary/25">
            <h3 className="text-lg font-semibold text-foreground">{t("faq.stillHave")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("faq.stillHaveDesc")}</p>
            <div className="mt-6">
              <Button href={mailtoSupportHref("Question from FAQ")}>
                {t("faq.contactUs")}
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
