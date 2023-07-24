## 上传图片
```vue
<template>
  <div>
    <ul class="upload-imgs">
      <li
        class="showFile"
        v-for="(value, key) in images"
        :key="key"
        :style="imageCustomSize"
      >
        <div class="el_icon" v-if="!disabled">
          <el-icon @click="bigImg(value)" v-if="isBig"><ZoomIn /></el-icon>
          <el-icon @click="delImg(key)" ><Delete /></el-icon>
        </div>
        <div class="img">
          <img :src="value" />
        </div>
      </li>
      <li v-if="loading" v-loading="loading" :style="imageCustomSize"></li>
      <template v-if="isIcon">
        <li
          class="saveFile"
          :class="{
            active: loading,
            unUpload: !multiple && images.length > 0,
          }"
          v-if="!disabled"
          :style="imageCustomSize"
        >
          <input
            :disabled="loading"
            type="file"
            class="upload"
            @change="beforeAvatarUpload"
            ref="inputRef"
            multiple
            :accept=acceptType
          />
          <el-icon class="el-icon-plus"><Plus/></el-icon>
          <p :style="iconCustomText" style="text-align: center">
            {{ iconText }}
          </p>
        </li>
      </template>
    </ul>

    <el-dialog :title="title" v-model="uploadDialog" append-to-body>
      <img style="width: 100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import { uploadTencent } from "@/api/common";
import { reactive, ref, toRefs, nextTick, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import {
  ZoomIn,
  Delete,
  Plus
} from "@element-plus/icons-vue";
export default {
  name: "XdUploadImage",
  components:{
    ZoomIn,
    Delete,
    Plus
  },
  props: {
    imageLimit: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: () => "",
    },
    isBig: {
      // 是否放大
      type: Boolean,
      default: true,
    },
    multiple: {
      // 是否支持多张图片上传
      type: Boolean,
      default: false,
    },
    imageStyle: {
      // 自定义设置图片宽高
      type: Object,
      default: () => {
        return {
          width: 80,
          height: 80,
        };
      },
    },
    iconText: {
      type: String,
      default: "",
    },
    imageUrl: {
      // 回显数据使用
      type: Array,
      default: () => {
        return [];
      },
    },
    limitSize: {
      type: Number,
      default: 5,
    },
    unValidate:{
      // 是否校验图片宽高
      type: Boolean,
      default: true,
    },
    acceptType: {
      type: String,
      default: "image/png,image/jpeg,image/gif,image/jpg"
    }
  },
  setup(props, { emit }) {
    const inputRef = ref(null);
    const state = reactive({
      images: [],
      uploadDialog: false,
      dialogImageUrl: "",
      loading: false,
      isIcon: true,
    });
    const bigImg = (value) => {
      state.dialogImageUrl = value;
      state.uploadDialog = true;
    };
    const delImg = (key) => {
      state.isIcon = true;
      state.images.splice(key, 1);
      emit("getData", state.images);
    };

    const beforeAvatarUpload = () => {
      let inputDOM = inputRef.value;
      let file = inputDOM.files[0];
      let isLimit = state.images.length + 1 <= props.imageLimit;
      const acceptType = props.acceptType.split(',')
      const isType = acceptType.includes(file.type);
      const showType = acceptType
      .reduce((init,item)=>{
        const key = item.split('/')
        init.push(key[1])
        return init
      },[])
      .join(',')
      let isLt5M = file.size / 1024 / 1024 <= props.limitSize;

      isSize(file)
        .then((res) => {
          let isUpload = ref(true);
          const unUpload = {
            isLimit: {
              messages: "最多只能上传" + props.imageLimit + "张!",
              type: !isLimit,
            },
            isType: {
              messages: `上传图片只能是${showType}格式!`,
              type: !isType,
            },
            isLt5M: {
              messages: `上传图片大小不能超过 ${props.limitSize}!`,
              type: !isLt5M,
            },
          };
          const limits = ["isLimit", "isType", "isLt5M"];
          limits.forEach((item) => {
            const condition = unUpload[item];
            if (condition.type) {
              ElMessage({
                message: condition.messages,
                duration: 2000,
                type: "error",
                showClose: true,
              });
              isUpload.value = false;
            }
          });
          if (!state.loading && isUpload.value) {
            state.loading = true;
            let formData = new FormData();
            formData.append('file', file);
            formData.append('path', 'files/bt-user-management-web-dashboard/');
            if (!props.multiple) {
              // 上传图片隐藏当前上传的icon
              state.isIcon = false;
            }
            uploadTencent(formData)
              .then((res) => {
                state.loading = false;
                inputDOM.value = "";
                state.images.push(res.data);
                emit("getData", state.images);
              })
              .catch((err) => {
                state.loading = false;
                inputDOM.value = "";
                ElMessage({
                  message: err.description,
                  duration: 2000,
                  type: "error",
                  showClose: true,
                });
              });
          }
        })
        .catch(() => {
          ElMessage({
            message:
              "必须是等于" +
              props.imageStyle.width +
              "*" +
              props.imageStyle.width +
              "像素!",
            duration: 2000,
            type: "error",
            showClose: true,
          });
        });
    };

    const isSize = (file) => {
      return new Promise((resolve, reject) => {
        const { width, height } = props.imageStyle;
        if (props.unValidate) {
          // 图片不需要校验宽高
          resolve();
        } else {
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = () => {
            let valid = img.width == width && img.height == height;
            valid ? resolve() : reject();
          };
          img.src = _URL.createObjectURL(file);
        }
      }).then(
        () => {
          return file;
        },
        () => {
          return Promise.reject();
        }
      );
    };

    // watch(
    //   () => state.images,
    //   (newVal, oldVal) => {
    //     emit("getData", state.images);
    //   }
    // )

    watch(
      () => props.imageUrl,
      (newValue) => {
        if (newValue.length > 0) {
          state.isIcon = false;
          nextTick(() => {
            state.images = newValue;
          });
        } else {
          state.isIcon = true;
          state.images = [];
        }
      },
      {
        immediate: true,
      }
    );

    // 自定义图片宽高
    const imageCustomSize = computed(() => {
      return {
        width: props.imageStyle.width + "px",
        height: props.imageStyle.height + "px",
      };
    });

    // icon下边添加文字自定义文字内容
    const iconCustomText = computed(() => {
      return {
        marginTop: Math.floor(props.imageStyle.height / 2) + 10 + "px",
      };
    });

    return {
      ...toRefs(state),
      inputRef,
      beforeAvatarUpload,
      isSize,
      bigImg,
      delImg,
      imageCustomSize,
      iconCustomText,
    };
  },
};
</script>

<style lang="less" scoped>
.upload-imgs {
  line-height: initial;
  li {
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: initial;
    border: 1px dashed #d9d9d9;
    border-radius: 5px;

    .upload {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      cursor: pointer;
    }

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  li:hover {
    border-color: #409eff;
  }

  li:hover i {
    color: #409eff;
  }

  .showFile {
    div.img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;

      img {
        max-width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
    }

    .el_icon {
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;

      i:nth-of-type(1) {
        margin-left: -12px;
        color: #fff;
      }

      i:nth-of-type(2) {
        margin-left: 12px;
        color: #fff;
      }
    }
  }

  .active {
    opacity: 0.3;
  }

  .showFile:hover .el_icon {
    display: block;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .unUpload {
    display: none;
  }
}
</style>

```

