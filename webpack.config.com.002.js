const paths = require("path"); // node 自带，处理路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    devtool: 'source-map',
    entry: {
       main: paths.join(__dirname, '/src/web/app-one/app2.jsx')
    },
    output: {
        path: __dirname + "/build/com002",
        filename: "[name].js",
        // 异步加载的库名字
        chunkFilename: "[name].js"
    },
    devServer: {
        contentBase: paths.join(__dirname, '/build/com002'),
        inline: true,
        hot: true,
        port: 9000,
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // presets: [
                        //     "env", "react"
                        // ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // use: [
                //     {loader: "style-loader"},
                //     {loader: "css-loader",
                //     //  options: {
                //     //      modules: true,
                //     //      localIdentName: '[name]__[local]--[hash:base64:5]'
                //     //  }
                //     }
                // ]
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                // limit 大于就引入图片，少于就 base64编码， 输出位置可以带相对路径
                loader: 'url-loader?limit=6000&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.json$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name (file) {
                                if (env === 'development') {
                                    return '[path][name].[ext]'
                                }
                                return '[hash].[ext]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".jsx", ".js"],
        modules: ["node_modules", paths.resolve(__dirname, "node_modules")],
        alias: {
            app: paths.resolve(__dirname, 'src/app/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: paths.join(__dirname, "/src/web/index.html")
            }
        ),
        new MiniCssExtractPlugin({
            // 输出结果 在 css底下，[name] 跟 js 一致
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ]
}

module.exports = config