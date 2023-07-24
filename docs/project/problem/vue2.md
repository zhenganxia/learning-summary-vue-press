## vue 使用router.resolve开新页签
```js
const routeData = this.$router.resolve({
path: '/announcementBanner', // 和需要跳转路由保持一致
query: { id: currentNotice?.id }, // 跳转参数
});
window.open(routeData.href, "_blank");
```
## vue 无法监听滚动条事件-window.addEventListener失效
```js
<div class="home isBackGround" @scroll="scrollEvent"></div>

注意：.home，需要设置 overflow: auto;才能生效
```