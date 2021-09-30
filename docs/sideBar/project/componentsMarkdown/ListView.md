```vue
<SlListView 
    @gotoPage="gotoPage"
    @reset="reset"
    :paginationParams="page"
    :loading="loading"
    :isTopPagination="true"
>
    <div slot="search" ></div>
</SlListView>
```

```js
 Data：
    page: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
    }
Methods：
  gotoPage(pageSize = 10, pageIndex = 1) {
    HTTP.get('products/product-variant-offline-plan', {
        params: this.info
    })
    .then((res) => {
       Object.assign(this.page, { total, pageIndex: pageNum, pageSize }) // 更新total, pageIndex, pageSize
    })
  }
```

#### Attributes

| 参数            | 说明                                                 | 类型   | 可选值                 | 默认值                 |
| --------------- | ---------------------------------------------------- | ------ | ---------------------- | ---------------------- |
| isTopPagination | 是否展示表格上方分页                                 | bolean | true/false             | false                  |
| isPagination    | 是否展示表格下方分页                                 | bolean | true/false             | true                   |
| isRest          | 是否显示重置按钮                                     | bolean | true/false             | true                   |
| paginationParams           |更新页码参数(total,pageSIze,pageIndex)| object | —                      | —                      |
| pageSizes       | 每页显示个数选择器的选项设置                         | array  | [10, 20, 50, 100, 200] | [10, 20, 50, 100, 200] |
| loading         | 搜索按钮loding                                       | bolean | true/false             | false                  |
| isCenter        | 按钮和搜索框是否一列展示，默认右侧和搜索区域分行展示 | bolean | true/false             | false                  |
| btnStyle        | 自定义搜索和重置按钮的位置                           | object | -                      | {}                     |

#### Events

| 事件名   | 说明             | 参数                |
| -------- | ---------------- | ------------------- |
| reset    | 重置             | 重置页面中的条件    |
| gotoPage | 调用接口更新数据 | pageSize，pageIndex |

####  Slot

| name         | 说明                           | 参数 |
| ------------ | ------------------------------ | ---- |
| search       | 搜索区域（搜索按钮和重置按钮） | —    |
| operationBtn | 表格上方按钮区域               | —    |

