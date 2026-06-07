import Link from "next/link"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { notFound } from "next/navigation"
import { BlogShell } from "@/components/blog-shell"
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

function formatDateISO(date) {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toISOString().slice(0, 10)
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
  const live = typeof post.data.live === "string" ? post.data.live : null
  const formattedDate = formatDateISO(date)

  return (
    <BlogShell backHref="/blog/" backLabel="Back to blog">
      <article>
        <header className="mb-10 sm:mb-12">
          <h1 className="text-[1.75rem] font-bold leading-[1.2] tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-[2.25rem]">
            {title}
          </h1>
          {formattedDate ? (
            <time
              dateTime={formattedDate}
              className="mt-3 block text-sm text-zinc-500 dark:text-zinc-400"
            >
              {formattedDate}
            </time>
          ) : null}
        </header>

        <div className="blog-mdx">{content}</div>

        {(repo || live) && (
          <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {repo ? (
                <li>
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Source
                  </a>
                </li>
              ) : null}
              {live ? (
                <li>
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Live demo
                  </a>
                </li>
              ) : null}
              <li>
                <Link
                  href="/blog/"
                  className="text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  All posts
                </Link>
              </li>
            </ul>
          </footer>
        )}
      </article>
    </BlogShell>
  )
}
