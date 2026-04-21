import React, { useState } from 'react';

interface QuestionInputProps {
  onQuestionSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onQuestionSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onQuestionSubmit(question.trim());
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 p-6">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-95 rounded-lg p-6 border border-gray-700 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            What is your question or dilemma?
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? 'Searching...' : 'Find Answer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionInput;