from bs4 import BeautifulSoup
import time

# wait for the file
for _ in range(10):
    try:
        with open("privacy_policy.html", "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f, "html.parser")
            break
    except:
        time.sleep(1)

for heading in soup.find_all(['h1', 'h2', 'h3', 'p']):
    text = heading.get_text().strip()
    if len(text) > 0 and len(text) < 100:
        if heading.name in ['h1', 'h2', 'h3'] or 'policy' in text.lower() or 'terms' in text.lower():
            print(heading.name, text)
