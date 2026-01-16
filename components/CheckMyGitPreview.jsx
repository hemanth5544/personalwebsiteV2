"use client"

import { useState } from "react"
import { ExternalLink, BarChart3 } from "lucide-react"
import preview from "@/assets/preview.png"
import Image from 'next/image'
import GithubIcon from "./ui/github-icon"

export default function CheckMyGitPreview({ username = "hemanth5544" }) {
  const [showPreview, setShowPreview] = useState(false)

  const checkMyGitUrl = `https://checkmygit.com/${username}`

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
 <a
  href={checkMyGitUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center gap-3 px-5 py-3 bg-blue-600 dark:bg-zinc-700 text-white dark:text-zinc-200 rounded-lg border border-transparent hover:bg-blue-700 dark:hover:bg-zinc-600 hover:shadow-lg transition-all duration-300 ease-in-out"
>
  <GithubIcon className="w-5 h-5 text-white" />
  <span className="text-sm font-medium">View GitHub</span>
  <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
</a>


      {/* Hover Card Preview */}
      {showPreview && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 rotate-45 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-700"></div>
          
          {/* Preview Card */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
            <Image
              src={preview}
              alt="CheckMyGit preview"
              width={400}
              height={250}
              className="w-[400px] h-auto max-w-[90vw] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}
