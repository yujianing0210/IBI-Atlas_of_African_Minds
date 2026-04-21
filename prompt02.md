# 🌍 Quote Globe — Copilot Spec

## 1. Project Overview

Build a full-screen interactive web application that visualizes quotes on an orbitable 3D globe.

Each quote is associated with a geographic location (latitude and longitude) and should appear as a softly glowing point on the surface of a 3D Earth.

The goal is to create a **narrative, atmospheric, and interactive visualization**, not a traditional dashboard.

---

## 2. Core Experience

### 2.1 Globe Interaction

- The globe must:
  - Support **drag to rotate (orbit)**
  - Support **scroll to zoom**
  - Have **slow auto-rotation when idle**
  - Pause auto-rotation when user interacts

- Smooth camera movement is required

---

### 2.2 Quote Points (Markers)

Each quote should be rendered as a point on the globe:

**Default state:**

- Small glowing point
- Soft light (subtle emission)

**Hover state:**

- Point increases in size
- Glow becomes stronger
- Cursor changes to pointer

**Selected state (on click):**

- Point remains highlighted
- Camera smoothly moves toward the location
- Opens detailed information panel

---

### 2.3 Information Panel

When a point is clicked:

- A **right-side panel** should slide in

Panel content:

- Quote text
- Name (person or tribe)
- Type: `author` or `tribe`
- Country / region
- Background information
- Optional: coordinates

Panel behavior:

- Closable
- Only one open at a time

---

## 3. Visual Style

- Dark, minimal, atmospheric (NOT dashboard style)
- Background: near-black
- Globe:
  - Dark earth texture or abstract
  - Subtle lighting

- Points:
  - Soft glow (e.g., cyan / warm white)
  - Slight pulsing animation

- Smooth transitions (camera + UI)

---

## 4. Tech Stack

### Required

- React or Next.js (TypeScript)
- Three.js (via wrapper)
- Globe library:
  - Use **react-globe.gl**

### Important

- Use **client-side rendering** for the globe
- If using Next.js:
  - Use `dynamic import` with `ssr: false`

---

## 5. Data

Data should be loaded from a local JSON file:

`quotes.csv`

### Data Format

```json
[
  {
    "id": 1,
    "quote": "Example quote...",
    "name": "Zora Neale Hurston",
    "type": "person",
    "country_region": "United States",
    "latitude": 32.56,
    "longitude": -85.67,
    "background": "American author and anthropologist..."
  }
]
```

---

## 6. Project Structure

```
/src
  /components
    GlobeScene.tsx
    InfoPanel.tsx
    SearchBar.tsx (optional)
  /lib
    loadQuotes.ts
  /types
    quote.ts

/public
  /data
    quotes.json
  /textures
    earth-dark.jpg

/app or /pages
  page.tsx
```

---

## 7. Core Components

### 7.1 GlobeScene.tsx

Responsibilities:

- Render 3D globe
- Load and display points
- Handle interactions

Key features:

- Use `react-globe.gl`
- Use `pointsData`
- Map:
  - `lat` → latitude
  - `lng` → longitude

Interactions:

- `onPointHover`
- `onPointClick`

Camera:

- On click → animate to selected point

---

### 7.2 InfoPanel.tsx

Props:

```ts
{
  selectedQuote: Quote | null
  onClose: () => void
}
```

Behavior:

- Slide in from right
- Show quote details
- Close button

---

### 7.3 State Management

At page level:

```ts
const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
```

---

## 8. Interaction Logic

### Hover

- Detect hovered point
- Increase size / glow

### Click

- Set selected quote
- Move camera to location
- Open panel

### Close panel

- Reset selected state

---

## 9. Optional Features (Nice to Have)

### Filtering

- Filter by:
  - type (person / tribe)
  - region

- Search by name or keyword

### Clustering (later)

- Handle overlapping points

### Animation

- Pulsing glow
- Subtle globe rotation

### Story Mode

- Automatically rotate to different quotes

---

## 10. Performance Considerations

- Use `pointsData` instead of heavy HTML overlays
- Avoid too many DOM elements on globe
- Keep animations lightweight

---

## 11. Deliverables

The generated code should:

- Run with `npm install` and `npm run dev`
- Render a working 3D globe
- Display quote points correctly
- Support hover + click interactions
- Show info panel with correct data

---

## 12. Implementation Notes for Copilot

- Use functional React components
- Use hooks (useState, useEffect)
- Use TypeScript types for data
- Use dynamic import for Globe component if using Next.js
- Keep components modular and readable

---

## 13. Expected Outcome

A polished interactive webpage where:

- Users can explore a rotating 3D globe
- Each glowing point represents a quote
- Clicking reveals cultural and contextual information
- The experience feels immersive and narrative-driven
