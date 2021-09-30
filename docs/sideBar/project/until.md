### 判断两个数组是否完全相同 a:[1,2,3] b:[1,7,8]
```js
export function isArrayEqual(a, b) {
    const c = [...new Set([...a, ...b])].length
    return c === a.length && c === b.length
}
```

### 判断两个对象数组的key是否完全相同 a:[{user:1,name:2}] b:[{user:1,name:2}]
```js
export function isObjArrayEqual(arr1, arr2, key) {
    let a = arr1
    let b = arr2
    if (key) {
        a = arr1.map(item => item[key])
        b = arr2.map(item => item[key])
    }
    return isArrayEqual(a, b)
}
```

### es5中-处理obj.name,obj为null时处理报错

```js
export function getNestedObject(nestedObj, pathArr) {
    return pathArr.reduce(function (obj, key) {
        return obj && obj[key] !== 'undefined' ? obj[key] : null
    }, nestedObj)
}
// 使用方法 判断对象row中upDownStatus.value为null时不报错
this.getNestedObject(row, ['upDownStatus', 'value'])
```

### 深层复制（数组/对象/map）
```js
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
        if (Object.prototype.hasOwnProperty.call(source, keys)) {
            const isNotSpecial = !(source[keys] instanceof Map)
            if (source[keys] && typeof source[keys] === 'object' && isNotSpecial) {
                targetObj[keys] = source[keys].constructor === Array ? [] : {}
                targetObj[keys] = deepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        }
    }
    return targetObj
}
```

### 判断为空（字符串/对象/数组）
```js
export function isEmpty(value) {
    if (typeof value === 'string') {
        return value.trim() === ''
    }

    if (value === undefined || value === null) {
        return true
    }

    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.length === 0
        } else {
            return JSON.stringify(value) === '{}'
        }
    }

    return false
}
```