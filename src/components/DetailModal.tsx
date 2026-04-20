import { useEffect } from 'react'
import { Tribe } from '../types/tribe'

interface DetailModalProps {
  tribe: Tribe | null
  isOpen: boolean
  onClose: () => void
}

export default function DetailModal({ tribe, isOpen, onClose }: DetailModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !tribe) {
    return null
  }

  return (
    <div className="modal-backdrop fixed inset-0 z-40 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-[32px] border border-white/10 bg-slate-950/92 p-6 shadow-[0_40px_120px_rgba(8,18,42,0.55)] backdrop-blur-3xl transition-all duration-300 ease-out sm:p-8">
        <button
          type="button"
          aria-label="Close detail panel"
          className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Tribe node</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">{tribe.tribe}</h2>
        <p className="mt-2 text-sm text-slate-300">{tribe.country_region}</p>
        <div className="mt-6 space-y-4 text-base leading-7 text-slate-200">
          <p>{tribe.summary}</p>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Coordinates</p>
          <p className="text-sm text-slate-300">
            {tribe.latitude.toFixed(2)}° N · {tribe.longitude.toFixed(2)}° E
          </p>
        </div>
      </div>
    </div>
  )
}
