import React, { useState, useEffect } from 'react';
import GlobeScene from './components/GlobeScene';
import GlobeTabs from './components/GlobeTabs';
import GlobeTitle from './components/GlobeTitle';
import SearchBar from './components/SearchBar';
import Legend from './components/Legend';
import InfoPanel from './components/InfoPanel';
import QuestionInput from './components/QuestionInput';
import AnswerGuidance from './components/AnswerGuidance';
import { Quote } from './types/quote';
import { searchRelevantQuote, SearchResult } from './utils/quoteSearch';

function App() {
  const [mode, setMode] = useState<'dark' | 'enhanced'>('enhanced'); // Start with enhanced for better UX
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [currentReasoning, setCurrentReasoning] = useState('');

  useEffect(() => {
    // Load quotes from public/data/quotes.json
    fetch('/data/quotes.json')
      .then(response => response.json())
      .then(data => setQuotes(data))
      .catch(error => console.error('Error loading quotes:', error));
  }, []);

  const handleQuestionSubmit = async (question: string) => {
    if (!quotes.length) return;

    setIsSearching(true);

    try {
      const result: SearchResult | null = await searchRelevantQuote(question, quotes);

      if (result) {
        setCurrentReasoning(result.reasoning);
        setSelectedQuote(result.quote);
        setShowGuidance(true);
      }
    } catch (error) {
      console.error('Error searching for quote:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGuidanceComplete = () => {
    setShowGuidance(false);
  };

  const handleQuoteSelect = (quote: Quote | null) => {
    setSelectedQuote(quote);
  };

  const handleClosePanel = () => {
    setSelectedQuote(null);
    setCurrentReasoning('');
  };

  const handleModeChange = (newMode: 'dark' | 'enhanced') => {
    setMode(newMode);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GlobeScene
        mode={mode}
        quotes={quotes}
        onQuoteSelect={handleQuoteSelect}
        selectedQuote={selectedQuote}
      />

      {/* Enhanced mode specific UI */}
      {mode === 'enhanced' && (
        <>
          <GlobeTitle />
          <SearchBar
            quotes={quotes}
            onQuoteSelect={handleQuoteSelect}
            selectedQuote={selectedQuote}
          />
          <Legend />
        </>
      )}

      {/* Answer Guidance */}
      {showGuidance && (
        <AnswerGuidance
          selectedQuote={selectedQuote}
          onComplete={handleGuidanceComplete}
        />
      )}

      <InfoPanel
        selectedQuote={selectedQuote}
        onClose={handleClosePanel}
        mode={mode}
        reasoning={currentReasoning}
      />

      {/* Question Input - always visible */}
      <QuestionInput
        onQuestionSubmit={handleQuestionSubmit}
        isLoading={isSearching}
      />

      {/* Mode tabs - positioned to not interfere with question input */}
      <div className="absolute top-4 left-4 z-10">
        <GlobeTabs mode={mode} onModeChange={handleModeChange} />
      </div>
    </div>
  );
}

export default App;
