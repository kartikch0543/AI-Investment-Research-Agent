const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'components', 'ScoreBreakdownSection.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Use regular expression to match '{item.score} <anything> {item.weight}%'
const regex = /\{item\.score\}\s+[^\}]+\s+\{item\.weight\}%/g;
if (regex.test(content)) {
  content = content.replace(regex, '{item.score} × {item.weight}%');
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log("Fixed multiplication character successfully.");
} else {
  console.log("Regex did not match.");
}
