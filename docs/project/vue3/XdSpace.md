### 自动填充
<!-- <div id="space">
    <span style="float:left;">剩余部分</span>
    <sapn style="float:right;">内容部分</sapn>
</div>
<script type="text/javascript">
    new Vue({
        el:'#space'
    })
</script> -->
### 封装内容
```vue
<template>
  <div class="xd-space"></div>
</template>
<script>

export default {
  name: 'XdSpace'
}
</script>
<style lang="scss">
.xd-space {
  flex-grow: 1 !important;
  height: 0;
}
</style>

```

### 使用方法
```js
 <XdSpace></XdSpace>
 <div></div>
```

