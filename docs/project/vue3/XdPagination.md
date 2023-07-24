### 分页
>内置element-pagination所有属性和方法，参考element-pagination使用方法
<!-- <div id="pagination">
    <el-pagination background layout="prev, pager, next" :total="1000" />
</div>
<script type="text/javascript">
    new Vue({
        el:'#pagination'
    })
</script> -->
### 封装内容
```vue
<template>
  <div class="pagination">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      :page-size="pageInfo.pageNumber"
      :current-page="pageInfo.pageIndex"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange($event)"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  name: "XdPagination",
  props: {
    pageSizes: {
      // 每页显示个数选择器的选项设置
      type: Array,
      required: false,
      default: () => {
        return [10, 20, 50, 100, 200];
      },
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          pageNumber: 10, // 默认每页10条
          pageIndex: 1, // 当前页码
          total: 10, // 请求总数
        };
      },
    },
  },
  setup(props, { emit }) {
    const page = JSON.parse(JSON.stringify(props.pageInfo));
    const handleSizeChange = (val) => {
      Object.assign(page, {
        pageNumber: val,
        pageIndex: 1,
      });
      emit("change", page,'');
    };
    const handleCurrentChange = (val) => {
      if (!val) return;
      page.pageIndex = val;
      emit("change", page,'changPage');
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  width: 100%;
}
</style>

```

### 使用方法
```js
 <XdPagination
  :pageInfo="pageInfo"
  :pageSizes="pageSizes"
   @change="changePage"
/>
export default {
    setup() {
        const state = reactive({
            pageInfo: {
                pageNumber: 10,
                pageIndex: 1,
                total: 0
            },
            pageSizes:[10, 20, 50, 100]
        }) 
        const changePage = (val) => {
            // val 更改的pageNumber,pageIndex
        };
    }
}
```

### 属性

| 属性      | 说明                                                         | 类型   | 可选值 | 默认值                                   |
| --------- | ------------------------------------------------------------ | ------ | ------ | ---------------------------------------- |
| pageSizes | 每页显示个数选择器的选项设置                                 | array  | ——     | [10, 20, 50, 100]                        |
| pageInfo  | pageNumber：每页条目个数<br />pageIndex：当前页<br />total：总数 | object | ——     | { pageNumber: 10,pageIndex: 1, total: 0} |

### 事件

| 事件名 | 说明                | 参数 |
| ------ | ------------------- | ---- |
| change | 页码/当前页更改触发 | ——   |

