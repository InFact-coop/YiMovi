const fs = require('fs');
const path = require('path');

module.exports = {
  parseVars: () => JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', `${process.argv[2] || 'mongo_config'}.json`),
    'utf8'
  )),
};
