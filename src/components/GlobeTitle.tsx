import React from 'react';

const GlobeTitle: React.FC = () => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
      <h1 className="text-2xl font-bold text-white mb-1">Quote Globe</h1>
      <p className="text-gray-400 text-sm">Explore cultural wisdom across the world</p>
    </div>
  );
};

export default GlobeTitle;