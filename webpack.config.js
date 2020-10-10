const path = require('path');
module.exports = {
    entry: {
        bundle: path.join(__dirname, './client/sizeGrid.jsx')
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
      filename: '[name].js',
      path: __dirname + '/public/dist'
    }
  };