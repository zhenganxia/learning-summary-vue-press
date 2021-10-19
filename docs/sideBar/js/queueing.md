### javascript单线程与事件循环
JavaScript 是单线程语言。在浏览器中，当JS代码被加载时，浏览器会为其分配一个主线程来执行任务，主线程会在栈中创建一个全局执行环境 （全局作用域）。每当有一个函数进入执行流时，就会形成一个对应的执行环境（函数作用域），并将该执行环境压入栈中。每当一个函数执行完毕以后，对应的执行环境就会从栈中弹出，然后被销毁。这就是执行环境栈，执行环境栈的作用就是保证所有的函数能按照正确的顺序被执行。

但在浏览器中，有一些任务是非常耗时的，比如 aj  ax请求、定时器、事件等。为了保证主线程上的任务不被阻塞，JavaScript 内部维护了一个任务队列， 当这些耗时任务结束时（Ajax 请求返回、定时器超时、事件被触发），就将对应的回调函数插入队列中进行等待。这些任务的执行时机并不确定，只有当所有同步任务执行完毕后，执行环境栈被清空（栈底的全局执行环境会一直存在，直到进程退出）以后，然后再从任务队列中依次读取回调函数，并将其压入执行环境栈中。于是，主线程开始执行新的同步任务，执行完毕后再从栈中弹出，栈被清空。

主线程从任务队列中读取任务是不断循环的，每当栈被清空后，主线程就会从任务队列中读取新的任务并执行，如果没有新的任务，就会一直等待，直到有新的任务。JavaScript 的这种执行机制就叫做任务循环。因为每个任务都由一个事件所触发，所以也叫 “事件循环”。

### 宏队列：包括整体代码script，setTimeout，setInterval,I/O(文件读写、数据库读写),UI rendering

### 微队列：Promise.then(非new Promise),process.nextTick(node中),await,Object.observe, MutationObserver

#### 宏队列和微队列的执行顺序
先执行同步代码，遇到异步宏任务则将异步宏任务放入宏任务队列中，遇到异步微任务则将异步微任务放入微任务队列中，当所有同步代码执行完毕后，再将异步微任务从队列中调入主线程执行，微任务执行完毕后再将异步宏任务从队列中调入主线程执行，一直循环直至所有任务执行完毕。
```js
setTimeout(() => {
 console.log('set1')   
});
var p1 = new Promise(function(resolve, reject) {
    resolve('promise1')
})
setTimeout(() => {
    console.log('set2')
});
p1.then(() => {
    console.log('then1')
})
console.log(2)
```
宏任务['set1','set2']<br/>
微任务['then1']<br/>
同步['promise1',2]<br/>
执行顺序 'promise1',2,'then1','set1','set2'<br/>
注意执行微任务，空了以后执行宏任务set1，然后查看微任务如果空了就执行下一个宏任务，如果这时还有微任务继续执行完微任务再继续执行下一个宏任务

```js
setTimeout(()=>{//宏任务
  new Promise(resolve =>{
  	resolve();
  }).then(()=>{
  	console.log('test');//宏任务中的微任务
  });

  console.log(4);//宏任务
});

new Promise(resolve => {//微任务
  resolve();
  console.log(1)//同步任务
}).then( () => {
  console.log(3);//微任务
  Promise.resolve().then(() => {
    console.log('before timeout');//微任务
  }).then(() => {
    Promise.resolve().then(() => {
      console.log('also before timeout')//微任务
    })
  })
})
console.log(2);//同步任务

```
遇到setTimeout，异步宏任务，将() => {console.log(4)}放入宏任务队列中；<br/>
遇到new Promise，new Promise在实例化的过程中所执行的代码都是同步进行的，所以输出1；<br/><br/>
而Promise.then中注册的回调才是异步执行的，将其放入微任务队列中<br/>
遇到同步任务console.log(2)，输出2；主线程中同步任务执行完<br/>
从微任务队列中取出任务到主线程中，输出3，此微任务中又有微任务，Promise.resolve().then(微任务a).then(微任务b)，将其依次放入微任务队列中；<br/>
从微任务队列中取出任务a到主线程中，输出 before timeout；<br/>
从微任务队列中取出任务b到主线程中，任务b又注册了一个微任务c，放入微任务队列中；<br/>
从微任务队列中取出任务c到主线程中，输出 also before timeout；微任务队列为空<br/>
从宏任务队列中取出任务到主线程，此任务中注册了一个微任务d，将其放入微任务队列中，接下来遇到输出4，宏任务队列为空<br/>
从微任务队列中取出任务d到主线程 ，输出test，微任务队列为空