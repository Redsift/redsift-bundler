// To activate the meteor refresh logic create the JSON file "trigger-app-reload.json"
// next to the gulpfile.js with the following content:
// {
//    "watchedFolder": "/path/to/meteor/folder"
// }
// where the given path is a folder which meteor will reload automatically on a
// file change.
module.exports = function appRefresh() {
  let fs = require('fs'),
    path = require('path');

  let configFilePath = path.join(__dirname, 'trigger-app-reload.json'),
    configFile = null;

  try {
    configFile = fs.readFileSync(configFilePath);
  } catch (err) {
    console.log('No config file "trigger-app-reload.json" found, skipping reloading trigger...');
  }

  if (configFile) {
    let config = JSON.parse(configFile);

    if (config && config.watchedFolder) {
      let now = Date.now(),
        outputFilePath = path.join(config.watchedFolder, 'ignore-me-from-redsift-ui.js'),
        content = 'let now = ' + now + ';';

      fs.writeFile(outputFilePath, content, function() {
        console.log(`Triggered application reload via ${outputFilePath} ...`);
      });
    }
  }
}
