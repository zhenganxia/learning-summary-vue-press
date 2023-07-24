### express koa egg的区别
#### Express
事件：Express 使用普通的回调函数，一种线性的逻辑，在同一个线程上完成所有的 HTTP 请求
对象：只有Request 和 Response 
中间件：回调函数
异常处理：每一个回调都拥有一个新的调用栈，因此你没法对一个 callback 做 try catch 捕获，你需要在 Callback 里做错误捕获，然后一层一层向外传递。

##### Koa2
事件： Async/Await ，也无需引入第三方库，底层原生支持
对象：Request 、 Response 、Context 
中间件：洋葱模型-所有请求经过一个中间件都会执行两次，便于实现后置处理逻辑
异常处理：使用try-catch

Koa 中间件：使用的是一个洋葱模型，它的一个特点是级联，通过 await next() 控制调用 “下游” 中间件，直到 “下游” 没有中间件且堆栈执行完毕，最终在流回 “上游” 中间件。这种方式有个优点特别是对于日志记录（请求->响应耗时统计）、错误处理支持都很完美。

因为其背靠 Promise，Async/Await 只是一个语法糖，因为 Promise 是一种链式调用，当多个 then 链式调用中你无法提前中断，要么继续像下传递，要么 catch 抛出一个错误。对应到 Koa 这个框架也是你只能通过 await next() 来控制是否像下流转，或者抛出一个错误，无法提前终止

通常都会说 Koa 是洋葱模型，这重点在于中间件的设计。但是 Express 也是类似的，不同的是Express 中间件机制使用了 Callback 实现，这样如果出现异步则可能会使你在执行顺序上感到困惑，因此如果我们想做接口耗时统计、错误处理 Koa 的这种中间件模式处理起来更方便些。最后一点响应机制也很重要，Koa 不是立即响应，是整个中间件处理完成在最外层进行了响应，而 Express 则是立即响应。


#### egg > Node.js 8
继承koa
事件：Async/Await
对象：
中间件：洋葱模型
异常处理：try-catch
app:
controller层：用于解析用户的输入，处理后返回相应的结果
service层：用于编写业务逻辑层（可选）
model层：数据库（可选）- egg-sequelize
