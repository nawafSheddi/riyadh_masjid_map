# Ramadan Masjid Finder

## Overview

A platform designed to solve a common challenge during Ramadan in Riyadh: helping Muslims discover masjids with prayer leaders (Imams) who have beautiful Quran recitation voices.

The platform allows users to browse masjids on a map, listen to audio samples of prayer leaders, and navigate to their chosen masjid with practical information like parking and crowding conditions.

---

## Language & Layout

### Arabic RTL First

This platform is designed **Arabic-first** with **Right-to-Left (RTL)** layout as the primary direction:

- All text flows from right to left
- UI elements are mirrored (navigation icons, buttons, alignments)
- Numbers remain in Arabic-Indic numerals where appropriate
- Font: Arabic-optimized typeface (e.g., Cairo, Tajawal, or similar)
- Reading order: right to left for all content hierarchy
- Swipe gestures: natural RTL direction
- Icons with directional meaning are flipped (arrows, navigation, etc.)

### RTL Considerations

- Bottom sheet content aligns to the right
- Filter pills scroll from right to left
- Action buttons (audio, navigate) positioned on the left side of content blocks
- Back/close icons appear on the right
- Text truncation happens on the left side

---

## Problem Statement

During Ramadan, Muslims in Riyadh seek masjids with prayer leaders whose Quran recitation resonates with them spiritually. Currently, there's no easy way to:

- Discover prayer leaders and hear their recitation style before visiting
- Find practical information about masjids (parking, crowding)
- Compare options across the city

---

## Core Data

The platform is built on a dataset containing:

- Masjid name
- Masjid location (coordinates)
- Prayer leader (Imam) name
- Audio sample URL (~1 minute recitation sample)
- YouTube link (optional, for extended listening)
- District/area name
- Parking situation notes
- Crowding notes ("arrive early" recommendations)

---

## Design Philosophy

### Visual Direction

- **Mood**: Dark blue Ramadan night theme — calm, spiritual, immersive
- **Inspiration**: Airbnb's smoothness and interaction quality, combined with Booking.com's information density
- **Characteristics**:
  - Rich, deep night-sky blue as dominant color
  - Warm gold/amber accents (subtle, not overdone)
  - Generous rounded corners throughout
  - Soft shadows for depth
  - Fluid, natural animations
  - Tactile, responsive interactions

### Interaction Principles

- Mobile-native gestures (drag, swipe, tap)
- No unnecessary UI chrome — immersive experience
- Information density without feeling cluttered
- Audio as a first-class feature

---

## App Structure

### Entry Point

Users land directly on the map view. If the map requires loading time, a brief splash screen appears:

- Dark blue background
- Logo/brand mark
- Subtle Ramadan-themed visual (optional glow or crescent)
- Fades into map once loaded

### Two Main Views

1. **Map View** (default/primary)
2. **List View** (secondary, for browsing)

---

## ASCII Wireframes

### Map View (Default State)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  مواقف متاحة ○ │ الأعلى تقييماً ○ │ الأكثر شهرة ○ │ ● الأقرب │ │
│  └────────────────────────────────────────────────────────┘ │
│                    ← Scrollable Filter Pills (RTL)          │
│                                                             │
│                              📍                             │
│        📍                                                   │
│                                        📍                   │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│        📍                        📍                         │
│   ░░░░░░░░░░░░░░░░░ DARK MAP ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                    📍                                       │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                   📍                        │
│        📍                                                   │
│                                                             │
│                    ┌───────────────────┐                    │
│                    │  📋 عرض القائمة   │                    │
│                    └───────────────────┘                    │
│                      ↑ Floating Toggle                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Map View (Pin Selected — Bottom Sheet 50%)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  مواقف متاحة ○ │ الأعلى تقييماً ○ │ الأكثر شهرة ○ │ ● الأقرب │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│                              📍                             │
│        📍                                                   │
│                                        🔸 ← Selected Pin    │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                         ━━━━━━━━━                           │
│                        Drag Handle                          │
│                                                             │
│   ┌──────┐                                                  │
│   │  ▶️  │              الشيخ عبدالرحمن السديس              │
│   └──────┘              ↑ Imam Name (Primary)               │
│   Audio Btn                                                 │
│                                                             │
│   ┌──────┐                                                  │
│   │  🧭  │              مسجد الراجحي                        │
│   └──────┘              حي العليا 📍                        │
│   Navigate              ↑ Masjid + District                 │
│                                                             │
│   ┌───────────────┐     ┌───────────────┐                   │
│   │   🚗 متاح     │     │   👥 معتدل    │                   │
│   └───────────────┘     └───────────────┘                   │
│   Parking Badge          Crowding Badge                     │
│                                                             │
│                 ↑ اسحب للأعلى لمزيد من التفاصيل              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Bottom Sheet (100% Expanded)

