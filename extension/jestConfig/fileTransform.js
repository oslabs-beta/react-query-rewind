// fileTransform.js
const path = require('path');

// Importing images is a way to include them in your browser bundle, but they are not valid JavaScript. One way of handling it in Jest is to replace the imported value with its filename.
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
