import { QuoteEntry, QuoteMatchResult } from '../types/quote'

const stopwords = new Set([
  'the', 'and', 'or', 'but', 'if', 'to', 'a', 'an', 'of', 'in', 'on', 'for', 'with', 'it', 'is', 'as', 'by', 'at', 'from', 'that', 'this', 'you', 'your', 'are', 'be', 'can', 'have', 'has', 'was', 'were', 'will', 'would', 'should', 'about', 'when', 'where', 'why', 'how', 'who', 'which', 'do', 'does', 'did', 'too', 'so', 'not', 'its', 'their', 'they', 'them', 'we', 'our', 'my', 'me'
])

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/['"“”‘’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const extractTerms = (text: string) =>
  normalize(text)
    .split(' ')
    .filter((word) => word.length > 2 && !stopwords.has(word))

const scoreText = (terms: string[], text: string) => {
  const normalized = normalize(text)
  let score = 0
  terms.forEach((term) => {
    const regex = new RegExp(`\\b${term}\\b`, 'g')
    const matches = normalized.match(regex)
    if (matches) {
      score += matches.length
    }
  })
  return score
}

const createReasoning = (query: string, entry: QuoteEntry) => {
  const queryTerms = extractTerms(query)
  const overlap = queryTerms.filter((term) => {
    const haystack = [entry.background, entry.quote, entry.location, entry.source].join(' ')
    return normalize(haystack).includes(term)
  })

  const explanationParts: string[] = []
  if (overlap.length > 0) {
    explanationParts.push(
      `你的提问中包含了“${overlap.join('、')}”等关键词，这与这句语录中的主题相呼应。`,
    )
  } else {
    explanationParts.push(
      '这条引用虽然没有直接重复你的词汇，但它在情感和意象上与您的问题产生了共鸣。',
    )
  }

  explanationParts.push(`它来自 ${entry.source}，背景是“${entry.background}”。`)
  explanationParts.push(`这句语录说：“${entry.quote}”，它可以帮助你把困惑转化为一种更诗意的理解。`)

  return explanationParts.join(' ')
}

export function findBestQuote(query: string, quotes: QuoteEntry[]): QuoteMatchResult {
  const terms = extractTerms(query)

  const scored = quotes.map((entry) => {
    const quoteScore = scoreText(terms, entry.quote) * 4
    const backgroundScore = scoreText(terms, entry.background) * 2
    const locationScore = scoreText(terms, entry.location)
    const sourceScore = scoreText(terms, entry.source)
    const total = quoteScore + backgroundScore + locationScore + sourceScore
    return {
      entry,
      score: total,
    }
  })

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0] || { entry: quotes[0], score: 0 }
  if (best.score === 0) {
    const fallbackIndex = Math.abs(query.length) % quotes.length
    return {
      entry: quotes[fallbackIndex],
      score: 0,
      reasoning: createReasoning(query, quotes[fallbackIndex]),
    }
  }

  return {
    entry: best.entry,
    score: best.score,
    reasoning: createReasoning(query, best.entry),
  }
}
