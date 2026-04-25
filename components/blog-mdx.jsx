import Link from "next/link"
import { BlogCodeBlock } from "@/components/blog-interactions"
import { createHeadingSlugger } from "@/lib/blog"

function isExternal(href) {
  return href?.startsWith("http://") || href?.startsWith("https://") || href?.startsWith("//")
}

function getTextContent(node) {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join("")
  if (node?.props?.children) return getTextContent(node.props.children)
  return ""
}

function getLanguage(className = "") {
  const match = className.match(/language-([\w-]+)/)
  return match?.[1] ?? "text"
}

export function blogMdxComponents() {
  const headingSlug = createHeadingSlugger()

  return {
    h2: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = headingSlug(text)

      return (
        <h2 id={id} {...props}>
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = headingSlug(text)

      return (
        <h3 id={id} {...props}>
          <a href={`#${id}`} className="heading-anchor">
            {children}
          </a>
        </h3>
      )
    },
    a: ({ href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>
      if (isExternal(href)) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        )
      }
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    },
    pre: ({ children }) => {
      const codeElement = Array.isArray(children) ? children[0] : children
      const code = getTextContent(codeElement)
      const language = getLanguage(codeElement?.props?.className)

      return <BlogCodeBlock code={code} language={language} />
    },
    img: ({ alt, src, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt ?? ""}
        src={src}
        className="my-8 h-auto w-full rounded-lg border border-zinc-200 bg-white object-contain shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:brightness-[0.98]"
        loading="lazy"
        {...props}
      />
    ),
  }
}
