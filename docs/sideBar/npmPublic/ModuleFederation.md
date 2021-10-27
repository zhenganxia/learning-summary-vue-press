### 基于Module Federation的微前端方案
:::tip
node.js(npm 包管理器), 要求 node12+ <br>
vue-cli 脚手架工具，要求版本 v5.0.0 版本（不然无法使用 module federation）<br/>
cnpm 或 yarn
:::

#### 安装依赖
```js
yarn install | npm install
```

#### 本地开发
```js
yarn start
```
#### 构建生产环境
```js
yarn build
```
#### 格式化 lint 命令
```js
yarn lint
```

#### 别名
```js
"@/*": ["src/*"],
"@api/*": ["src/api/*"],
"@assets/*": ["src/assets/*"],
"@components/*": ["src/components/*"],
"@directives/*": ["src/directives/*"],
"@packages/*": ["src/packages/*"],
"@plugins/*": ["src/plugins/*"],
"@router/*": ["src/router/*"],
"@store/*": ["src/store/*"],
"@utils/*": ["src/utils/*"],
"@views/*": ["src/views/*"],
注意：需要在jsconfig.json和vue.config.js都要配置
```
#### 全局组件注册
注册全局组件的目录于 plugins 文件夹下面，所有需要全局注册的组件都应当放于此目录。比如全局的 icon、component、router、element-ui 等

#### 本地文件
本地文件本地资源文件存放在 public/static 下面，目前本地环境变量文件和版本号是存放在此文件下

#### lint 说明
Windows 电脑 clone 代码后，在执行 pre-commit 时，会出现如下错误：
```js
Delete `␍`eslint(prettier/prettier)
```
罪魁祸首是git的一个配置属性：core.autocrlf

由于历史原因，windows 下和 linux 下的文本文件的换行符不一致。

* Windows在换行的时候，同时使用了回车符CR(carriage-return character)和换行符LF(linefeed character)
 
* 而Mac和Linux系统，仅仅使用了换行符LF
 
* 老版本的Mac系统使用的是回车符CR
因此，文本文件在不同系统下创建和使用时就会出现不兼容的问题。

解决办法

方法一
终端执行命令
```js
yarn lint
```
由于 vscode 会有缓存，执行完建议重启 vscode

方法二（推荐）
现在 VScode，Notepad++编辑器都能够自动识别文件的换行符是 LF 还是 CRLF。 如果你用的是 windows，文件编码是 UTF-8 且包含中文，最好全局将 autocrlf 设置为 false。
```js
git config --global core.autocrlf false
注意：git全局配置之后，你需要重新拉取代码。
```
#### 模块联邦使用方法
module federation是一个 plugin，因此在 vue-cli 中，在 configureWebpack 新增一个 plugin 即可，如下：
```js
configureWebpack: (config) => {
  // Configure Module Federation
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'erpMain', // Must be unique
      filename: 'remoteEntry.js',
      exposes: {
        './share-components': './src/shared/components.js',
        './share-directives': './src/shared/directives.js',
      },
      remotes: {
        erpOrder: IS_PROD
          ? 'erpOrder@http://erp-order-frontend/remoteEntry.js' // 跟运维约定的线上地址
          : 'erpOrder@http://localhost:8001/remoteEntry.js',
      },
    })
  )
},
注:

name 值必须唯一，建议使用当前模块的英文名，要求使用小驼峰形式
exposes 暴露的组件，key 值必须是'./xxx'
开发环境时，子应用需配置 publicPath
```
1. 静态引入

```js
() => loadingComponent(import('erpOrder/PendingOrder'))
```
2.动态引入

