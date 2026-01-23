"use client"

import { useEffect, useState } from "react"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load Cal.com embed script
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      document.body.appendChild(script)
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.Cal) {
      window.Cal('init', { origin: 'https://cal.com' })
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  if (!mounted) return null

  return (
    <>
      <Button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-[100] rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700"
        aria-label="Book a meeting"
        data-no-letter
      >
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-4xl mx-4 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden animate-scale-in border border-zinc-200 dark:border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <Calendar className="h-5 w-5 text-zinc-900 dark:text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-white">
                  Schedule a Meeting
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                aria-label="Close calendar"
                data-no-letter
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div 
                className="w-full"
                style={{ height: 'calc(85vh - 80px)', minHeight: '500px', maxHeight: '700px' }}
              >
                <iframe
                  src="https://cal.com/hemanth-fb8fvx"
                  className="w-full h-full border-0"
                  frameBorder="0"
                  title="Book a meeting"
                  allow="payment"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        /* Custom Scrollbar Styles */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(161, 161, 170, 0.5) transparent;
          scroll-behavior: smooth;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(161, 161, 170, 0.5);
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(113, 113, 122, 0.7);
        }

        /* Dark mode scrollbar */
        .dark .custom-scrollbar {
          scrollbar-color: rgba(161, 161, 170, 0.3) transparent;
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(161, 161, 170, 0.3);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(161, 161, 170, 0.5);
        }
      `}</style>
    </>
  )
}