```
┌─────────────────────────────────────────────────────────────┐
│                         ━━━━━━━━━                           │
│                        Drag Handle                          │
│                                                             │
│   ┌──────┐                                                  │
│   │  ▶️  │              الشيخ عبدالرحمن السديس              │
│   └──────┘              Imam Name                           │
│                                                             │
│   ┌──────┐                                                  │
│   │  🧭  │              مسجد الراجحي                        │
│   └──────┘              حي العليا 📍                        │
│                                                             │
│   ┌───────────────┐     ┌───────────────┐                   │
│   │   🚗 متاح     │     │   👥 معتدل    │                   │
│   └───────────────┘     └───────────────┘                   │
│                                                             │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                             │
│   🚗 معلومات المواقف                                        │
│   ─────────────────                                         │
│   مواقف واسعة متاحة، يوجد موقف متعدد الطوابق                │
│   على بعد ١٠٠ متر من المسجد                                 │
│                                                             │
│   👥 معلومات الازدحام                                       │
│   ─────────────────                                         │
│   يُنصح بالحضور قبل ١٥ دقيقة من صلاة التراويح               │
│   خاصة في العشر الأواخر من رمضان                            │
│                                                             │
│   ❤️ الإعجابات                                              │
│   ─────────────                                             │
│   ٢٬٨٤٧ شخص أعجب بهذا المسجد                               │
│                                                             │
│   ┌─────────────────────────────────────┐                   │
│   │   ▶️  استمع للمزيد على يوتيوب       │                   │
│   └─────────────────────────────────────┘                   │
│                    YouTube Link                             │
│                                                             │
│                 ↓ اسحب للأسفل للإغلاق                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mini Player Bar (Audio Playing While Browsing)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                              📍                             │
│        📍                                                   │
│                                        📍                   │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│        📍                        📍                         │
│   ░░░░░░░░░░░░░░░░░ DARK MAP ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                    📍                                       │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                   📍                        │
│        📍                                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────┐   الشيخ عبدالرحمن السديس   ┌▓▓▒▒▓▓▒┐   ┌─────┐    │
│  │  ▶️ │   مسجد الراجحي             │░░░░░░░│   │  ✕  │    │
│  └─────┘                            └───────┘   └─────┘    │
│  Play/     Now Playing Info          Waveform    Close     │
│  Pause                                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Bottom Sheet States Flow

```
                         ┌─────────────────┐
                         │     CLOSED      │
                         │    (0% view)    │
                         └────────┬────────┘
                                  │
                            Tap on Pin
                                  │
                                  ▼
                         ┌─────────────────┐
            ┌────────────│      HALF       │────────────┐
            │            │   (50% view)    │            │
            │            └────────┬────────┘            │
            │                     │                     │
       Scroll Down           Scroll Up             Pan Map
       (to close)           (to expand)        (while audio playing)
            │                     │                     │
            ▼                     ▼                     ▼
   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
   │     CLOSED      │   │      FULL       │   │   MINI PLAYER   │
   │    (0% view)    │   │   (100% view)   │   │      BAR        │
   └─────────────────┘   └────────┬────────┘   └─────────────────┘
                                  │
                             Scroll Down
                                  │
                                  ▼
                         ┌─────────────────┐
                         │      HALF       │
                         │   (50% view)    │
                         └─────────────────┘
```

### Component Hierarchy (RTL Layout)

```
┌─────────────────────────────────────────────────────────────┐
│                        APP CONTAINER                        │
│                       (dir="rtl")                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    FILTER PILLS                     │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│   │  │ Filter 4│ │ Filter 3│ │ Filter 2│ │ Filter 1│   │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│   │  ← Scroll direction (RTL)                    START │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                      MAP LAYER                      │   │
│   │                                                     │   │
│   │    [Pins positioned absolutely on map]              │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   BOTTOM SHEET                      │   │
│   │  ┌───────────────────────────────────────────────┐  │   │
│   │  │ ┌────────┐              TEXT CONTENT ←        │  │   │
│   │  │ │ Action │              (Right-aligned)       │  │   │
│   │  │ │  Btns  │                                    │  │   │
│   │  │ └────────┘                                    │  │   │
│   │  │    ↑                                          │  │   │
│   │  │ Left side                                     │  │   │
│   │  └───────────────────────────────────────────────┘  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   MINI PLAYER                       │   │
│   │  ┌──────┐    Now Playing Text    ┌──────┐┌──────┐  │   │
│   │  │ Play │    (Right-aligned) ←   │ Wave ││Close │  │   │
│   │  └──────┘                        └──────┘└──────┘  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Map View