## 使用方法
```vue
<XdUploadImage
  @getData="updateDataCategoryUrl"
  :imageStyle="{
    width: 120,
    height: 120,
    unValidate:true
  }"
  :imageUrl="imageUrl"
/>
```

```js
export default {
    setup() {
        const state = reactive({
            imageUrl: []
        }) 
       const  updateDataCategoryUrl = ()=>{
          // 处理图片逻辑
       }
    }
}
```

## 属性

| 属性       | 说明               | 类型    | 可选值     | 默认值               |
| ---------- | ------------------ | ------- | ---------- | -------------------- |
| multiple   | 是否上传多张       | boolean | true/false | false                |
| imageStyle | 自定义图片宽高     | object  | ——         | {width:80,height:80} |
| iconText   | 上传图标下文字展示 | string  | ——         | ——                   |
| imageUrl   | 回显图片集合       | array   | ——         | ——                   |
| unValidate | 是否校验图片宽高   | boolean | true/false | true                 |
| limitSize  | 图片大小           | number  | ——         | 5                    |
| disabled   | 不可操作图片       | boolean | true/false | false                |
| title      | 放大图片标题       | string  | ——         | ——                   |
| imageLimit | 图片限制上传数量   | number  | ——         | 1                    |
| isBig      | 不展示放大图标     | boolean | true/false | true                 |

### 事件

| 事件名  | 说明       | 参数 |
| ------- | ---------- | ---- |
| getData | 上传成功图 | ——   |



