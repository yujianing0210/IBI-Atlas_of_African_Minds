import { useMemo } from 'react'
import { Tribe } from '../types/tribe'
import Tooltip from './Tooltip'

interface TribeMarkerProps {
  tribe: Tribe
  x: number
  y: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

const createSeed = (label: string) => {
  let hash = 0
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash << 5) - hash + label.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export default function TribeMarker({ tribe, x, y, isHovered, onHover, onLeave, onClick }: TribeMarkerProps) {
  const { duration, delay } = useMemo(() => {
    const seed = createSeed(tribe.tribe)
    return {
      duration: 2.8 + ((seed % 160) / 100),
      delay: (seed % 100) / 60,
    }
  }, [tribe.tribe])

  const glowRadius = isHovered ? 26 : 16
  const centerRadius = isHovered ? 3.8 : 2.8
  const glowOpacity = isHovered ? 0.96 : 0.76

  return (
    <g
      data-marker="true"
      className="tribe-marker"
      transform={`translate(${x}, ${y})`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <circle
        className="marker-glow"
        r={glowRadius}
        fill="rgba(255,255,255,0.18)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.6"
        filter="url(#pulseGlow)"
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity: glowOpacity,
        }}
      />
      <circle className="marker-core" r={centerRadius} fill="white" opacity={isHovered ? 1 : 0.92} />
      {isHovered ? <Tooltip x={0} y={0} label={tribe.tribe} /> : null}
    </g>
  )
}
