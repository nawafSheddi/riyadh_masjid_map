"""
Generate src/data/masjids.ts from extracted JSON data.

Reads scripts/masjids_extracted.json and generates a TypeScript file
with properly typed Masjid[] data.

Usage:
    scripts/.venv/bin/python scripts/generate_masjids_ts.py
"""

import json
import os
from datetime import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_PATH = os.path.join(SCRIPT_DIR, 'masjids_extracted.json')
OUTPUT_PATH = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'masjids.ts')

REGION_ORDER = ['north', 'east', 'westSouth']
REGION_LABELS = {
    'north': 'North Region (الشمال)',
    'east': 'East Region (الشرق)',
    'westSouth': 'West & South Region (الغرب والجنوب)',
}
REGION_PREFIX = {
    'north': 'n',
    'east': 'e',
    'westSouth': 'ws',
}


def generate():
    with open(INPUT_PATH, 'r', encoding='utf-8') as f:
        entries = json.load(f)

    # Group by region
    by_region = {r: [] for r in REGION_ORDER}
    for entry in entries:
        region = entry['region']
        if region in by_region:
            by_region[region].append(entry)

    # Generate TypeScript
    lines = []
    lines.append('/**')
    lines.append(' * Masjid Data')
    lines.append(' *')
    lines.append(f' * {len(entries)} masjids across 3 regions in Riyadh.')
    lines.append(f' * Auto-generated from riyadh_list.xlsx on {datetime.now().strftime("%Y-%m-%d")}.')
    lines.append(' */')
    lines.append('')
    lines.append("import type { Masjid } from '@/types'")
    lines.append('')
    lines.append('export const MASJIDS: Masjid[] = [')

    for region in REGION_ORDER:
        entries_in_region = by_region[region]
        prefix = REGION_PREFIX[region]
        label = REGION_LABELS[region]

        lines.append(f"  // {'─' * 3} {label} {'─' * 3}")

        for idx, entry in enumerate(entries_in_region, 1):
            entry_id = f'{prefix}-{idx:03d}'
            lines.append('  {')
            lines.append(f"    id: '{entry_id}',")
            lines.append(f"    readerName: '{escape_ts(entry['readerName'])}',")
            lines.append(f"    masjidName: '{escape_ts(entry['masjidName'])}',")
            lines.append(f"    region: '{region}',")
            lines.append(f"    coordinates: {{ lat: {entry['lat']}, lng: {entry['lng']} }},")
            lines.append(f"    googleMapsUrl: '{escape_ts(entry['googleMapsUrl'])}',")
            lines.append(f"    audioUrl: '{escape_ts(entry['audioUrl'])}',")
            if entry.get('notes'):
                lines.append(f"    notes: '{escape_ts(entry['notes'])}',")
            lines.append('  },')

        lines.append('')

    lines.append(']')
    lines.append('')

    output = '\n'.join(lines)

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(output)

    # Report
    total = len(entries)
    for region in REGION_ORDER:
        count = len(by_region[region])
        print(f"  {REGION_LABELS[region]}: {count} entries")
    print(f"  Total: {total} entries")
    print(f"\nGenerated: {OUTPUT_PATH}")


def escape_ts(s):
    """Escape a string for use in TypeScript single-quoted strings."""
    return s.replace('\\', '\\\\').replace("'", "\\'")


if __name__ == '__main__':
    generate()