动态使用时，remotes 可以不用配置，封装了一套动态使用的方法utils/dynamicRemote中的loadRemoteComponent方法，使用如下：
```js
import { loadRemoteComponent } from '@utils/dynamicRemote'
 
const dyComponent = async () => await loadRemoteComponent({
  url: 'http://localhost:8001/remoteEntry.js', // remoteEntry的远程地址
  scope: 'erpOrder', // 作用域，即对应项目中module federation配置的name值
  module: './PendingOrder', // 暴露出来的组件名称，即对应项目exposes中的指定key值
})
```
#### 主子应用联调注意
vue 中可以全局注册组件，在主应用调用子应用模块时，需将子应用中全局注册的组件或指令在主应用中注册；<br/>
整个应用中，子应用 module federation 中配置的 name 值必须唯一；<br/>
子应用开发环境需要配置 publicPath；<br/>
建议子应用将登录和路由配置上，exposes 的模块是路由对应的模块；<br/>
主应用需要重新注册子应用的模块，无法直接加载子应用的路由，所以需要在主应用重新配置路由，参考 order；<br/>
公共的方法、组件指令，放在自己应用中维护；


### 下面是主子应用交互的教程
从技术上讲，并没有主子应用之分，Module Federation是去中心化的一种微前端技术，各个应用之间可以相互 shared，相互 remote。从业务上看，erp 项目需要一个主应用来承载所有其他 

share 出来的模块，在主应用中展示。 因此，在 ERP 中，主应用的职责是展示最终的页面，以及需要管理公共组件和公共指令。子应用就是各个模块的相关内容。

#### 1. 公共组件和公共指令
公共组件和公共指令在主应用中维护，对应目录为src/components和src/directives下面，内容跟老代码一致。目前组件和指令可能不是最新的，等最终上线需要更新。

通过 MF 暴露出公共组件和指令的方式，参考主应用 vue.config.js 文件，代码如下：
```js
new ModuleFederationPlugin({
  name: 'erpMain', // Must be unique
  filename: 'remoteEntry.js',
  exposes: {
    './share-components': './src/shared/components.js', // 公共组件
    './share-directives': './src/shared/directives.js', // 公共指令
  },
  remotes: {},
})
```
#### 2. 子应用开发环境加载主应用的公共组件和指令
子应用中需要使用公共的组件和指令，需要在加载初期全局注册，但是公共组件和指令存放在主应用，需通过 MF 远程加载，再全局注册，这可能会出现，页面已经渲染完成，某个公共组件才加载成功，页面渲染显然无法达到预期效果。

因此，需要在页面渲染前，将远程组件先加载，然后注册到全局，再进行渲染。

下载远程组件，全局注册，代码如下（参考 order 应用中src/plugins/installRouter.js文件）：
```js
/**
 * 设置前卫路由
 * @param {*} url module federation url
 */
function setBeforeRouter() {
  router.beforeEach((to, from, next) => {
    NProgress.start()
 
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/remoteEntry.js'
        : window.location.origin + '/main/remoteEntry.js'
 
    remoteComponent(url, to, next)
  })
}
 
/**
 * 下载远程组件
 * @param {*} url remote url
 * @param {*} to
 * @param {*} next
 */
function remoteComponent(url, to, next) {
  Promise.all([
    loadRemoteComponent({
      url,
      scope: 'erpMain',
      module: './share-components',
    }),
    loadRemoteComponent({
      url,
      scope: 'erpMain',
      module: './share-directives',
    }),
  ]).then((res) => {
    const shareComponents = res[0]
    const shareDirectives = res[1]
 
    // 全局注册share组件
    Object.keys(shareComponents).forEach((key) => {
      const component = shareComponents[key]
      Vue.component(key, component)
    })
 
    // 全局注册share指令
    Object.keys(shareDirectives).forEach((key) => {
      const directive = shareDirectives[key]
      Vue.use(directive)
    })
 
    // 组件加载成功在执行全局前置守卫
    setRouter(to, next)
  })
}
通过以上的方法便能在子应用中加载主应用的公共组件和指令。详细代码参考 order 应用。
```
#### 3、主应用加载子应用模块
在主应用加载子应用模块前，需要确认子应用通过 MF exposes 出了对应模块，代码如下：
```js
exposes: {
  './PendingOrder': './src/views/pendingOrder/index.vue',
  './AllOrders': './src/views/allOrders/index.vue',
  './SaleService': './src/views/saleService/index.vue',
}
```
主应用动态将将子应用 share 出来的模块，放在主应用中的路由中加载，所以需要在主应用中重新配置路由，在 router/module/index.js 配置属于自己模块的文件，部分代码如下：

