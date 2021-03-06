const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// multiple extract instances
const extractSass = new ExtractTextPlugin('pizi-backbone-style.css');
const extractHtml = new ExtractTextPlugin('index.html');

const modules = __dirname + "/node_modules/";
const sources = __dirname + "/src/";
const test = __dirname + "/tests/";
const libraryName = 'pizi-backbone';

module.exports = {
    entry: {
        'pizi-backbone': sources + "pizi-backbone.js"
    },
    output: {
        // filename: '[name].js',
        // path: '../../Servers/PiziServer/pizi-backbone',
        path: __dirname + '/build',
        filename: libraryName + '.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        sourceMapFilename: 'js/map/[name].map',
    },
    // devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                "presets": [
                    ["es2015", { "modules": false }]
                ]
            }
        }, {
            test: /\.scss$/,
            loader: extractSass.extract({
                notExtractLoader: "style-loader",
                loader: "css-loader?sourceMap!sass-loader?sourceMap"
            })
        }, {
            test: /\.html$/,
            loader: extractHtml.extract({
                loader: "html-loader"
            }),
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore"
        }),
        extractSass,
        extractHtml,
        new webpack.optimize.CommonsChunkPlugin({ name: ['pizi-backbone'], minChunks: Infinity }),
    ],
    externals: [nodeExternals()],
    resolve: {
        alias: {
            html: sources + "html",
            views: sources + "js/views",
            models: sources + "js/models",
            sass: sources + "sass"
        }
    }
}