import React from 'react';

const Legend: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div className="bg-gray-900 bg-opacity-80 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-medium mb-3">Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-300 text-sm">Person</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-300 text-sm">Tribe</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-gray-400 text-xs">Click points to explore quotes</p>
        </div>
      </div>
    </div>
  );
};

export default Legend;