#!/usr/bin/env python3
"""
Download YouTube audio files for all masjids with YouTube audioUrls.

Parses masjids.ts, extracts YouTube URLs, downloads audio as mp3,
and generates a manifest.json for mapping IDs to files.

Usage:
    python scripts/download_youtube_audio.py
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path

# Paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_DIR = Path(__file__).resolve().parent
MASJIDS_TS = PROJECT_ROOT / "src" / "data" / "masjids.ts"
OUTPUT_DIR = PROJECT_ROOT / "downloads" / "youtube-audio"

# Resolve yt-dlp binary: prefer venv, fallback to system
VENV_YT_DLP = SCRIPTS_DIR / ".venv" / "bin" / "yt-dlp"
YT_DLP_BIN = str(VENV_YT_DLP) if VENV_YT_DLP.exists() else "yt-dlp"


def parse_masjids_ts(filepath: Path) -> list[dict]:
    """Parse masjids.ts and extract entries with YouTube audioUrls."""
    content = filepath.read_text(encoding="utf-8")

    # Match each masjid object block
    pattern = re.compile(
        r"\{\s*"
        r"id:\s*'([^']+)'\s*,\s*"
        r"readerName:\s*'([^']+)'\s*,\s*"
        r"masjidName:\s*'([^']+)'\s*,\s*"
        r"region:\s*'([^']+)'\s*,\s*"
        r"coordinates:\s*\{[^}]+\}\s*,\s*"
        r"googleMapsUrl:\s*'[^']*'\s*,\s*"
        r"audioUrl:\s*'([^']+)'\s*,?"
        r"[^}]*\}",
        re.DOTALL,
    )

    entries = []
    for match in pattern.finditer(content):
        masjid_id, reader, masjid, region, audio_url = match.groups()
        if "youtu" in audio_url:
            entries.append(
                {
                    "id": masjid_id,
                    "readerName": reader,
                    "masjidName": masjid,
                    "region": region,
                    "audioUrl": audio_url,
                }
            )

    return entries


def check_yt_dlp():
    """Check if yt-dlp is installed."""
    try:
        result = subprocess.run(
            [YT_DLP_BIN, "--version"], capture_output=True, text=True, check=True
        )
        print(f"yt-dlp version: {result.stdout.strip()}")
        return True
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("ERROR: yt-dlp is not installed.")
        print("Install with: brew install yt-dlp  OR  pip install yt-dlp")
        return False


def download_audio(url: str, output_dir: Path, masjid_id: str) -> str | None:
    """Download audio from a YouTube URL using yt-dlp.

    Returns the filename if successful, None if failed.
    Downloads best audio stream in native format (usually m4a/webm).
    """
    try:
        # Use yt-dlp's output template to name by masjid_id
        output_template = str(output_dir / f"{masjid_id}.%(ext)s")
        result = subprocess.run(
            [
                YT_DLP_BIN,
                "--format", "bestaudio[ext=m4a]/bestaudio",
                "--output", output_template,
                "--no-playlist",
                "--quiet",
                "--no-warnings",
                url,
            ],
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode != 0:
            print(f"  yt-dlp error: {result.stderr.strip()}")
            return None

        # Find the downloaded file (extension varies)
        matches = list(output_dir.glob(f"{masjid_id}.*"))
        audio_matches = [m for m in matches if m.suffix in ('.m4a', '.webm', '.opus', '.ogg', '.mp3', '.aac')]
        if audio_matches:
            return audio_matches[0].name
        return None
    except subprocess.TimeoutExpired:
        print("  Timeout after 120s")
        return None
    except Exception as e:
        print(f"  Exception: {e}")
        return None


def main():
    print(f"Using yt-dlp: {YT_DLP_BIN}")

    # Check yt-dlp
    if not check_yt_dlp():
        sys.exit(1)

    # Parse masjids
    print(f"\nParsing {MASJIDS_TS}...")
    entries = parse_masjids_ts(MASJIDS_TS)
    print(f"Found {len(entries)} YouTube audio entries\n")

    if not entries:
        print("No YouTube entries found. Exiting.")
        sys.exit(1)

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Download
    manifest = {}
    success_count = 0
    skip_count = 0
    fail_count = 0
    failed_entries = []

    for i, entry in enumerate(entries, 1):
        masjid_id = entry["id"]
        audio_url = entry["audioUrl"]

        # Skip if already downloaded (check for any audio file with this ID)
        existing = [f for f in OUTPUT_DIR.glob(f"{masjid_id}.*")
                     if f.suffix in ('.m4a', '.webm', '.opus', '.ogg', '.mp3', '.aac')]
        if existing and existing[0].stat().st_size > 0:
            filename = existing[0].name
            print(f"[{i}/{len(entries)}] SKIP {masjid_id} (already exists: {filename})")
            skip_count += 1
            manifest[masjid_id] = {
                "filename": filename,
                "readerName": entry["readerName"],
                "masjidName": entry["masjidName"],
                "region": entry["region"],
                "sourceUrl": audio_url,
            }
            continue

        print(f"[{i}/{len(entries)}] Downloading {masjid_id} from {audio_url}...", flush=True)

        filename = download_audio(audio_url, OUTPUT_DIR, masjid_id)
        if filename:
            filepath = OUTPUT_DIR / filename
            size_kb = filepath.stat().st_size / 1024
            print(f"  OK ({size_kb:.0f} KB) -> {filename}", flush=True)
            success_count += 1
            manifest[masjid_id] = {
                "filename": filename,
                "readerName": entry["readerName"],
                "masjidName": entry["masjidName"],
                "region": entry["region"],
                "sourceUrl": audio_url,
            }
        else:
            print(f"  FAIL", flush=True)
            fail_count += 1
            failed_entries.append(entry)

    # Write manifest
    manifest_path = OUTPUT_DIR / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    # Write failed entries for retry
    if failed_entries:
        failed_path = OUTPUT_DIR / "failed.json"
        with open(failed_path, "w", encoding="utf-8") as f:
            json.dump(failed_entries, f, ensure_ascii=False, indent=2)

    # Summary
    print(f"\n{'='*50}")
    print(f"DOWNLOAD COMPLETE")
    print(f"{'='*50}")
    print(f"  Success:  {success_count}")
    print(f"  Skipped:  {skip_count}")
    print(f"  Failed:   {fail_count}")
    print(f"  Total:    {len(entries)}")
    print(f"\n  Output:   {OUTPUT_DIR}")
    print(f"  Manifest: {manifest_path}")
    if failed_entries:
        print(f"  Failed:   {OUTPUT_DIR / 'failed.json'}")
    print()


if __name__ == "__main__":
    main()
