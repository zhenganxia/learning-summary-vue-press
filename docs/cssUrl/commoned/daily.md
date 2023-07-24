## 新手指引
:::tip
+ 背景遮罩层
+ 文件高亮展示
+ 注意：如果是组合页面，其他页面要浮动到遮罩层上，需要改变position，原来的页面如果要继续保持位置可以使用占位符。
:::
```html
<div class="home-space-first">
    组件
</div>
<div class="home-first"></div>
<style>
.home-space-first{
    // 新手指引需要浮动遮罩层上
    position: fixed;
    z-index: 800;
    left: 195px;
    right: 200px;
    box-shadow: none;
    margin:30px 0 0 0 ;
}
.home-first {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.54;
    z-index: 800;
}
</style>
```

## 页面占位符
:::tip
+ 实现功能：页面模块两端对齐，末尾行如果不足一行左对齐
:::
```html
<div class="system">
<div v-for="(item, index) in allSystem" :key="index">
    <div class="system-item" @click="toSystem(item)">
        <div class="system-item-img">
        <img :src="imgUrl(item)" />
        </div>
        <p class="system-item-title">{{ item.systemName }}</p>
    </div>
</div>
<div class="xd-space"></div>
</div>
<style  lang="less">
  .system {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .system-item {
        display: flex;
        justify-content: flex-start;
        align-items:center;
        margin-bottom: 40px;
        padding: 25px 0 25px 68px;
        width: 420px;
        height: 125px;
        cursor: pointer;
        background: linear-gradient(180deg, #f4f5f9 0%, #ffffff 100%);
        box-shadow: 0px 5px 12px 3px #eaeaea;
        border-radius: 4px;
        border: 3px solid #ffffff;
    }

    .system-item-img {
      width: 60px;
      height: 60px;
      margin-right: 26px;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .system-item-title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }

  // 占位符 子级-.system-item 不要设置右边距
  .xd-space {
    flex-grow: 0.7 !important; (0.7这个值可以调整 为1是没有间距的)
    height: 0;
  }
</style>
```

## 侧边栏菜单折叠上加过渡(使用positon 折叠菜单（过渡）和页面全屏设置)
:::tip
+ 实现功能：使用positon 折叠菜单（过渡）和页面全屏设置
+ 注意：所有位置都通过positon设置，更改top left实现
:::
<img :src="$withBase('/images/v2-457f9d0619aa3dde167a505146d73b92_r.png')" alt="foo">

```vue
<template>
  <div class="base-layout" 
   :class="{
    'animate-to-fullscreen':changeScreenInfo.isFullScreen, // 控制页面全屏
    'animate-to-right': !changeScreenInfo.isClosed && !changeScreenInfo.isFullScreen, // 菜单默认样式
    'animate-to-left': changeScreenInfo.isClosed // 菜单收起
    }"
    >
    <Layout theme="light">
      <GHeader v-model="changeScreenInfo" class="main-header"/>
      <Layout>
        <GAsside :activePath="activePath" class="main-menu"/>
        <GContainer v-model="activePath" class="main-container"/>
      </Layout>
    </Layout>
  </div>
</template>

export default {
  data:()=>{
    return {
      activePath:'',
      changeScreenInfo:{
        isClosed:false, // 是否折叠菜单
        isFullScreen:false //是否全屏
      }
    }
  }
}

<style lang="less" scoped>
// 折叠菜单
.animate-to-left {
  /deep/.ivu-layout-sider {
    top: 54px;
    left: -230px;
    transition: all .5s;
  }

  .main-menu {
    top: 54px;
    left: -230px;
    transition: all .5s;
  }
  .main-container {
    position: fixed;
    overflow: hidden;
    top: 62px;
    left: 0;
    width:100vw;
    margin-left:10px;
    transition: all .5s;
  }
}

// 菜单默认样式
.animate-to-right {
  /deep/.ivu-layout-sider{
    top: 54px;
    left: 0;
    transition: all .5s;
  }

  .main-menu {
    top: 54px;
    left: 0;
    transition: all .5s;
    position: fixed;
    bottom: 0;
    min-width: 230px !important;
    max-width: 230px !important;
    flex: 0 0 230px !important;
    width: 230px !important;
    width:100%;
    height:100vh;
  }
  .main-container {
    position: fixed;
    overflow: hidden;
    top: 62px;
    right: 8px;
    left: 238px;
    bottom: 8px;
    min-width: 600px;
    transition: all .5s;
  }
}

/*全屏动画*/
.animate-to-fullscreen {
  .main-header {
    top: -54px;
    transition: all .5s;
  }

  /deep/.ivu-layout-sider {
    top: 54px;
    left: -230px;
    transition: all .5s;
  }
  .main-container {
    position: fixed;
    overflow: hidden;
    top: -32px; // tabs高度32px
    left: 0;
    width:100vw;
    margin-left:10px;
    transition: all .5s;
  }
}
</style>

// GHeader设置事件和监听keyup缩小屏幕
<template>
  <Header class="gwm-header">
    <div class="right">
      <div class="actions">
        <Icon
          :class="[
            'toggle-icon',
            'close-handle',
            isClosed ? 'close-handle--closed' : '',
          ]"
          type="ios-menu-outline"
          @click="toggleAsside(isClosed)"
        />
        <Icon
          class="toggle-icon full-handle"
          type="ios-move"
          @click="toggleFullScreen(isFullScreen)"
        />
      </div>
    </div>
  </Header>
</template>

<script>
export default {
  data() {
    return {
      isClosed: false,
      isFullScreen:false
    };
  },
  watch:{
    'isFullScreen'(value) {
      // 监听是否全屏
      const esc = () => {
        if(value) {
          this.isFullScreen = !value
          this.$emit('input',{
            isClosed:false,
            isFullScreen:this.isFullScreen
          })
          document.removeEventListener('keyup', esc); // 关闭全屏后清楚事件
        }
      }
      document.addEventListener('keyup', esc);
    }
  },
  methods: {
    toggleAsside(value) {
      this.isClosed = !value;
      this.$emit('input',{
        isClosed:this.isClosed,
        isFullScreen:this.isFullScreen
      })
    },
    toggleFullScreen() {
      this.$Message.info({
        content: 'Esc键 关闭全屏模式',
        duration: 3,
      });
      this.isFullScreen = !this.isFullScreen;
      this.$emit('input',{
        isClosed:this.isClosed,
        isFullScreen:this.isFullScreen
      })
    }
   }
  },
};
</script>
```