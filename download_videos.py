import os
import requests
import re

def get_confirm_token(response):
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            return value
    match = re.search(r'confirm=([0-9A-Za-z_]+)', response.text)
    if match:
        return match.group(1)
    return None

def download_file(id, dest):
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()
    response = session.get(URL, params={'id': id}, stream=True)
    token = get_confirm_token(response)
    if token:
        response = session.get(URL, params={'id': id, 'confirm': token}, stream=True)
    with open(dest, "wb") as f:
        for chunk in response.iter_content(32768):
            if chunk:
                f.write(chunk)

with open('src/data/reviews.js', 'r') as f:
    content = f.read()

parts = content.split('instituteReviews')
acad_ids = re.findall(r"id:\s*'([^']+)'", parts[0])
inst_ids = re.findall(r"id:\s*'([^']+)'", parts[1])

os.makedirs('public/assets/videos', exist_ok=True)

for idx, vid in enumerate(acad_ids):
    print(f"Downloading Academy Video {idx+1}...")
    download_file(vid, f"public/assets/videos/academy_{idx+1}.mp4")

for idx, vid in enumerate(inst_ids):
    print(f"Downloading Institute Video {idx+1}...")
    download_file(vid, f"public/assets/videos/institute_{idx+1}.mp4")

print("Downloads complete!")
