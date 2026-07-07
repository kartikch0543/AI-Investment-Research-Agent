const fs = require('fs');
const path = require('path');

const loginPath = path.join(__dirname, '..', 'client', 'src', 'pages', 'LoginPage.jsx');
const signupPath = path.join(__dirname, '..', 'client', 'src', 'pages', 'SignupPage.jsx');

// Fix LoginPage.jsx
if (fs.existsSync(loginPath)) {
  let content = fs.readFileSync(loginPath, 'utf8');
  
  // Clean double-encoded characters
  content = content.replace(/analysts [^\w\s]*\s*now available/g, 'analysts — now available');
  content = content.replace(/Platform A[^\w\s]*\s*Built/g, 'Platform — Built');
  content = content.replace(/Create account\s+[^\w\s]*'/g, 'Create account →');
  content = content.replace(/Create account\s+[^\w\s]*\+[^']*/g, 'Create account →');
  
  fs.writeFileSync(loginPath, content, 'utf8');
  console.log("LoginPage.jsx cleaned.");
}

// Fix SignupPage.jsx
if (fs.existsSync(signupPath)) {
  let content = fs.readFileSync(signupPath, 'utf8');
  
  // Clean emojis mojibake
  content = content.replace(/icon:\s*"dY\s*-\s*"/g, 'icon: "🤖"');
  content = content.replace(/icon:\s*"dY"S"/g, 'icon: "📊"');
  content = content.replace(/icon:\s*"dY'[^"]*"/g, 'icon: "💡"');
  
  // Clean other mojibake text
  content = content.replace(/decisions\s+[^\w\s]*\s*no black/g, 'decisions — no black');
  content = content.replace(/Ac\s*\{/g, '© {');
  content = content.replace(/TradeIntel AI A[^\w\s]*\s*Built/g, 'TradeIntel AI — Built');
  content = content.replace(/Sign in\s+[^\w\s]*'/g, 'Sign in →');
  
  fs.writeFileSync(signupPath, content, 'utf8');
  console.log("SignupPage.jsx cleaned.");
}
