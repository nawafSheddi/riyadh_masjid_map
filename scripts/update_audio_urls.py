#!/usr/bin/env python3
"""
Update audioUrl entries in masjids.ts to point to R2-hosted files.

Reads the manifest.json from the download step and replaces YouTube URLs
in masjids.ts with the corresponding R2 URLs.

Usage:
    python scripts/update_audio_urls.py
"""

import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MASJIDS_TS = PROJECT_ROOT / "src" / "data" / "masjids.ts"
MANIFEST = PROJECT_ROOT / "downloads" / "youtube-audio" / "manifest.json"

R2_BASE_URL = "https://masjid.nawaf-alsheddi.com/youtube-audio"


def main():
    # Load manifest
    with open(MANIFEST, encoding="utf-8") as f:
        manifest = json.load(f)

    print(f"Loaded manifest with {len(manifest)} entries")

    # Read masjids.ts
    content = MASJIDS_TS.read_text(encoding="utf-8")
    original = content

    # Replace each YouTube audioUrl with R2 URL
    replaced = 0
    for masjid_id, info in manifest.items():
        source_url = info["sourceUrl"]
        filename = info["filename"]
        r2_url = f"{R2_BASE_URL}/{filename}"

        # Escape the source URL for regex (special chars like ?, &, etc.)
        escaped = re.escape(source_url)
        pattern = f"audioUrl: '{escaped}'"
        replacement = f"audioUrl: '{r2_url}'"

        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            replaced += 1
            content = new_content
        else:
            print(f"  WARNING: Could not find audioUrl for {masjid_id}: {source_url}")

    # Write back
    if replaced > 0:
        MASJIDS_TS.write_text(content, encoding="utf-8")
        print(f"\nUpdated {replaced} audioUrl entries in masjids.ts")
    else:
        print("\nNo changes made")

    # Verify
    youtube_remaining = len(re.findall(r"audioUrl:.*youtu", content))
    r2_count = len(re.findall(r"audioUrl:.*masjid\.nawaf-alsheddi\.com", content))
    print(f"  YouTube URLs remaining: {youtube_remaining}")
    print(f"  R2 URLs: {r2_count}")


if __name__ == "__main__":
    main()
