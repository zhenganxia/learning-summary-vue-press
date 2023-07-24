## Poptip 气泡
:::tip
+ 功能描述：列表嵌套气泡，点击启用，展示气泡，点击气泡中取消按钮手动关闭气泡
+ 重点：ref需要绑定动态参数   :ref="row.examNo"
:::

#### 手动控制poptip消失
```vue
<template slot="action" slot-scope="{ row }"  >
    <Poptip transfer :ref="row.examNo">
        <Button type="text" @click="showPop(row)">启用</Button>
        <template #content> 
            <Button  type="default" style="margin-left:20px" @click="closePop(row)">取消</Button>
        </template>
    </Poptip>
</template>
<script>
methods:{
    closePop(row){
        this.$refs[row.examNo].handleClose();
    },
}
</script>
```
## iview 如何根据条件动态校验Form
#### 选择类型为3，学学生非必填
```js
<template>
  <Form :model="params" :rules="rules" ref="params" :label-width="120">
      <FormItem 
          label="类型：" 
          prop="type"  
      >
          <Select v-model="params.type">
            <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.value }}</Option>
          </Select>
       </FormItem>
      <FormItem 
          label="学生：" 
          prop="student"  
          :rules="params.type === 3? rules.student: [{ required: false }]"
       >
          <Select v-model="params.student">
            <Option v-for="item in studentList" :value="item.code" :key="item.code">{{ item.value }}</Option>
          </Select>
        </FormItem>
  </Form>
</template>

export default {
    data() {
    return {
      params：{
        student:'',
        type:'' 
      },
      studentList: [
        {
          code: 1,
          value: 'lili',
        },
        {
          code: 2,
          value: 'liming',
        },
        {
          code: 3,
          value: 'wanglie',
        },
      ],
      typeList: [
        {
          code: 1,
          value: '党员',
        },
        {
          code: 2,
          value: '团员',
        }
      ],
      rules:{
         type: [{ required: true, message: '请选择 type' }],
         student: [{ required: true, message: '请选择 student' }],
       }
    }
}
```
