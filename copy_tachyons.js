const path = require('path')
const fs = require('fs')

const tachyonsPath = path.join(__dirname, 'tachyons', 'css', 'tachyons.min.css')
const outputPath = path.join(__dirname, 'public', 'tachyons.min.css')
fs.writeFileSync(
  outputPath,
  fs.readFileSync(tachyonsPath, 'utf8'),
  'utf8'
)

// 
// /*"heroku_deploy_master": "npm run deploy && git merge master && git checkout -B deploy && git push heroku deploy:master",*/
// "deploy": "git checkout -B deploy && git add -f public/tachyons.min.css && git commit -m \"deploy\""
