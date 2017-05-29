const fs = require('fs');
const path = require('path');

module.exports = {
  parseVars: () => JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', 'mongo_config.json'),
    'utf8'
  )),
};
