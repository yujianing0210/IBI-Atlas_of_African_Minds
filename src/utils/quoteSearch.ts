import { Quote } from '../types/quote';
import OpenAI from 'openai';

export interface SearchResult {
  quote: Quote;
  reasoning: string;
  score: number;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Allow browser usage for client-side calls
});

export async function searchRelevantQuote(question: string, quotes: Quote[]): Promise<SearchResult | null> {
  try {
    // Create a prompt that includes all quotes for the AI to analyze
    const quotesText = quotes.map((quote, index) =>
      `Quote ${index + 1}:
Name: ${quote.name}
Type: ${quote.type}
Location: ${quote.country_region}
Quote: "${quote.quote}"
Background: ${quote.background}`
    ).join('\n\n');

    const prompt = `You are a wise oracle from African cultural traditions, speaking directly to someone seeking guidance. Given the user's question and the collection of quotes below, find the single most relevant quote that best addresses their question.

User's question: "${question}"

Available quotes:
${quotesText}

Instructions:
1. Find the quote that provides the most meaningful insight or guidance for this question
2. Respond directly to the user in a conversational, empathetic, and wise tone - as if you are speaking to them personally
3. Draw wisdom from the selected quote to address their specific question or concern
4. Make the response feel like a personal conversation, not an academic analysis
5. Keep the response warm, supportive, and culturally grounded

IMPORTANT: Respond ONLY with valid JSON. Do not include any markdown formatting, code blocks, or additional text. Just the JSON object.

Response format:
{
  "quoteIndex": <number of the selected quote (1-based)>,
  "reasoning": "<your direct, conversational response to the user, drawing wisdom from the selected quote>",
  "relevanceScore": <number from 1-10 indicating how well the quote addresses the question>
}`;

    const completion = await openai.chat.completions.create({
      model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a wise elder from African traditions, speaking directly and personally to someone seeking guidance. Respond in a warm, conversational tone as if having a one-on-one conversation. You must respond ONLY with valid JSON. No markdown, no code blocks, no additional text - just pure JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const result = JSON.parse(response);
    const quoteIndex = result.quoteIndex - 1; // Convert to 0-based index
    const selectedQuote = quotes[quoteIndex];

    if (!selectedQuote) {
      throw new Error('Invalid quote index returned by OpenAI');
    }

    return {
      quote: selectedQuote,
      reasoning: result.reasoning,
      score: result.relevanceScore || 5
    };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);

    // Fallback to keyword-based search if OpenAI fails
    console.log('Falling back to keyword-based search...');
    return fallbackKeywordSearch(question, quotes);
  }
}

// Fallback keyword-based search (original implementation)
function fallbackKeywordSearch(question: string, quotes: Quote[]): SearchResult {
  const questionLower = question.toLowerCase();

  // Keywords that might relate to different themes
  const themeKeywords = {
    creativity: ['create', 'art', 'beauty', 'music', 'poetry', 'write', 'paint', 'sing', 'dance'],
    wisdom: ['wise', 'knowledge', 'learn', 'understand', 'truth', 'wisdom'],
    struggle: ['fight', 'struggle', 'overcome', 'hardship', 'pain', 'suffering'],
    community: ['together', 'community', 'family', 'people', 'unity', 'together'],
    identity: ['who am i', 'identity', 'self', 'belong', 'culture', 'heritage'],
    beauty: ['beautiful', 'beauty', 'aesthetic', 'appearance', 'looks'],
    power: ['power', 'strength', 'weak', 'strong', 'control'],
    change: ['change', 'transform', 'grow', 'evolve', 'different']
  };

  let bestMatch: Quote | null = null;
  let bestScore = 0;
  let reasoning = '';

  for (const quote of quotes) {
    let score = 0;
    const quoteText = quote.quote.toLowerCase();
    const background = quote.background.toLowerCase();

    // Check for direct keyword matches
    for (const [theme, keywords] of Object.entries(themeKeywords)) {
      if (keywords.some(keyword => questionLower.includes(keyword))) {
        if (quoteText.includes(theme) || background.includes(theme)) {
          score += 3;
        }
        // Check if quote contains related keywords
        if (keywords.some(keyword => quoteText.includes(keyword))) {
          score += 2;
        }
      }
    }

    // Check for cultural/contextual relevance
    if (questionLower.includes('africa') && quote.country_region.toLowerCase().includes('africa')) {
      score += 2;
    }

    if (questionLower.includes('black') || questionLower.includes('race')) {
      if (quote.country_region.includes('USA') || quote.type === 'person') {
        score += 2;
      }
    }

    // Random selection with some bias toward higher scores
    if (score > bestScore || (score === bestScore && Math.random() > 0.7)) {
      bestMatch = quote;
      bestScore = score;

      // Generate reasoning based on the match
      if (score >= 3) {
        reasoning = `This quote resonates with your question about ${questionLower.includes('beauty') ? 'beauty and perception' : questionLower.includes('power') ? 'power and strength' : questionLower.includes('change') ? 'transformation' : 'human experience'}. The wisdom of ${quote.name} offers insight into these themes.`;
      } else {
        reasoning = `Through the lens of cultural wisdom, this quote from ${quote.name} provides perspective on your question. Sometimes the most profound answers come from unexpected sources.`;
      }
    }
  }

  if (bestMatch) {
    return {
      quote: bestMatch,
      reasoning,
      score: bestScore
    };
  }

  // Fallback: return a random quote if no good match
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return {
    quote: randomQuote,
    reasoning: `When seeking answers, sometimes the universe guides us to wisdom that transcends our immediate concerns. This quote from ${randomQuote.name} invites reflection on broader questions of human experience.`,
    score: 0
  };
}