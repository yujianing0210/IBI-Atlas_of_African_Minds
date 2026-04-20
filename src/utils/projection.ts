const bounds = {
  minLng: -25,
  maxLng: 55,
  minLat: -35,
  maxLat: 38,
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * Convert [longitude, latitude] into SVG coordinates inside a square Africa viewbox.
 * This is a lightweight projection tuned for the continent shape rather than geographical precision.
 */
export function project([longitude, latitude]: [number, number], width = 1000, height = 1000): [number, number] {
  const xFraction = (longitude - bounds.minLng) / (bounds.maxLng - bounds.minLng)
  const yFraction = (bounds.maxLat - latitude) / (bounds.maxLat - bounds.minLat)

  const margin = 0.08
  const x = width * margin + xFraction * width * (1 - margin * 2)
  const y = height * margin + yFraction * height * (1 - margin * 2)

  return [clamp(x, 0, width), clamp(y, 0, height)]
}
