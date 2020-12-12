import markdownItMermaid from '@liradb2000/markdown-it-mermaid'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import calendar from 'markdown-it-calendar'
// import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor'
import wikilinks from 'markdown-it-wikilinks'
import { ToastsStore } from 'react-toasts'

export function useMd() {
  return new MarkdownIt({
    linkify: true,
    html: true,
    breaks: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (e) {
          ToastsStore.error(e)
        }
      }

      return '' // use external default escaping
    },
  })
    .use(wikilinks)
    .use(markdownItMermaid)
    // .use(markdownItTocAndAnchor, {
    //   anchorLinkSymbol: '',
    //   wrapHeadingTextInAnchor: true,
    // })
    .use(calendar)
}
