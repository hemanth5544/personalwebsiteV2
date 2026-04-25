import Link from "next/link"
import ThemeToggle from "@/components/theme"
import { getAllPostsMeta } from "@/lib/blog"

export const metadata = {
  title: "Blog",
  description: "Notes on backend systems, concurrency, and projects.",
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="container mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Home
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mb-10 text-zinc-600 dark:text-zinc-400">
          Write-ups on systems I build or interests me
        </p>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className="group block">
                <h2 className="text-xl font-medium text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {post.title}
                </h2>
                {post.description ? (
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.description}</p>
                ) : null}
                {post.date ? (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">{post.date}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
