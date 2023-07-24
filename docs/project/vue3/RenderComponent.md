### render渲染
### 封装内容
```vue
<template>
  <div :render="render" :row="row" :index="index" :column="col"></div>
</template>

<script>
export default {
  name: "RenderComponent",
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    return () => {
      const params = {
        row: props.row,
        index: props.index,
      };
      if (props.column) params.column = props.column;
      return props.render(params);
    };
  },
};
</script>

<style></style>
```
```vue
<template v-for="col in columns" :key="col.key">
    <el-table-column> 
        <template #default="scope">
            <RenderComponent
                :render="col.render"
                :row="scope.row"
                :index="scope.$index"
                :column="col"
            />
        </template>
    </el-table-column>
</template>
```

### 属性

| 属性   | 说明       | 类型     | 可选值 | 默认值 |
| ------ | ---------- | -------- | ------ | ------ |
| row    | 行数据     | object   | ——     | ——     |
| column | 列数据     | object   | ——     | ——     |
| render | render函数 | function | ——     | ——     |
| index  | 索引       | number   | ——     | ——     |

