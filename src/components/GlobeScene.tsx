import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { Quote } from '../types/quote';

interface GlobeSceneProps {
  mode: 'dark' | 'enhanced';
  quotes: Quote[];
  onQuoteSelect: (quote: Quote | null) => void;
  selectedQuote: Quote | null;
}

const GlobeScene: React.FC<GlobeSceneProps> = ({ mode, quotes, onQuoteSelect, selectedQuote }) => {
  const globeRef = useRef<any>();
  const [hoveredQuote, setHoveredQuote] = useState<Quote | null>(null);

  // Convert quotes to points data format based on mode
  const pointsData = quotes.map(quote => {
    const isSelected = selectedQuote?.id === quote.id;
    const isHovered = hoveredQuote?.id === quote.id;

    let size: number;
    let color: string;

    if (mode === 'dark') {
      size = isSelected ? 1.2 : isHovered ? 1.0 : 0.6;
      color = isSelected ? '#ffffff' : isHovered ? '#cccccc' : '#666666';
    } else { // enhanced
      size = isSelected ? 1.5 : isHovered ? 1.2 : 0.8;
      color = isSelected ? '#00ffff' :
              isHovered ? '#ffffff' :
              quote.type === 'person' ? '#ffd700' : '#4169e1'; // gold for person, blue for tribe
    }

    return {
      lat: quote.latitude,
      lng: quote.longitude,
      size,
      color,
      quote
    };
  });

  const handlePointHover = (point: any) => {
    if (point) {
      setHoveredQuote(point.quote);
    } else {
      setHoveredQuote(null);
    }
  };

  const handlePointClick = (point: any) => {
    if (point) {
      onQuoteSelect(point.quote);
      // Animate camera to the selected point
      if (globeRef.current) {
        globeRef.current.pointOfView({
          lat: point.lat,
          lng: point.lng,
          altitude: 2
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate when not interacting
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      // Pause auto-rotation on interaction
      controls.addEventListener('start', () => {
        controls.autoRotate = false;
      });

      controls.addEventListener('end', () => {
        setTimeout(() => {
          controls.autoRotate = true;
        }, 2000);
      });
    }
  }, []);

  // Globe configuration based on mode
  const globeConfig = mode === 'dark' ? {
    globeImageUrl: "//unpkg.com/three-globe/example/img/earth-dark.jpg",
    backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png",
    atmosphereColor: '#ffffff',
    atmosphereAltitude: 0.1
  } : {
    globeImageUrl: "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png",
    atmosphereColor: '#87ceeb',
    atmosphereAltitude: 0.15
  };

  return (
    <div className="w-full h-screen bg-black">
      <Globe
        ref={globeRef}
        {...globeConfig}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: any) => d.color}
        pointRadius={(d: any) => d.size}
        pointAltitude={0.02}
        pointsMerge={false}
        onPointHover={handlePointHover}
        onPointClick={handlePointClick}
        pointResolution={16}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default GlobeScene;