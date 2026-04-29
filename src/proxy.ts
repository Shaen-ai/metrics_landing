import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languageFromCookieOrAccept } from "@/lib/requestLanguage";

const COOKIE = "tunzone-lang";
const HEADER = "x-tunzone-lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const cookieVal = request.cookies.get(COOKIE)?.value;
  const lang = languageFromCookieOrAccept(cookieVal, request.headers.get("accept-language"));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADER, lang);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  if (cookieVal !== lang) {
    res.cookies.set(COOKIE, lang, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
