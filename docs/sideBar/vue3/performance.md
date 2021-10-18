
### vue3优化
#### vue2-Object.defineProperty vue3-proxy
:::tip
vue2缺点：需要循环遍历data，消耗性能<br/>
vue3改进：使用propx，生成代理对象，不需要对data进行循环并且不会修改原对象<br/>
注意：proxy需要IE8以上版本
:::
```js
vue2:
var vueobj = {
    data:{
        a:123,
        b:456
    }
}
for(var item in vueobj.data) {
    defineReactive(vueobj.data,item)
}
function defineReactive(object,key) {
    Object.defineProperty(object,key,{
        get:function() {
        // 依赖收集到dep对象（初次渲染页面,所有data中的get触发）
            dep.depend()
        },
        set:function() {
            // 更新收集依赖
            dep.notify()
        }
    })
}
```
```js
vue3
// 对所有data进行代理
var proxyObj = new Proxy(vueObj.data,{
    get:function() {
    
    },
    set:function() {
        
    }
})
```

#### diff算法
:::tip
vue2<br/>
特点：从根节点开始逐个比对<br/>
过程：1.属性、文字变化：直接进行修改2.节点类型变化：节点和子节点全部删除<br/>
缺点：对于静态节点也要进行比对更新<br/>
vue3<br/>
render渲染改进：初始化对虚拟dom树（block-tree）进行分区，绑定vue指令的dom节点标记1（动态区），静态节点标记0（静态区）<br/>
事件缓存改进：事件会先查下是否有缓存如果有缓存使用缓存，没有调用方法<br/>
:::

```js
虚拟dom：节点类型,属性，文字，子节点
//Virtual dom 是什么:dom的js表达
//为什么用Virtual dom:是为了用一种更好的方式操作dom，像操作对象一样操作dom
html:
<div class="class1">
    <h1>123</h1>
    <p>
        <span>{{msg}}</span>
    </p>
</div>
var virtualdom = {
    type:'div',
    attribute:[
        {class:'class1'}
    ],
    text:'',
    children:[
        {
            type:'h1',
            attribute:[],
            text:'123',
            children:[]
        },
        {
            type:'p',
            attribute:[],
            text:123,
            children:[
                {
                    type:'span',
                    attribute:[],
                    text:_ctx.msg,
                    children:[]
                }
            ]
        }
    ]
}
```

#### 函数式编程
:::tip
优点：可扩展性强，便于webpack tree-shaking
:::





