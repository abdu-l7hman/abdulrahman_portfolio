"""Render every supplied project page, preserving order and source fidelity."""
import json
import subprocess
from pathlib import Path

import pymupdf
from PIL import Image

root = Path("artifacts/portfolio")
source = Path(".local/conversation-workspace/files/attached_assets")
output = root / "public/images/projects"
output.mkdir(parents=True, exist_ok=True)
temporary = Path("/tmp/portfolio-deck")
temporary.mkdir(exist_ok=True)
subprocess.run(
    ["libreoffice", "-env:UserInstallation=file:///tmp/portfolio-lo-profile",
     "--headless", "--convert-to", "pdf", "--outdir", str(temporary),
     str(root / "public/files/ysr.pptx")],
    check=True, timeout=180,
)
documents = {
    "ghanatk": root / "public/files/ghanatk.pdf",
    "ysr": temporary / "ysr.pdf",
    "calix": root / "public/files/calix.pdf",
    "taleeq": root / "public/files/taleeq.pdf",
    "arena": root / "public/files/arena-os.pdf",
    "benefit": root / "public/files/benefit.pdf",
}
manifest = {}
for name, filename in documents.items():
    folder = output / name
    folder.mkdir(exist_ok=True)
    document = pymupdf.open(filename)
    manifest[name] = []
    for number, page in enumerate(document, 1):
        scale = min(1600 / page.rect.width, 1200 / page.rect.height)
        pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        target = folder / f"{number:02}.webp"
        image.save(target, "WEBP", quality=88, method=5)
        manifest[name].append(str(target.relative_to(root / "public")))
    print(name, len(manifest[name]), "pages")
for name, times in {
    "mobdi": ["١٩٤١٥٧", "١٩٤٢٠١", "١٩٤٢٠٤", "١٩٤٢٠٨", "١٩٤٢١١"],
    "malazim": ["١٩٤٢٥٤", "١٩٤٢٤٧"],
}.items():
    folder = output / name
    folder.mkdir(exist_ok=True)
    manifest[name] = []
    for number, timestamp in enumerate(times, 1):
        filename = next(source.glob(f"*{timestamp}*"))
        image = Image.open(filename).convert("RGB")
        image.thumbnail((1000, 1500))
        target = folder / f"{number:02}.webp"
        image.save(target, "WEBP", quality=88)
        manifest[name].append(str(target.relative_to(root / "public")))
    print(name, len(manifest[name]), "screenshots")
(root / "src/data/galleries.json").write_text(json.dumps(manifest, indent=2) + "\n")
