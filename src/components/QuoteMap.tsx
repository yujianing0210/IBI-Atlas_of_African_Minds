import { useMemo } from 'react'
import { geoGraticule, geoMercator, geoPath } from 'd3-geo'
import { QuoteMatchResult } from '../types/quote'
import QuotePopup from './QuotePopup'

interface QuoteMapProps {
  result: QuoteMatchResult | null
  onMarkerClick: () => void
  showPopup: boolean
}

const projection = geoMercator().scale(140).translate([500, 300])
const graticule = geoGraticule()
const pathGenerator = geoPath().projection(projection)
const land = {
  type: 'MultiPolygon',
  coordinates: [
    [[[-168, 72], [-138, 70], [-118, 58], [-126, 48], [-112, 32], [-96, 18], [-82, 24], [-64, 46], [-54, 58], [-78, 72], [-108, 76], [-138, 74], [-168, 72]]],
    [[[-82, 12], [-70, 8], [-58, -8], [-50, -24], [-58, -46], [-70, -54], [-78, -36], [-76, -16], [-82, 12]]],
    [[[-18, 36], [-8, 58], [18, 70], [56, 62], [96, 70], [138, 54], [164, 42], [146, 24], [108, 18], [78, 8], [48, 22], [30, 6], [8, 34], [-18, 36]]],
    [[[-18, 34], [10, 36], [34, 22], [48, 2], [36, -28], [18, -36], [0, -28], [-12, -4], [-18, 34]]],
    [[[112, -12], [154, -12], [154, -36], [132, -44], [112, -28], [112, -12]]],
    [[[-54, 74], [-28, 78], [-18, 68], [-38, 60], [-54, 74]]],
  ],
}

export default function QuoteMap({ result, onMarkerClick, showPopup }: QuoteMapProps) {
  const marker = useMemo(() => {
    if (!result) return null
    const [x, y] = projection([result.entry.longitude, result.entry.latitude]) as [number, number]
    return { x, y }
  }, [result])

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#040712]/90 shadow-[0_0_90px_rgba(30,55,115,0.18)] backdrop-blur-xl">
      <svg viewBox="0 0 1000 600" className="relative z-10 h-[min(68vh,620px)] min-h-[360px] w-full">
        <defs>
          <linearGradient id="darkSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06080f" />
            <stop offset="100%" stopColor="#02040a" />
          </linearGradient>
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.45 0" />
          </filter>
        </defs>

        <rect width="1000" height="600" fill="url(#darkSky)" />
        <path d={pathGenerator({ type: 'Sphere' } as any) || undefined} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
        <path d={pathGenerator(land as any) || undefined} fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <path d={pathGenerator(graticule()) || undefined} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />

        {marker ? (
          <g
            transform={`translate(${marker.x}, ${marker.y})`}
            onClick={onMarkerClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onMarkerClick()
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Open quote"
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            <circle cx={0} cy={0} r={22} fill="rgba(87, 183, 255, 0.16)" filter="url(#starGlow)" />
            <circle cx={0} cy={0} r={12} fill="rgba(255,255,255,0.18)" />
            <circle cx={0} cy={0} r={6} fill="white" className="animate-pulse" />
            <circle cx={0} cy={0} r={30} fill="rgba(255,255,255,0.04)" />
          </g>
        ) : null}
      </svg>

      {result && showPopup && marker ? <QuotePopup result={result} marker={marker} /> : null}
    </div>
  )
}
