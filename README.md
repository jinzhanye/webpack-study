npm i -g webpack webpack-dev-server webpack-cli

-d

--debug --devtool cheap-module-eval-source-map --output-pathinfo

-p

--optimize-minimize --define process.env.NODE_ENV="production", see 

- webpack-dev-server的作用

- demo02

使用占位符(substitutions)确保出口文件唯一

- demo03

babel转码到底需要安装哪些插件？

webpack -p p参数表示打包时会进行压缩

webpack 不同的环境的打包？？ 'development' or 'production'

- demo04

demo3是对象，demo04是数组
rules里面的loader可以是数组，也可以是对象？？

css-loader用于在js文件中解析CSS文件，将其转换成一个对象，如下代码的style
style-loader用于在页面中动态插入\<style>标签，内联css

````jsx
var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">Hello Webpack</h2>
  </div>,
  document.getElementById('example')
);
````
生成环境使用ExtractTextPlugin独立打包css文件，不使用style-loader内联

- demo05

文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。

- demo06

配置CSS Module

- demo07

webpack4不需要UglifyJsPlugin插件
UglifyJsPlugin用于混淆代码，压缩代码，删除不必要的代码(例如声名了，却没有使用到的函数)
现在也不需要使用这个plugin了，只需要使用optimization.minimize为true就行，production mode下面自动为true

optimization.minimizer可以配置你自己的压缩程序

- demo08

html-webpack-plugin could create index.html for you

open-browser-webpack-plugin could open a new browser tab when Webpack loads.

build不成功，原因应该是webpack4尙未支持html-webpack-plugin，可以另外安装插件修复，或者使用webpack3

- demo09

DefinePlugin 允许创建一个在编译时可以配置的全局常量

npx是什么鬼？

cross-env又是什么鬼?
不同平台运行node script配置NODE_ENV环境变量时可能会出现不同结果，cross-env使所有平台正确运行node script
https://segmentfault.com/a/1190000005811347

webpack-dev-server --open 在cli中可以这样自动打开浏览器，但实际开发还是要用OpenBroswerPlugin插件自动打开浏览器??

webpack4升级指南
https://zhuanlan.zhihu.com/p/34028750
webpack4中 --optimize-minimize 标记将在后台引用 UglifyJSPlugin

- demo10

require.ensure用于分离文件，新建一个chunk
require.ensure() 是 webpack 特有的，已经被 import() 取代。
https://doc.webpack-china.org/api/module-methods/#require-ensure

- demo11

使用bundle-loader分离文件

- 多入口chunk与文件分离chunk的区别

- demo12

webpack.optimize.CommonsChunkPlugin会智能将多个chunk可复用的模块提取到一个公共的chunk当中

- demo13

在入口中加入vendor属性，用于提取第三方库到一个独立的chunk。但jQuery还不是全局变量
使用webpack.ProvidePlugin将jquery暴露到全局空间，不需要每个JS设计文件里都import

- demo14

需要独立引入一个文件，但又不想打包成chunk，那么可以使用externals

## loader
loader顺序是由右到左，从下到上执行，原理详见my-loader，一个来自官方文档的demo

## 常用命令
- webpack --version 查看本机当前webpack版本

## FQA
- source-map是什么？？
````
devtool:'source-map',
devtool: 'cheap-module-eval-source-map',
https://webpack.docschina.org/configuration/devtool
https://segmentfault.com/a/1190000008315937
https://github.com/iuap-design/blog/issues/66
http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
````

## 参考 
- webpack dev server 使用说明 https://segmentfault.com/a/1190000006670084
- vue配置说明https://segmentfault.com/a/1190000014804826#articleHeader14
