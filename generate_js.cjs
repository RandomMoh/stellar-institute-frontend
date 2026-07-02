const fs = require('fs');
const html = fs.readFileSync('clean_policy.html', 'utf-8');
const jsContent = `export const privacyPolicyHtml = ${JSON.stringify(html)};`;
if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data');
}
fs.writeFileSync('src/data/privacyPolicyHtml.js', jsContent);
console.log('Successfully generated privacyPolicyHtml.js');
