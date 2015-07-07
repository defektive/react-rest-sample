
module.exports = {
  entry: [
    "bootstrap-webpack!./src/bootstrap/bootstrap.config.jsconfig",
    "./src/css/app.less",
    "./src/App"
  ],

  output: {
      path: __dirname +"/public",
      filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },

  externals: { jquery: "jQuery" }
}
