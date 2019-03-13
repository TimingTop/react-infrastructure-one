const paths = require("path"); // node 自带，处理路径
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');


const config = {
    devtool: 'source-map',
    // entry: {
        
    // },
    entry: __dirname + '/src/web/test003/app.jsx',
    output: {
        path: __dirname + "/build/test003",
        filename: "bundle.003.js"
    },
    devServer: {
        contentBase: "./",
        inline: true
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader",
                    //  options: {
                    //      modules: true,
                    //      localIdentName: '[name]__[local]--[hash:base64:5]'
                    //  }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin(
            {
                template: __dirname + "/src/web/index.html"
            }
        )
    ]
}

module.exports = config