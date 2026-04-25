import Link from "next/link"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { notFound } from "next/navigation"
import { CalendarDays, Github, Globe2 } from "lucide-react"
import ThemeToggle from "@/components/theme"
import { blogMdxComponents } from "@/components/blog-mdx"
import { BlogMotion, BlogToc } from "@/components/blog-interactions"
import { extractHeadings, getPostBySlug, getPostSlugs } from "@/lib/blog"

const site = "https://hemanthr.xyz"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const title = typeof post.data.title === "string" ? post.data.title : post.slug
  const description = typeof post.data.description === "string" ? post.data.description : ""
  const ogImage = typeof post.data.image === "string" ? post.data.image : undefined
  const imageUrl =
    ogImage && !ogImage.startsWith("http") ? `${site}${ogImage}` : ogImage
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${site}/blog/${post.slug}/`,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  }
}

function formatDate(date) {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(parsed)
}

export default async function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)

  const { content } = await compileMDX({
    source: post.content,
    components: blogMdxComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  const title = typeof post.data.title === "string" ? post.data.title : post.slug
  const date = typeof post.data.date === "string" ? post.data.date : null
  const description = typeof post.data.description === "string" ? post.data.description : null
  const repo = typeof post.data.repo === "string" ? post.data.repo : null
  const live = typeof post.data.live === "string" ? post.data.live : null
  const formattedDate = formatDate(date)

  return (
    <div
      id="top"
      className="min-h-screen bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_40%,#fafafa_100%)] text-zinc-900 dark:bg-[linear-gradient(180deg,#09090b_0%,#111113_45%,#09090b_100%)] dark:text-zinc-100"
    >
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/85 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Home
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/blog/"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              All posts
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:py-14 xl:grid-cols-[230px_minmax(0,760px)] xl:gap-12">
        <aside className="order-2 hidden xl:order-1 xl:block">
          <BlogToc headings={headings} className="sticky top-24" />
        </aside>

        <div className="order-1 min-w-0 xl:order-2">
          <BlogMotion
            as="header"
            className="mb-8 rounded-lg border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 sm:p-8"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
                Row locks
              </span>
              {formattedDate ? (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {formattedDate}
                </span>
              ) : null}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
                {description}
              </p>
            ) : null}
            {(repo || live) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {repo ? (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-white"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source
                  </a>
                ) : null}
                {live ? (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 bg-zinc-950 px-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:border-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    <Globe2 className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a>
                ) : null}
              </div>
            )}
          </BlogMotion>

          <BlogToc headings={headings} compact className="mb-8 xl:hidden" />

          <BlogMotion
            as="article"
            delay={0.08}
            className="rounded-lg border border-zinc-200 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 sm:p-8"
          >
            <div className="blog-mdx">{content}</div>
          </BlogMotion>
        </div>
      </main>
    </div>
  )
}
