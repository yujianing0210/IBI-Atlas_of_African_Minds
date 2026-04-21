import React from 'react';

interface GlobeTabsProps {
  mode: 'dark' | 'enhanced';
  onModeChange: (mode: 'dark' | 'enhanced') => void;
}

const GlobeTabs: React.FC<GlobeTabsProps> = ({ mode, onModeChange }) => {
  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="bg-gray-900 bg-opacity-80 rounded-lg p-1 border border-gray-700">
        <button
          onClick={() => onModeChange('dark')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            mode === 'dark'
              ? 'bg-cyan-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Dark Minimal
        </button>
        <button
          onClick={() => onModeChange('enhanced')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            mode === 'enhanced'
              ? 'bg-cyan-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Enhanced
        </button>
      </div>
    </div>
  );
};

export default GlobeTabs;