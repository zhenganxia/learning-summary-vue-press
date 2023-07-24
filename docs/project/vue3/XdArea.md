### 地区联动组件
>地区下拉为省市县默认有全部选项，值为‘all’,
<!-- <div id="pagination">
    <el-select v-model="state.modalParams.ownerProvinceCode"  @change="provinceControl"  placeholder="省"  size="large">
        <el-option
            v-for="item in state.provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @change="provinceControl()"
    />
    </el-select>
    <el-select v-model="state.modalParams.ownerCityCode"  @change="provinceControl"  placeholder="市"  size="large">
        <el-option
            v-for="item in state.cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @change="cityControl()"
    />
    </el-select>
     <el-select v-model="state.modalParams.ownerDistrictCode"  @change="provinceControl"  placeholder="区"  size="large">
        <el-option
            v-for="item in state.districtList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
    />
    </el-select>
</div>
<script type="text/javascript">
    new Vue({
        el:'#pagination',
        data(){
            return {
                value:'',
                isAllCity:false,
                isAllProvince:true,
                isAllCity:false,
                isAllDistrict:false,
                state : {
                    loading:false,
                    districtLoading:false,
                    provinceList:[
                        {
                            id: 1,
                            name: '河北',
                        }
                    ],
                    cityList:[],
                    districtList:[],
                    modalParams:{
                        ownerProvinceCode:undefined,
                        ownerCityCode:undefined,
                        ownerDistrictCode:undefined
                    }
                }
            }
        },
        methods:{
        provinceControl (id=1) {
            if(id===1) {
                setTimeout(()=>{
                     this.state.cityList = [
                    {
                        name:'保定',
                        id:3
                    }
                ]
                 this.state.districtList = [
                    {
                        name:'衡水',
                        id:8
                    }
                ]
                },0)
            }
        },
        cityControl() {}
    }
    })
</script> -->
### 封装内容
```vue
<template>
  <el-date-picker v-model="datePicker" type="datetimerange" placeholder="请选择时间：" style="width: 100%"
    :disabled-date="disabledDate" v-bind="$attrs" value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime"
    :unlink-panels="true" />
</template>

<script>
export default {
  name: "XdDateTimeRange",
};
</script>
<script setup>
import {
  onMounted,
  nextTick,
  computed,
  defineProps,
  defineEmits,
  inject,
  ref,
  defineExpose
} from "vue";
import { formatDate } from "@/utils/tool";

const $filter = inject("Filter");
const props = defineProps({
  modelValue: Array,
  month: [Number, String], // 按照月处理时间（负数-之前的时间 正数-之后时间）
  day: [Number, String], // 按照天处理时间（负数-之前的时间 正数-之后时间
  isRangeDisabled: { type: Boolean, default: false }, // 范围外时间是否置灰
  isDefaultTime: { type: Boolean, default: true }, // 初始化是否有回显时间
  customTime: { type: String, default: "" }, // 自定义基准时间
});

const emit = defineEmits(["update:modelValue"]);
const datePicker = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});

const defaultTime = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])

// 时间基准如果没有，默认今天
let freeTime = ref();
freeTime.value = props.customTime
  ? `${props.customTime}`
  : `${$filter.formatTime(new Date()).split(' ')[0]}`

// 按照月份调整时间，负数-开始时间之前时间，正数-当前时间之后时间
function rangeMonthTime() {
  const date = formatDate(freeTime.value, 0);
  let [year, month, day] = date.split("-");
  let newMonth = parseInt(month) + parseInt(props.month);

  // props.month为正跨年处理
  if (newMonth > 12) {
    year =
      parseInt(year) +
      parseInt(parseInt(newMonth) / 12 === 0 ? 1 : parseInt(newMonth) / 12);
    newMonth = parseInt(newMonth) % 12;
  }

  // props.month为负跨年处理
  if (newMonth <= 0) {
    year =
      parseInt(year) -
      parseInt(newMonth / 12 === 0 ? 1 : parseInt(newMonth) / 12);
    newMonth = 12 - (Math.abs(newMonth) % 12);
  }

  //新月份天数
  const newDays = new Date(year, newMonth, 0).getDate();
  day = Number(day) > newDays ? newDays : Number(day);
  newMonth = newMonth < 10 ? `0${newMonth}` : newMonth;
  day = day < 10 ? `0${day}` : day;
  return `${year}-${newMonth}-${day}`;
}

// 按照天计算，负数- 开始时间之前时间，0当天时间， 正数-开始时间之后的时间
const rangeDayTime = () => {
  const num = Number(props.day);
  const date = new Date(freeTime.value);
  const dateNumber = date.getTime();
  const differ = num * 24 * 60 * 60 * 1000;
  const needDateNumber = new Date(dateNumber + differ);
  const year = needDateNumber.getFullYear();
  const month = needDateNumber.getMonth() + 1;
  const day = needDateNumber.getDate();
  const monthX = month < 10 ? `0${month}` : month;
  const dayX = day < 10 ? `0${day}` : day;
  return `${year}-${monthX}-${dayX}`;
};

// 时间插件默认事件范围
const getDefaultTime = () => {
  const time = props.month ? rangeMonthTime() : rangeDayTime();
  const times = (props.day || props.month) > 0
    ? [`${freeTime.value} 00:00:00`, `${time} 23:59:59`]
    : [`${time} 00:00:00`, `${freeTime.value} 23:59:59`];
  nextTick(() => {
    // 更新时间插件v-model值
    emit("update:modelValue", times);
  });
};


onMounted(() => {
  props.isDefaultTime && getDefaultTime()
});

// 时间插件置灰范围
const disabledDate = (time) => {
  if (!props.isRangeDisabled) return;
  const changeTime = props.month ? rangeMonthTime() : rangeDayTime();
  const timeStamp = +new Date(changeTime);
  const currentTime = +new Date(freeTime.value) || Date.now();
  if (props.day || props.month > 0) {
    return (
      time.getTime() < currentTime - 86400000 || time.getTime() > timeStamp
    );
  } else {
    return (
      time.getTime() < timeStamp - 86400000 || time.getTime() > currentTime
    );
  }
};

defineExpose({ getDefaultTime });
</script>
<style lang="less">
.el-overlay {
  overflow: hidden;
}
</style>
```

### 使用方法
```js
<XdArea v-model="ruleForm.ownerProvinceCode"></XdArea>
```

| 属性          | 说明                   | 类型    | 可选值     | 默认值                                |
| ------------- | ---------------------- | ------- | ---------- | ------------------------------------- |
| isAllDistrict | 是否展示区下拉框中全部 | boolean | true/false | true                                  |
| isAllCity     | 是否展示市下拉框中全部 | boolean | true/false | true                                  |
| isAllProvince | 是否展示省下拉框中全部 | boolean | true/false | true                                  |
| defaultStyle  | 设置下拉样式           | object  | ——         | {width: '150px',marginRight: '10px',} |

