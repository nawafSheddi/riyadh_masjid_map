"""
Extract coordinates from Google Maps URLs for 148 masjids.

Three extraction methods:
1. @lat,lng from URL (for full Google Maps URLs with coordinates)
2. Plus Codes decoded with openlocationcode (from resolved short URLs)
3. S2 Cell ID decoded with s2sphere (from ftid parameters)

Usage:
    scripts/.venv/bin/python scripts/extract_coordinates.py
"""

import json
import os
import re
import subprocess
import sys
import time
import urllib.parse

import openpyxl
import s2sphere
from openlocationcode import openlocationcode as olc

sys.stdout.reconfigure(line_buffering=True)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
XLSX_PATH = os.path.join(SCRIPT_DIR, '..', 'riyadh_list.xlsx')
CACHE_PATH = os.path.join(SCRIPT_DIR, 'coordinates_cache.json')
OUTPUT_PATH = os.path.join(SCRIPT_DIR, 'masjids_extracted.json')

# Riyadh center for Plus Code recovery
RIYADH_LAT = 24.7136
RIYADH_LNG = 46.6753

REGION_MAP = {
    'الشمال': 'north',
    'الشرق': 'east',
    'الغرب والجنوب': 'westSouth',
}

# Riyadh coordinate bounds for validation
LAT_MIN, LAT_MAX = 24.3, 25.2
LNG_MIN, LNG_MAX = 46.2, 47.2

AT_COORD_PATTERN = re.compile(r'@([-\d.]+),([-\d.]+)')
DATA_3D_PATTERN = re.compile(r'!3d([-\d.]+)!4d([-\d.]+)')
PLUS_CODE_PATTERN = re.compile(r'([2-9CFGHJMPQRVWX]{4,8})[+ ]([2-9CFGHJMPQRVWX]{2,3})\b')
S2_CELL_PATTERN = re.compile(r'0x([0-9a-f]{16})')
FTID_PATTERN = re.compile(r'(?:ftid=|!1s)(0x[0-9a-f]+:0x[0-9a-f]+)')


def is_valid_riyadh_coord(lat, lng):
    return LAT_MIN <= lat <= LAT_MAX and LNG_MIN <= lng <= LNG_MAX


