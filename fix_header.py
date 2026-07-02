from bs4 import BeautifulSoup
import re

with open("clean_policy.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'span', 'div']):
    text = tag.get_text().strip()
    # If the tag is exactly "Privacy Policy Content" or "Privacy Policy", decompose it
    if text == "Privacy Policy Content" or text == "Privacy Policy":
        tag.decompose()

with open("clean_policy.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
print("Header removed")
