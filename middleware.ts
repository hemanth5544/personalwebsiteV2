import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// ─── ANSI codes ────────────────────────────────────────────────────────────────
const R  = "\x1b[0m"
const B  = "\x1b[1m"
const DIM     = "\x1b[2m"
const IT      = "\x1b[3m"
const CYAN    = "\x1b[36m"
const GREEN   = "\x1b[32m"
const YELLOW  = "\x1b[33m"
const BLUE    = "\x1b[34m"
const MAGENTA = "\x1b[35m"
const WHITE   = "\x1b[97m"
const GRAY    = "\x1b[90m"

// ─── Layout ────────────────────────────────────────────────────────────────────
// VISIBLE width of the box interior (between the two ║ chars)
const INNER = 68

const BOX_TOP = `   ╔${"═".repeat(INNER)}╗`
const BOX_BOT = `   ╚${"═".repeat(INNER)}╝`
const BOX_HR  = `   ╠${"═".repeat(INNER)}╣`

/**
 * Wrap content in ║ … ║, padding to INNER visible chars.
 * visLen = printable character count of `content` (ANSI codes = 0 width)
 */
function boxRow(content: string, visLen: number): string {
  const padding = INNER - visLen
  return `${GRAY}   ║${R}${content}${" ".repeat(Math.max(padding, 0))}${GRAY}║${R}`
}

const BLANK = boxRow("", 0)

/** Section label:  "  ▸  TITLE" */
function section(title: string): string {
  return boxRow(`  ${YELLOW}${B}▸  ${title}${R}`, 2 + 3 + title.length)
}

/**
 * Bullet item row.
 * keyW = visible width of key column (pad key to this width so descs align)
 */
function item(
  icon: string,
  iconColor: string,
  key: string,
  keyW: number,
  desc: string,
  descColor: string = DIM
): string {
  const paddedKey = key.padEnd(keyW)
  // visible: 2(indent) + 1(icon) + 2(spaces) + keyW + 1(space) + desc.length
  const visLen = 2 + 1 + 2 + keyW + 1 + desc.length
  const content = `  ${iconColor}${icon}${R}  ${WHITE}${B}${paddedKey}${R} ${descColor}${desc}${R}`
  return boxRow(content, visLen)
}

/** Skill row */
function skillRow(label: string): string {
  return boxRow(`  ${CYAN}▸${R}  ${label}`, 2 + 1 + 2 + label.length)
}

// ─── ASCII name with R ─────────────────────────────────────────────────────────
const NAME_ART = [
  `   ██╗  ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗████████╗██╗  ██╗     ██████╗ `,
  `   ██║  ██║██╔════╝████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██║  ██║     ██╔══██╗`,
  `   ███████║█████╗  ██╔████╔██║███████║██╔██╗ ██║   ██║   ███████║     ██████╔╝ `,
  `   ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██╔══██║     ██╔══██╗`,
  `   ██║  ██║███████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ██║  ██║     ██║  ██║`,
  `   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝  ██ ╚═╝  ╚═╝`,
].map(l => `${YELLOW}${B}${l}${R}`).join("\n")

const TAGLINE = [
  `   `,
  `${WHITE}${B}Hemanth R${R}`,
  `  ${GRAY}·${R}  `,
  `${DIM}Full Stack Developer${R}`,
  `  ${GRAY}·${R}  `,
  `${CYAN}https://hemanthr.xyz${R}`,
].join("")

// ─── Card ──────────────────────────────────────────────────────────────────────
// KW = key column width. "Status Page" is 11 chars — use 13 so there's a gap.
const KW = 13

const CARD = [
  BOX_TOP,
  BLANK,

  section("OPEN SOURCE"),
  BOX_HR,
  item("◆", GREEN,   "uptime-kuma",   KW, "monitoring stack, status pages & more"),
  item("◆", GREEN,   "better-uptime", KW, "ClickHouse-powered uptime monitoring"),
  item("◆", GREEN,   "cal.com",       KW, "scheduling infrastructure for everyone"),
  BLANK,

  section("WORK"),
  BOX_HR,
  item("◆", CYAN,    "Datopic",       KW, "Software Engineer"),
  BLANK,

  section("SKILLS"),
  BOX_HR,
  skillRow("Full Stack Web Development"),
  skillRow("HomeLab & Self-hosted Infrastructure"),
  skillRow("Open Source Software"),
  BLANK,

  section("CONTACT"),
  BOX_HR,
  item("◆", BLUE, "GitHub", KW, "https://github.com/hemanth5544", CYAN),
  item("◆", BLUE, "Servers",    KW, "https://status.hemanthr.xyz",           CYAN),
  BLANK,

  BOX_BOT,
].join("\n")

const FOOTER = `\n   ${DIM}${IT}$ curl hemanthr.xyz${R}   ${GRAY}← share this with a friend!${R}\n`

const CURL_TEXT = ["", NAME_ART, "", TAGLINE, "", CARD, FOOTER].join("\n")

// ─── Middleware ────────────────────────────────────────────────────────────────
export function middleware(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase()

  if (
    req.nextUrl.pathname === "/" &&
    (ua.includes("curl/") || ua.includes("httpie/"))
  ) {
    return new Response(CURL_TEXT + "\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }

  return NextResponse.next()
}

export const config = { matcher: ["/"] }