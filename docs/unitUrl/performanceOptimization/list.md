### 长列表性能优化
#### 一、requestAnimationFrame（时间分片）
:::tip
刷新频率由分辨率和屏幕大小决定
不同帧率的体验：
帧率能够达到 50 ～ 60 FPS 的动画将会相当流畅，让人倍感舒适（由于眼睛的视觉停留效应 1000ms/60=16.7ms感觉动画最平滑）
帧率在 30 ～ 50 FPS 之间的动画，因各人敏感程度不同，舒适度因人而异
帧率在 30 FPS 以下的动画，让人感觉到明显的卡顿和不适感
帧率波动很大的动画，亦会使人感觉到卡顿
:::
#### setTimeout和requestAnimationFrame的区别：
setTimeout：手动设置执行时间，对dom进行操作，必须要等到屏幕下次绘制时才能更新到屏幕上，如果屏幕刷新频率和设置的时间步调不一致，就可能导致中间某一帧的操作被跨越过去，<br/>
而直接更新下一帧的元素，从而导致丢帧现象（闪屏/白屏）<br/>
requestAnimationFrame：最大的优势1.由系统来决定回调函数的执行时机，能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象。2.在隐藏或不可见的元素中不会进行重绘和回流，性能消耗更小<br/>

```js
 //需要插入的容器
    let ul = document.getElementById("container");
    // 插入十万条数据
    let total = 100000;
    // 一次插入 20 条
    let once = 20;
    // 需要插入的次数
    let page = total / once;
    // 每条记录的索引
    let index = 0;
    //循环加载数据
    function loop(curTotal, curIndex) {
      if (curTotal <= 0) {
        return false;
      }
      //每页多少条
      let pageCount = Math.min(curTotal, once);
      window.requestAnimationFrame(function () {
        for (let i = 0; i < pageCount; i++) {
          let li = document.createElement("li");
          li.innerText = curIndex + i + " : " + ~~(Math.random() * total);
          ul.appendChild(li);
        }
        loop(curTotal - pageCount, curIndex + pageCount);
      });
    }

    loop(total, index);
```
二、虚拟列表
:::tip
过程：
1.长列表不一次性展示
2.截取长列表的部分数据填充可视区域
3.长列表不可视区域使用空白占位
4.监听滚动事件根据滚动位置动态更改可视区域列表和空白位置
:::

```vue
<template>
<div ref="content" @scroll.passive="handleScroll">
</div>
</template>
```
```js
data(){
    return{
        containSize:0, //可视区最多放多少条数据
        oneHeight:100, // 单条数据高度
        startIndex:0, // 记录当前滚动元素的第一个索引
        allDataList:[] // 所有数据
    }
},
mouted(){
   this.getContainSize()
   window.onresize = this.getContainSize
   // 横屏
   window.orientationchange = this.getContainSize
},
computed:{
    // 最后一个元素的索引
    endIndex() {
       let endIndex = this.startIndex + this.containSize
       if(this.allDataList[endIndex]) {
           // 判断数据最后有没有值，没有直接用长度计算索引值
           endIndex = this.data.length -1
       }
       return endIndex
    }，
    // 截取可视区域要展示内容
    showDataList() {
       return this.allDataList.slice(this.startIndex,this.endIndex)
    }
},
methods:{
    // 获取可视区域列表长度
    getContainSize() {
        //~~等于math.floor()取整 +2是因为可视区有展示不是一整条的数据（上下）
       this.containSize = ~~(this.$refs.content.offsetHeight/this.oneHeight) + 2
    },
    // 定义滚动行为事件
    handleScroll() {
        // 距离滚动顶部的位移（容器需要设置overflow:atuo否则不能获取高度） 
       this.startIndex = (this.$refs.content.scrollTop/this.oneHeight)
    }
}

```