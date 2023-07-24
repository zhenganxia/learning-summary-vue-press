### 设计结构
<img :src="$withBase('/images/project.png')" alt="foo">

### main.js
```js
import Vue from 'vue';
import App from './App.vue';
import publicMethods from './components/shared';

async function entry() {
	// 处理i18n、注册全局过滤器、全局组件和注册插件
	await publicMethods(App);
    // 处理优先需要获取数据
	new Vue({
		render: (h) => h(App),
	}).$mount('#app');
}
entry();
```

### ./components/shared/index
```js
import globalComponents from './globalComponents';
import plugins from './plugins/index'
import syncData from './syncData/index'
export default function publicMethods() {
  plugins() // 注册插件
  globalComponents(); // 注册全局组件
  syncData() //初始化session数据
}

```

### 插件./plugins/index
```js
import Vue from "vue";
import ViewUI from 'view-design';
import SliderVerificationCode from 'slider-verification-code';
import 'slider-verification-code/lib/slider-verification-code.css'
import Viewer from './viewer';
export default function plugin() {
    Vue.use(ViewUI);
    Vue.use(SliderVerificationCode);
    Vue.use(Viewer)
}
```