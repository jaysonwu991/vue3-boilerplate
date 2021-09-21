const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

const config = {
  mode: 'production',
  target: ['web', 'es5'],
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
    vendor: ['vue', 'vue-router'],
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:8].js',
    chunkFilename: 'scripts/[id].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
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
                    useBuiltins: true,
                  },
                },
                minify: {
                  mangle: true,
                  compress: {
                    unused: true,
                  },
                },
              },
              minify: true,
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
          MiniCSSExtractPlugin.loader,
          'css-loader',
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
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'medias/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter'),
    }),
    new HtmlPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      showErrors: true,
    }),
    new MiniCSSExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      chunkFilename: 'styles/[id].[contenthash:8].css',
    }),
    new CompressionPlugin({
      filename: '[path][name].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};

// if (!isProd) {
//   webpackConfig.devtool = "hidden-source-map";

//   if (process.env.npm_config_report) {
//     const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//       .BundleAnalyzerPlugin;
//     webpackConfig.plugins.push(new BundleAnalyzerPlugin());
//   }
// }

module.exports = config;
