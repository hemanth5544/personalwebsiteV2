import Link from "next/link"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { notFound } from "next/navigation"
import ThemeToggle from "@/components/theme"
import { blogMdxComponents } from "@/components/blog-mdx"
import { getPostBySlug, getPostSlugs } from "@/lib/blog"

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

export default async function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

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
  const repo = typeof post.data.repo === "string" ? post.data.repo : null

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
          <Link
            href="/blog/"
            className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            All posts
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        {(date || repo) && (
          <p className="mb-10 mt-0 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            {date ? <span>{date}</span> : null}
            {repo ? (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Source on GitHub
              </a>
            ) : null}
          </p>
        )}
        <div className="blog-mdx">{content}</div>
      </article>
    </div>
  )
}
