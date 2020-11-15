import MarkdownIt from 'markdown-it'
import wikilinks from 'markdown-it-wikilinks'

export function useMd() {
  return new MarkdownIt({
    linkify: true,
    html: true,
    breaks: true,
  }).use(wikilinks)
}
