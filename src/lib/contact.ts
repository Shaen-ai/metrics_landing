/**
 * Inbound support for humans (mailto, contact CTAs).
 * Backend transactional email uses MAIL_FROM_ADDRESS (noreply@) separately.
 *
 * Optional: NEXT_PUBLIC_CONTACT_SUPPORT_EMAIL in .env (defaults to support@tunzone.com).
 */

const DEFAULT_SUPPORT_EMAIL = "support@tunzone.com";

function contactEmail(): string {
  if (typeof process === "undefined") return DEFAULT_SUPPORT_EMAIL;
  return process.env.NEXT_PUBLIC_CONTACT_SUPPORT_EMAIL?.trim() || DEFAULT_SUPPORT_EMAIL;
}

export const CONTACT_SUPPORT_EMAIL = contactEmail();

export function mailtoSupportHref(subject?: string): string {
  let href = `mailto:${CONTACT_SUPPORT_EMAIL}`;
  if (subject?.trim()) {
    href += `?subject=${encodeURIComponent(subject.trim())}`;
  }
  return href;
}
