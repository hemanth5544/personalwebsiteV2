"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, Check, Copy, ExternalLink, ListTree } from "lucide-react"
import { getLanguageLabel, highlightCode } from "@/lib/blog-highlight"

const motionTags = {
  article: motion.article,
  aside: motion.aside,
  div: motion.div,
  header: motion.header,
  nav: motion.nav,
  section: motion.section,
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
  const cleanCode = code.replace(/\n$/, "")
  const label = getLanguageLabel(language)
  const highlighted = useMemo(
    () => highlightCode(cleanCode, language),
    [cleanCode, language],
  )

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
    <figure className="blog-code-block group my-8">
      <div className="blog-code-shell">
        <div className="blog-code-toolbar">
          <span className="blog-code-lang">{label}</span>
          <button
            type="button"
            onClick={copyCode}
            className="blog-code-copy"
            aria-label={copied ? "Copied code" : "Copy code"}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
        <pre className="blog-code-inner">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </figure>
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
