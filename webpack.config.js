const path = require('path');

module.exports = {
  entry: {
    component: './src/component.js'
  },
  output: {
		filename: '[name].js',
		libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'none'
};
