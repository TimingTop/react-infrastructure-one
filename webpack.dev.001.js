
const paths = require("path"); // node 自带，处理路径
const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin');


const config = {
    // entry: {
        
    // },
    entry: __dirname + '/src/web/test001/app.js',
    output: {
        path: __dirname + "/build/test001",
        filename: "[name].package.js"
    },
    // module: {
    //     loaders:[
    //         {
    //             test: /\.css$/,
    //             loader: "style-loader!css-loader"
    //         },
    //         {
    //             test: /\.js$/,
    //             loader: "babel-loader",
    //             exclude: paths.resolve(__dirname, "node_modules"),
    //             include: paths.resolve(__dirname, "src")
    //         },
    //         {
    //             test: /\.(jpg|gif|png)$/,
    //             loader: "file-loader"
    //         }
    //     ]
    // },
    // plugins: [
    //     new htmlWebpackPlugin({
    //         title: "just one",
    //         template: 'src/app/html/template.html',
    //         filename: "testIndex.html",
    //         showErrors: true,
    //         inject: 'body'
    //     })
    // ]
}

module.exports = config
