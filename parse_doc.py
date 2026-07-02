import sys
from bs4 import BeautifulSoup

with open("privacy_policy.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

style = soup.head.find("style")
style_text = str(style) if style else ""

body = soup.body
if body:
    for script in body("script"):
        script.extract()
    
    # We want to iterate through the body's direct children
    # Start capturing when we see text like "Privacy Policy Content" or "Privacy Policy"
    # Stop capturing when we see a major heading like "Changes" or "Section 1" or "Matric"
    
    captured_nodes = []
    is_capturing = False
    
    # We'll use a string to store the combined html
    extracted_html = ""
    
    for element in body.children:
        if element.name is None:
            text = str(element).strip()
            if not text:
                continue
        else:
            text = element.get_text().strip()
            
        # check if it's the start
        if not is_capturing:
            if text == "Privacy Policy Content" or text == "Privacy Policy":
                is_capturing = True
        else:
            # check if it's the end (the next section is "Changes" or "Section 1")
            if (element.name in ['h1', 'h2', 'h3', 'p', 'span'] and 
                (text.startswith("Changes") and len(text) < 15 and text != "Changes to This Policy") or 
                text == "Section 1" or text == "Matric"):
                break
                
        if is_capturing:
            # remove images inside this element to keep size small
            if element.name:
                for img in element.find_all('img'):
                    img.decompose()
            extracted_html += str(element)
else:
    extracted_html = ""

with open("clean_policy.html", "w", encoding="utf-8") as f:
    f.write(f"<div class=\"google-doc-wrapper\">\n{style_text}\n<div class=\"google-doc-body\">\n{extracted_html}\n</div>\n</div>")

print("Extracted successfully.")
