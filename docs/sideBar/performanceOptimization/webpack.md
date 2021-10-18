### 批量引入优化加载 required.context
:::tip
三个参数(需要引入文件夹地址，布尔值（是否需要引入文件夹下的子文件夹数据），需要引入的类型)
:::
可以批量引入某个文件下,不需要一个一个引入加载
```js
全局注册路由、动态路由
实例1：引入pages文件夹下的（model1.index.vue，model2.index.vue）文件
var r = required.context('./pages',true,/.vue/) // r为一个方法
r.keys().forEach((name)=>{
    // r.keys() => ['./model1.index.vue','./model2.index.vue']

})

```

### 项目更小
:::tip
资源文件下载html、css、js消耗时间最多
:::

```js
代码压缩：js、html、css
webpack结构
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
const cssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("HtmlWebpackPlugin")
module.exports = {
    mode:'', // >webpack4
    enter:{
       app:'./app.js'
    },
    output:{
      path:__dirname + '/dist',
      filename:'[name].bundle.js'
      // 压缩nam中会有hash是为了优化资源缓存，浏览器第一次加载后会缓存js、html、css、图片，打包内容有更改hash会更改
    },
    module:{
        // loader -处理资源（浏览器只能识别js,需要将浏览器不能识别的资源转化为浏览器可以识别的类型）
        rules:[
           {
               test:/\.css$/,
               use:[MiniCssExtractPlugin.loader,"css-loader"] // 从后往前执行
           },
           {
               test:/\.(jpg|jpeg|png|gif)$/,
               use:[
                {
                  loader:"url-loader",
                  options:{
                      limit:10000 // 图片加载是异步的，小图片避免进行请求，图片小于10000转为base64
                  }
                },
                {
                    loader:"image-webpack-loader",
                    options:{
                        mozjpeg:{
                          quality: 65// 1-100 越小质量越大,越大压缩程度越小
                        },
                        pngquant:{
                            speed: 4 // 1-11 
                        }
                    }
                }
               ]// url-loader内置了file-loader(任何资源文件都可以用)，内置了base64转码
           }
        ]
    },
    plugins:[ // webpack不具备的功能需要插件处理
        new MiniCssExtractPlugin({ // webpack5使用-css打包
           filename:'test.css' // css打包后文件名
        }),
        new cssMinimizerWebpackPlugin(), // css压缩
        new HtmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        })
    ]
}
```
:::tip
loader:注册loader-对应的文件内容给到loader方法处理内容-方法return结果
plugin:注册plugin-插件接收到webpack编译过程-监听某个生命周期-当编译到达某个生命周期时会自动的调用插件的监听
:::



```js
tree-shaking：写在原型链上的方法无法处理，函数式编程可以处理
```
