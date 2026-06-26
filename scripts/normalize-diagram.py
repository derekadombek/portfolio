#!/usr/bin/env python3
"""
Normalize an AI-generated architecture diagram into a consistent work-card image.

These diagrams come out of Gemini as large (~1480x710) PNGs on a near-black
background, each framed differently — the artwork sits at a different size and
position with varying margins, and there's a small decorative ✦ sparkle in the
bottom-right corner. Dropped straight onto the work cards they look inconsistent
(some zoomed in, some clipped by the card's 16:10 crop).

This script trims each diagram to its real artwork, scales it into a common box,
and centers it on a uniform canvas, so every diagram reads at the same scale and
nothing gets clipped by the card. Output is an optimized WebP in public/diagrams/.

Usage:
    python3 scripts/normalize-diagram.py <input.png> <slug>
    # e.g.
    python3 scripts/normalize-diagram.py ~/Downloads/Gemini_xyz.png cost-cleanup
    # -> writes public/diagrams/cost-cleanup.webp

Then point the case study at it in src/data/caseStudies.ts:
    diagram: '/diagrams/cost-cleanup.webp',

Requires Pillow:  pip3 install --user Pillow

Assumptions (tuned to the Gemini diagram style — tweak the constants if a future
image differs, e.g. a lighter background or the sparkle in a different corner):
  - dark background, bright/gray artwork
  - decorative sparkle lives in the bottom-right corner
"""
import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Pillow is required:  pip3 install --user Pillow")

# --- tunables ---------------------------------------------------------------
CANVAS_W, CANVAS_H = 1440, 648      # output canvas (~2.22:1, suits the wide diagrams)
BOX_W, BOX_H = 960, 360             # artwork is scaled to fit inside this box, centered.
                                    # BOX_H caps tall (multi-row) diagrams so they don't
                                    # render larger than the single-row pipelines.
THRESHOLD = 70                      # luminance above this counts as artwork. Low enough
                                    # to catch dim gray sub-labels, high enough to ignore
                                    # background noise.
BORDER = 16                         # ignore stray bright pixels in this edge frame
SPARKLE = (0.85, 0.66)             # blank everything right/below this fraction (the ✦)
CARD_ASPECT = 16 / 10               # the work card's crop ratio (see .cs-media in global.css)
WEBP_QUALITY = 82
# ---------------------------------------------------------------------------


def normalize(src: Path, out: Path) -> None:
    im = Image.open(src).convert("RGB")
    W, H = im.size

    # background color = median of the four corners (each diagram's own near-black)
    corners = [im.getpixel(p) for p in [(4, 4), (W - 5, 4), (4, H - 5), (W - 5, H - 5)]]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))

    # mask of bright artwork, with edge frame + sparkle corner blanked out
    mask = im.convert("L").point(lambda p: 255 if p > THRESHOLD else 0)
    d = ImageDraw.Draw(mask)
    d.rectangle([0, 0, W, BORDER], fill=0)
    d.rectangle([0, H - BORDER, W, H], fill=0)
    d.rectangle([0, 0, BORDER, H], fill=0)
    d.rectangle([W - BORDER, 0, W, H], fill=0)
    d.rectangle([int(W * SPARKLE[0]), int(H * SPARKLE[1]), W, H], fill=0)

    box = mask.getbbox()
    if box is None:
        sys.exit(f"No artwork detected in {src} — is it the expected dark diagram?")
    content = im.crop(box)
    cw, ch = content.size

    # contain-fit into the common box, preserving aspect
    scale = min(BOX_W / cw, BOX_H / ch)
    content = content.resize((round(cw * scale), round(ch * scale)), Image.LANCZOS)

    # the card crops to the central (CARD_ASPECT / canvas-aspect) of the width;
    # warn if the scaled artwork would spill outside that safe zone.
    visible_w = CANVAS_H * CARD_ASPECT
    if content.size[0] > visible_w:
        print(f"  ! warning: artwork ({content.size[0]}px) wider than the card-safe "
              f"width ({visible_w:.0f}px); it may clip. Lower BOX_W.")

    canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), bg)
    canvas.paste(content, ((CANVAS_W - content.size[0]) // 2,
                           (CANVAS_H - content.size[1]) // 2))
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, "WEBP", quality=WEBP_QUALITY, method=6)
    print(f"  {src.name}  ->  {out.relative_to(Path.cwd()) if out.is_relative_to(Path.cwd()) else out}"
          f"  ({content.size[0]}x{content.size[1]} on {CANVAS_W}x{CANVAS_H}, "
          f"{out.stat().st_size // 1024} KB)")


def main() -> None:
    ap = argparse.ArgumentParser(description="Normalize a diagram PNG into public/diagrams/<slug>.webp")
    ap.add_argument("input", type=Path, help="source image (e.g. a Gemini PNG)")
    ap.add_argument("slug", help="case-study slug -> public/diagrams/<slug>.webp")
    args = ap.parse_args()

    if not args.input.exists():
        sys.exit(f"Input not found: {args.input}")

    # locate public/diagrams relative to this script's repo, so it works from anywhere
    repo = Path(__file__).resolve().parent.parent
    out = repo / "public" / "diagrams" / f"{args.slug}.webp"
    print("Normalizing diagram:")
    normalize(args.input, out)


if __name__ == "__main__":
    main()
