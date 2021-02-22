const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      path.resolve(__dirname, '../src/main.js')
    ]
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-browser.js',
      '@': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    compress: true,
    progress: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    watchOptions: {
      poll: true,
      aggregateTimeout: 300
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'medias/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash:8].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: true,
      filename: 'index.html',
      title: 'Vue Boilerplate',
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}
