```js
// 源码文件：promisExector.js
const pending = 'pending'
const fulfilled = 'fulfilled'
const rejected = 'rejected'
class Promise {
    constructor(exector) {
        this.status = 'pending'
        this.value = undefined // 成功的值
        this.reason = undefined // 失败的原因
        this.onResolveCallbacks = [] // promise中异步状态为pending时使用
        this.onRejecteCallbacks = []
        // 成功执行函数
        const resolve = (value)=>{
            if(this.status === pending) { // 只有pending可以更改状态，成功、失败都不可以更改状态
                this.status = fulfilled
                this.value = value
                // promise中异步情况下调用
                this.onResolveCallbacks.forEach(fn=>fn())
            }
        } 
        // 失败执行的函数
        const reject = (reason) =>{x
            if(this.status === pending) {
                this.status = rejected
                this.reason = reason
                // promise中异步情况下调用
                this.onRejecteCallbacks.forEach(fn=>fn())
            }
        } 
        try {
            exector(resolve,reject)
        } catch (error) {
            // 错误情况有两种一种是调用reject（）一种是执行方法报错
            reject(error)
        }
        
    }
    then(onFulfilled,onRejected) {
      if(this.status === fulfilled) {
        onFulfilled(this.value)
      }
      if(this.status === rejected) {
        onRejected(this.reason)
      }
      // promise中异步情况 状态为pending
      if(this.status === pending) {
        this.onResolveCallbacks.push(()=>{
            onFulfilled(this.value)
        })
        this.onRejecteCallbacks.push(()=>{
            onRejected(this.reason)
        })
      }
    }
}
module.exports = Promise
```
```js
测试：promise.js
const Promise = require('./promisExector.js')
const promise = new Promise((resolve,reject)=>{
    resolve('ok')
})

promise.then(
(res)=>{
    console.log('res',res)
},
(error)=>{
    console.log('error',error)
})
```