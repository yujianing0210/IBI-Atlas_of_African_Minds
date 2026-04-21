import React, { useEffect, useState } from 'react';
import { Quote } from '../types/quote';

interface AnswerGuidanceProps {
  selectedQuote: Quote | null;
  onComplete: () => void;
}

const AnswerGuidance: React.FC<AnswerGuidanceProps> = ({ selectedQuote, onComplete }) => {
  const [showLine, setShowLine] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (selectedQuote) {
      // Start the guidance animation
      setShowLine(true);

      // Animate the line growing from bottom center to the quote location
      const duration = 3000; // 3 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setLineProgress(progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete
          setTimeout(onComplete, 500);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [selectedQuote, onComplete]);

  if (!selectedQuote || !showLine) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {/* Guidance overlay - simplified without reasoning text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
        <div className="bg-black bg-opacity-90 text-white p-6 rounded-lg max-w-md border border-cyan-500 shadow-2xl">
          <h3 className="text-lg font-bold text-cyan-400 mb-3">Finding wisdom...</h3>
          <div className="text-sm text-gray-400">
            Guiding you to {selectedQuote.name}...
          </div>
        </div>
      </div>

      {/* Animated guiding line */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.8)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0.2)" />
          </linearGradient>
        </defs>

        {/* Calculate line path from bottom center to quote location */}
        {/* This is a simplified representation - in a real implementation,
            you'd need to map 3D globe coordinates to 2D screen coordinates */}
        <path
          d={`M 50 100 Q 50 ${100 - (lineProgress * 30)} 50 ${100 - (lineProgress * 60)}`}
          stroke="url(#lineGradient)"
          strokeWidth="0.3"
          fill="none"
          strokeLinecap="round"
          className="animate-pulse"
          style={{
            strokeDasharray: '1,0.5',
            animation: 'dash 2s linear infinite'
          }}
        />

        {/* Pulsing dot at the end of the line */}
        {lineProgress > 0.8 && (
          <circle
            cx="50"
            cy={`${100 - (lineProgress * 60)}`}
            r="0.8"
            fill="rgba(0, 255, 255, 0.8)"
            className="animate-ping"
          />
        )}
      </svg>
    </div>
  );
};

export default AnswerGuidance;