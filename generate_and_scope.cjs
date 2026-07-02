const fs = require('fs');

// Read cleaned HTML
let html = fs.readFileSync('clean_policy.html', 'utf-8');

// Scope the CSS rules to prevent bleeding
html = html.replace(/body{/g, '.google-doc-wrapper .google-doc-body{');
html = html.replace(/p{/g, '.google-doc-wrapper p{');
html = html.replace(/h1{/g, '.google-doc-wrapper h1{');
html = html.replace(/h2{/g, '.google-doc-wrapper h2{');
html = html.replace(/h3{/g, '.google-doc-wrapper h3{');
html = html.replace(/li{/g, '.google-doc-wrapper li{');

// Fix the date format
html = html.replace(/\[insert date\]/gi, '3rd July, 2026');
html = html.replace(/3 july 2026/gi, '3rd July, 2026');

// Create the JS module content
const jsContent = `export const privacyPolicyHtml = ${JSON.stringify(html)};`;

// Ensure directory exists
if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data');
}

// Write the final JS file
fs.writeFileSync('src/data/privacyPolicyHtml.js', jsContent);
console.log('Successfully generated, scoped, and fixed date!');
