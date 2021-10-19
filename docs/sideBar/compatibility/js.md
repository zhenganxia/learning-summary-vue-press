### 浏览器内核
<!-- ![avatar](/images/browser.png) -->
![avatar](/images/browser.png)
#### es6部分新对象、表达式，语法不支持
解决：使用bebel-polyfill-将es6的API解析为低版本
```js
1.npm install --save-dev -polyfill
方案一：
entry: {
    "babel-polyfill":"babel-polyfill",//用来解决的兼容性
    app: path.resolve(__dirname, config.entry.module + "/app.js"),
    vendor: config.entry.vendor
}
方案二：
不修改webpack的情况下，在你的主入口文件头部加入，例如：app.js中加入即可

方案三：
<script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js"></script>

import 'babel-polyfill'

import Vue from 'vue';
Vue.config.debug = true;
```
#### 识别箭头函数
解决:安装babel-core

#### 本地跨域问题
解决：使用proxy解决跨域

#### tree-select收起 el-select失去焦点事件没有触发
解决：使用指令动态循环el-select 手动触发失焦事件




## CSS
#### 不同浏览器的标签默认的外补丁和内补丁不同
解决：rest样式
#### 父级塌陷
```js
1. 父级设置高度</br>
2.在浮动元素下面添加一个空标签，在这个标签中设置clear：both -  <div style="clear:both;"></br>
3.父元素定义overflow:hidden/auto - .parent {overflow: hidden;}</br>
4.父元素使用伪元素 :after/:before来模拟一个空元素清除浮动 - .parent:after{display: block;clear: both;}
```
#### 图片默认有间距
解决：使用float 为img 布局






## IE
#### 日期插件出现NAN-ie无法解析-
解决：正则replace(/-/g, '/'))
#### ie8及ie8之前版本不支持opacity
解决：使用filter
{
    opacity:0.5;
    filter:alpha(opacity=50)
}

#### ie8不支持HTML5 
解决：引入html5shiv
```js
<!--[if lt IE 9]>
  <script src="html5shiv.js"></script>
<![endif]-->
```

#### ie8不支持canvas
解决：引入 ExplorerCanvas 
```js
<!--[if lt IE 9]>
  <script src="excanvas.js"></script>
<![endif]-->
```

#### ie8不支持media query
解决：引入respond.js
```js
<!--[if lt IE 9]>
  <script src="respond.js"></script>
<![endif]-->
```

## chrome
#### 使用flex布局 display:inline-table 9版本不生效
解决：外层添加高度，display：flex

#### element 虚拟滚动失效-（chrome-92.0.4515.131失效 ，chrome-92.0.4515.107可以使用）
 解决： infinite-scroll-immediate=false （不能进入页面立即执行）



## JS
#### 窗口大小
解决：document.documentElement/body
```js
// 浏览器窗口可视区域大小（不包括工具栏和滚动条等边线）
// 1600 * 525
var client_w = document.documentElement.clientWidth || document.body.clientWidth;
var client_h = document.documentElement.clientHeight || document.body.clientHeight;

// 网页内容实际宽高（包括工具栏和滚动条等边线）
// 1600 * 8
var scroll_w = document.documentElement.scrollWidth || document.body.scrollWidth;
var scroll_h = document.documentElement.scrollHeight || document.body.scrollHeight;

// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
// 1600 * 8
var offset_w = document.documentElement.offsetWidth || document.body.offsetWidth;
var offset_h = document.documentElement.offsetHeight || document.body.offsetHeight;

// 滚动的高度
var scroll_Top = document.documentElement.scrollTop||document.body.scrollTop;
```