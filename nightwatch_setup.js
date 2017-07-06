require('env2')('.env'); // optionally store your Evironment Variables in .env
const PKG = require('./package.json'); // so we can get the version of the project
const SCREENSHOT_PATH = './reports/screenshots/' + PKG.version + '/';
const BINPATH = './node_modules/nightwatch/bin/';


require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  console.log('getting that sweet sweet java');
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      console.log('in selium download cb');
      if (error) {
        console.error(error);
        throw new Error(error); // no point continuing so exit!
      }
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH); // eslint-disable-line
    });
  } else {
    console.log('selenium.jar already exists');
  }
});
