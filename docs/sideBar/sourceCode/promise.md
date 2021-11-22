[promise/a+规范](https://promisesaplus.com/)
## 基础源码
```js
// 源码文件示例：promis.js
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
            if(this.status === pending) {
                // 只有pending可以更改状态，成功、失败都不可以更改状态
                this.status = fulfilled
                this.value = value
                // promise中异步情况下调用
                this.onResolveCallbacks.forEach(fn=>fn())
            }
        } 
        // 失败执行的函数
        const reject = (reason) =>{
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
测试：testPromise.js
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

## 链式调用实现
### 实现
实现then每次都操作新的状态不影响上一次then的结果，所以每次执行then返回一个新的promise2
#### 如果then中返回普通值
```js
then() {
    return 100
}
```
```js
then(onFulfilled,onRejected) {
    let promise2 = new Promise((resolve, reject)=>{
        if(this.status === fulfilled) {
          let x = onFulfilled(this.value)
          resolve(x)
        }
        if(this.status === rejected) {
           let x = onRejected(this.reason)
           resolve(x)
        }
        if(this.status === pending) {
            this.onResolveCallbacks.push(()=>{
               let x = onFulfilled(this.value)
               resolve(x)
            })
            this.onRejecteCallbacks.push(()=>{
                let x = onRejected(this.reason)
                resolve(x)
            })
        }
    })
    return promise2
}
```
#### 如果then中抛错
```js
then() {
    return throw Error('错误')
}
```
```js
then(onFulfilled,onRejected) {
    let promise2 = new Promise((resolve, reject)=>{
        if(this.status === fulfilled) {
            try {
                let x = onFulfilled(this.value)
                resolve(x)
            } catch(error) {
                // 处理错误信息
                reject(error)
            }
        }
        if(this.status === rejected) {
            try {
                let x = onRejected(this.reason)
                resolve(x)
             } catch(error) {
                reject(error)
            }
        }
        if(this.status === pending) {
            this.onResolveCallbacks.push(()=>{
                try {
                    let x = onFulfilled(this.value)
                    resolve(x)
                } catch(error) {
                    reject(error)
                }
            })
            this.onRejecteCallbacks.push(()=>{
                try {
                    let x = onRejected(this.reason)
                    resolve(x)
                 } catch(error) {
                    reject(error)
                }    
            })
        }
    })
    return promise2
}
```
#### then中返回promise使用resolvePromise处理：
```js
then() {
    return new Promise().then().then().then(res=>{console.log(res)})
}
```

```js
then(onFulfilled,onRejected) {
    // 为解决多个空then调用，最后一个then获取值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v
    onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err}
    let promise2 = new Promise((resolve, reject)=>{
        if(this.status === fulfilled) {
            // 使用异步是为了resolvePromise中可以拿到promise2（每次实例化完成）
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value)
                    resolvePromise(x, promise2, resolve, reject);
                } catch(error) {
                    reject(error)
                }
            }, 0);
        }
        if(this.status === rejected) {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason)
                    resolvePromise(x, promise2, resolve, reject);
                } catch(error) {
                    reject(error)
                }
            }, 0);
        }
        if(this.status === pending) {
            this.onResolveCallbacks.push(()=>{
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject);
                    } catch(error) {
                        reject(error)
                    }
                }, 0);
            })
            this.onRejecteCallbacks.push(()=>{
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject);
                    } catch(error) {
                        reject(error)
                    }    
                }, 0);
            })
        }
    })
    return promise2
}
```
:::tip
resolvePromise处理返回promise情况：<br/>
1.对于then中返回promise中有嵌套promise的情况，需要递归解析数据为普通值<br/>
2.对于返回值x，为了保证成功和失败都值能调用一种状态，需要使用called来标识<br/>
3.判断是否返回的promise：<br/>
  - 返回值为object/function<br/>
  - x.then是否是一个方法（then中有可能使用的其他基于promise包装的方法，但是并不是使用function实现的这时会报错
，所以需要try catah 处理）<br/>

:::

#### resolvePromise方法
```js
function resolvePromise(x, promise2, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("循环使用"));
  }
  if ((typeof x === "object" && typeof x !== null) || typeof x === "function") {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析直到y为普通值
            resolvePromise(y, promise2, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 没有then方法执行这里，返回普通值
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // then返回非promise，例如return 100
    resolve(x);
  }
}
```

### 完整代码
```js
源码示例：promise.js
const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected";
/**
 *
 * @param {promise} x // then中成功或者失败的结果
 * @param {promise} promise2 // then中返回新的promise
 * @param {fuction} resolve // promise2的resolve方法
 * @param {fuction} reject // promise2的reject方法
 * @returns
 */
