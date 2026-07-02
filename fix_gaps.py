from bs4 import BeautifulSoup
import re

with open("clean_policy.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span']):
    # if it only contains empty space (or empty span), decompose it
    text = tag.get_text().strip()
    if len(text) == 0 and not tag.find('img'):
        tag.decompose()

with open("clean_policy.html", "w", encoding="utf-8") as f:
    f.write(str(soup))

print("Gaps fixed")
