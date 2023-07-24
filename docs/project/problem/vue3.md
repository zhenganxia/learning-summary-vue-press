## vue3动态component warning -marking the component with `markRaw` or using `shallowRef` instead of `ref`
```js
使用：
 <div v-for="(value) in components" class="rule-icon">
   <div @click="changeIcon(value)">
     <el-icon>
       <component :is="value.icon"></component>
     </el-icon>
  </div>
</div>

import {Document} from "@element-plus/icons-vue";

原components数据：
const state = reactive({
  components: [
    {
      icon: Document
    }
]
})
改为：
const state = reactive({
  components: [
    {
      icon: shallowRef(Document)
    }
]
})

waring-提示
 Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.  Component that was made reactive
```
## Vue路由导航报错：NavigationDuplicated: Avoided redundant navigation to current location解决方法
```js
// vue-router 3.0版本路由跳转自己报错解决
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
```