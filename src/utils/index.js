// eslint-disable-next-line
const punctuation = /[-='"!?,;@#$%^&*\(\)\\\]\[\{\}]/g
// eslint-disable-next-line
const emojis = /\s*(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s*/g

export const toIdTitle = (title, id) => (`${title
  .replace(punctuation, '')
  .replace(emojis, ' ')
  .trim()
  .toLowerCase()
  .split(' ')
  .join('_')}`.concat(id ? `_${id}` : ''))

export const toSlugCase = (str) => str.replace(/([A-Z])/g, '-$1').toLowerCase()
