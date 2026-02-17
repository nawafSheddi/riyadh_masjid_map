# Kanban Board

<!-- Config: Last Task ID: 010 -->

## ⚙️ Configuration

**Columns**: 📝 To Do | 🚀 In Progress | 👀 In Review | ✅ Done
**Categories**: Frontend, Backend, Database, DevOps, Design, Tests, Documentation
**Users**: @user
**Tags**: #feature, #bug, #refactor, #docs, #performance, #security

## 📝 To Do

### TASK-005 | Create MasjidMarker molecule component

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Custom HTML markers for masjids on the map.

**Subtasks**:
- [ ] Custom HTML marker using MapLibre
- [ ] Region-based colors (north=green, east=blue, westSouth=amber)
- [ ] Selected/hover states with size change
- [ ] Click handler for selection
- [ ] Accessible labels

---

### TASK-006 | Create MasjidPopup molecule component

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Popup component for masjid details (used in bottom sheet).

**Subtasks**:
- [ ] Display reader name and masjid name
- [ ] Region badge
- [ ] Audio play button (integration ready)
- [ ] Navigate to Google Maps button
- [ ] RTL text alignment

---

### TASK-007 | Create RegionFilter organism component

**Priority**: Medium | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Filter pills for region selection with multi/single select support.

**Subtasks**:
- [ ] FilterPill components for each region
- [ ] "All" option to show all masjids
- [ ] Multi-select behavior (tap to toggle)
- [ ] Single-select behavior (long-press for exclusive)
- [ ] Animated transitions

---

### TASK-008 | Create Zustand store for map state

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Global state management for map and audio.

**Subtasks**:
- [ ] Selected masjid state
- [ ] Active region filters
- [ ] Map view state (center, zoom)
- [ ] Audio playing state

---

### TASK-009 | Create HomePage template

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Main page layout combining map, filters, and bottom sheet.

**Subtasks**:
- [ ] Full-screen map layout
- [ ] Filter overlay at top
- [ ] Bottom sheet for selected masjid
- [ ] Mobile-responsive design

---

### TASK-010 | Integrate audio playback

**Priority**: Medium | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Connect AudioPlayerControls to actual audio playback.

**Subtasks**:
- [ ] Connect AudioPlayerControls to audio element
- [ ] Play/pause functionality
- [ ] Progress tracking
- [ ] Handle audio errors

---

## 🚀 In Progress

## 👀 In Review

## ✅ Done

### TASK-002 | Import 148 masjids data

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29 | **Started**: 2026-02-17 | **Finished**: 2026-02-18
**Tags**: #feature

Import and setup the existing 148 masjids data.

**Subtasks**:
- [x] Import existing masjids data file
- [x] Validate data structure matches types
- [x] Setup data loading in app

**Notes**:

**Result**:
Imported all 148 masjids from riyadh_list.xlsx (54 north, 54 east, 40 westSouth). Created Python scripts to extract coordinates from Google Maps URLs using S2 Cell ID decoding (s2sphere library) and Plus Code decoding (openlocationcode). Replaced 12 sample entries with real data. All coordinates validated within Riyadh bounds. TypeScript compilation passes.

**Modified files**:
- src/data/masjids.ts (replaced 12 sample entries with 148 real entries, renamed SAMPLE_MASJIDS to MASJIDS)
- src/stores/useMasjidStore.ts (updated import from SAMPLE_MASJIDS to MASJIDS)
- .gitignore (added scripts/.venv/, scripts/__pycache__/, scripts/coordinates_cache.json)
- scripts/extract_coordinates.py (new file - coordinate extraction from Google Maps URLs)
- scripts/generate_masjids_ts.py (new file - TypeScript data file generator)
- scripts/masjids_extracted.json (new file - intermediate extracted data)

---

### TASK-001 | Create Masjid TypeScript types

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29 | **Started**: 2025-11-29 | **Finished**: 2025-11-29
**Tags**: #feature

Define TypeScript types for masjid data structure.

**Subtasks**:
- [x] Define `Masjid` interface with all fields
- [x] Define `Region` type ('north' | 'east' | 'westSouth')
- [x] Define `Coordinates` type
- [x] Export from `src/types/masjid.ts`

**Notes**:

**Result**:
Created TypeScript types for masjid data structure including Masjid interface, Coordinates, Region (re-exported from map constants), MapViewState, and RegionFilter types.

**Modified files**:
- src/types/masjid.ts (new file)
- src/types/index.ts (new file)

---

### TASK-003 | Install MapLibre GL JS dependencies

**Priority**: High | **Category**: DevOps | **Assigned**: @user
**Created**: 2025-11-29 | **Started**: 2025-11-29 | **Finished**: 2025-11-29
**Tags**: #feature

Install MapLibre GL JS package for map rendering.

**Subtasks**:
- [x] Add `maplibre-gl` package via Docker

**Notes**:

**Result**:
MapLibre GL JS v4.7.1 was already installed in the project. Verified via package.json.

---

### TASK-004 | Create MasjidMap organism component

**Priority**: Critical | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29 | **Started**: 2025-11-29 | **Finished**: 2025-11-29
**Tags**: #feature

Main map component using MapLibre GL JS with OpenFreeMap tiles.

**Subtasks**:
- [x] Create useMapLibre hook for map initialization
- [x] Initialize MapLibre with OpenFreeMap tiles
- [x] Use MAP_CONFIG constants for center, zoom, bounds
- [x] Apply custom map style (no labels, minimalist)
- [x] Handle map load and error states
- [x] RTL container support
- [x] Add marker layer for masjids
- [x] Handle marker click events

**Notes**:

**Result**:
Created MasjidMap organism with:
- useMapLibre hook for map initialization with OpenFreeMap tiles
- Custom HTML markers with region-based colors
- Selected/hover states with animations
- Keyboard accessibility (Enter/Space to select)
- Loading and error states with Arabic text
- flyTo animation when selecting masjid
- Region filtering support

**Modified files**:
- src/components/organisms/MasjidMap/MasjidMap.tsx (new file)
- src/components/organisms/MasjidMap/useMapLibre.ts (new file)
- src/components/organisms/MasjidMap/index.ts (new file)
- src/components/organisms/index.ts (added export)
