### 列表页面整体布局
<!-- <div id="table">
    <el-select v-model="value" placeholder="请选择" size="large" style="margin-bottom:10px;">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
    <el-button  @click="reset" style="margin:10px;float:right;display:block">重置</el-button>
    <el-button type="primary" @click="search" style="margin:10px;float:right;display:block">查询</el-button>
    <el-table :data="tableData" id="elTable">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="tableData.length" style="margin:10px;float:right;display:block"/>
</template>
</div>
<script type="text/javascript">
new Vue({
    el:'#table',
    data:{
        value:'',
        options: [
            {
                id: 'Option1',
                name: '张三',
            },
            {
                id: 'Option2',
                name: '李四',
            }
        ],
        tableData :[
            {
                date: '2016-05-03',
                name: '张三',
                id: 'Option1',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: '李四',
                id: 'Option2',
                address: 'No. 189, Grove St, Los Angeles',
            }
        ],
        baseData :[
            {
                date: '2016-05-03',
                name: '张三',
                id: 'Option1',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: '李四',
                id: 'Option2',
                address: 'No. 189, Grove St, Los Angeles',
            }
        ]
    },
    methods:{
        reset() {
            this.value = ''
        },
        search() {
            this.tableData = this.baseData.filter(item=>item.id ===this.value)
        }
    }
})
</script> -->
### 封装内容
```vue
<template>
  <div class="list">
    <div v-if="allSlots?.search">
      <slot name="search"></slot>
      <div :style="btnPosition">
        <div class="search-btn">
          <el-button :loading="loading" @click="searchPage" type="primary">
            <el-icon class="btn">
              <search />
            </el-icon>{{
                searchBtnName
            }}
          </el-button>
          <el-button @click="reset" v-if="isReset" class="btn">
            <el-icon class="btn">
              <refresh-right />
            </el-icon>重置
          </el-button>
          <span class="btn" style="margin: 0 10px 0 0;">
            <slot name="customBtn"></slot>
          </span>
        </div>
      </div>
    </div>
    <slot name="operationBtn"></slot>
    <slot></slot>
    <XdPagination :pageInfo="pageInfo" :pageSizes="pageSizes" @change="changePage" v-if="isPagination" />
  </div>
</template>

<script>
import { reactive, onMounted, watch, nextTick, ref } from "vue";
import XdPagination from "./XdPagination.vue";
import { RefreshRight, Search } from "@element-plus/icons-vue";
export default {
  name: "XdListView",
  components: { XdPagination, RefreshRight, Search },
  expose:['refresh'],
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          // pageSize: 10, // 默认每页10条
          // pageIndex: 1, // 当前页码
          // total: 0, // 请求总数
        };
      },
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    isReset: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    searchBtnName: {
      type: String,
      default: "查询",
    },
    isMounted: { // 是否初始化mounted
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots, emit }) {
    let allSlots = ref()
    allSlots = slots

    const btnPosition = reactive({
      // 不需要计算最后一行位置，默认位置
      position: "unset",
      whiteSpace: "pre-line",
      float: "right",
      marginBottom: '10px'
    });
    const screenWidth = ref()
    const currentOffset = ref()
    onMounted(() => {
      props.isMounted && refresh('mounted');

      // 重新刷新整个页面重新获取offset
      currentOffset.value = setTimeout(() => {
        computedBtnPosition()
      }, 100)

      window.onresize = () => {
        screenWidth.value = document.body.clientWidth;
      };
    });

    const changePage = (val,type) => {
      // type-changePage 是否是分页
      if (val.pageNumber || val.pageIndex) {
        emit("gotoPage", val.pageNumber, val.pageIndex,type);
      }
    };

    const searchPage = () => {
      refresh();
    };

    const refresh = (type) => {
      // type-mounted是否是刚刚加载完
      emit("gotoPage", props.pageInfo.pageNumber, 1, type);
    };

    const reset = () => {
      emit("reset");
    };


    // 计算搜索和重置按钮的位置,注意搜索区域最后一个元素要添加class="last"
    const computedBtnPosition = () => {
      nextTick(() => {
        const lastDom = document.querySelector(".last");
        if (lastDom) {
          const menu = document.querySelector(".menu"); // 菜单
          const menuWidth = menu?.offsetWidth; // 菜单宽度
          const lastLeft = lastDom?.offsetLeft + lastDom?.offsetWidth; // 最后元素距离左侧距离
          const lastRight = document.body.clientWidth - lastLeft - menuWidth; // 可视区域-最后元素距离-菜单宽度
          const searchBtn = document.querySelector(".search-btn "); // 搜索按钮
          const searchBtnWidth = searchBtn?.offsetWidth // 搜索按钮宽度
          if (lastRight > searchBtnWidth) {
            Object.assign(btnPosition, {
              position: "absolute",
              left: `${lastLeft + 10}px`,
              top: `${lastDom.offsetTop}px`,
            });
          } else {
            // 换行
            Object.assign(btnPosition, {
              position: "unset",
              whiteSpace: "pre-line",
              float: "right",
              marginBottom: '10px'
            });
          }
        }
        clearTimeout(currentOffset.value)
      });
    };

    // 监听视口变化重新计算搜索和重置按钮的位置
    watch(
      () => screenWidth.value,
      (width, prevWidth) => {
        if (width !== prevWidth) {
          computedBtnPosition();
        }
      },
      { immediate: true }
    );
    return {
      changePage,
      searchPage,
      reset,
      btnPosition,
      allSlots,
      refresh
    };
  },
};
</script>

<style scoped lang="scss">
.list {
  .btn {
    margin-right: 10px
  }
}
</style>

```

