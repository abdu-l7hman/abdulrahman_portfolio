from pathlib import Path
import shutil
import fitz
from PIL import Image, ImageOps, ImageDraw

source = Path(".local/conversation-workspace/files/attached_assets")
public = Path("artifacts/portfolio/public")
files = public / "files"
images = public / "images"
files.mkdir(parents=True, exist_ok=True)
images.mkdir(parents=True, exist_ok=True)
documents = {
    "ghanatk": "document(53)_1793119264714.pdf",
    "benefit": "document(54)_1793119576784.pdf",
    "arena-os": "document(55)_1793119885098.pdf",
    "taleeq": "document(56)_1793119984398.pdf",
    "calix": "document(57)_1793120162101.pdf",
    "abdulrhman-resume": "Abdulrhman_Resume_1793122012806.pdf",
}
tiles = []
for name, filename in documents.items():
    shutil.copy2(source / filename, files / f"{name}.pdf")
    document = fitz.open(source / filename)
    print(name, "pages:", len(document))
    if name == "abdulrhman-resume":
        continue
    page = document[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.4, 1.4), alpha=False)
    pix.save(images / f"{name}.jpg")
    cover = Image.open(images / f"{name}.jpg").convert("RGB")
    tile = ImageOps.contain(cover, (600, 340))
    canvas = Image.new("RGB", (620, 380), "#ddd")
    canvas.paste(tile, ((620-tile.width)//2, 25))
    ImageDraw.Draw(canvas).text((10, 360), name, fill="black")
    tiles.append(canvas)
shutil.copy2(source / "YSR_pitch_deck_(2)_2_1793119472890.pptx", files / "ysr.pptx")
for name, pattern in [
    ("mobdi", "*١٩٤١٥٧*"), ("mobdi-goals", "*١٩٤٢٠١*"),
    ("mobdi-tutors", "*١٩٤٢٠٨*"), ("malazim", "*١٩٤٢٥٤*"),
    ("event-1", "*١٩٤٧٣٦*"), ("event-2", "*١٩٤٧٣٢*"),
    ("event-3", "*١٩٤٨٤٨*"), ("event-4", "*١٩٤٨٤٠*"),
    ("achievement", "*٢٠٢٤٢٠*"),
]:
    path = next(source.glob(pattern))
    image = Image.open(path).convert("RGB")
    image.thumbnail((1200, 1500))
    image.save(images / f"{name}.jpg", quality=85, optimize=True)
    thumb = ImageOps.contain(image, (290, 350))
    tile = Image.new("RGB", (310, 380), "#ddd")
    tile.paste(thumb, ((310-thumb.width)//2, 0))
    ImageDraw.Draw(tile).text((10, 360), name, fill="black")
    tiles.append(tile)
board = Image.new("RGB", (1860, 1520), "#bbb")
x = y = 0
for tile in tiles:
    if x + tile.width > board.width:
        y += 380
        x = 0
    board.paste(tile, (x, y))
    x += tile.width
Path("/tmp/portfolio").mkdir(exist_ok=True)
board.save("/tmp/portfolio/contact-sheet.jpg")
