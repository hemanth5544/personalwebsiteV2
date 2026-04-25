"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, Check, Copy, ExternalLink, ListTree, Terminal } from "lucide-react"

const motionTags = {
  article: motion.article,
  aside: motion.aside,
  div: motion.div,
  header: motion.header,
  nav: motion.nav,
  section: motion.section,
}

const languageLabels = {
  bash: "Bash",
  js: "JavaScript",
  javascript: "JavaScript",
  json: "JSON",
  sql: "SQL",
  text: "Text",
  ts: "TypeScript",
  typescript: "TypeScript",
}

export function BlogMotion({ as = "div", children, className = "", delay = 0 }) {
  const Component = motionTags[as] ?? motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

export function BlogCodeBlock({ code, language = "text" }) {
  const [copied, setCopied] = useState(false)
  const normalizedLanguage = language.toLowerCase()
  const label = languageLabels[normalizedLanguage] ?? normalizedLanguage.toUpperCase()
  const cleanCode = code.replace(/\n$/, "")

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(cleanCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="my-8 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.08)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
    >
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-100/80 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 bg-white text-emerald-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-emerald-400">
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="truncate">{label}</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
          aria-label={copied ? "Copied code" : "Copy code"}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="blog-code-pre overflow-x-auto bg-[#fff9ea] p-4 text-[0.9rem] leading-7 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:p-5">
        <code>{cleanCode}</code>
      </pre>
    </motion.figure>
  )
}

export function BlogToc({ headings = [], className = "", compact = false }) {
  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings])
  const [activeId, setActiveId] = useState(headingIds[0] ?? "")

  useEffect(() => {
    if (!headingIds.length) return undefined

    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-18% 0px -66% 0px",
        threshold: [0, 0.2, 1],
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [headingIds])

  if (!headings.length) return null

  return (
    <motion.nav
      initial={{ opacity: 0, x: compact ? 0 : -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: compact ? 0.05 : 0.2 }}
      className={className}
      aria-label="Table of contents"
    >
      <div className="rounded-lg border border-zinc-200 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="mb-3 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          <ListTree className="h-3.5 w-3.5" aria-hidden="true" />
          Contents
        </div>
        <ol className={compact ? "grid gap-1 sm:grid-cols-2" : "space-y-1"}>
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => setActiveId(heading.id)}
                  className={[
                    "group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm leading-snug transition",
                    heading.depth > 2 ? "pl-5 text-xs" : "",
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-100",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition",
                      isActive
                        ? "bg-emerald-500"
                        : "bg-zinc-300 group-hover:bg-zinc-500 dark:bg-zinc-700 dark:group-hover:bg-zinc-400",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <span>{heading.text}</span>
                </a>
              </li>
            )
          })}
        </ol>
        <div className="mt-4 border-t border-zinc-200 pt-3 dark:border-zinc-800">
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            Top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

export function BlogActionLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-white"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  )
}
