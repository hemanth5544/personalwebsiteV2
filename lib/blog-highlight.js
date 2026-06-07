function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function wrap(className, value) {
  return `<span class="${className}">${escapeHtml(value)}</span>`
}

const JS_KEYWORDS =
  /\b(await|async|break|case|catch|class|const|continue|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|let|new|null|return|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield|true|false|interface|type|enum|implements|declare|as|of)\b/g

const JS_BUILTINS =
  /\b(console\.\w+|Math\.\w+|Number\.\w+|Object\.\w+|Array\.\w+|JSON\.\w+|Promise\.\w+|process\.\w+)\b/g

const SQL_KEYWORDS =
  /\b(SELECT|FROM|WHERE|INSERT|INTO|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|VALUES|AS|AND|OR|NOT|NULL|PRIMARY|KEY|FOREIGN|REFERENCES|COUNT|DISTINCT|UNION|ALL|EXISTS|IN|LIKE|BETWEEN|CASE|WHEN|THEN|ELSE|END|BEGIN|COMMIT|ROLLBACK|TRANSACTION|FOR|UPDATE|LOCK|RETURNING)\b/gi

export const languageLabels = {
  bash: "BASH",
  js: "JAVASCRIPT",
  javascript: "JAVASCRIPT",
  json: "JSON",
  sh: "SHELL",
  shell: "SHELL",
  sql: "SQL",
  text: "TEXT",
  ts: "TYPESCRIPT",
  typescript: "TYPESCRIPT",
}

export function getLanguageLabel(language = "text") {
  return languageLabels[language.toLowerCase()] ?? language.toUpperCase()
}

export function highlightCode(code, language = "text") {
  const lang = language.toLowerCase()
  if (!code || lang === "text") {
    return escapeHtml(code)
  }

  const placeholders = []
  let index = 0

  function stash(value, className) {
    const token = `__HL${index}__`
    index += 1
    placeholders.push({ token, html: wrap(className, value) })
    return token
  }

  let source = escapeHtml(code)

  source = source.replace(/\/\*[\s\S]*?\*\//g, (match) => stash(match, "hl-comment"))
  source = source.replace(/\/\/[^\n]*/g, (match) => stash(match, "hl-comment"))
  source = source.replace(/--[^\n]*/g, (match) => stash(match, "hl-comment"))

  if (lang === "bash" || lang === "sh" || lang === "shell") {
    source = source.replace(/#[^\n]*/g, (match) => stash(match, "hl-comment"))
  }
  source = source.replace(
    /(`(?:\\.|[^`])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
    (match) => stash(match, "hl-string"),
  )

  if (lang === "js" || lang === "javascript" || lang === "ts" || lang === "typescript") {
    source = source.replace(JS_BUILTINS, (match) => stash(match, "hl-builtin"))
    source = source.replace(JS_KEYWORDS, (match) => stash(match, "hl-keyword"))
    source = source.replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => stash(match, "hl-number"))
  } else if (lang === "sql") {
    source = source.replace(SQL_KEYWORDS, (match) => stash(match, "hl-keyword"))
    source = source.replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => stash(match, "hl-number"))
  } else if (lang === "json") {
    source = source.replace(
      /"(?:\\.|[^"\\])*"(?=\s*:)/g,
      (match) => stash(match, "hl-property"),
    )
    source = source.replace(/\b(true|false|null)\b/g, (match) => stash(match, "hl-keyword"))
    source = source.replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => stash(match, "hl-number"))
  } else if (lang === "bash" || lang === "sh" || lang === "shell") {
    source = source.replace(
      /\b(curl|echo|export|cd|npm|bun|node|git|docker|sudo|chmod|mkdir|rm|cp|mv|grep|cat|ls|if|then|fi|else|for|do|done)\b/g,
      (match) => stash(match, "hl-keyword"),
    )
  }

  for (const { token, html } of placeholders) {
    source = source.split(token).join(html)
  }

  return source
}
