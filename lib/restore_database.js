const childProcess = require('child_process');
const { parseVars, } = require('./database_backup_helpers');

const { database, user, password, host, sourceDB, } = parseVars();
childProcess.exec(
  `mongorestore -h ${host} -d ${database} -u ${user} -p ${password} ./${sourceDB}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
);
