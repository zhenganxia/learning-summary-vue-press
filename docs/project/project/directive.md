### webpack+vue2
```js
import Vue from 'vue'
// 注册全局组件-使用组件内name进行注册
const requireComponents = require.context('./', true, /\w+\.(vue)$/);
export default function publicComponents() {
  requireComponents.keys().forEach((fileName) => {
    const file = requireComponents(fileName);
    const config = file.default || file;
    let { name } = config;
    if (!name) return;
    if (name.indexOf('-') < 0) {
      //按照大小写拆分
      const names = name.match(/[A-Z][a-z]+/g);
      const first = names[0].toLowerCase()
      if(first==='gw'){
        name = 
      } else {

      }
      if(names[0])
      name = names.join('-').toLowerCase();
    }
    Vue.component(`${name}`, config);
  });
}

```
### vite+vue3
```js
import { defineAsyncComponent } from 'vue';
const components = import.meta.glob('./*.vue'); // 异步方式
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    app.component(name, defineAsyncComponent(value));
  }
}

```