### 使用方法
```js
<XdListView 
    :pageInfo="pageInfo"
    @gotoPage="gotoPage" 
    @reset="resetForm"
>
    <template #search>
        <el-input/>
        <el-input class="last"/>
    </template>
    <XdTable></XdTable>
</XdListView>
export default {
    setup() {
        const state = reactive({
            pageInfo: {
                pageNumber: 10,
                pageIndex: 1,
                total: 0
            }
        }) 
       const  gotoPage = (pageNumber, pageIndex)=>{
           api().then((res) => {
              if (result.code === "000000") {
                const { pageNumber, totalCount } = res;
                Object.assign(state.pageInfo, {
                  total: totalCount,
                  pageIndex: pageNumber
                })
              }
            })
       }
    }
}
```

####  属性

| 属性          | 说明                                                         | 类型    | 可选值     | 默认值                                   |
| ------------- | ------------------------------------------------------------ | ------- | ---------- | ---------------------------------------- |
| pageInfo      | pageNumber：每页条目个数<br />pageIndex：当前页<br />total：总数 | object  | ——         | { pageNumber: 10,pageIndex: 1, total: 0} |
| pageSizes     | 每页显示个数选择器的选项设置                                 | array   | ——         | [10, 20, 50, 100]                        |
| isPagination  | 是否展示分页                                                 | boolean | true/false | true                                     |
| isReset       | 是否展示重置按钮                                             | boolean | true/false | true                                     |
| searchBtnName | 查询按钮文本                                                 | string  | ——         | 查询                                     |
| loading       | 查询按钮loading                                              | boolean | true/false | false                                    |
| isMounted     | 是否默认加载onMounted                                        | boolean | true/false | true                                    |


#### 事件

| 事件名   | 说明                                  | 参数                  |
| -------- | ------------------------------------- | --------------------- |
| gotoPage | 查询按钮触发事件，默认onMounted中触发 | pageNumber, pageIndex |
| reset    | 重置按钮事件                          | ——                    |

### 插槽

| 插槽名       | 说明                       |
| ------------ | -------------------------- |
| search       | 搜索区域                   |
| customBtn    | 重置搜索按钮后添加内容区域 |
| operationBtn | 搜索区域和表格之间区域     |

