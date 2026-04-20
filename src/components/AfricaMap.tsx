import type { MouseEvent } from 'react'
import { Tribe } from '../types/tribe'
import { geoPath, geoMercator } from 'd3-geo'
import TribeMarker from './TribeMarker'
import africaGeoJson from '../data/africa.json'

interface AfricaMapProps {
  tribes: Tribe[]
  hoveredTribeId: string | null
  selectedTribe: Tribe | null
  onHover: (id: string | null) => void
  onSelect: (tribe: Tribe) => void
  onClearSelection: () => void
  onCloseDetail: () => void
}

const projection = geoMercator().fitSize([1000, 1000], africaGeoJson as any)
const pathGenerator = geoPath().projection(projection)

export default function AfricaMap({ tribes, hoveredTribeId, selectedTribe, onHover, onSelect, onClearSelection, onCloseDetail }: AfricaMapProps) {
  const handleSvgClick = (event: MouseEvent<SVGSVGElement>) => {
    const target = event.target as Element
    if (target.closest('[data-marker]')) return
    onClearSelection()
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-slate-900/90 p-4 shadow-[0_0_120px_rgba(56,92,188,0.08)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_35%)]" />
      <svg
        viewBox="0 0 1000 1000"
        className="relative z-10 h-[640px] w-full"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleSvgClick}
      >
        <defs>
          <filter id="continentGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="22" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
          </filter>
          <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(255,255,255,0.4)" />
          </filter>
          <radialGradient id="mapGradient" cx="50%" cy="30%" r="100%">
            <stop offset="0%" stopColor="#283560" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#050b1e" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        <rect width="1000" height="1000" fill="transparent" />
        <path d={pathGenerator(africaGeoJson as any) || undefined} fill="url(#mapGradient)" stroke="rgba(145,179,255,0.32)" strokeWidth="4" filter="url(#continentGlow)" />
        <path d={pathGenerator(africaGeoJson as any) || undefined} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" opacity="0.72" />

        {tribes.map((tribe) => {
          const projected = projection([tribe.longitude, tribe.latitude])
          const [x, y] = (projected as [number, number])
          const isHovered = hoveredTribeId === tribe.tribe

          return (
            <TribeMarker
              key={`${tribe.tribe}-${tribe.latitude}-${tribe.longitude}`}
              tribe={tribe}
              x={x}
              y={y}
              isHovered={isHovered}
              onHover={() => onHover(tribe.tribe)}
              onLeave={() => onHover(null)}
              onClick={() => onSelect(tribe)}
            />
          )
        })}
      </svg>

      <div className="absolute left-6 top-6 z-20 w-[320px] rounded-[28px] border border-white/10 bg-slate-950/96 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-3xl">
        {selectedTribe ? (
          <div className="space-y-4 text-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Tribe details</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{selectedTribe.tribe}</h3>
                <p className="text-sm text-slate-300">{selectedTribe.country_region}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 transition hover:bg-white/10"
                onClick={onCloseDetail}
              >
                Close
              </button>
            </div>
            <p className="text-sm leading-6 text-slate-300">{selectedTribe.summary}</p>
            <div className="rounded-3xl bg-slate-900/80 p-3 text-xs text-slate-400">
              {selectedTribe.latitude.toFixed(2)}° N · {selectedTribe.longitude.toFixed(2)}° E
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-slate-400">
            <p className="text-sm">Click a glowing point to reveal its tribe details here.</p>
            <p className="text-xs text-slate-500">The panel stays within the map area, not in a separate overlay.</p>
          </div>
        )}
      </div>
    </div>
  )
}
