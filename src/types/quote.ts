export interface QuoteEntry {
  source: string
  location: string
  latitude: number
  longitude: number
  background: string
  quote: string
}

export interface QuoteMatchResult {
  entry: QuoteEntry
  reasoning: string
  score: number
}
