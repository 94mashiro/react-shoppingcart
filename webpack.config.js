module.exports = {
  entry: './public/javascripts/app.js',
  output: {
    filename: 'bundle.js',
    path: './public/build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['','.js','hbs']
  }
}
