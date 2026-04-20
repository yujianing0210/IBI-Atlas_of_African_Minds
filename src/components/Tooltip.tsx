interface TooltipProps {
  x: number
  y: number
  label: string
}

export default function Tooltip({ x, y, label }: TooltipProps) {
  const width = Math.min(172, Math.max(80, label.length * 7 + 22))
  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none">
      <rect
        x={12}
        y={-42}
        width={width}
        height={28}
        rx={10}
        fill="rgba(8, 17, 44, 0.92)"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
      />
      <text
        x={12 + width / 2}
        y={-22}
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
        fill="#f8fafc"
      >
        {label}
      </text>
    </g>
  )
}
