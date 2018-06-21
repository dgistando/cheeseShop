const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
    mode : 'development',
    entry: './src/index.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env','react']
              }
            }
          },
          {
            test:/\.css$/,
            //Webpack executes loaders in reverse order so css comes first. >:((
            use:['style-loader','css-loader']
          }
        ]
      },
    plugins : [//handles post download code
        new uglify()
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './public/'
    }
};
  