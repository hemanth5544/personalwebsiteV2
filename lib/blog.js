import fs from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content/blog")

function isSafeSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)
}

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/i, ""))
    .filter(isSafeSlug)
}

/** @param {string} slug */
export function getPostBySlug(slug) {
  if (!isSafeSlug(slug)) return null
  const full = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(full)) return null
  const raw = fs.readFileSync(full, "utf8")
  const { data, content } = matter(raw)
  return { slug, data, content }
}

export function getAllPostsMeta() {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null
      return {
        slug: post.slug,
        title: post.data.title ?? slug,
        description: post.data.description ?? "",
        date: post.data.date ? String(post.data.date) : "",
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0
      const db = b.date ? new Date(b.date).getTime() : 0
      return db - da
    })
}
