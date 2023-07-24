:::tip
### 实现功能
+ 循环展示图片 
+ 自定义前进后退按钮+更改hover样式 
+ 自定义页码区域 
+ 鼠标经过停止滑动 
+ 点击轮播图跳转页面 
+ 图片随轮播图容器size更改修改宽高比
:::
### 链接
[https://github.com/surmon-china/vue-awesome-swiper/tree/v3.1.3](https://github.com/surmon-china/vue-awesome-swiper/tree/v3.1.3)
[https://www.swiper.com.cn/](https://www.swiper.com.cn/)
## 项目使用
#### 下载
npm install vue-awesome-swiper --save  // 本次使用版本3.1.3 swiper使用4.5.1
#### 版本
● Swiper 5-6 vue-awesome-swiper@4.1.1 (Vue2)
● Swiper 4.x vue-awesome-swiper@3.1.3 (Vue2)
● Swiper 3.x vue-awesome-swiper@2.6.7 (Vue2)
#### 引入
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css"; // 注意不同版本下载位置不同，这要对应修改
let vm = null;
#### 属性设置
```js
// data中设置
swiperOption: {
        loop: true,
        autoWidth: true,
        autoplay: {
          delay: 3000,
          dynamicBullets: true,
        },
        on: {
          click: function () {
            //  需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            vm.handleClickSlide();
          },
          resize: function () {
            vm.changeResize();
          },
        },
        preventClicks: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }
```
### 实例获取
```js
 //computed 设置
  swiper() {
     return this.$refs.mySwiper.swiper;
  }
```

### 遇到/解决问题
#### this.swiper?.acitveIndex问题
+ 问题：点击图片使用的this.swiper?.acitveIndex获取索引，由于设置循环所以index重复
 this.swiper?.realIndex 索引唯一
#### 图片循环问题
+ 问题：设置 loop: true失效问题
```js
 <swiper v-if="noticeList.length > 0" >
  </swiper>
```
## 项目问题
#### 自定义前进后退按钮
+ 问题：默认图标是图片样式不好更改样式
```js
<!-- 自定义前进后退按钮 -->
   <div class="swiper" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <swiper>
    </swiper>
    <!-- 自定义前进后退按钮 -->
    <div slot="button-prev" class="swiper-button-prev" v-show="showBtn"></div>
    <div slot="button-next" class="swiper-button-next" v-show="showBtn"></div>
  </div>
    
    //默认图标使用图片引入替换使用background-image进行本地图片替换
   /deep/.swiper-button-next {
    // 自定义后退按钮图片样式
    background-image: url('../../../assets/img/home/noChooseNext.png') !important;
    position: absolute;
    right: 28px;
    .base-swiper-img()
  }

  /deep/.swiper-button-next:hover {
    // 自定义后退按钮图片样式
    background-image: url('../../../assets/img/home/chooseNext.png') !important;
    position: absolute;
    right: 28px;
    top: 50%;
    .base-swiper-img()
  }
  
  /deep/.swiper-button-prev {
    // 自定义前进按钮图片样式
    background-image: url('../../../assets/img/home/noChooseLeft.png') !important;
    position: absolute;
    left: 28px;
    .base-swiper-img()
  }

  /deep/.swiper-button-prev:hover {
    // 自定义前进按钮图片样式
    background-image: url('../../../assets/img/home/chooseLeft.png') !important;
    position: absolute;
    left: 28px;
    .base-swiper-img()
  }
```
#### 鼠标经过事件触发
+ 问题：鼠标经过轮播停止和继续播放切换
```js
 <div class="swiper" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <swiper>
    </swiper>
  </div>
  
  // methods
   mouseleave() {
      // 鼠标离开到轮播图滚动
      this.showBtn = false;
      this.swiper.autoplay.start();
    },
    mouseenter() {
      // 鼠标滑动到轮播图停止
      this.showBtn = true;
      this.swiper.autoplay.stop();
    }
```
#### 图片宽高比
+ 问题：图片宽高比没有随swiper容器进行更改，导致更改swiper容器图片的高度和swiper高度不一致
```js
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="noticeList.length > 0"
      :style="`height:${swiperheight}`"
    >
    </swiper>
    
   let vm = null;
   // data设置resize事件
     data() {
       return {
         swiperOption: {
         on: {
           resize: function () {
            vm.changeResize();
          },
        }
      },
    };
  }
  
  // methods
  changeResize() {
      // 设计稿宽1920高比-解决swiper设置高度改变宽高比图片尺寸不自适应问题
      let endwidth = 1920 / 390;
      vm.swiperheight = `${100 / endwidth}vw`;
   }
```
#### 分页样式更改
+ 问题：分页样式无法满足现有需求
```js
// swiper分页样式
  /deep/.swiper-pagination-bullet {
    width: 70px;
    height: 8px;
    border-radius: 0%;
    background: #fff;
    opacity: .4;
    margin: 0 10px;
  }

  // 分页颜色
  /deep/.swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff;
  }
```

## 完整代码
```vue
<template>
  <div class="swiper" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="noticeList.length > 0"
      :style="`height:${swiperheight}`"
    >
      <swiper-slide v-for="item in noticeList" :key="item.imgUrl">
        <div class="img">
          <img :src="item.imgUrl" alt="" class="swiper-slide-img" />
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 自定义前进后退按钮 -->
    <div slot="button-prev" class="swiper-button-prev" v-show="showBtn"></div>
    <div slot="button-next" class="swiper-button-next" v-show="showBtn"></div>
    <div class="more flex-start" @click="moreAnnouncement">
      <img src="@/assets/img/home/more.png" />
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import img from "@/assets/img/home/banner.png";
import { queryNoticeForHomePage } from "@/api/announcement/announcement";
import { isEmpty } from "@/utils/tool";
let vm = null;

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperheight: "390px", // 默认高度
      showBtn: false, // 控制是否展示前进后退按钮
      noticeInfo: {},
      viewVisible: false,
      noticeList: [],
      defaultImages: [
        // 都没有存图片时默认图
        {
          imgUrl: img,
        },
      ],
      swiperOption: {
        loop: true,
        autoWidth: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false, // 最后一页继续滚动
          dynamicBullets: true,
        },
        on: {
          click: function () {
            //  需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            vm.handleClickSlide();
          },
          resize: function () {
            vm.changeResize();
          },
        },
        preventClicks: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    showImage() {
      const imgs = this.noticeList
        .filter((item) => item.imgUrl)
        .filter((item) => item);
      return imgs.length > 0 ? this.noticeList : this.defaultImages;
    },
  },
  created() {
    vm = this;
  },
  mounted() {
    this.bannerImages();
    this.changeResize();
  },
  methods: {
    bannerImages() {
      queryNoticeForHomePage().then((res) => {
        const { code, data } = res.data;
        if (code === "000000") {
          this.noticeList = data
            .filter((item) => item.content && item.content.indexOf("img") != -1)
            .map((item) => {
              const content = this.editorImage(item.content);
              item.imgUrl = content; // 富文本图片地址
              return item;
            });
          this.noticeList = isEmpty(this.noticeList)
            ? this.defaultImages
            : this.noticeList;
        }
      });
    },
    // 富文本首个img
    editorImage(content) {
      var data = "";
      content.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/,
        function (match, capture) {
          data = capture;
        }
      );
      return data;
    },
    handleClickSlide() {
      const index = this.swiper?.realIndex;
      const currentNotice = this.showImage[index];
      if (currentNotice?.id) {
        // 为保存富文本数据跳转到新页面，否则不跳转
        const routeData = this.$router.resolve({
          path: '/announcementBanner',
          query: { id: currentNotice?.id },
        });
        window.open(routeData.href, "_blank");
      }
    },
    moreAnnouncement() {
      // 通知公告查看页面
      this.$router.push(`/announcement/operation`);
    },
    mouseleave() {
      // 鼠标离开到轮播图滚动
      this.showBtn = false;
      this.swiper.autoplay.start();
    },
    mouseenter() {
      // 鼠标滑动到轮播图停止
      this.showBtn = true;
      this.swiper.autoplay.stop();
    },
    changeResize() {
      // 设计稿宽高比-解决swiper设置高度改变宽高比图片尺寸不自适应问题
      let endwidth = 1920 / 390;
      vm.swiperheight = `${100 / endwidth}vw`;
    },
  },
};
</script>
<style scoped lang="less">
@import "./style/banner.less";
</style>
```

### banner.less
```js
/**-----------------------------------**/
.swiper-base {
  background: #000000;
  opacity: 0.58;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 2000;
}

.swiper-base-small {
  width: 45px;
  height: 45px;
  .swiper-base ()
}

.swiper-base-big {
  width: 68px;
  height: 68px;
  .swiper-base ()
}
.base-swiper-img {
  top: 50%;
  width: 68px;
  height: 68px;
  background-size: 68px;
  transform: translate(0,-50%);
  z-index: 900;
}

.base-swiper-small {
  top: 50%;
  width: 45px;
  height: 45px;
  background-size: 45px;
  transform: translate(0,-50%);
  z-index: 3000;
}
/**-----------------------------------**/
.swiper {
  width: 100%;
  position: relative;
  cursor: pointer;
  /deep/.swiper-container {
    width: auto;
    .img {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        object-fit: contain;
      }
    }
  }


  .swiper-btn {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .more {
    position: absolute;
    right: 40px;
    bottom: 20px;
    z-index: 300;
    width: 145px;
    height: 41px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // swiper分页样式
  /deep/.swiper-pagination-bullet {
    width: 70px;
    height: 8px;
    border-radius: 0%;
    background: #fff;
    opacity: .4;
    margin: 0 10px;
  }

  // 分页颜色
  /deep/.swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff;
  }

  /deep/.swiper-button-next {
    // 自定义后退按钮图片样式
    background-image: url('../../../assets/img/home/noChooseNext.png') !important;
    position: absolute;
    right: 28px;
    .base-swiper-img()
  }

  /deep/.swiper-button-next:hover {
    // 自定义后退按钮图片样式
    background-image: url('../../../assets/img/home/chooseNext.png') !important;
    position: absolute;
    right: 28px;
    top: 50%;
    .base-swiper-img()
  }
  
  
  /deep/.swiper-button-prev {
    // 自定义前进按钮图片样式
    background-image: url('../../../assets/img/home/noChooseLeft.png') !important;
    position: absolute;
    left: 28px;
    .base-swiper-img()
  }

  /deep/.swiper-button-prev:hover {
    // 自定义前进按钮图片样式
    background-image: url('../../../assets/img/home/chooseLeft.png') !important;
    position: absolute;
    left: 28px;
    .base-swiper-img()
  }
}

@media (max-width: 1280px) {
  /deep/.swiper-button-next {
    // 自定义后退按钮图片样式
    background-image: url('../../../assets/img/home/noChooseNext.png') !important;
    position: absolute;
    right: 28px;
    .base-swiper-small();
  }

  /deep/.swiper-button-next:hover {
    // 自定义后退按钮图片样式
    background-image: url('../../../assets/img/home/chooseNext.png') !important;
    position: absolute;
    right: 28px;
    top: 50%;
    .base-swiper-small();
  }
  
  
  /deep/.swiper-button-prev {
    // 自定义前进按钮图片样式
    background-image: url('../../../assets/img/home/noChooseLeft.png') !important;
    position: absolute;
    left: 28px;
    .base-swiper-small();
  }

  /deep/.swiper-button-prev:hover {
    // 自定义前进按钮图片样式
    background-image: url('../../../assets/img/home/chooseLeft.png') !important;
    position: absolute;
    left: 28px;
    .base-swiper-small();
  }
  
  // swiper分页样式
  /deep/.swiper-pagination-bullet {
    width: 47px;
    height: 5px;
    border-radius: 0%;
    background: #fff;
    opacity: .4;
    margin: 0 10px;
  }
}
```