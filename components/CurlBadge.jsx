"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

export default function CurlBadge({ command = "curl https://hemanthr.xyz" }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (err) {
    }
  }

  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 shadow-sm">
      <Terminal className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />

      <span className="text-[100px]  lg:text-lg text-zinc-900 dark:text-zinc-500 shrink-0 hidden sm:block">
        try it →
      </span>

      <code className="text-[10px] lg:text-lg font-mono text-purple-800 dark:text-purple-200 whitespace-nowrap">
        {command}
      </code>

      <div className="w-px h-3.5 bg-zinc-200 dark:bg-zinc-700 shrink-0" />

      <button
        onClick={handleCopy}
        aria-label="Copy command"
        className="shrink-0 text-zinc-400 hover:text-purple-700 dark:hover:text-purple-200 transition-colors duration-150"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  )
}
