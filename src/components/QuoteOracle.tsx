import { useState, type FormEvent } from 'react'
import QuoteMap from './QuoteMap'
import { findBestQuote } from '../utils/quoteSearch'
import { generateOpenAIReasoning } from '../utils/openai'
import type { QuoteEntry, QuoteMatchResult } from '../types/quote'
import quotes from '../data/quotes.json'

const quoteEntries = quotes as QuoteEntry[]

export default function QuoteOracle() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<QuoteMatchResult | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return

    const match = findBestQuote(query, quoteEntries)
    setResult({ ...match, reasoning: '' })
    setShowPopup(false)
    setIsGenerating(true)

    const reasoning = await generateOpenAIReasoning(query, match.entry)
    setResult({ ...match, reasoning })
    setIsGenerating(false)
  }

  const handleMarkerClick = () => {
    setShowPopup(true)
  }

  return (
    <div className={`w-full ${result ? 'space-y-4' : 'max-w-2xl'}`}>
      <div className={`mx-auto w-full ${result ? 'max-w-3xl' : 'max-w-2xl'}`}>
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-3 rounded-[24px] border border-white/10 bg-black/55 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
        >
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={1}
            className="max-h-36 min-h-12 flex-1 resize-none border-0 bg-transparent px-3 py-3 text-base text-slate-100 outline-none placeholder:text-slate-500"
            placeholder="Ask..."
            aria-label="Question"
          />
          <button
            type="submit"
            disabled={isGenerating || !query.trim()}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-slate-950 shadow-lg shadow-white/10 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Submit"
          >
            {isGenerating ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/25 border-t-slate-950" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {result ? <QuoteMap result={result} onMarkerClick={handleMarkerClick} showPopup={showPopup} /> : null}
    </div>
  )
}
