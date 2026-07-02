from bs4 import BeautifulSoup

with open("clean_policy.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

for tag in soup.find_all(['span', 'p', 'div', 'td']):
    if tag.string and tag.string.strip() == "Stellar Institute":
        # Create a new tag to replace it
        new_tag = soup.new_tag("strong")
        new_tag['style'] = "font-size: 1.8em; font-weight: 800; display: block; margin-bottom: 15px;"
        new_tag.string = "Stellar Institute"
        tag.replace_with(new_tag)
        break

with open("clean_policy.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
print("Title formatted")
