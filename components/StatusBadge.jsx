"use client"

import { useEffect, useMemo, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function dotClasses(state) {
  switch (state) {
    case "operational":
      return { dot: "bg-emerald-500", ring: "bg-emerald-500/40" }
    case "degraded":
      return { dot: "bg-amber-500", ring: "bg-amber-500/40" }
    case "outage":
      return { dot: "bg-rose-500", ring: "bg-rose-500/40" }
    default:
      return { dot: "bg-zinc-400", ring: "bg-zinc-400/30" }
  }
}

export default function StatusBadge() {
  const [status, setStatus] = useState({
    state: "operational",
    label: "All Systems Operational",
  })

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" })
        if (!res.ok) return
        const json = await res.json()
        if (cancelled) return
        if (json?.label && typeof json.label === "string") {
          setStatus({
            state: json?.state || "unknown",
            label: json.label,
          })
        }
      } catch {
        // Keep the default label/state.
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const colors = useMemo(() => dotClasses(status.state), [status.state])

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://status.hemanthr.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            data-no-letter
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs sm:text-sm font-medium text-white shadow-sm backdrop-blur transition-colors dark:border-zinc-200/80 dark:bg-white/90 dark:text-zinc-900 dark:hover:bg-white"
            aria-label="View full system status"
          >
            {/* subtle curved edge sheen on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
            >
              <span className="absolute inset-y-0 -left-8 w-16 rounded-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 blur-sm dark:via-black/10" />
              <span className="absolute inset-y-0 -right-8 w-16 rounded-full bg-gradient-to-l from-white/0 via-white/15 to-white/0 blur-sm dark:via-black/10" />
            </span>
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${colors.ring} animate-ping`}
                aria-hidden="true"
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${colors.dot}`}
                aria-hidden="true"
              />
            </span>
            <span className="leading-none group-hover:underline underline-offset-4">{status.label}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          className="relative overflow-hidden rounded-full px-3 py-2 text-xs border-zinc-700 bg-zinc-900 text-white shadow-lg data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=delayed-open]:slide-in-from-top-2 dark:border-zinc-200 dark:bg-white dark:text-zinc-900"
        >
          {/* curved edge sheen */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80">
            <span className="absolute inset-y-0 -left-8 w-16 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 blur-sm dark:via-black/10" />
            <span className="absolute inset-y-0 -right-8 w-16 rounded-full bg-gradient-to-l from-white/0 via-white/20 to-white/0 blur-sm dark:via-black/10" />
          </span>
          <span className="relative">Open status page</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

