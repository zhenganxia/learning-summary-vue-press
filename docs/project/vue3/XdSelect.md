<!-- ### 选择器
>支持element-plus属性和方法 -->
<template>
    <div id="select">
        <el-select v-model="value" class="m-2" placeholder="请选择" size="large">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                value:'',
                options: [
                    {
                        id: 'Option1',
                        name: 'Option1',
                    },
                    {
                        id: 'Option2',
                        name: 'Option2',
                    }
                ] 
            }
        }
    }
</script>

### 使用方法
```js
 <XdSelect
    v-model="selectValue"
    :disabled="disabled"
    :options="options"
  ></XdSelect>
export default {
    setup() {
        let state = reactive({
            disabled: true, // 属性为element 属性
            options: []
        })
    }
}
```

#### 属性

| 属性         | 说明            | 类型                | 可选值 | 默认值 |
| ------------ | --------------- | ------------------- | ------ | ------ |
| selectValue  | v-model绑定参数 | string/number/array | ——     | ——     |
| label        | 选项的标签      | string              | ——     | name   |
| value        | 选项的值        | string/number       | ——     | id     |
| options      | 选择器数据      | array               | ——     | ——     |
| defaultStyle | 选择器样式      | object              | ——     | ——     |

### 备注： 内置element-select所有属性和方法，参考element-select使用方法

