### git地址
github项目地址：[https://github.com/zhenganxia/docsify-vue-element](https://github.com/zhenganxia/docsify-vue-element)<br/>
静态站点：[https://zhenganxia.github.io/docsify-vue-element/#/quesition/](https://zhenganxia.github.io/docsify-vue-element/#/quesition/)
### 什么是docsify
 docsify 可以快速帮你生成文档网站。
### Docsify的特性
+ 无需构建，写完文档直接发布
+ 容易使用并且轻量 (压缩后 ~21kB)
+ 智能的全文搜索
+ 提供多套主题
+ 丰富的 API
+ 支持 Emoji
+ 兼容 IE11
+ 支持服务端渲染 SSR (示例)
### 全局安装docsify
```
npm i docsify-cli -g
```
### 初始化项目
```
docsify init ./docs
```
### 启动
```
docsify serve
```
### 初始化目录文件
```
这里默认加载为README.md

index.html 入口文件

README.md 会做为主页内容渲染

.nojekyll 用于阻止 GitHub Pages 会忽略掉下划线开头的文件
```
### 基础配置项
```
修改index.html 文件
 window.$docsify = {
    name: '',
    loadSidebar: true, // 侧边栏
    loadNavbar: true, // 导航栏
  }
```

### 常见问题
#### 导航栏
```
根路径添加_navbar.md 文件
// index.html
window.$docsify = {
    loadNavbar: true, // 导航栏
}
```
#### 侧边栏
```
 根路径 添加_sidebar.md文件- 默认/根加载侧边栏
 如果修改默认侧边栏页面 设置 loadSidebar:'自定义.md' 自定义.md 不以_开头

window.$docsify = {
    // index.html
    loadSidebar: true, // 展示侧边栏
    subMaxLevel: 2, // 侧边栏默认展开层级
}
```
#### 导航栏和侧边栏联动
```
// index.html
window.$docsify = {
    loadSidebar: true, // 侧边栏
    subMaxLevel: 2, // 侧边栏默认展开层级
}
```
#### vue+element插件实现功能
```
// index.html
 <!-- vue -->
  <script src="//cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-ui/lib/theme-chalk/index.css">
  <!-- 引入组件库 -->
  <script src="//unpkg.com/element-ui/lib/index.js"></script>

// 使用
<div id="select">
    <el-select v-model="value" class="m-2" placeholder="请选择" size="large">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</div>
<script type="text/javascript">
    // 需要new实例
    new Vue({
        el:'#select',
        data(){
            return {
                value:'',
                options: [
                    {
                        id: 'Option1',
                        name: 'Option1',
                    },
                    {
                        id: 'Option2',
                        name: 'Option2',
                    }
                ] 
            }
        }
    })
</script>
```
#### homepage修改展示主页
```
// 默认为根节点下的README.md文件
window.$docsify = {
    homepage:'home.md',
    ...
}
````
#### 全局搜索
```
// index.html 
window.$docsify = {
    search: 'auto', // 默认值
    search: {
        maxAge: 86400000, // 过期时间，单位毫秒，默认一天
        paths: [], // or 'auto'
        // 支持本地化
        placeholder: {
        '/': '搜索'
        },
        // 支持本地化
        noData: {
        '/': '找不到结果'
        },
        // 搜索标题的最大层级, 1 - 6
        depth: 4,
        hideOtherSidebarContent: false, // 是否隐藏其他侧边栏内容
    }
}
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
```
#### 引入本地静态图片
```
<image src="/assets/img/nav.png">
```
 #### 右上角地址挂件
 ```
// index.html 
window.$docsify = {
    repo:'https://docsify.js.org/#/configuration', // 右上角地址挂件
}
```
#### 代码复制功能
```
// index.html 
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
图片缩放功能
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
字数统计 docsify-count
https://unpkg.com/docsify-count/dist/countable.min.js
https://unpkg.com/docsify-count/dist/countable.js
https://unpkg.com/docsify-count/dist/
```
#### 部署到github pages
```
注意事项
github部署找不到菜单和导航栏：原因github无法识别_开头路径
菜单
解决：项目中添加空文件.nojekyll 防止忽略下划线
具体操作看vuepress部署
```

### 静态网站生成工具
| 工具     | 项目结构              | 缺点                                                         | ie兼容性 | 地址                                                         |
| -------- | --------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| docsify  | Markdown为中心        | Vue.js 的通用应用框架                                        | ie11     | https://docsify.js.org/#/zh-cn/                              |
| vuepress | Markdown为中心        | 每个页面预渲染生成静态的html页面，编译期完成，对比docsify需要额外的构建操作 | ie9      | https://www.vuepress.cn/                                     |
| hexo     | Markdown为中心        | 博客框架-重度依赖纯字符串，markdown渲染方面灵活度较差，主题样式不太适用于帮助文档 | ie9      | [https://hexo.io/](https://links.jianshu.com/go?to=https%3A%2F%2Fhexo.io%2F) |
| git book | Markdown和git         | 多页面重新加载时间长，定制性差                               |          | [aojian.com/gitbook/](https://links.jianshu.com/go?to=http%3A%2F%2Fcaibaojian.com%2Fgitbook%2F) |
| nuxt     | Vue.js 的通用应用框架 | 构建应用程序，适合ssr                                        | ie9      | https://www.nuxtjs.cn/guide                                  |



