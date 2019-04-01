const paths = require("path"); // node 自带，处理路径
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    devtool: 'source-map',
    entry: {
        
    },
    output: {
        path: __dirname + "/build/test004",
        filename: "bundle.com.001-[hash].js"
    },
    devServer: {
        contentBase: "/build/test004",
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
            // {
            //     test: /\.css$/,
            //     use: [
            //         {loader: "style-loader"},
            //         {loader: "css-loader",
            //          options: {
            //              modules: true,
            //             //  localIdentName: '[name]__[local]--[hash:base64:5]'
            //          }
            //         }
            //     ]
            // }
            {
                test: /\.css$/,
                use: textWebpackPlugin.extract(['style', 'css'])
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