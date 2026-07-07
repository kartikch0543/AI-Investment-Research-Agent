const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'components', 'SearchForm.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

if (content.includes('Run Research')) {
  content = content.replace(/Run Research/g, 'Research');
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log("Renamed 'Run Research' to 'Research' successfully.");
} else {
  console.log("Label 'Run Research' not found.");
}
