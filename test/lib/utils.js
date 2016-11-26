const fs = require('fs');

function doesFileExist(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

module.exports = {
  doesFileExist
}
