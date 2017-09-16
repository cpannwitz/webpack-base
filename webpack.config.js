const path = require('path')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin({
      quiet: true
    }),
    extractSass
  ],
  devServer: {
    // contentBase: [path.join(__dirname, "/"), path.join(__dirname, "src")],
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    // hotOnly: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       minified: true,
      //       presets: ['env', 'es2015', 'stage-0']
      //     }
      //   },
      //   include: [
      //     path.resolve(__dirname, "src"),
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, "node_modules"),
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          fallback: "style-loader"
        }),
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }],
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'icons/'
          }
        }],
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }],
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      }
    ]
  }
};