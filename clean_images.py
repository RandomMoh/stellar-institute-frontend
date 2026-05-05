import os
import re

public_dir = '/opt/lampp/htdocs/stellar_institute/public'
src_dir = '/opt/lampp/htdocs/stellar_institute/src'

# Step 1: Find all images in public/
all_images = set()
for root, _, files in os.walk(public_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp')):
            full_path = os.path.join(root, f)
            rel_path = '/' + os.path.relpath(full_path, public_dir)
            all_images.add(rel_path)

# Step 2: Find all references in src/
used_images = set()
for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.jsx', '.js', '.css')):
            with open(os.path.join(root, f), 'r') as fp:
                content = fp.read()
                # Find strings that look like /images_2025/... or similar
                # Also look for things like stellar_fav.png or stellar_logo.png
                for img in all_images:
                    if img in content or img.lstrip('/') in content:
                        used_images.add(img)

# Step 3: Find unused
unused_images = all_images - used_images

# Step 4: Check index.html just in case
with open('/opt/lampp/htdocs/stellar_institute/index.html', 'r') as fp:
    content = fp.read()
    for img in unused_images.copy():
        if img in content or img.lstrip('/') in content:
            used_images.add(img)
            unused_images.remove(img)

print(f"Total images: {len(all_images)}")
print(f"Used images: {len(used_images)}")
print(f"Unused images: {len(unused_images)}")

print("\nDeleting unused images...")
for img in unused_images:
    full_path = os.path.join(public_dir, img.lstrip('/'))
    print(f"Deleting: {full_path}")
    os.remove(full_path)

print("Done!")
