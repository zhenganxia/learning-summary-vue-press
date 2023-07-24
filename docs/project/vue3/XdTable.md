### 表格
>+ 支持插槽渲染和render两种方式 
>+ 支持element-plus属性和方法
<!-- <div id="table">
    <el-table :data="tableData" id="elTable">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>
</div>
<script type="text/javascript">
new Vue({
    el:'#table',
    data:{
        tableData :[
            {
                date: '2016-05-03',
                name: '张三',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: '李四',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: '王五',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: '白色',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]
    },
})
</script> -->
### 封装内容
```vue
<template>
  <div class="table-content">
    <el-table
      :data="tableData"
      ref="tableInfoRef"
      style="width: 100%"
      v-bind="$attrs"
      row-key="key"
    >
      <el-table-column align="center" :type="type" v-if="type" width="55" />
      <template v-for="col in columns" :key="col.key">
        <el-table-column
          :label="col.label"
          :width="col.width || col.minWidth"
          :align="columnsAlign"
          :fixed="col.fixed"
          :sortable="col.sortable"
        >
          <template #header>
            {{ col.label }}
            <slot :name="col.key + `-header`"> </slot>
          </template>
          <template #default="scope">
            <!-- render数据 -->
            <div v-if="col.render">
              <RenderComponent
                :render="col.render"
                :row="scope.row"
                :index="scope.$index"
                :column="col"
              />
            </div>
            <!-- 使用插槽渲染列表 -->
            <slot
              v-else-if="col.slot"
              :index="scope.$index"
              :custom-column="col"
              :name="col.slot"
              :row="scope.row"
            >
            </slot>
            <!-- 非插槽/非render内置属性 -->
            <template v-else>
              <!-- 图片目前是宽度80高度自适应可改为动态传参 -->
              <div v-if="col.isImage" style="width: 80px">
                <img
                  :src="scope.row[col.key]"
                  style="width: 100%; height: auto"
                />
              </div>
              <a
                :href="scope.row[col.linkUrl]"
                class="link"
                target="_blank"
                v-else-if="col.isLink"
                >{{ scope.row[col.key] }}</a
              >
              <el-tooltip
                v-else-if="col.tooltip"
                style="margin: 4px"
                effect="dark"
                placement="bottom"
                :content="scope.row[col.key]"
              >
                <span>{{ tooltipText(scope.row, col.key) }}</span>
              </el-tooltip>
              <span v-else>
                {{ scope.row[col.key] }}
              </span>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { nextTick, onMounted, ref } from "vue";
import { deepClone } from "@/utils/tool";

export default {
  name: "XdTable",
  props: {
    tableData: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    dragDate:{
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    columns: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    type: {
      // 复选框或者索引类型
      type: String,
      default: "",
    },
    columnsAlign: {
      // 表格对齐方式
      type: String,
      default: "center",
    },
    animation: {
      // 拖拽的过渡
      type: Number,
      default: 100,
    },
    handle: {
      // 拖拽表格父级加class要和handle传参保持一致
      type: String,
    },
    dragDateDisabled:{
      type: Object,
      required: false,
      default: () => {
        return {
          name:'' ,// 禁止拖拽参数-用于回退数据
          valid:'' //禁用值 
        };
      },
    }
  },
  setup(props, { emit }) {
    onMounted(() => {
      nextTick(() => {
        setSort();
      });
    });

    const tableInfoRef = ref(null);
    const setSort = () => {
      if (!props.handle) return;
      // 通过class（props.handle）找到要排序的表格位置
      const tbody = document.querySelector(
        `.${props.handle} .el-table__body-wrapper tbody`
      );
      var ops = {
        animation: props.animation,
        // 过滤器，不需要进行拖动的元素
        filter: ".ignore-elements",  
        // 禁止拖拽元素被选中
        onFilter: function () {
          emit('onFilter')
        },
        //拖动结束
        onEnd: function (evt) {
          const newIndex = evt.newIndex
          const oldIndex = evt.oldIndex
          //获取拖动后的排序
          let dragTable =deepClone(props.dragDate) || []
          const newValue = dragTable[newIndex]
          let newDragData = dragTable
          const dragDisabledName = props.dragDateDisabled?.name
          const dragDisabledValid = props.dragDateDisabled?.valid
          const newDragDisabled = newValue[dragDisabledName]
          if(dragDisabledName &&(( newDragDisabled === dragDisabledValid))) {
            // 当前拖拽位置是禁用拖拽数据位置-用来回滚数据使用
            const item = dragTable.splice(newIndex, 1)[0];
             dragTable.splice(oldIndex, 0, item);
             // 复原拖拽之前的 dom
             const tagName = evt.item.tagName;
             const items = evt.from.getElementsByTagName(tagName);
             if (evt.oldIndex > evt.newIndex) {
               evt.from.insertBefore(evt.item, items[evt.oldIndex+1]);
             } else {
               evt.from.insertBefore(evt.item, items[evt.oldIndex]);
             }
             emit('onFilter',dragTable)
          } else {
            newDragData.splice(newIndex, 0, newDragData.splice(oldIndex, 1)[0]);
            var newArray = newDragData.slice(0);
            newDragData = [];
            emit("dragEnd", newArray);
          }          
        },
      };
      Sortable.create(tbody, ops);
    };
    const tooltipText = (text, key) => {
      const value = text[key];
      if (value && value.length > 14) {
        return value.substring(0, 14) + "……";
      }
      return value;
    };
    return {
      setSort,
      tableInfoRef,
      tooltipText,
    };
  },
};
</script>

<style scoped lang="scss">
.table-content {
  margin: 10px;
  .pagination {
    display: flex;
    justify-content: center;
  }
  &:deep(.el-table__fixed-right)   {
    height: 100% !important; // 右侧固定没有数据高度撑开高度
  }
}
</style>

```
### 使用方法
```js
<XdTable
    :tableData="tableData"
    :columns="columns"
    border
    :row-class-name="tableRowClassName"
  > 
    <template #enterpriseId-header><el-icon><plus /></el-icon></template>
    <template #enterpriseId="{ row ,index}">
          {{ row.name }} 
    </template>
     <template #action="{ row }">
       <el-button>查看</el-button>
    </template>
</XdTable>
import {h} from 'vue'
export default {
    setup() {
        let state = reactive({
            tableData:[
                {name:'lili',age:'18',projectNumber:'projectNumber'}
            ],
            columns: [
                {
                  label: "企业",
                  key: "name",
                  slot: "name",
                },
                 {
                  label: "图片",
                  key: "url",
                  isImage: true // 渲染图片
                },
                {
                  label: "关联权益项数量",
                  key: "projectNumber",
                  minWidth: 200,
                  render: (params) => {
                    return h(
                      "div",
                      {
                        style: {
                          height: "20px",
                          cursor: "pointer",
                        },
                        onClick: () => {
                          event(params.row);
                        },
                      },
                      params.row.projectNumber
                    );
                  },
                },
                {
                  label: "操作",
                  fixed: "right",
                  align: "center",
                  slot: "action",
                }
            ]
        })
        const event = (row)=>{
            // 处理事件
        },
        const tableRowClassName = ({
          row,
        }) => {
          if (true) {
            // 条件
            return 'ignore-elements'
          }
          return ''
        }
    }
}
```

### 属性

| 属性         | 说明                                                      | 类型   | 可选值                     | 默认值 |
| ------------ | --------------------------------------------------------- | ------ | -------------------------- | ------ |
| tableData    | 表格数据                                                  | array  | ——                         | ——     |
| columns      | 表头数据                                                  | array  | ——                         | ——     |
| animation    | 表格拖拽过渡                                              | number | ——                         | 100    |
| handle       | 表格拖拽标识（拖拽表格父级加class要和handle传参保持一致） | string | ——                         | ——     |
| type         | 对应列的类型                                              | string | selection / index / expand | ——     |
| columnsAlign | 对齐方式                                                  | string | left / center / right      | center |
| dragDateDisabled | 禁止拖拽数据信息| object | { name:'' ,// 禁止拖拽参数-用回退数据valid:'' //禁用值 } |  ——   |
| dragDate | 拖拽数据| object | —— |  ——   |

### column-内置属性

| 属性           | 说明                     | 类型             | 可选值                  | 默认值 |
| -------------- | ------------------------ | ---------------- | ----------------------- | ------ |
| render         | render函数               | function         | ——                      | ——     |
| width/minWidth | 宽度                     | number           | ——                      | ——     |
| fixed          | 列是否固定在左侧或者右侧 | string / boolean | true / 'left' / 'right' | ——     |
| isImage        | 是否渲染图片             | boolean          | true/false              | ——     |
| isLink         | 渲染链接                 | boolean          | true/false              | ——     |
| tooltip        | 文字提示                 | boolean          | true/false              | ——     |
| sortable       | 对应列是否可以排序       | boolean / string | true / false / 'custom' | ——     |

### 事件

| 事件名 | 说明                | 参数 |
| ------ | ------------------- | ---- |
| onFilter | 拖拽禁用数据触发方法（列表行需要加类.ignore-elements） | ——   |
| dragEnd | 拖拽结束触发方法 | ——   |
### 插槽

| 插槽名 | 说明                                   |
| ------ | -------------------------------------- |
| header | 自定义表头的内容（\#当前列key-header） |



### 备注：支持插槽渲染和render两种方式