function resolvePromise(x, promise2, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("循环使用"));
  }
  // 判断then中返回的结果是否是promise
  // 1.then返回结果x是对象/方法
  // 2.并且包含then方法（判断then是方法，由于其他人可以通过其他方式实现then，直接获取有可能报错）
  if ((typeof x === "object" && typeof x !== null) || typeof x === "function") {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析直到y为普通值
            resolvePromise(y, promise2, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 没有then方法执行这里，返回普通值
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // then返回非promise，例如return 100
    resolve(x);
  }
}

class Promise {
  constructor(exector) {
    this.status = "pending";
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onResolveCallbacks = []; // promise中异步状态为pending时使用
    this.onRejecteCallbacks = [];
    // 成功执行函数
    const resolve = (value) => {
      if (this.status === pending) {
        // 只有pending可以更改状态，成功、失败都不可以更改状态
        this.status = fulfilled;
        this.value = value;
        // promise中异步情况下调用
        this.onResolveCallbacks.forEach((fn) => fn());
      }
    };
    // 失败执行的函数
    const reject = (reason) => {
      if (this.status === pending) {
        this.status = rejected;
        this.reason = reason;
        // promise中异步情况下调用
        this.onRejecteCallbacks.forEach((fn) => fn());
      }
    };
    try {
      exector(resolve, reject);
    } catch (error) {
      // 错误情况有两种一种是调用reject（）一种是执行方法报错
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // 链式调用需要递归调用Promise,为了不影响上一个then的状态，每次调用then都要返回一个新的promise可以调用成功或者失败的状态
    // 调用下一个then的onRejected有两种情况：1.当前onFulfilled中返回错误信息 2.throw Error（）
    //3.排除1，2情况都走下个then的onFulfilled方法(1.当前onFulfilled中返回正确信息 2.onFulfilled返回非promise方法（例如常数-return 100） 3.挡墙promise就报错)

    // 解决then链式调用为空的情况then().then().then(data=>{console.log('3333',data)})
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v
    onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err}
    let promise2 = new Promise((resolve, reject) => {
      // 需要then中的结果向下传递
      if (this.status === fulfilled) {
        setTimeout(() => {
          // 使用异步是为了resolvePromise中可以拿到promise2（每次实例化完成）
          try {
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            // 上一个then throw Error(）情况
            reject(error);
          }
        }, 0);
      }
      if (this.status === rejected) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      // promise中异步情况 状态为pending
      if (this.status === pending) {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejecteCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}
module.exports = Promise;
```
```js
测试示例testPromise.js
const Promise = require("./promise.js");
const p1 = new Promise((resolve, reject) => resolve());
const p2 = p1.then(() => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve('成功1')
                },2000)
            }))
        },1000)
    })
  }
)
p2.then((data)=>{
    console.log(data)
},error=>{
    console.log(error)
})


new Promise((resolve,reject)=>{
    reject('err')
}).then().then().then(data=>{
    console.log('3333',data)
},error=>{
    console.log('888',error)
})
```
### 测试手写promis.js是否符合规范
- npm i promises-aplus-tests -g
- promises-aplus-tests promise.js（进入promise路径下执行下边命令）