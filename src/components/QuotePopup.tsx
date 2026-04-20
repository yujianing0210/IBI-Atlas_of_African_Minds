import { QuoteMatchResult } from '../types/quote'

interface QuotePopupProps {
  result: QuoteMatchResult
  marker: {
    x: number
    y: number
  }
}

export default function QuotePopup({ result, marker }: QuotePopupProps) {
  const left = `${(marker.x / 1000) * 100}%`
  const top = `${(marker.y / 600) * 100}%`
  const xShift = marker.x > 650 ? '-100%' : marker.x < 260 ? '0%' : '-50%'
  const yShift = marker.y > 340 ? 'calc(-100% - 28px)' : '28px'

  return (
    <div
      className="absolute z-20 w-[min(22rem,calc(100%-2rem))] rounded-[18px] border border-white/10 bg-slate-950/95 p-4 text-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-3xl"
      style={{
        left,
        top,
        transform: `translate(${xShift}, ${yShift})`,
      }}
    >
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-white">{result.entry.source}</p>
          <p className="text-xs text-slate-500">{result.entry.location}</p>
        </div>
        <blockquote className="text-sm leading-6 text-slate-200">"{result.entry.quote}"</blockquote>
        {result.reasoning ? (
          <p className="border-t border-white/10 pt-3 text-sm leading-6 text-slate-300">{result.reasoning}</p>
        ) : (
          <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
        )}
      </div>
    </div>
  )
}
