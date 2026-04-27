import { useEffect, useState } from 'react'
import './markdown-page.css'

function parseInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

function markdownToHtml(md: string): string {
  const lines = md.split('\n')
  const html: string[] = []
  let inList = false
  let inTable = false
  let tableRows: string[][] = []
  let tableAligns: string[] = []

  const flushTable = () => {
    if (!inTable) return
    inTable = false
    let t = '<table><thead><tr>'
    for (let i = 0; i < tableRows[0].length; i++) {
      t += `<th>${parseInlineMarkdown(tableRows[0][i])}</th>`
    }
    t += '</tr></thead><tbody>'
    for (let r = 1; r < tableRows.length; r++) {
      t += '<tr>'
      for (let c = 0; c < tableRows[r].length; c++) {
        const align = tableAligns[c] || ''
        t += `<td${align ? ` style="text-align:${align}"` : ''}>${parseInlineMarkdown(tableRows[r][c])}</td>`
      }
      t += '</tr>'
    }
    t += '</tbody></table>'
    html.push(t)
    tableRows = []
    tableAligns = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.slice(1, -1).split('|').map(c => c.trim())

      // Separator row
      if (cells.every(c => /^[-:]+$/.test(c))) {
        tableAligns = cells.map(c => {
          if (c.startsWith(':') && c.endsWith(':')) return 'center'
          if (c.endsWith(':')) return 'right'
          return 'left'
        })
        inTable = true
        continue
      }

      if (inTable || (i + 1 < lines.length && lines[i + 1].trim().match(/^\|[-:|]+\|$/))) {
        tableRows.push(cells)
        continue
      }
    } else {
      flushTable()
    }

    // Blank line
    if (trimmed === '') {
      if (inList) { html.push('</ul>'); inList = false }
      continue
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      if (inList) { html.push('</ul>'); inList = false }
      html.push('<hr />')
      continue
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      if (inList) { html.push('</ul>'); inList = false }
      const level = headingMatch[1].length
      const text = headingMatch[2]
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      html.push(`<h${level} id="${id}">${parseInlineMarkdown(text)}</h${level}>`)
      continue
    }

    // List items
    if (trimmed.startsWith('- ')) {
      if (!inList) { html.push('<ul>'); inList = true }
      html.push(`<li>${parseInlineMarkdown(trimmed.slice(2))}</li>`)
      continue
    }

    // Paragraph
    if (inList) { html.push('</ul>'); inList = false }
    html.push(`<p>${parseInlineMarkdown(trimmed)}</p>`)
  }

  if (inList) html.push('</ul>')
  flushTable()
  return html.join('\n')
}

export function MarkdownPage({ src }: { src: string }) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    fetch(src)
      .then(r => r.text())
      .then(md => setHtml(markdownToHtml(md)))
  }, [src])

  if (!html) return null

  return (
    <div className="md-page">
      <div className="md-page-inner" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
