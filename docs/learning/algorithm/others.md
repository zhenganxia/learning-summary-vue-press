### 二分查找
```js
function binarySearch(arr,left,right,findVal) {
  if(left > right ) {
    return -1
  }
  const mid = Math.floor((left+right)/2)
  const midValue = arr[mid]
  if(findVal > midValue) {
    return binarySearch(arr,mid+1,right,findVal)
  } else if(findVal < midValue) {
    return binarySearch(arr,left,mid-1,findVal)
  } else {
    return mid
  }
}
const searchResult = binarySearch(arr2,0,arr2.length,1)
console.log('searchResult',searchResult)
```

### 斐波那契
```js
function fibo(num) {
  if(num <= 1) return num
  return fibo(num-1) + fibo(num-2)
}
console.log('fibo',fibo(3))
```

### 数组展开去重并且按照升序输出结果：[1,  2, 3,  4,  5,  6, 7,  8, 9, 10, 11, 12,13, 14]
```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ],
10]
const obj = {}
const sortArr = []

function sortFn(arr) {
  arr.forEach(key => {
    if(Array.isArray(key)) {
      sortFn(key)
    }else {
      if(!obj[key]) {
        sortArr.push(key)
        obj[key] = true
      }
    }
  })
}
sortFn(arr)
const result = sortArr.sort((a,b)=>a-b)
console.log('result',result)
```
```js
const sortArr1 = Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
console.log('sortArr1',sortArr1)
```