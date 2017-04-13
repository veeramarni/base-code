
var DtsBundlerPlugin = require('dtsbundler-webpack-plugin');

var glob = require('glob');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

/* helper function to get into build directory */
var distPath = function (name) {
  if (undefined === name) {
    return path.join('dist');
  }

  return path.join('dist', name);
};
var glob_entries1 = function (globPath) {
  var files = glob.sync(globPath);
  var entries = {};

  for (var i = 0; i < files.length; i++) {
    var entry = files[i];
    var pathObj = path.parse(entry);
    entries[path.join(pathObj.dir.replace(new RegExp('^\.\/xxx\/', ''), ''), pathObj.name)] = entry;
  }
  console.log(entries);
  return entries;
};

var webpack_opts = {
  entry: glob_entries1("./src/vs/base/[c|n]*/**/*.ts"),
  target: 'node',
  output: {
    filename: distPath('[name].js'),
    library: '@vscode/vs-base-node',
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'out',
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\d.ts$/,
        ts: {
          compiler: 'typescript',
          configFileName: './tsconfig.json'
        },
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    // new DtsBundlerPlugin({
    //   out: './dist/index.d.ts',
    // })
    // copy .d.ts to dest location
    // new CopyWebpackPlugin([
    //   {
    //     from: './config/packages/vsBaseNode-package.json',
    //     to: path.join(path.resolve(__dirname, 'dist'), 'package.json')
    //   }
    // ])
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: 'ts-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sh$/,
        loader: 'raw-loader'
      }]
  },
  externals: [nodeExternals()]
};

module.exports = webpack_opts;