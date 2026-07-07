const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const clientSrcDir = path.join(__dirname, '..', 'client', 'src');

walkDir(clientSrcDir, (filePath) => {
  if (path.extname(filePath) === '.jsx' || path.extname(filePath) === '.js') {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace double-encoded comments and indicators
    content = content.replace(/\{(\s*)\/\*\s*[^\w\s]*\s*(Page header|Quick stats|Search \+ Progress|Report flow|Navigation|Header row|AI Thesis|Footer)[^\w\s]*\s*\*\/\s*\}/gi, '{$1/* $2 */$1}');
    
    // Replace TradeIntel AI A/A? Research Workspace with cleaned names
    content = content.replace(/TradeIntel AI A\? Research Workspace/g, 'TradeIntel AI Research Workspace');
    content = content.replace(/TradeIntel AI A Research Workspace/g, 'TradeIntel AI Research Workspace');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned encoding/mojibake in: ${path.basename(filePath)}`);
    }
  }
});
console.log("Cleanup script completed.");
