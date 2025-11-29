# CLAUDE.md

> **Claude Code Context File** - Automatically loaded when Claude Code starts a conversation.
> **Last Updated**: 2024-11-28 | **Version**: 1.0.0
> This file provides core project context. Detailed procedures are in modular skills.

## Project Overview

**Masjid Map** - Interactive map of masjids in Riyadh with reader information and audio samples. Displays 148 masjids across 3 regions on a clean, customized OpenFreeMap using MapLibre GL JS.

## Current Implementation Status

### Project Phase
- **Phase**: MVP
- **Language**: Arabic (RTL)
- **Design System**: In Progress
- **Key Features**: Interactive map, region filtering, reader info popups, audio playback

### Tech Stack

**Frontend**: React 19 + TypeScript + Vite 7 + Tailwind CSS 3 + Zustand
**Mapping**: MapLibre GL JS + OpenFreeMap
**State Management**: Zustand
**Routing**: React Router 7
**Styling**: Tailwind CSS 3
**Icons**: Lucide React
**Deployment**: Cloudflare Pages

## Development Commands

**Requires Docker Desktop**

```bash
npm run dev          # Start development server (Docker, port 5173)
npm run dev:stop     # Stop development containers
npm run dev:restart  # Restart development containers
npm run build        # Production build (Docker)
npm run lint         # Run ESLint (Docker)
npm run typecheck    # TypeScript type checking (Docker)
npm run prod:test    # Test production build (Docker, port 8080)

# Package management
npm run docker:add <package>   # Add a package
npm run docker:install         # Reinstall dependencies
npm run docker:clean           # Clean Docker resources
```

**Direct Docker commands** (alternative):
```bash
docker-compose up dev          # Start dev server
docker-compose down            # Stop containers
docker-compose run --rm dev npm add <package>  # Add package
```

## CRITICAL GUIDELINES

### 1. Git Operations - STRICTLY PROHIBITED
**NO GIT COMMANDS ALLOWED**
- Use skill: `git-operations-blocker` (global skill)
- Git operations are USER-ONLY territory
- AI can suggest commands but never execute

### 2. Task Management System
**MANDATORY**: Every piece of work = One documented task
- Primary system: `markdown-task-manager` skill
- Files: `kanban.md` (active) + `archive.md` (completed)
- Always reference TASK-XXX in commits

### 3. Component Development Workflow

#### Design System Compliance
- **Skill**: `design-token-enforcer`
- No hardcoded colors, use semantic tokens
- Icons from `@/design-tokens/icons` only
- Extract magic numbers to constants

#### RTL Layout Validation
- **Skill**: `react-rtl-layout-validator`
- MANDATORY: `dir="rtl"` on containers + `text-right` on text
- Validate all components before completion

## Architecture Principles

### Component-Driven Development
- Atomic Design: atoms → molecules → organisms → templates → pages
- Every UI element is a reusable component
- TypeScript for all components

### Design Tokens First
- Colors: Semantic tokens only (bg-primary, text-accent, bg-region-north)
- Spacing: Documented token mappings
- Typography: Defined variants
- Icons: Centralized token system
- NO hardcoded values

### Constants Over Magic Numbers
```typescript
// ✅ Good
import { MAP_CONFIG } from '@/constants/map';
const zoom = MAP_CONFIG.INITIAL_ZOOM;

// ❌ Bad
const zoom = 11;
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Design system components
│   ├── molecules/       # Composed components (MasjidMarker, MasjidPopup)
│   ├── organisms/       # Complex components (MasjidMap)
│   └── templates/       # Page layouts
├── pages/               # Route components
├── design-tokens/       # Colors, typography, spacing, icons
├── contexts/            # React Context providers
├── constants/           # Map config, UI thresholds, validation rules
├── hooks/               # Reusable logic
├── lib/                 # Utility functions
├── services/            # API calls
├── stores/              # Zustand stores
├── data/                # Static JSON data (masjids.json)
└── types/               # TypeScript types
```

## Data Structure

### Masjid Data (148 entries)
```typescript
interface Masjid {
  id: string;
  readerName: string;      // القارئ
  masjidName: string;      // الجامع
  region: 'north' | 'east' | 'westSouth';
  coordinates: { lat: number; lng: number };
  googleMapsUrl: string;
  audioUrl: string;
  notes?: string;
}
```

### Regions
- `north` - الشمال (Green)
- `east` - الشرق (Blue)
- `westSouth` - الغرب والجنوب (Amber)

## Map Configuration

- **Tile Source**: OpenFreeMap
- **Style**: Custom (no labels, clean minimalist)
- **Center**: Riyadh (24.7136, 46.6753)
- **Zoom**: 11 (initial), 9-18 (bounds)

## RTL Support

- Root `dir="rtl"` on AppLayout
- `text-right` on all text elements
- Flex containers auto-reverse with RTL

## Skills Catalog

### Project-Local Skills (`.claude/skills/`)
- `markdown-task-manager` - Task tracking and documentation
- `pre-commit-review` - Automated code review
- `design-token-enforcer` - Design system compliance
- `react-rtl-layout-validator` - RTL layout validation

### Global Skills (`~/.claude/skills/`)
- `git-operations-blocker` - Prevent AI git operations
- `decision-tree-formatter` - Structured recommendations

## Quick Validation Commands

```bash
npm run dev              # Start dev server (Docker)
npm run typecheck        # Check types (Docker)
npm run lint             # Check code quality (Docker)
npm run build            # Production build (Docker)
```

## Environment Configuration

See `.env.example` for all available environment variables.

## Critical Implementation Notes

1. **DESIGN TOKENS**: No hardcoded values, use semantic tokens
2. **RTL**: All containers must have `dir="rtl"` and `text-right`
3. **MAP**: Use custom style without labels for clean appearance
4. **DATA**: Extract coordinates from Google Maps URLs
5. **VALIDATION**: Pre-commit review before all commits
