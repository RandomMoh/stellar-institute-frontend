from PIL import Image, ImageChops

def square_trim(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255, 0))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if not bbox:
        return im
        
    # bbox is (left, upper, right, lower)
    left, upper, right, lower = bbox
    width = right - left
    height = lower - upper
    
    # Make it a square by taking the maximum dimension
    max_dim = max(width, height)
    
    # Calculate new coordinates to keep it centered
    new_left = left - (max_dim - width) / 2
    new_upper = upper - (max_dim - height) / 2
    new_right = new_left + max_dim
    new_lower = new_upper + max_dim
    
    # Ensure we don't go out of original image bounds (though technically we can pad if needed)
    # The safest way is to crop and then paste into a new square image if it goes out of bounds,
    # but since it's just a favicon, let's just pad the cropped image to be perfectly square.
    
    cropped = im.crop(bbox)
    square_img = Image.new('RGBA', (max_dim, max_dim), (255, 255, 255, 0))
    
    paste_x = int((max_dim - width) / 2)
    paste_y = int((max_dim - height) / 2)
    
    square_img.paste(cropped, (paste_x, paste_y))
    return square_img

try:
    img = Image.open('public/stellar_fav.png')
    trimmed = square_trim(img)
    trimmed.save('public/stellar_fav.png')
    print("Squared and trimmed successfully")
except Exception as e:
    print(e)
