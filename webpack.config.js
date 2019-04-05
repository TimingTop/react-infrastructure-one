const paths = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // JS 执行入口文件
  entry: {
    main: paths.join(__dirname, '/src/web/testasync/main.js')
  },
  output: {
    // 为从 entry 中配置生成的 Chunk 配置输出文件的名称
    filename: '[name].js',
    // 为动态加载的 Chunk 配置输出文件的名称
    chunkFilename: '[name].js',
    path: paths.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: paths.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  devtool: 'source-map', // 输出 source-map 方便直接调试 ES6 源码
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
    extensions: [ ".jsx", ".js"],
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
};