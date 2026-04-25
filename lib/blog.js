import fs from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content/blog")

function isSafeSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug)
}

export function slugifyHeading(value) {
  return String(value)
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function createHeadingSlugger() {
  const used = new Map()

  return (value) => {
    const base = slugifyHeading(value) || "section"
    const count = used.get(base) ?? 0
    used.set(base, count + 1)
    return count === 0 ? base : `${base}-${count + 1}`
  }
}

function stripHeadingMarkdown(value) {
  return String(value)
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[\\#*_~]/g, "")
    .trim()
}

export function extractHeadings(content) {
  const slug = createHeadingSlugger()

  return String(content)
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const text = stripHeadingMarkdown(match[2])

      return {
        depth: match[1].length,
        id: slug(text),
        text,
      }
    })
    .filter((heading) => heading.text)
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