### Layout

- Full-screen, edge-to-edge dark-styled map
- No fixed header or footer
- Floating UI elements layered on top

### Components

#### Map

- Dark theme to match Ramadan night mood
- Custom pins with glow or high-contrast colors for visibility
- Pins represent masjid locations

#### Floating Filter Pills

- Positioned near top or bottom of screen
- Horizontally scrollable
- Multi-select enabled (user can select multiple filters)
- Filter options:
  - الأقرب (Nearest)
  - الأكثر شهرة (Popular)
  - الأعلى تقييماً (Most Liked)
  - مواقف متاحة (Parking Available)
- Selected pills get filled/highlighted with smooth animation
- Selecting filters highlights matching pins on the map (non-matching pins dim/recede)

#### View Toggle Button

- Floating "عرض القائمة" (List View) button
- Allows switching to list view
- Styled consistently with overall design (rounded, subtle shadow)

#### Pins

- Custom design (not default Google-style)
- States:
  - Default: visible, styled for dark map
  - Highlighted: when matching active filters
  - Selected: scales up slightly, color change, possible subtle bounce
  - Dimmed: when not matching active filters

---

## Bottom Sheet (Map View)

### Trigger

Tap on any map pin

### Behavior

The bottom sheet has three states controlled by scroll gestures:

#### 50% State (Initial)

- Sheet rises to cover 50% of screen
- Shows essential information for quick decision-making
- User can interact with map behind it

#### 100% State (Expanded)

- User scrolls up inside sheet → expands to full screen
- Shows all detailed information
- Scroll down inside → returns to 50%

#### Closed State

- From 50%, scroll down → closes sheet entirely
- Returns to default map view

### Animation

- Rubber-band feel at limits
- Velocity-based snapping (fast swipe = more momentum)
- Smooth, Airbnb-style transitions

### Content: 50% State

Priority order (top to bottom):

1. **اسم الإمام (Prayer Leader Name)** + **زر الاستماع (Audio Button)** — primary action
2. **اسم المسجد (Masjid Name)** + **زر الملاحة (Navigate Button)**
3. **الحي (District/Area Name)**
4. **أيقونات سريعة (Quick Icons)**: Parking status, crowding indicator

### Content: 100% State

Everything from 50%, plus:

- معلومات المواقف (Full parking notes)
- معلومات الازدحام (Crowding details / "arrive early" recommendations)
- رابط يوتيوب (YouTube link — small, secondary icon)
- Space for future additions (user reviews, photos, etc.)

---

## Audio Player Behavior

### In Bottom Sheet

- Audio button in the sheet triggers playback
- Sample duration: ~1 minute
- Play/pause functionality

### Mini Player Bar

When audio is playing and user wants to continue browsing:

- Collapse bottom sheet (pan map, scroll away) → sheet shrinks to mini player bar
- Mini bar appears at bottom of screen
- Mini bar shows:
  - What's currently playing (prayer leader name or masjid)
  - Play/pause button
  - Close button (stops audio, removes bar)

### Pin Switching Behavior

- If user taps a new pin while audio is playing → previous audio stops
- New bottom sheet rises with new masjid
- No two audios play simultaneously

### Closing Mini Player

- Tap close button → audio stops, bar disappears
- Returns to default map view

---

## List View

### Purpose

Alternative browsing mode for users who prefer scrolling through options rather than exploring spatially.

### Layout

- Full-screen scrollable list
- Dense card layout (Booking.com style density)
- Floating "عرض الخريطة" (Map) toggle button to switch back

### Card Content

Each masjid card contains:

- **صورة المسجد (Masjid image)** — thumbnail
- **اسم المسجد (Masjid name)** — primary text
- **اسم الإمام (Prayer leader name)** — secondary text
- **الحي (District/area)**
- **زر الاستماع (Audio button)** — inline, with duration hint or waveform
- **أيقونة الملاحة (Navigate icon)** — opens Google Maps
- **حالة المواقف (Parking indicator)** — icon or tag
- **حالة الازدحام (Crowding indicator)** — icon or tag
- **عدد الإعجابات (Like count)** — if available

### Interaction

- Tap audio button → plays sample inline
- Tap navigate → opens Google Maps directions
- Tap card → could expand to full detail view or open bottom sheet style detail

---

## Navigation / Location Features

### Approach

Avoid Google Maps API complexity for distance calculations.

### Alternatives Used

- Show **district/neighborhood name** (users have mental models of travel time)
- Allow **filter by district**
- Let the **map's spatial view** communicate proximity naturally

