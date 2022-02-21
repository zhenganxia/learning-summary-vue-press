:::tip
功能：点击播放，再次点击暂停。播放完第一首自动跳转到下一首
:::

### 示例
```vue
<template>
  <audio
    ref="audio"
    preload="auto"
    @ended="ended"
    @error="error"
    :src="url"
  ></audio>
  <div>
    <div v-for="(item, index) in list" :key="index" class="content">
      <div class="img">
        <img
          :src="require(`../assets/music/${playIcon}.png`)"
          v-if="playIndex === index"
          @click.stop="handler(item, index)"
          alt="image"
          class="img"
        />
      </div>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initAudioReady: false,
      list: [
        {
          name: "音乐一",
          url: "http://music.163.com/song/media/outer/url?id=1808492017.mp3",
        },
        {
          name: "音乐二",
          url: "http://music.163.com/song/media/outer/url?id=1408596731.mp3",
        },
      ],
      playIndex: 0,
      isPlayed: true,
      url: "",
    };
  },
  computed: {
    // 播放暂停按钮
    playIcon() {
      return !this.isPlayed ? "pause" : "play";
    },
  },
  methods: {
    // 音频播放结束
    ended() {
      this.playIndex = this.playIndex + 1;
      this.isPlayed = true;
      const currentSong = this.list.find(
        (_, index) => this.playIndex === index
      );
      this.url = currentSong.url;
      setTimeout(() => {
        this.$refs.audio.play();
      }, 0);
    },
    // 音频加载失败
    error() {
      this.isPlayed = false;
      this.$refs.audio.pause();
    },
    // 音频播放/暂停
    handler(item, index) {
      this.url = item.url;
      this.playIndex = index;
      this.isPlayed = !this.isPlayed;
      this.$nextTick(() => {
        if (this.isPlayed) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      });
    },
  },
};
</script>
<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>

```
### 效果
<img :src="$withBase('/images/media/1291643278102_.pic.jpg')" alt="foo">

:::tip
功能：点击播放，再次点击暂停。播放完暂停。
:::

### 示例
```vue
<template>
  <div>
    <audio ref="audio" preload="auto" @error="error" :src="url"></audio>
    <div>
      <div v-for="(item, index) in list" :key="index" class="music">
        <div class="img">
          <img
            :src="require(`../assets/music/${icon(item)}.png`)"
            @click.stop="handler(item, index)"
            alt="image"
            class="img"
          />
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initAudioReady: false,
      list: [
        {
          name: "错位时空",
          url: "http://music.163.com/song/media/outer/url?id=1808492017.mp3",
        },
        {
          name: "桥边姑娘",
          url: "http://music.163.com/song/media/outer/url?id=1408596731.mp3",
        },
      ],
      playIndex: 0,
      isPlayed: true,
      url: "",
    };
  },
  mounted() {
    // 添加标识-当前展示播放按钮的默认值
    this.list.forEach((item) => {
      item["isPlayed"] = false;
    });
  },
  methods: {
    // 音频加载失败
    error() {
      this.isPlayed = false;
      this.$refs.audio.pause();
    },
    // 音频播放/暂停
    handler(item, index) {
      this.url = item.url;
      this.list.forEach((item, currentIndex) => {
        this.$nextTick(() => {
          if (currentIndex === index) {
            item.isPlayed = !item.isPlayed;
            if (item.isPlayed) {
              this.$refs.audio.play();
            } else {
              this.$refs.audio.pause();
            }
          } else {
            // 重置播放状态为初始值
            item.isPlayed = false;
          }
        });
      });
    },
    // 播放暂停按钮
    icon(item) {
      return item.isPlayed ? "play" : "pause";
    },
  },
};
</script>
<style>
.music {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.music-img {
  width: 30px;
}
.img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
</style>

```

### 效果
<img :src="$withBase('/images/media/1301643278683_.pic.jpg')" alt="foo">

