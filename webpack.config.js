const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

// multiple extract instances
const extractSass = new ExtractTextPlugin('pizi-backbone-styles.css');
const extractHtml = new ExtractTextPlugin('index.html');

const modules = __dirname + "/node_modules/";
const sources = __dirname + "/src/";

module.exports = {
    entry: {
        'pizi-backbone': sources + "pizi-backbone.js"
    },
    output: {
        filename: '[name].js',
        path: './build',
        sourceMapFilename: 'js/map/[name].map',
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: extractSass.extract({
                notExtractLoader: "style-loader",
                loader: "css-loader?sourceMap!sass-loader?sourceMap"
            })
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        extractSass,
        extractHtml,
        new webpack.optimize.CommonsChunkPlugin({ name: ['pizi-backbone'], minChunks: Infinity }),
    ],
    resolve: {
        alias: {
            html: sources + "html",
            views: sources + "js/views",
            models: sources + "js/models",
            sass: sources + "sass"
        }
    }
}