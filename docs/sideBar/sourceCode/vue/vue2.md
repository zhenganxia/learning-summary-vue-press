#### vue.use()
参数类型：对象或者函数<br/>
参数如果有install方法直接执行install方法，不执行自身函数；如果参数没有install方法就会执行自身函数

#### 插件安装
执行插件上的install方法，通过Vue.minin()全局混入自定义操作

#### 前端路由和后端路由
前端路由：<br/>
后端路由：
### vue-router
#### 1.工作原理
1.url发生变化<br/>
2.触发监听事件（window上的监听事件）<br/>
3.改变vue-router里的current变量<br/>
4.触发监视current变量的监视者会根据变量的路径获取新的组件（vue里的监视者）<br/>
5.render新的组件
#### 2.hash和history的区别：
+ hash 
#号以后就是hash内容<br/>
通过location.hash拿到<br/>
可以通过onhashchange监听到hash的变化<br/>
+ history
history是正常的路径<br/>
location.pathnane获取<br/>
可以通过onpopstate监听history的变化<br/>

#### vue-router代码实现
```js
// class HistoryRoute {
//   // route
//   constructor() {
//     this.current = null;
//   }
// }
// class vueRouter {
//   constructor(options) {
//     this.mode = options.mode || "hash";
//     this.routes = options.routes || [];
//     this.history = new HistoryRoute();
//     this.init();
//   }
//   init() {
//     if (this.mode === "hash") {
//       // url末尾自动加/
//       location.hash ? "" : (location.hash = "/");
//       window.addEventListener("load", () => {
//         // 初始化
//         this.history.current = location.hash.slice(1);
//       });
//       window.addEventListener("hashchange", () => {
//         this.history.current = location.hash.slice(1);
//       });
//     }
//   }
// }
// // 监视current变化-通过defineRective相应式
// var _vue;
// // 保证router唯一-单例模式
// vueRouter.install = function(vue) {
//   if (_vue === vue && vueRouter.install.installed) {
//     return;
//   }
//   vue.mixin({
//     // 保证开始就存在插件
//     beforeCreate() {
//         // 组件是否是根组件（router只在根实例上）
//       if (this.$options && this.$options.router) {
//         this._root = this
//         this._router = this.$options.router
//         vue.util.defineRective(this,'current',this._router.history)
//       } else {
//          this._root = this.$parent._root // 根实例
//       }
//     },
//   });
// };
// export default vueRouter;
class HistoryRoute {
  constructor() {
    this.current = null; //指向当前url
  }
}
class vueRouter {
  constructor(options) {
    //options根实例对象
    this.history = new HistoryRoute();
    this.mode = options.mode || "hash";
    this.routes = options.routes || []; //[{path:'a},component:a]=>{'a':a}
    this.routesMap = this.createMap(this.routes);
    this.init();
  }
  init() {
    //事件的注册不会直接执行
    //如果没有#自动加上/
    if (this.mode === "hash") {
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("load", () => {
        //监听事件，页面加载完触发
        //slice#获取#以后的路径
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      //history
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("load", () => {
        //监听事件，页面加载完触发
        //获取#以后的路径
        this.history.current = location.pathname;
      });
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname;
      });
    }
  }
  createMap(routes) {
    //路由和组件形成一个对象匹配上
    return routes.reduce((mcmo, current) => {
      mcmo[current.path] = current.components;
      return mcmo;
    });
  }
}
//Vue指向vue的类（构造函数）里边有方法defineReactive调用的是defineProperty
vueRouter.install = function(Vue) {
  //直接执行Vue.use()如果调用的方法有install就直接执行一遍，如果没有install就调用方法
  Vue.mixin({
    beforeCreate() {
      //每个组件中的中调用
      if (this.$options && this.$options.router) {
        //把当前实例挂载在_root上
        this._root = this;
        this._router = this.$options.router; //defineReative  vue内部实现双向数据绑定 //this指向当前组件实例 //监听history,current变化触发方法
        Vue.util.defineReactive(this, "current", this._router.history);
      } //设置$router获取路由信息
      Object.defineProperty(this, "$router", {
        get() {
          //从属性中取$router获取路由信息，$router引用只读可避免不小心修改路由信息
          return this._root._router;
        }
      });
      Object.defineProperty(this, "$route", {
        get() {
          //从属性中取$router获取路由信息，$router引用只读可避免不小心修改路由信息
          return this._root._router.history.current;
        }
      });
    }
  }); //注册vue-view
  Vue.components("router-view", {
    render(r) {
      // render路由的内容，r为字符串
      // this指向proxy当前组件的一个代理对象 >_self vue自带属性
      // 拿到是那个对象
      let current = this._self._root._router.history.current;
      let routesMap = this._self._root._router.routesMap;
      return r(routesMap[current]);
    }
  });
};
module.export = vueRouter;

```