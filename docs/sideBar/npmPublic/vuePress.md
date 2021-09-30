[vuePress官网](https://vuepress.vuejs.org/zh/guide/getting-started.html)
:::warning
VuePress 需要 Node.js (opens new window)>= 8.6
:::
### 安装vuePress
1.创建并进入一个新目录
```js
mkdir vuepress-starter && cd vuepress-starter
```
2.初始化项目
```js
yarn init # npm init
```
3.将 VuePress 安装为本地依赖
```js
yarn add -D vuepress # npm install -D vuepress
```
4.package.js
```js
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```
5.本地启动服务器
```js
yarn docs:dev # npm run docs:dev
```
6.设置.vuepress

> docs
>> .vuepress
>>> config.js\
>>> enhanceApp.js\
>>> components

```js
mkdir docs && cd docs
mkdir .vuepress && cd .vuepress
touch config.js // 配置文件
touch enhanceApp.js //  客户端应用的增强(vue插件引用)
mkdir components // 全局组件
```
6.一级和多级导航栏
>.vuepress\
> nav

```js
cd config.js
themeConfig:{
     nav: [
      { text: "首页", link: "/" },
      { text: "Ajax跨域详解", link: "/nav/ajax/index.md" },
      {
        text: "关注工具",
        items: [
          {
            text: "UI框架",
            items: [
              { text: "Element", link: "https://element.eleme.cn/#/zh-CN/component/installation" },
              { text: "Ant Design Vue", link: "https://2x.antdv.com/components/overview-cn/" },
            ],
          },
          {
            text: "JS",
            items: [
              { text: "ES6", link: "https://es6.ruanyifeng.com/" },
              { text: "ES2020", link: "https://www.cnblogs.com/mengfangui/p/13885589.html/" },
              { text: "TS", link: "https://typescript.bootcss.com/" },
            ],
          },
        ],
      },
    ],
}

```
7.一级和多级侧边栏设置
>.vuepress\
>sideBar
>>command
>>>git.md

```js
cd config 
themeConfig:{
    sidebar:[
        {
        title: "常用命令",
        collapsable: true,
        children: [
          { title: "git", path: "/sideBar/command/git" }
        ],
      },
    ]
}
```
### 配置gitPage
1.gitHub创建一个新的仓库 learning-summary-vue-press
2.git clone 到本地
3.将创建的vuePress项目内容放到clone下来仓库中
4.项目中设置.gitignore 忽略 node_modules/ docs/.vuepress/dist
5.创建deploy-gh.sh
```js
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：
git push -f git@github.com:zhenganxia/learning-summary-vue-press.git master:gh-pages

cd -
```
6.修改config.js
```js
base: "/learning-summary-vue-press/", // 设置站点根路径和github项目名称保持一致
注意不要设置dest（会导致build生成文件路径不在docs中，默认是在docs中生成）
```
7.修改package.json-scripts
```js
"deploy": "npm run build && bash deploy-gh.sh"
```
8.执行成功-查看git上项目setting-pages查看关联情况，关联成功-通过生成地址可以直接访问vuePress项目了
注意：如果没有数据查看source对应的分支是否对
![avatar](/images/gitPage.png)
<!-- <img :src="$withBase('/images/gitPage.png')" alt="gitPage"> -->

### [博客搭建element](https://www.jianshu.com/p/93c532cdf951)
1.安装Demo插件
```js
npm install vuepress-plugin-demo-container
```
2.然后在/docs/.vuepress/config.js文件中配置上该插件
```js
module.exports = {
  // ...
  plugins: ['demo-container'], // 配置插件
  markdown: {}
}
```
3.enhanceApp.js
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
  }
}
```
4.使用element+vuepress-plugin-demo-container插件
```markdown
::: demo
```html
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
      }
    }
  }
</script>
```