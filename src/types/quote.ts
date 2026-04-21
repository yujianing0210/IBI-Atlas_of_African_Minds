export interface Quote {
  id: number;
  quote: string;
  name: string;
  type: 'person' | 'tribe';
  country_region: string;
  latitude: number;
  longitude: number;
  background: string;
}

export interface QuoteMatchResult {
  entry: Quote;
  reasoning: string;
  score: number;
}
