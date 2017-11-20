# gallery-by-react
任老师作业(基于react制作的网页)

### 简介
这是一份上海交大软件工程的作业。该网页根据慕课网上一个教程模仿制作的（[教程地址](http://www.imooc.com/learn/507)），是一个简单的动态图片网页，网页的内容主要是介绍篮球运动员迈克尔乔丹的事迹。

### 网页的实现
网页主要基于 ES6+react+webpack 实现，在windows下安装nodejs环境，用npm安装yeoman以及react-webpack-generator，最终用yeoman生成了基本框架。
样式没有使用css，而是选用了sass。

最终在完成所有代码后，用命令行将项目打包到dist目录下。
>npm run dist

并且用命令行将打包目录dist提交到gihub网站的gh-pages分支下，用以展示网页效果。
>git subtree push --prefix=dist origin gh-pages

[网页演示效果](https://cjtsaj.github.io/gallery-by-react/)

### 网页效果
#### 图片位置变换动画
网页主要以“画廊”的概念搭建。网页上有17张图片，点击其中任意一张图片，该图片将变换到网页中间的舞台，其他所有图片也会随机变换位置。
#### 图片翻转动画
每张舞台中间的图片，再点击后即可翻面，图片背面是关于该图的文字介绍。
#### 鼠标变化
为了提升体验，每次将鼠标移动到图片上时，鼠标将自动变为“手”的形状。

网页演示地址：
[https://cjtsaj.github.io/gallery-by-react/](https://cjtsaj.github.io/gallery-by-react/)

### 项目的拉取以及环境配置
将项目克隆到本地目录，然后运行
>npm install

将所有依赖项以及配置自动安装到本地，然后执行
>npm run serve

即可运行项目。

