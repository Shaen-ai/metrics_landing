"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { AccordionItem } from "@/components/AccordionItem";
import { Button } from "@/components/Button";
import { mailtoSupportHref } from "@/lib/contact";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const faqKeys = Array.from({ length: 12 }, (_, i) => ({
  qKey: `faq.q${i + 1}`,
  aKey: `faq.a${i + 1}`,
}));

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <>
      <SectionWrapper className="pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("faq.title")}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="mt-16">
            {faqKeys.map((item, i) => (
              <AccordionItem
                key={item.qKey}
                question={t(item.qKey)}
                answer={t(item.aKey)}
                defaultOpen={i === 0}
              />
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-secondary/70 p-8 text-center dark:bg-secondary/25">
            <h3 className="text-lg font-semibold text-foreground">{t("faq.stillHave")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("faq.stillHaveDesc")}
            </p>
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
