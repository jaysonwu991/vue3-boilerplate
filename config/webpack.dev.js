const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: [path.resolve(__dirname, '../src/main.js')],
  output: {
    publicPath: '/',
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-browser.js',
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    hot: true,
    port: 8080,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                parser: {
                  dynamicImport: true,
                  syntax: 'ecmascript',
                },
                transform: {
                  react: {
                    refresh: true,
                    development: true,
                    useBuiltins: true,
                  },
                },
              },
            },
          },
          {
            loader: require.resolve('esbuild-loader'),
            options: {
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: {
                  autoprefixer: {},
                },
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'medias/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter'),
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: true,
      filename: 'index.html',
      title: 'Vue Boilerplate',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
