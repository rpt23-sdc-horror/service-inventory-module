const path = require('path');
const buildDirectory = './public/dist';

module.exports = {
    entry: './client/sizeGrid.jsx',
    externals: {
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    module: {
      rules: [
        {
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
     output: {
      filename: 'bundle.js',
      path: __dirname + '/public/dist'
    }
  };