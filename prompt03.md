# Design Update — Dual Globe Views with Tabs

## Goal

Keep the current globe design as one visual mode, and add a second enhanced visual mode with a brighter, more legible Earth and a richer interface.

Users should be able to switch between the two modes using tabs.

---

## New Requirement: Two Visual Modes

The app must support **two globe display modes**:

### Mode A — Dark Minimal

This is the existing version.

Characteristics:

- Very dark globe
- Minimal UI
- Sparse white glowing markers
- Atmospheric, abstract, mysterious
- Good for cinematic presentation

Purpose:

- Preserve the current design
- Keep it as an artistic / minimal mode

---

### Mode B — Enhanced Readable

This is the new design direction.

Characteristics:

- Brighter, more legible globe
- Clearer land/ocean contrast
- Stronger atmospheric glow around Earth
- More visible markers
- Richer interface with search, side panel, legend, and optional story mode button
- Still elegant and immersive, but easier to read

Purpose:

- Improve visibility and usability
- Make the globe feel more informative and polished
- Better support interaction and storytelling

---

## Tab Switching

Add a tab switcher in the UI to toggle between the two views.

### Tab Labels

Use two tabs:

- `Dark Minimal`
- `Enhanced`

### Behavior

- Switching tabs should update the globe style and UI layout
- The underlying quote data remains the same
- The selected quote can either:
  - persist across tab switches, or
  - reset cleanly when switching modes

Recommended:

- Persist selected quote if possible

---

## Shared Data Layer

Both views must use the same quote dataset:

- same `quotes.json`
- same latitude/longitude
- same quote metadata

Only the visual style and UI layout change.

---

## View-Specific Requirements

## Mode A — Dark Minimal

### Globe

- Keep the globe darker overall
- Slightly improve visibility so continents are not completely lost
- Add subtle rim light / atmosphere
- Keep it understated

### Markers

- White or muted glow
- Small and elegant
- Minimal pulsing

### UI

- Very light UI chrome
- Small info panel or tooltip
- Minimal overlays

### Important Adjustment

Even in this mode, the globe should not be so dark that landmass becomes unreadable.
Slightly increase:

- ambient light
- contrast
- surface visibility
- atmosphere edge light

---

## Mode B — Enhanced Readable

### Globe

Use a brighter earth presentation:

- clearer land texture
- more visible oceans
- stronger daylit Earth look
- visible atmospheric halo
- optionally add cloud texture if simple to support

### Markers

- Brighter glow
- Slight color distinction by type:
  - person = warm gold / amber
  - tribe = cool blue

- Hover state should be very clear

### UI

Add a richer interface:

- title/header
- search bar
- right-side info panel
- legend
- optional story mode button
- optional vertical toolbar

### Information Panel

The panel should feel polished and editorial, not like a default tooltip.

Content:

- name
- type badge
- place
- coordinates
- quote
- background
- navigation between entries (optional)

---

## Suggested Architecture

Use a top-level tab state:

```ts
const [viewMode, setViewMode] = useState<"dark" | "enhanced">("dark");
```

Then render different globe scenes or style presets based on `viewMode`.

Possible structure:

```txt
/components
  GlobeTabs.tsx
  GlobeSceneDark.tsx
  GlobeSceneEnhanced.tsx
  InfoPanel.tsx
  SearchBar.tsx
  Legend.tsx
```

Alternative approach:

- Use one `GlobeScene` component
- Pass a `theme` or `mode` prop
- Change textures, lights, marker colors, atmosphere, and UI conditionally

Example:

```ts
<GlobeScene
  mode={viewMode}
  quotes={quotes}
  selectedQuote={selectedQuote}
  onSelectQuote={setSelectedQuote}
/>
```

Recommended:

- Use one shared globe component with mode-based styling if the logic is mostly the same
- Split into two separate components only if the layouts become very different

---

## Lighting and Visibility Improvements

The current globe is too dark. Improve readability in both modes.

### Required fixes

- Increase ambient light slightly
- Add directional light for soft shape definition
- Add stronger atmosphere glow around Earth
- Improve Earth material contrast
- Ensure continents remain visible against black space

### For the enhanced mode specifically

- Use a brighter Earth texture
- Increase specular / light balance carefully
- Make the planet readable without losing the immersive dark-space feeling

---

## Marker Styling by Mode

### Dark Minimal

- small white glow
- restrained pulse
- subtle hover enlargement

### Enhanced

- brighter glow
- stronger hover animation
- color-coded by type
- easier to distinguish dense clusters

---

## UI Layout for Enhanced Mode

Suggested layout:

- Top-left: title / subtitle
- Top-right: search bar
- Right side: quote detail panel
- Bottom-right: legend
- Bottom-left: story mode button
- Bottom-center: small interaction hint

This layout should only appear in Enhanced mode, or appear in a simplified form in Dark Minimal mode.

---

## Animation Requirements

- Smooth tab transitions
- Smooth camera transitions
- Smooth panel transitions
- Do not reload the whole page when switching modes

Optional:

- Crossfade between dark and enhanced globe appearance

---

## Nice-to-Have

- Remember the last selected tab
- Add a subtle soundless “storytelling” feel
- Add a “Compare Modes” development toggle if useful
- Later allow more themes beyond these two

---

## Deliverable Update

The final app should:

- preserve the current dark globe version
- add a second enhanced globe version
- allow switching between them with tabs
- keep the same quote data and interaction logic
- improve overall readability and presentation
