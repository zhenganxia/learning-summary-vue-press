```vue
<SlTableInfo
    :tableData="tableData"
    :columns="columns"
    :multiple="true"
>
    <template #operation="{row}" class="operate">
        <el-button @click="cancel(row)" v-if="row.status.value===1" type="text">撤回</el-button>
    </template>
</SlTableInfo>
```

```js
columns: [
    {
        name: 'pid',
        label: 'PID',
        width: 100
    },
    {
        name: 'imageUrl',
        label: '图片',
        isImage: true,
        width: 150,
        height: 130,
        imagesParams: {
            width: 128,
            height: 128
        }
    },
    {
        name: 'operation',
        label: '操作',
        width: 110,
        className: 'align-top vertical-operation link-button',
        default: ''
    }
]
```

#### SlTableInfo  Attributes

| 参数            | 说明               | 类型    | 可选值            | 默认值 |
| :-------------- | :----------------- | :------ | :---------------- | :----- |
| tableData       | 表格数据           | array   | -                 | -      |
| columns         | 表头数据           | array   | -                 | -      |
| multiple        | 是否显示复选框     | boolean | false/true        | false  |
| showIndex       | 是否显示索引       | boolean | false/true        | false  |
| expand          | 是否下拉展示       | boolean | false/true        | false  |
| sortable        | 是否可拖拽         | boolean | false/true        | false  |
| border          | 是否显示边框       | boolean | false/true        | true   |
| sortableOptions | 需要拖拽的数据     | object  | -                 | -      |
| align           | 表格所有列对齐方式 | string  | center/left/right | left   |
| checkAllPages   | 所有页全选         | boolean | false/true        | false  |

#### Columns Attributes

| 参数         | 说明               | 类型    | 可选值                   | 默认值 |
| ------------ | ------------------ | ------- | ------------------------ | ------ |
| align        | 每列对齐方式       | string  | -                        | -      |
| width        | 每列宽度           | number  | -                        | -      |
| class-name   | 每列样式           | string  | -                        | -      |
| isImage      | 当前列是否展示图片 | boolean | false/true               | false  |
| imagesParams | 当前列图片参数     | object  | {width: 128,height: 128} | -      |
| headerAlign  | 表头对齐方式       | string  | center/left/right        | center |



#### Methods

| 方法名          | 说明               |
| :-------------- | :----------------- |
| clearSelection  | 清除复选框全选清除 |
| checkAll        | 复选框全选         |
| toggleSelection | 复选框是否全选切换 |
| showNormalInfo  |                    |
| setSort         | 表格拖拽           |

#### Slot

| name   | 说明                 |
| :----- | :------------------- |
| header | 自定义表头数据       |
| empty  | 自定义表格无数据内容 |


**组件使用时可正常使用element属性和方法**


