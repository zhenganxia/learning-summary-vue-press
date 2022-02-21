:::tip
功能：播放、暂停、下一视频icon、进度条、清晰度、全屏 <br/>
参考：[video.js](https://docs.videojs.com/)
:::

> plugins - video-quality.js <br/>
>VideoPlayer.vue<br/>
>实现功能组件

### video-quality.js
```js
(function () {
    'use strict'
    let videojs = null
    if (typeof window.videojs === 'undefined' && typeof require === 'function') {
        videojs = require('video.js').default
    } else {
        videojs = window.videojs
    }

    (function (window, videojs) {
        const currentItem = {}

        // 清晰度切换触发事件
        const _MenuItem = videojs.getComponent('MenuItem')
        const QualityItem = videojs.extend(_MenuItem, {
            constructor(player, options) {
                var _this
                options.selected = options.val === currentItem.val
                options.selectable = true
                _this = _MenuItem.call(this, player, options) || this
                _this.label = options.label
                _this.val = options.val
                // 自定义切换高清度触发事件
                player.on('qualityChange', videojs.bind(_this, _this.update))
            },
            handleClick(event) {
                _MenuItem.prototype.handleClick.call(this, event)
                currentItem.label = this.options_.label
                currentItem.val = this.options_.val
                this.player_.quality = currentItem
                this.player_.pause();
                this.player_.trigger('qualityChange',currentItem)
                this.player_.trigger('updateLabel')
            },
            update() {
                this.selected(this.options_.val === currentItem.val)
            }
        })

        // 清晰度按钮
        const _MenuButton = videojs.getComponent('MenuButton')
        const _Menu = videojs.getComponent('Menu')
        const qualityButton = videojs.extend(_MenuButton, {
            constructor(player, options) {
                this.opt = options.playerOptions
                // currentItem.label = this.opt.qualityType[this.opt.quality.br]
                // currentItem.val = this.opt.quality.br
                currentItem.label = this.opt.qualityType[240]
                currentItem.val = 240
                _MenuButton.call(this, player, currentItem)
                player.on('updateLabel', videojs.bind(this, this.updateLabel))
            },
            createEl() {
                // 默认清晰度文本和样式
                const el = _MenuButton.prototype.createEl.call(this)
                this.labelEl_ = videojs.createEl('div', {
                    className: 'vjs-quality-value',
                    // innerHTML: this.opt.qualityType[this.opt.quality.br]
                    innerHTML: this.opt.qualityType[240]
                })
                el.appendChild(this.labelEl_)
                return el
            },
            createMenu() {
                // 创建清晰度列表
                const menu = new _Menu(this.player())
                let qualityList = [
                    { br: 240 },
                    { br: 480 }
                ]
                if (qualityList.length) {
                    // 有可能返回的分辨率顺序不对
                    qualityList.sort(function (a, b) { return a.br - b.br })
                    for (var i = qualityList.length - 1; i >= 0; i--) {
                        menu.addItem(new QualityItem(this.player(), {
                            label: this.opt.qualityType[qualityList[i].br],
                            val: qualityList[i].br
                        }))
                    }
                }

                return menu
            },
            updateLabel() {
                this.labelEl_.innerHTML = currentItem.label
            },
            buildWrapperCSSClass() {
                return 'vjs-quality ' + _MenuButton.prototype.buildWrapperCSSClass.call(this)
            }
        })

        // 下一集图标
        const customButton = videojs.getComponent("Button");
        const playNextIcon = videojs.extend(customButton, {
            constructor: function (player, options) {
                customButton.call(this, player, options);
            },
            handleClick() {
                // 获取资源列表
                const sources = this.player_.options_.sources
                // 资源数组长度
                const len = sources.length;
                if (len > 1) {
                    let theSrc = sources[0];
                    // 更新资源数组
                    for (let i = 1; i < len; i++) {
                        sources[i - 1] = sources[i];
                    }
                    sources[len - 1] = theSrc;
                    // 获取下一个资源
                    theSrc = sources[0];
                    this.player_.pause();
                    // 重载资源
                    this.player_.src(theSrc);
                    this.player_.load();
                    this.player_.play();
                }
            },
            buildCSSClass: function () {
                // 资源长度大于1展示播放下一集icon(这里是自带icon)
                const len = this.player_.options_.sources.length
                return len > 1 ? "vjs-icon-next-item" : '';
            }
        });
        
        videojs.registerComponent('qualityButton', qualityButton) // 创建分辨率按钮
        videojs.registerComponent('playNextIcon', playNextIcon) //  播放下一集
        playNextIcon.prototype.controlText_ = 'playNextIcon'; // 下一集标识
        qualityButton.prototype.controlText_ = 'qualityButton';// 分辨率标识
    })(window, videojs)
})()
```
### VideoPlayer.vue

```vue
<template>
  <div class="video">
    <video
      ref="videoPlayer"
      id="video"
      class="video-js video-skin vjs-big-play-centered"
      style="width: 100%"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "./plugins/video-quality.js";
import "video.js/dist/video-js.css";
window.videojs = videojs;
// require('video.js/dist/lang/zh-CN')
export default {
  name: "videoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {
          sources: [
            // type: '',
            // src: '' // url地址
          ],
          qualityList: [], // 分辨率列表
          quality: {} // 分辨率
        };
      },
    },
  },
  data() {
    return {
      opt: {
        playbackRates: [0.5, 1, 1.5, 2], // 播放速度
        controls: true,
        autoplay: true, // 如果true,浏览器准备好时开始播放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: "16:9", // 播放器的比例。用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，播放器将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 无法播放媒体源时显示的默认信息。
        controlBar: {
          currentTimeDisplay: true, // 当前播放时长
          timeDivider: true, // 当前播放时间与总时间的斜杆分隔符
          durationDisplay: true, // 总时长
          remainingTimeDisplay: false, // 是否显示剩下的时间
          volumePanel: {
            // 音量组件
            inline: false, // 调整音量调方向为纵向或者横向
          },
          QualitySelector: true,
          children: [
            "playToggle", // 播放暂停按钮
            "volumePanel", // 音量按钮
            "playNextIcon", // 自定义下一集icon展示位置
            "progressControl", // 视频进度条
            "currentTimeDisplay", // 当前播放时长
            "timeDivider", //  ‘/’ 分隔符
            "durationDisplay", // 视频总时长
            "PlaybackRateMenuButton", // 播放速度
            "qualityButton", // 自定义视频高清切换，分辨率按钮展示位置
            "fullscreenToggle", // 全屏按钮
          ],
        },
        qualityType: { // 自定义视频分辨率分类标准
          240: "标清",
          480: "高清",
          720: "超清",
          1080: "1080P",
        },
        errorDisplay: false,
        posterImage: false,
        bigPlayButton: true,
        textTrackDisplay: false,
      },
      player: null,
    };
  },
  mounted() {
    const self = this;
    this.$nextTick(() => {
      // 自定义数据类型可通过this.options传入
      const source = { ...this.opt, ...this.options };
      this.player = videojs(
        this.$refs.videoPlayer,
        source,
        function onPlayerReady() {
          self.$emit("ready", this, "视频加载完成");

          this.on("loadstart", () => {
            self.$emit("loadstart", this, "开始请求数据");
          });
          this.on("progress", () => {
            self.$emit("progress", this, "正在请求数据");
          });
          this.on("loadedmetadata", () => {
            self.$emit("loadedmetadata", this, "获取资源长度完成");
          });
          this.on("canplaythrough", () => {
            self.$emit("canplaythrough", this, "视频源数据加载完成");
          });
          this.on("waiting", () => {
            self.$emit("waiting", this, "等待数据");
          });
          this.on("play", () => {
            self.$emit("play", this, "视频开始播放");
          });
          this.on("playing", () => {
            self.$emit("playing", this, "视频播放中");
          });
          this.on("pause", () => {
            self.$emit("pause", this, "视频暂停播放");
          });
          this.on("ended", () => {
            self.$emit("ended", this, "视频播放结束");
          });
          this.on("error", () => {
            self.$emit("error", this, "error");
          });
          this.on("seek", () => {
            self.$emit("seek", this, "视频跳转");
          });
          this.on("seeking", () => {
            self.$emit("seeking", this, "视频跳转中");
          });
          this.on("seeked", () => {
            self.$emit("seeked", this, "视频跳转结束");
          });
          this.on("ratechange", () => {
            self.$emit("ratechange", this, "播放速率改变");
          });
          this.on("timeupdate", () => {
            self.$emit("timeupdate", this, "播放时长改变");
          });
          this.on("volumechange", () => {
            self.$emit("volumechange", this, "音量改变");
          });
          this.on("stalled", () => {
            self.$emit("stalled", this, "网速异常");
          });
          this.on("qualityChange", (a, b, c) => {
            // 自定义切换清晰度触发事件
            self.$emit("qualityChange", this, "高清视频切换");
          });
        }
      );
    });
  },
  unmounted() {
    if (this.player) {
      this.player.dispose();
    }
  },
  // 监听属性 类似于data概念
  computed: {
    src() {
      return this.options?.sources[0]?.src;
    },
  },
  watch: {
    src() {
      this.player.src(this.src);
    },
  },
};
</script>
<style scoped lang="less">
// 设置清晰度选中文本样式
/deep/.vjs-menu-button-popup .vjs-menu {
  width: 100% !important;
  left: 0;
}

// 清晰度按钮 参考video-quality.js class name
/deep/.video-skin {
  .vjs-quality {
    .vjs-menu-button,
    .vjs-quality-value {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .vjs-quality-value {
      font-size: 12px;
      line-height: 30px;
    }

    &.vjs-hover {
      .vjs-menu {
        display: block;
      }
    }
  }
}
//  设置屏幕暂停按钮样式
/deep/.video-js .vjs-big-play-button {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: unset;
  line-height: 45px;
}
// 设置下一集图标
/deep/.vjs-icon-next-item:before {
  font-size: 18px;
}
/deep/.vjs-icon-next-item{
  cursor: pointer;
}
.video {
  width: 100%;
  height: 100%;
}
</style>

```

### 使用示例
```vue
<template>
  <video-player
    v-if="videoOptions.sources[0].src"
    :options="videoOptions"
    @play="onPlay"
    @pause="onPause"
    @seeking="onSeeking"
    @qualityChange="onQualityChange"
  />
</template>

<script>
import VideoPlayer from "./VideoPlayer";
export default {
  components: { VideoPlayer },
  data() {
    return {
      currentTime: 0, // 当前视频播放的时长
      videoOptions: {
        sources: [
          {
            type: "",
            src: "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4", // url地址
          },
          {
            type: "",
            src: "https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg1.mp4", // url地址
          },
          {
            type: "",
            src: "https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4", // url地址
          },
        ],
        qualityList: [],
        quality: {},
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 接口获取清晰度数据
      this.videoOptions.qualityList = [{ br: 240 }, { br: 480 }];
      this.videoOptions.quality = { br: 240 };
    },
    onPlay(play) {
      play.currentTime(this.currentTime);
    },
    onSeeking(play) {
      this.currentTime = play.currentTime();
    },
    onPause(play) {
      this.currentTime = play.currentTime();
      play.pause();
    },
    /**
     * 切换清晰度触发事件
     */
    onQualityChange(play) {
      this.currentTime = play.currentTime();
      this.getMvUrl(play.quality.val);
    },
    /**
     * 根据接口重新获取新的清晰度数据
     * @params {number} currentQuality 当前切换的清晰度
     */
    getMvUrl(currentQuality) {
      // 接口获取当前清晰度的url
    //   this.videoOptions.sources[0] = {
    //       type:'',
    //       src: '新url'
    //   }
    },
  },
};
</script>
```