### Navigate Action

- Tapping navigate icon opens Google Maps app with destination coordinates
- Deep link to Google Maps for directions

---

## Filter System

### Available Filters

- **الأقرب (Nearest)**: Masjids closest to user's location
- **الأكثر شهرة (Popular)**: High traffic / well-known masjids
- **الأعلى تقييماً (Most Liked)**: Highest user ratings/likes
- **مواقف متاحة (Parking Available)**: Masjids with good parking

### Behavior

- Multi-select enabled (can combine filters)
- Selecting filters highlights matching pins on map
- Non-matching pins dim but remain visible
- In list view: filters sort/filter the list accordingly

### Default State

- No filter selected by default (all pins equal)
- Or consider: "الأقرب" auto-selected based on user location (TBD)

---

## Future Considerations

### User-Generated Content

Currently, parking and crowding notes are manually curated. Future iteration:

- Allow users to submit feedback/notes
- Selection-based input (not free text) for consistency
- Examples: "المواقف: سهل / متوسط / صعب"
- "الازدحام: واسع / يزدحم / احضر مبكراً"

### Additional Data Points

- Prayer times per masjid
- Photos of masjid interior/exterior
- User reviews or ratings
- Favorite/save functionality

### Search

- Not included in current scope
- Could add later: search by masjid name, prayer leader name, or district

---

## User Flows

### Flow 1: Discover via Map

```
فتح التطبيق
    ↓
عرض الخريطة (الدبابيس ظاهرة)
    ↓
المستخدم يتصفح ويكبر الخريطة
    ↓
يضغط على فلتر ← الدبابيس المطابقة تبرز
    ↓
يضغط على دبوس
    ↓
البطاقة السفلية ترتفع (٥٠٪)
    ↓
يرى اسم الإمام، يضغط على زر الصوت
    ↓
يستمع للعينة
    ↓
[خيار أ] أعجبه ← يضغط على الملاحة ← تفتح خرائط جوجل
[خيار ب] يريد المزيد ← يسحب للأعلى ← البطاقة تتوسع (١٠٠٪)
[خيار ج] لم يعجبه ← يسحب للأسفل ← البطاقة تغلق ← يتابع التصفح
```

### Flow 2: Browse While Listening

```
المستخدم يضغط على دبوس، يشغل الصوت
    ↓
يريد متابعة التصفح
    ↓
يحرك الخريطة (أو يسحب للأسفل لإغلاق البطاقة)
    ↓
البطاقة السفلية تتقلص إلى شريط مصغر
    ↓
الصوت يستمر بالعمل
    ↓
المستخدم يستكشف دبابيس أخرى
    ↓
يضغط على دبوس جديد ← الصوت السابق يتوقف، بطاقة جديدة تظهر
    ↓
أو يغلق الشريط المصغر ← الصوت يتوقف، العودة للخريطة الافتراضية
```

### Flow 3: List View Browsing

```
المستخدم يضغط على زر "عرض القائمة"
    ↓
تفتح القائمة (بطاقات كثيفة)
    ↓
المستخدم يتصفح المساجد
    ↓
يضغط على زر الصوت في بطاقة ← العينة تعمل
    ↓
يضغط على الملاحة ← تفتح خرائط جوجل
    ↓
أو يضغط على زر "عرض الخريطة" ← يعود لعرض الخريطة
```

---

## Technical Notes

### Map Styling

- Dark theme map (custom map style)
- If dark proves problematic for pin visibility, fallback to light map with dark UI

### Pin Visibility on Dark Map

- Use glowing effect or outer shadow on pins
- High-contrast pin colors
- Selected pin gets additional emphasis (scale, pulse)

### Bottom Sheet Implementation

- Drag gesture-based with snap points (0%, 50%, 100%)
- Velocity-sensitive (fast swipe = more momentum)
- Rubber-band bounce at limits

### Audio

- Stream audio from provided URLs
- Only one audio plays at a time
- Mini player persists across map interactions

### RTL Implementation

- CSS `direction: rtl` on root element
- HTML `lang="ar"` and `dir="rtl"` attributes
- Flexbox `row-reverse` where needed
- Logical properties (`margin-inline-start` vs `margin-left`)
- Icon mirroring for directional icons
- Text alignment defaults to right

---

## Summary

A focused, single-purpose app that helps users in Riyadh discover the perfect masjid for Ramadan prayers based on the prayer leader's voice. The experience is immersive, map-first, and designed with the calm spirituality of Ramadan nights in mind — while remaining highly functional and information-rich.

**Arabic RTL first** — built for the primary audience from the ground up.
