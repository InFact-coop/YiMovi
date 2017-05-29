const path = require('path');
const fs = require('fs');

const tachyonsPath = path.join(
  __dirname,
  '..',
  'tachyons',
  'css',
  'tachyons.min.css'
);

const outputPath = path.join(
  __dirname,
  '..',
  'public',
  'tachyons.min.css'
);

fs.writeFileSync(
  outputPath,
  fs.readFileSync(tachyonsPath, 'utf8'),
  'utf8'
);
