const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'components', 'ResearchEmptyState.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

content = content.replace(/0\S+100/g, '0-100');

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Fixed 0-100 typo in ResearchEmptyState.jsx successfully.");
