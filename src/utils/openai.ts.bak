import type { QuoteEntry } from '../types/quote'

const OPENAI_API_URL = '/openai/chat/completions'

const buildSystemMessage = () => ({
  role: 'system' as const,
  content:
    'You are a thoughtful, poetic assistant. Given a question and a quote, explain why the quote resonates with the question and how it can guide the asker.',
})

const buildUserMessage = (query: string, entry: QuoteEntry) => ({
  role: 'user' as const,
  content: `Question: ${query}\n\nQuote: ${entry.quote}\nSource: ${entry.source}\nLocation: ${entry.location}\nBackground: ${entry.background}\n\nPlease provide a concise reasoning statement explaining why this quote is a meaningful response to the question.`,
})

export async function generateOpenAIReasoning(query: string, entry: QuoteEntry) {
  const apiKey = import.meta.env.OPENAI_API_KEY ?? import.meta.env.VITE_OPENAI_API_KEY
  const model = import.meta.env.OPENAI_MODEL ?? 'gpt-4o-mini'

  if (!apiKey) {
    return 'OpenAI API key is not configured. Add OPENAI_API_KEY to your environment to generate LLM reasoning.'
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [buildSystemMessage(), buildUserMessage(query, entry)],
        max_tokens: 260,
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      return `OpenAI request failed: ${response.status} ${response.statusText} - ${errorBody}`
    }

    const json = await response.json()
    const text = json?.choices?.[0]?.message?.content
    return typeof text === 'string' ? text.trim() : 'OpenAI did not return a usable response.'
  } catch (error) {
    return `Failed to generate reasoning with OpenAI: ${error instanceof Error ? error.message : String(error)}`
  }
}
