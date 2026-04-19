import Link from "next/link"

function isExternal(href) {
  return href?.startsWith("http://") || href?.startsWith("https://") || href?.startsWith("//")
}

export function blogMdxComponents() {
  return {
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
    img: ({ alt, src, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt ?? ""}
        src={src}
        className="my-8 h-auto w-full max-w-3xl rounded-xl border border-zinc-200 object-contain dark:border-zinc-700 dark:brightness-[0.98] shadow-sm"
        loading="lazy"
        {...props}
      />
    ),
  }
}
