
const paths = require("path"); // node 自带，处理路径
const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin');


const config = {
    devtool: 'source-map',
    // entry: {
        
    // },
    entry: __dirname + '/src/web/test001/app.js',
    output: {
        path: __dirname + "/build/test001",
        filename: "[name].package.js"
    },
    devServer: {
        contentBase: "./",
        inline: true
    }
}

module.exports = config
