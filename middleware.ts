import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const R = "\x1b[0m"
const B = "\x1b[1m"
const DIM = "\x1b[2m"
const CYAN = "\x1b[36m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const WHITE = "\x1b[97m"
const GRAY = "\x1b[90m"

const CURL_TEXT = `
${CYAN}${B}  ██╗  ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗████████╗██╗  ██╗${R}
${CYAN}${B}  ██║  ██║██╔════╝████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██║  ██║${R}
${CYAN}${B}  ███████║█████╗  ██╔████╔██║███████║██╔██╗ ██║   ██║   ███████║${R}
${CYAN}${B}  ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██╔══██║${R}
${CYAN}${B}  ██║  ██║███████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ██║  ██║${R}
${CYAN}${B}  ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝${R}

${WHITE}${B}  Hemanth R${R}   ${GRAY}— Full Stack Developer${R}
  ${DIM}https://hemanthr.xyz${R}

${GRAY}  ─────────────────────────────────────────────────${R}

${YELLOW}${B}  opensource${R}
  ${GREEN}▸${R} upitme-kuma        ${CYAN} monitring stack for uptime, status pages, and more${R}
  ${GREEN}▸${R} better-uptime      ${CYAN} reliable uptime monitoring ClickHouse-powered time-series${R}
  ${GREEN}▸${R} cal.com            ${CYAN} scheduling meetings for everyone${R}

${YELLOW}${B}  Work${R}
  ${GREEN}▸${R} Datopic            ${CYAN} software Engineer${R}

${YELLOW}${B}  skills${R}
  ${GREEN}▸${R} Full Stack Web Development
  ${GREEN}▸${R} HomeLab & Self-hosted Infrastructure
  ${GREEN}▸${R} Open Source Software

${YELLOW}${B}  projects${R}
  ${GREEN}▸${R} Portfolio          ${CYAN}https://hemanthr.xyz${R}
  ${GREEN}▸${R} Status Page        ${CYAN}https://status.hemanthr.xyz${R}

${YELLOW}${B}  contact${R}
  ${GREEN}▸${R} github             ${CYAN}https://github.com/hemanth5544${R}
  ${GREEN}▸${R} web                ${CYAN}https://hemanthr.xyz${R}

${GRAY}  ─────────────────────────────────────────────────${R}
  ${DIM}curl hemanthr.xyz${R}   ${GRAY}← share this!${R}
`.trimStart()

export function middleware(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase()

  // Only intercept curl-like clients on the root path
  if (req.nextUrl.pathname === "/" && (ua.includes("curl/") || ua.includes("httpie/"))) {
    return new Response(CURL_TEXT + "\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}

