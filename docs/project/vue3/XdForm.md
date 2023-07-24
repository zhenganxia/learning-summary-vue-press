## 表单
>支持element-plus属性和方法
<!-- <div id="form">
   <el-form :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="cancel">cancel</el-button>
    </el-form-item>
  </el-form>
</div>
<script type="text/javascript">
    new Vue({
        el:'#form',
        data(){
            return {
              form:{
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
              }
            }
        },
        methods:{
          onSubmit() {
            alert('是否提交')
          },
          cancel() {
            alert('取消成功')
          }
        }
    })
</script> -->
### 封装内容
```vue
<template>
  <div class="xd-form" :class="{ 'view-container': isText }">
    <el-form
      ref="ruleFormRef"
      :model="state.ruleForm"
      :rules="formRules"
      v-bind="$attrs"
      :label-width="`${labelWidth}px`"
    >
      <el-row :gutter="10">
        <el-col
          v-bind="!span?layout:{span:Number(span)}||{}"
          v-for="formItem in showFromItemData"
          :key="formItem.key"
        >
          <el-form-item :label="formItem.formLabel" :prop="formItem.key">
            <component
              :is="formItem.type?formItem.type:state.defaultType"
              :inline="true"
              v-model="state.ruleForm[formItem.key]"
              v-bind="formItem.props||{}"
              style="width:100%;"
            ></component>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="!isText">
        <el-button v-if="isSubmit" type="primary" @click="submitForm(ruleFormRef)">{{submitText}}</el-button>
        <el-button v-if="isReset" @click="resetForm(ruleFormRef)">{{resetText}}</el-button>
        <slot name="custom" />
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
export default {
  name: "XdForm"
};
</script>
<script  setup>
import {
  reactive,
  ref,
  defineProps,
  computed,
  defineEmits,
  defineExpose
} from "vue";

const props = defineProps({
  modelValue: {
    // XdForm应用组件v-model绑定参数
    type: Object,
    default: () => {
      return {};
    }
  },
  submitText: {
    type: String,
    default: "保存"
  },
  resetText: {
    type: String,
    default: "重置"
  },
  isReset: {
    // 是否展示重置按钮
    type: Boolean,
    default: false
  },
  isText: {
    // 文本格式展示
    type: Boolean,
    default: false
  },
  isSubmit: {
    // 是否展示保存按钮
    type: Boolean,
    default: true
  },
  formItemData: {
    // 需要渲染的from-item数据结构
    type: Array,
    default: () => {
      return [];
    }
  },
  formRules: {
    // 校验规则
    type: Object,
    default: () => {
      return {};
    }
  },
  layout: {
    // 响应式,不需要手动设置时默认值
    type: Object,
    default: () => {
      return {
        xs: 12, // <768 展示2列
        sm: 6, // >=768 展示4列
        md: 8, // >=992 展示3列
        lg: 8, // >=1200 展示3列
        xl: 6 // >=1920 展示4列
      };
    }
  },
  span: {
    // 手动控制表格一行展示几列
    type: [Number, String],
    default: undefined
  },
  labelWidth: {
    type: [Number, String],
    default: 80
  }
});

const state = reactive({
  defaultType: "el-input", // formItemData 如果没有指定渲染类型，默认渲染input
  ruleForm: {} // 表单数据
});

// 最终展示form-item处理
const showFromItemData = computed(() => {
  return props.formItemData.map(item => {
    if (!item.props) item["props"] = {};
    if (!item.props.placeholder) {
      const text =
        ["el-input"].includes(item.type) || !item.type ? "请输入" : "请选择";
      item.props["placeholder"] = `${text}${item.formLabel}`;
    }
    item["formLabel"] = `${item.formLabel}：`;
    return item;
  });
});

const ruleFormRef = ref();

const emit = defineEmits(["submitForm", "update:modelValue"]);

// 校验
const submitForm = async formEl => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      emit("submitForm", state.ruleForm);
    }
  });
};

// 取消校验
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};

// XdForm组件更新v-model绑定参数
state.ruleForm = computed({
  get: () => {
    return props.modelValue;
  },
  set: () => {
    emit("update:modelValue", state.ruleForm);
  }
});

defineExpose({ resetForm, submitForm });
</script>
<style lang="scss" scoped>
.xd-form {
  width: 100%;
}
</style>
  
```

### 使用方法
```js
<XdForm
    :formItemData="formItemData" 
    ref="formRef" 
    :formRules="formRules" 
    @submitForm="submitForm"
    v-model="formData"
    labelWidth="150"
  > 
  <template #custom>
    <el-button>除保存、重置以外自定义按钮,isText为true不展示</el-button>
  </template>
</XdForm>

export default {
    setup() {
     const validatorTimeTask = (rule, value, callback) => {
          if (!formRef.value.ruleForm.region) {
            callback(new Error("请选择任务有效性"));
          } else {
            callback();
          }
        };
        let state = reactive({
            formData:{}, // 表单绑定参数，回显需要更改这里
            formItemData: [
                {
                  key: "name",
                  formLabel: "Activity name", // 没有type默认为el-input
                },
                {
                  key: "region", // 需要保存参数
                  formLabel: "Activity zone",
                  type: "xd-select", // 需要渲染的组件-这里是自定义全局组件
                  props: { // 这里属性和element-plus  el-select属性保持一致
                    options: [
                      {
                        name: "lili",
                        id: 1
                      },
                      {
                        name: "liming",
                        id: 2
                      }
                    ]
                  }
                }
              ],
              formRules: {
                name: [
                  {
                    min: 3,
                    max: 5,
                    message: "Length should be 3 to 5",
                    trigger: ["blur", "change"]
                  }
                ],
                region: [
                  {
                    required: "true",
                    validator: validatorTimeTask, // 自定义校验
                    trigger: ["change"]
                  }
                ]
              }
            })
    }
}
```

### 属性

| 属性         | 说明                        | 类型          | 可选值 | 默认值                      |
| ------------ | --------------------------- | ------------- | ------ | --------------------------- |
| formItemData | 需要渲染的from-item数据结构 | array         | ——     | ——                          |
| formRules    | 校验规则-支持自定义校验     | object        | ——     | ——                          |
| labelWidth   | 当前form label-width        | number        | ——     | 120                         |
| isSubmit     | 是否展示保存按钮            | boolean       | ——     | true                        |
| isReset      | 是否展示重置按钮            | boolean       | ——     | false                       |
| isText       | 表格是否展示文本格式        | boolean       | ——     | false                       |
| resetText    | 重置按钮文本                | string        | ——     | 重置                        |
| submitText   | 保存按钮文本                | string        | ——     | 保存                        |
| layout       | 默认响应式布局              | object        | ——     | {xs:12,sn:6,md:8,lg:8,xl:6} |
| span         | 手动控制布局                | number/string | ——     | ——                          |
| labelWidth   | form-item  label宽度        | number/string | ——     | 80                          |

### formItemData 属性

| 属性      | 说明                                                 | 类型   | 可选值 | 默认值   |
| --------- | ---------------------------------------------------- | ------ | ------ | -------- |
| key       | 对应保存参数                                         | string | ——     | ——       |
| formLabel | 展示label                                            | string | ——     | ——       |
| type      | 当前form-item需要渲染成的组件类型                    | string | ——     | el-input |
| props     | 当前type对应类型需要属性（element-plus属性保持一致） | object | ——     | ——       |



### 方法

### 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| custom | 自定义按钮区域 |



### 备注：1.支持element-plus所有属性方法 2.placeholder如果值为空，有默认值 3. 两种格式：表格和文本格式