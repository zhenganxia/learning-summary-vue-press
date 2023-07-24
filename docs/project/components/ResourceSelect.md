```vue
 <SlResourceSelect
    v-model="selectValue"
    :disabled="!form.categoryId"
    :option="options"
    :request="request"
    filterable
    multiple
    ref="select"
    placeholder="请选择"
/>
```

```js
computed: {
    request() {
        return TitleDescriptionApi.titleDescriptionInfo()
    }
}
```



#### Attributes

| 参数        | 说明                                            | 类型          | 可选值 | 默认值 |
| ----------- | ----------------------------------------------- | ------------- | ------ | ------ |
| selectValue | 父组件v-model绑定值                             | number/array  | -      | -      |
| request     | 传入下拉数据接口方法,需要直接接口获取数据时使用 | promise       | -      | -      |
| name        | 下拉绑定label默认值                             | string        | -      | name   |
| id          | 下拉绑定默认value                               | string/number | -      | id     |
| options     | 直接传入数组，下拉框数据                        | arrary        | -      | -      |


**组件使用时可正常使用element属性和方法**