#### 动态下载远程组件入口：
```js
/**
 * 动态加载远程组件，配置动态路由
 * @returns Array<Promise> 返回一个Promise数组路由配置
 */
async function dynamicComponents() {
  // 动态下载远程组件
  // 每新增一个模块，promise all中需要新增该模块远程下载配置，可参考order模块
  const remoteComponents = await Promise.all([
    remoteOrderComponent({
      appName: 'order', // 所在应用的名称，必须和网关一致，下面会有具体介绍
      scope: 'erpOrder', // Module federation 的 name
      module: './OrderComponents', // Module federation 的 exposes中暴露出来的key值
      localPort: '8001', // 本地调试的端口号
    }),
  ])
 
  // order模块配置动态路由
  const orderComponents = configOrderRouters(remoteComponents[0])
  // ... 如果有其他模块接着设置，注意这儿使用的时Promise.all，注意顺序
 
  // 每新增模块，将该模块配置的动态路由信息，解构到返回参数中，参考order模块
  return [...orderComponents]
}
```
#### 订单模块下载远程组件配置（如果其他模块参照order模块配置）：
```js
/**
 * 获取order remote 出来的模块
 * @param {dev} 当前环境，如dev，qa，qa2等
 * @returns order模块暴露出来的组件
 */
const remoteOrderComponent = ({ appName, scope, module, localPort }) => {
  // 根据环境获取远程组件的下载地址
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${localPort || '8000'}/remoteEntry.js` // 本地远程地址建议都是用8000端口，因为这儿是公共方法
      : window.location.origin + `/${appName}/remoteEntry.js`
 
  // 下载远程组件
  return loadRemoteComponent({
    url,
    scope,
    module,
  })
}
```
#### 配置动态路由：
```js
/**
 * 根据远程拿到的order模块设置主应用的动态路由
 * @param {*} orderComponents order远程组件
 * @returns order路由配置
 */
export const configOrderRouters = (orderComponents) => {
  return [
    {
      name: '订单管理',
      path: '/order',
      icon: 'order',
      component: () => import('@views/layout/Layout.vue'),
      authority: 'orderManager',
      meta: {
        noRoute: true,
      },
      children: [
        {
          name: '待处理',
          path: 'pending-order',
          icon: 'circle-o',
          component: orderComponents.PendingOrder,
          authority: 'pendingOrder',
        },
        // ...
      ]}
  ]
}
```
#### 下面是每个项目必须按照要求做的
+ 在 gitlab 上创建应用时，项目名称很重要，要求：项目名称 = erp-${当前项目名称}-frontend，因为远程下载组件需要有规律的 url 地址。如：
```js
主应用： erp-main-frontend
 
order应用：erp-order-frontend
```
+ 每个项目的项目名称，必须在package.json的name属性上设置，如：
```js
主应用package.json：
{
  name: 'main',
  // ...
}
 
order应用package.json：
{
  name: 'order',
  // ...
}
```
+ 每个项目中的 nginx 有一点异同，在文件nginx.conf中的 73 行，参考下面：
```js
location / {
  root   /usr/share/nginx/html;
  index  index.html index.htm;
  try_files $uri $uri/ /main/index.html;  // 这儿的main换成上面package设置的name值
 
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Methods' '*';
  add_header 'Access-Control-Allow-Credentials' "true";
  add_header Access-Control-Allow-Headers X-Requested-With;
}
```
+ 页面最终展示是通过 Nginx 代理设置的，这儿使用一个空项目进行代理，所以每新建一个项目需要在这里设置代理地址，并重新构建代理项目，在nginx.conf中，加上新项目配置即可，如下
```js
// ...
 
upstream api-main {
  server erp-main-frontend:80;
  keepalive 512;
}
 
upstream api-order { // erp-名称
  server erp-order-frontend:80; // erp-名称-frontend:80
  keepalive 512;
}
 
// 在这儿添加一个 upstream
 
// ...
```