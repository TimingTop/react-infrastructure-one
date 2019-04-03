## 安装命令

```
npm init
npm install --save-dev webpack
npm install --save-dev webpack-dev-server
// 支持语法  https://babeljs.io/docs/en/babel-preset-stage-0
npm install --save-dev babel-core babel-loader@7 babel-preset-env babel-preset-react 
npm install --save react react-dom
//2017 的语法, babel7 停止支持 stage 的语法
npm isntall --save-dev @babel/preset-stage-0

// babel 的配置非常多，可以放在 package.json 的loader 里面配置
// 但一般写在项目外面，.babelrc

npm install --save-dev style-loader css-loader

// 如果不配置，所有的 css 文件 都会打包进去 一个 js文件


// 安装插件
install --save-dev html-webpack-plugin

npm install --save-dev postcss-loader
// 分离 css js文件
// 用法 https://github.com/webpack-contrib/extract-text-webpack-plugin
install --save-dev extract-text-webpack-plugin   // 不适用

// 用法：https://github.com/webpack-contrib/mini-css-extract-plugin
// 分离 css 文件，是根据 css 在那个 js里面分离，css的名称跟 js一致。
npm install --save-dev mini-css-extract-plugin


// 引入图片，如果图片不用 base64 ,就需要 file-loader
npm install --save-dev file-loader
npm install --save-dev url-loader



// 
npm install --save @material-ui/core
npm install --save redux
npm install --save react-redux

// 多语言
npm install --save react-intl

// 路由
npm install --save react-router-dom
```


## webpack 按需加载
https://www.cnblogs.com/joyco773/p/9051401.html

https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
需要 babel 的一个插件 支持      syntax-dynamic-import
webpack3 才支持的特性

```
npm install --save-dev @babel/plugin-syntax-dynamic-import
// 有些浏览器 不支持异步 promise的 需要再加一个 polyfill
// https://babeljs.io/docs/en/babel-polyfill
npm install --save @babel/polyfill
```

## babel 7 
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
npm install --save-dev babel-loader


```
