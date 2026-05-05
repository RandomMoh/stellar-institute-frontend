from PIL import Image, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255, 0))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

try:
    img = Image.open('public/stellar_fav.png')
    trimmed = trim(img)
    trimmed.save('public/stellar_fav.png')
    print("Trimmed favicon successfully")
except Exception as e:
    print(e)
