# Kanban Board

<!-- Config: Last Task ID: 010 -->

## ⚙️ Configuration

**Columns**: 📝 To Do | 🚀 In Progress | 👀 In Review | ✅ Done
**Categories**: Frontend, Backend, Database, DevOps, Design, Tests, Documentation
**Users**: @user
**Tags**: #feature, #bug, #refactor, #docs, #performance, #security

## 📝 To Do

### TASK-001 | Create Masjid TypeScript types

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Define TypeScript types for masjid data structure.

**Subtasks**:
- [ ] Define `Masjid` interface with all fields
- [ ] Define `Region` type ('north' | 'east' | 'westSouth')
- [ ] Define `Coordinates` type
- [ ] Export from `src/types/masjid.ts`

---

### TASK-002 | Import 148 masjids data

**Priority**: High | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Import and setup the existing 148 masjids data.

**Subtasks**:
- [ ] Import existing masjids data file
- [ ] Validate data structure matches types
- [ ] Setup data loading in app

---

### TASK-003 | Install MapLibre GL JS dependencies

**Priority**: High | **Category**: DevOps | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Install MapLibre GL JS package for map rendering.

**Subtasks**:
- [ ] Add `maplibre-gl` package via Docker

---

### TASK-004 | Create MasjidMap organism component

**Priority**: Critical | **Category**: Frontend | **Assigned**: @user
**Created**: 2025-11-29
**Tags**: #feature

Main map component using MapLibre GL JS with OpenFreeMap tiles.

**Subtasks**:
- [ ] Create useMapLibre hook for map initialization
- [ ] Initialize MapLibre with OpenFreeMap tiles
- [ ] Use MAP_CONFIG constants for center, zoom, bounds
- [ ] Apply custom map style (no labels, minimalist)
- [ ] Handle map load and error states
- [ ] RTL container support
- [ ] Add marker layer for masjids
- [ ] Handle marker click events

---

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
