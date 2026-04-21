import React from 'react';
import { Quote } from '../types/quote';

interface InfoPanelProps {
  selectedQuote: Quote | null;
  onClose: () => void;
  mode?: 'dark' | 'enhanced';
  reasoning?: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedQuote, onClose, mode = 'dark', reasoning }) => {
  if (!selectedQuote) return null;

  const isEnhanced = mode === 'enhanced';

  return (
    <div className={`fixed top-0 right-0 h-full ${isEnhanced ? 'w-96' : 'w-80'} bg-gray-900 bg-opacity-95 text-white p-6 transform transition-transform duration-300 ease-in-out shadow-2xl border-l border-gray-700 z-50`}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
      >
        ×
      </button>

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-400 mr-3">{selectedQuote.name}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
            selectedQuote.type === 'person'
              ? 'bg-yellow-500 text-black'
              : 'bg-blue-500 text-white'
          }`}>
            {selectedQuote.type}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Quote</h3>
          <blockquote className="text-gray-200 italic border-l-4 border-cyan-400 pl-4 leading-relaxed">
            "{selectedQuote.quote}"
          </blockquote>
        </div>

        {reasoning && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">The Wisdom Speaks</h3>
            <p className="text-gray-200 leading-relaxed bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-cyan-500 border-opacity-30">
              {reasoning}
            </p>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <p className="text-gray-300">{selectedQuote.country_region}</p>
        </div>

        {isEnhanced && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Coordinates</h3>
            <p className="text-gray-300 text-sm font-mono">
              {selectedQuote.latitude.toFixed(2)}°N, {selectedQuote.longitude.toFixed(2)}°E
            </p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Background</h3>
          <p className="text-gray-300 leading-relaxed">{selectedQuote.background}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
