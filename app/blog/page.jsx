import Link from "next/link"
import { BlogShell } from "@/components/blog-shell"
import { getAllPostsMeta } from "@/lib/blog"

export const metadata = {
  title: "Blog",
  description: "Notes on backend systems, concurrency, and projects.",
}

function formatDateISO(date) {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toISOString().slice(0, 10)
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta()

  return (
    <BlogShell backHref="/" backLabel="Home">
      <h1 className="mb-10 text-[1.75rem] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:mb-12 sm:text-[2.25rem]">
        Blog
      </h1>

      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {posts.map((post) => {
          const date = formatDateISO(post.date)
          return (
            <li key={post.slug} className="py-8 first:pt-0">
              <Link href={`/blog/${post.slug}/`} className="group block">
                <h2 className="text-lg font-semibold leading-snug text-zinc-950 transition-colors group-hover:underline dark:text-zinc-50 sm:text-xl">
                  {post.title}
                </h2>
                {post.description ? (
                  <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                ) : null}
                {date ? (
                  <time
                    dateTime={date}
                    className="mt-3 block text-sm text-zinc-500 dark:text-zinc-500"
                  >
                    {date}
                  </time>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </BlogShell>
  )
}
