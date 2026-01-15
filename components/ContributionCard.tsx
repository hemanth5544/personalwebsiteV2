'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp, GitMerge, GitPullRequest, XCircle } from 'lucide-react'
import { fallbackContributions } from './github'

interface Contribution {
  title: string
  description: string
  repository: string
  link: string
  date: string
  type?: 'feature' | 'fix' | 'perf' | 'docs' | 'refactor' | 'test' | 'chore'
  state?: 'open' | 'closed' | 'merged'
}



export default function OpenSourceContributionsCard() {
  const { theme } = useTheme()
  const [showAll, setShowAll] = useState(false)
  const [contributions] = useState<Contribution[]>(fallbackContributions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContributions = async () => {
      try {
        setLoading(true)
        
        // const response = await fetch('/api/github-contributions?username=hemanth5544&limit=50')
        // const data = await response.json()
        
        // if (data.success && data.contributions.length > 0) {
          // setContributions(data.contributions)
        // }
      } catch (error) {
        console.error('Failed to load GitHub contributions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContributions()
  }, [])

  const displayedContributions = showAll ? contributions : contributions.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-lg bg-white dark:bg-zinc-900 p-3 sm:p-6"
    >
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-4 animate-pulse">
                <div className="flex gap-3 flex-1 min-w-0">
                  {/* Icon skeleton */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 mt-1 bg-zinc-300 dark:bg-zinc-700 rounded flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Title and date */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="h-5 sm:h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3" />
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-12" />
                    </div>
                    
                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                    </div>
                  </div>
                </div>

                {/* Arrow button skeleton */}
                <div className="w-8 h-8 bg-zinc-300 dark:bg-zinc-700 rounded-lg flex-shrink-0" />
              </div>
              
              {i < 3 && <div className="mt-4 border-b border-zinc-300 dark:border-zinc-700" />}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedContributions.map((contribution, index) => (
          <motion.div
            key={contribution.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
           <Link
              href={contribution.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-4 cursor-pointer p-3 -mx-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-200"
            >
              <div className="flex flex-1 gap-3 min-w-0">

                {contribution.state === 'merged' && (
                  <GitMerge className="mt-1 w-5 h-5 sm:w-6 sm:h-6 text-purple-900 dark:text-purple-600 flex-shrink-0" />
                )}
                {contribution.state === 'open' && (
                  <GitPullRequest className="mt-1 w-5 h-5 sm:w-6 sm:h-6 text-green-900 dark:text-green-600 flex-shrink-0" />
                )}
                {contribution.state === 'closed' && (
                  <XCircle className="mt-1 w-5 h-5 sm:w-6 sm:h-6 text-red-900 dark:text-red-600 flex-shrink-0" />
                )}

                 <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-[#006FEE] dark:group-hover:text-[#006FEE] transition-colors duration-200">
                      {contribution.title}
                    </h4>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                      {contribution.date}
                    </span>
                  </div>

                  <p className="text-md text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-200">
                    {contribution.description}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 p-2 rounded-lg 
                          bg-neutral-200 border-2 border-neutral-400
                          dark:bg-neutral-800 dark:border-neutral-600
                          group-hover:bg-[#006FEE] group-hover:border-[#006FEE]
                          dark:group-hover:bg-[#006FEE] dark:group-hover:border-[#006FEE]
                          transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-white transition-colors" />
              </div>
            </Link>

            
            {index < displayedContributions.length - 1 && (
              <div className="mt-4 border-b border-neutral-300 dark:border-[#2E2E2E]" />
            )}
          </motion.div>
          ))}
        </div>
      )}


      {/* Show More/Less Toggle */}
      {!loading && contributions.length > 3 && (
        <div className="mt-4 pt-4 border-t border-neutral-300 dark:border-[#2E2E2E]">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200 group"
          >
            <span>{showAll ? 'Show less' : `Show all ${contributions.length} contributions`}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  )
}
