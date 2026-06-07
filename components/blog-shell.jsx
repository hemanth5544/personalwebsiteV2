import Link from "next/link"
import ThemeToggle from "@/components/theme"

export function BlogShell({
  children,
  backHref = "/blog/",
  backLabel = "Back to blog",
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-[720px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            href={backHref}
            className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← {backLabel}
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-[720px] px-5 pb-24 pt-2 sm:px-8 sm:pb-32">
        {children}
      </main>
    </div>
  )
}
