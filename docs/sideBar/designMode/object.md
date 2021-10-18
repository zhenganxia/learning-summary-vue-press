### 单例模式
:::tip
特点：全局只有一个实例化对象，多个会互相影响
例子：vue-router、vuex，缓存
:::

```js
实例1 第一次new会初始化实例
function single() {
  if(single.instance) {
    return single.instance
  } else {
    this.a = 123
    this.b = 456
    single.instance = this
  }
} 
single.instance = false
```

```js

实例2
// vue-router
//vue.use(vue-router) 需要保证第一次调用是有效的，其他调用无效
var _vue 
function install (vue) {
  if(_vue === vue && install.installed) {
    return 
  }
  // 执行router注册
  _vue = vue
  install.installed = true
}

```

### 工厂模式
#### 使用场景
大量创建，频繁使用 例如jquery、弹框

```js


```

### 构造者模式
#### 使用场景
需要构建复杂类（多人构建不同模块）

```js
vue2源码 生成实例
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```