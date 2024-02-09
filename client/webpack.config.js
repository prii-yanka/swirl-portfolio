
const path = require('path');

module.exports = {
  entry: './client/src/index.js', // Adjust the entry point to your React app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/public'), // Adjust the output path as necessary
  },
  // Other webpack configurations...
};