def load_cache():
    if os.path.exists(CACHE_PATH):
        with open(CACHE_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_cache(cache):
    with open(CACHE_PATH, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def decode_plus_code(short_code):
    """Decode a short Plus Code using Riyadh as reference."""
    try:
        full_code = olc.recoverNearest(short_code, RIYADH_LAT, RIYADH_LNG)
        decoded = olc.decode(full_code)
        lat = decoded.latitudeCenter
        lng = decoded.longitudeCenter
        if is_valid_riyadh_coord(lat, lng):
            return lat, lng
    except Exception:
        pass
    return None


def decode_s2_cell(hex_str):
    """Decode an S2 Cell ID hex string to lat/lng."""
    try:
        cell_id_int = int(hex_str, 16)
        cell = s2sphere.CellId(cell_id_int)
        if cell.is_valid():
            center = cell.to_lat_lng()
            lat = center.lat().degrees
            lng = center.lng().degrees
            if is_valid_riyadh_coord(lat, lng):
                return lat, lng
    except Exception:
        pass
    return None


def extract_from_url(url):
    """Extract coordinates from a URL using multiple methods."""
    # Method 1: @lat,lng
    match = AT_COORD_PATTERN.search(url)
    if match:
        lat, lng = float(match.group(1)), float(match.group(2))
        if is_valid_riyadh_coord(lat, lng):
            return lat, lng, '@coords'

    # Method 2: !3d lat !4d lng
    match = DATA_3D_PATTERN.search(url)
    if match:
        lat, lng = float(match.group(1)), float(match.group(2))
        if is_valid_riyadh_coord(lat, lng):
            return lat, lng, '!3d!4d'

    # Method 3: S2 Cell ID from ftid or !1s
    ftid_match = FTID_PATTERN.search(url)
    if ftid_match:
        ftid = ftid_match.group(1)
        s2_hex = ftid.split(':')[0]
        coords = decode_s2_cell(s2_hex)
        if coords:
            return coords[0], coords[1], 's2cell'

    return None


def resolve_short_url(url):
    """Resolve a short URL using curl, returning the effective URL."""
    try:
        result = subprocess.run(
            ['curl', '-sL', '-o', '/dev/null', '-w', '%{url_effective}', url],
            capture_output=True, text=True, timeout=15
        )
        resolved = result.stdout.strip()

        # Handle Google's sorry/CAPTCHA page
        if '/sorry/' in resolved:
            parsed = urllib.parse.urlparse(resolved)
            params = urllib.parse.parse_qs(parsed.query)
            continue_url = params.get('continue', [''])[0]
            if continue_url:
                resolved = urllib.parse.unquote(continue_url)

        return resolved
    except Exception:
        return url


def extract_from_resolved(resolved_url):
    """Extract coordinates from a resolved Google Maps URL."""
    decoded = urllib.parse.unquote(urllib.parse.unquote(resolved_url))

    # Try direct coordinate extraction first
    result = extract_from_url(decoded)
    if result:
        return result

    # Try Plus Code from q parameter
    parsed = urllib.parse.urlparse(decoded)
    params = urllib.parse.parse_qs(parsed.query)
    q = urllib.parse.unquote(params.get('q', [''])[0])

    plus_match = PLUS_CODE_PATTERN.search(q)
    if plus_match:
        code = plus_match.group(1) + '+' + plus_match.group(2)
        coords = decode_plus_code(code)
        if coords:
            return coords[0], coords[1], 'plus_code'

    # Try ftid from URL params
    ftid = params.get('ftid', [''])[0]
    if ftid:
        s2_hex = ftid.split(':')[0]
        coords = decode_s2_cell(s2_hex)
        if coords:
            return coords[0], coords[1], 's2cell'

    return None


def read_excel():
    wb = openpyxl.load_workbook(XLSX_PATH)
    ws = wb['جميع القراء']
    entries = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        entries.append({
            'readerName': row[0],
            'masjidName': row[1],
            'region_ar': row[2],
            'region': REGION_MAP.get(row[2], row[2]),
            'googleMapsUrl': row[3],
            'audioUrl': row[4],
            'notes': row[5] if row[5] else None,
        })
    return entries


def main():
    print("Reading Excel data...")
    entries = read_excel()
    print(f"Found {len(entries)} entries\n")

    print("Loading cache...")
    cache = load_cache()
    print(f"Cache has {len(cache)} entries\n")

    print("Extracting coordinates...")
    methods_count = {}

    for i, entry in enumerate(entries):
        url = entry['googleMapsUrl']

        # Check cache first
        if url in cache:
            entry['lat'] = cache[url]['lat']
            entry['lng'] = cache[url]['lng']
            method = cache[url].get('method', 'cached')
            methods_count[method] = methods_count.get(method, 0) + 1
            continue

        # Try extracting directly from original URL
        result = extract_from_url(url)
        if result:
            entry['lat'], entry['lng'], method = result
            cache[url] = {'lat': entry['lat'], 'lng': entry['lng'], 'method': method}
            methods_count[method] = methods_count.get(method, 0) + 1
            print(f"  [{method}] {i+1}/148: {entry['readerName']} -> ({entry['lat']:.6f}, {entry['lng']:.6f})")
            continue

        # Need to resolve short URL
        if 'maps.app.goo.gl' in url or 'goo.gl' in url:
            time.sleep(2)  # Rate limiting
            resolved = resolve_short_url(url)
            result = extract_from_resolved(resolved)
            if result:
                entry['lat'], entry['lng'], method = result
                cache[url] = {'lat': entry['lat'], 'lng': entry['lng'], 'method': method}
                methods_count[method] = methods_count.get(method, 0) + 1
                print(f"  [{method}] {i+1}/148: {entry['readerName']} -> ({entry['lat']:.6f}, {entry['lng']:.6f})")
            else:
                entry['lat'] = None
                entry['lng'] = None
                print(f"  [FAIL] {i+1}/148: {entry['readerName']} - no coords in resolved URL")
        else:
            # Full URL but couldn't extract - try resolved version
            result = extract_from_resolved(url)
            if result:
                entry['lat'], entry['lng'], method = result
                cache[url] = {'lat': entry['lat'], 'lng': entry['lng'], 'method': method}
                methods_count[method] = methods_count.get(method, 0) + 1
                print(f"  [{method}] {i+1}/148: {entry['readerName']} -> ({entry['lat']:.6f}, {entry['lng']:.6f})")
            else:
                entry['lat'] = None
                entry['lng'] = None
                print(f"  [FAIL] {i+1}/148: {entry['readerName']} - could not extract coords")

        # Save cache every 20 entries
        if (i + 1) % 20 == 0:
            save_cache(cache)
            print(f"  ... cache saved ({i+1}/148)")

    # Save final cache
    save_cache(cache)

    # Report
    success = sum(1 for e in entries if e.get('lat') is not None)
    failed = sum(1 for e in entries if e.get('lat') is None)
    print(f"\nResults: {success} success, {failed} failed out of {len(entries)}")
    print(f"\nMethods used:")
    for method, count in sorted(methods_count.items()):
        print(f"  {method}: {count}")

    if failed > 0:
        print("\nFailed entries:")
        for i, e in enumerate(entries):
            if e.get('lat') is None:
                print(f"  Row {i+1}: {e['readerName']} - {e['googleMapsUrl']}")

    # Save output
    output = []
    for e in entries:
        item = {
            'readerName': e['readerName'],
            'masjidName': e['masjidName'],
            'region': e['region'],
            'googleMapsUrl': e['googleMapsUrl'],
            'audioUrl': e['audioUrl'],
        }
        if e.get('lat') is not None:
            item['lat'] = round(e['lat'], 7)
            item['lng'] = round(e['lng'], 7)
        else:
            item['lat'] = None
            item['lng'] = None
        if e.get('notes'):
            item['notes'] = e['notes']
        output.append(item)

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\nOutput saved to {OUTPUT_PATH}")


if __name__ == '__main__':
    main()
