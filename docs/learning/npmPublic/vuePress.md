[vuePress官网](https://vuepress.vuejs.org/zh/guide/getting-started.html)
:::warning
VuePress 需要 Node.js (opens new window)>= 8.6
:::
### 主题、官方插件 [https://v2.vuepress.vuejs.org/zh/reference/plugin/external-link-icon.html](https://v2.vuepress.vuejs.org/zh/reference/plugin/external-link-icon.html)
### 安装vuePress
1.gitHub创建一个新的仓库,clone到本地<br/>
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
7.一级和多级导航栏
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
8.一级和多级侧边栏设置
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
9.项目中设置.gitignore 忽略 node_modules/ docs/.vuepress/dist

### 配置gitPage有两种方法：
#### 方法一：开发内容（master）和压缩文件放一个项目不同分支（gh-page），本项目使用的是方法一
:::tip
注意主项目default要在master上，否则代码拉下来是压缩文件内容
:::
+ 创建deploy-gh.sh<br/>
```js
确保脚本抛出遇到的错误
set -e

生成静态文件
npm run build

进入生成的文件夹
cd docs/.vuepress/dist

如果是发布到自定义域名
echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：
git push -f git@github.com:zhenganxia/仓库名.git master:gh-page

cd -
```
1.修改config.js
```js
base: "/仓库名/", // 设置站点根路径和github项目名称保持一致
注意不要设置dest（会导致build生成文件路径不在docs中，默认是在docs中生成）
```
2.修改package.json-scripts
```js
"deploy": "npm run build（yarn build） && bash deploy-gh.sh"
```
3.执行成功-查看git上项目setting-pages查看关联情况，手动关联成功分支-通过生成地址可以直接访问vuePress项目了
注意：如果没有数据查看source对应的分支是否对
<img :src="$withBase('/images/gitPage.png')" alt="foo">

#### 方法二：两个仓库一个仓库放开发内容（同上，deploy-gh.sh/pack.json/config需要修改），一个仓库放压缩文件
1.创建deploy-gh.sh<br/>
```js
确保脚本抛出遇到的错误
set -e

生成静态文件
npm run build

进入生成的文件夹
cd docs/.vuepress/dist

如果是发布到自定义域名
echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

这里是两个仓库部署，所以这里放的压缩文件项目地址
git push -f git@github.com:zhenganxia/存放压缩文件仓库名.git master

cd -
```

2.修改config.js
```js
base: "/存放压缩文件仓库名/", // 设置站点根路径和github压缩文件项目名称保持一致
注意不要设置dest（会导致build生成文件路径不在docs中，默认是在docs中生成）
```
3.修改package.json-scripts
```js
"deploy": "npm run build（yarn build） && bash deploy-gh.sh"
```
4.执行成功-查看git上项目setting-pages查看关联情况，需要手动关联成功分支-通过生成地址可以直接访问vuePress项目了
注意：如果没有数据查看source对应的分支是否对


### [博客搭建element](https://www.jianshu.com/p/93c532cdf951)