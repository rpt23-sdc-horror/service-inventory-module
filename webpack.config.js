const path = require("path");
const DIST_DIR = path.join(__dirname, "/src/client/dist");
const SRC_DIR = path.join(__dirname, "/src/client/src");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  externals: {
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
};
