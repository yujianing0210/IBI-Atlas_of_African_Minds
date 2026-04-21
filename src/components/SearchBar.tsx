import React, { useState } from 'react';
import { Quote } from '../types/quote';

interface SearchBarProps {
  quotes: Quote[];
  onQuoteSelect: (quote: Quote | null) => void;
  selectedQuote: Quote | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ quotes, onQuoteSelect, selectedQuote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredQuotes = quotes.filter(quote =>
    quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.country_region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (quote: Quote) => {
    onQuoteSelect(quote);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search quotes, names, or places..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => searchTerm && setIsOpen(true)}
          className="w-80 px-4 py-2 bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        {isOpen && filteredQuotes.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-gray-900 bg-opacity-95 border border-gray-700 rounded-lg max-h-60 overflow-y-auto z-20">
            {filteredQuotes.slice(0, 10).map((quote) => (
              <button
                key={quote.id}
                onClick={() => handleSelect(quote)}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg border-b border-gray-800 last:border-b-0"
              >
                <div className="text-white font-medium">{quote.name}</div>
                <div className="text-gray-400 text-sm">{quote.country_region}</div>
                <div className="text-gray-500 text-xs truncate mt-1">{quote.quote.substring(0, 60)}...</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;