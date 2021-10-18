### 职责链模式
:::tip
特点：管理队列，不需要动原来的代码
定义：把要做的事情组织为一条有序的链条，通过这条链条传递消息完成功能。适用于不涉及到复杂异步的操作
场景：面临一些随时可能变更的半成品需求，我们把这些需求组织成一个个步骤，然后放到代码里面的一个数组，作为一个队列依次执行
例子：校验
:::

```js
职责链基本结构
function model1() {}
function model2() {}
function model3() {}
const _result = model1(_result)
const _result = model2(_result)
const _result = model3(_result)
```

```js
实例1
function inputTest() {
  this.testList = []
}
inputTest.prototype.addTest  = function (fn) {
  this.testList.push(fn)
}
inputTest.prototype.test = function (value) {
  const self = this
  async function runList(value) {
    var _resultList = []
    for(var i = 0; i< self.testList.length;i++) {
      var _result = await self.testList[i](value)
      _resultList.push(_result)
    }
    return _resultList
  }
  runList.then(res=>{
    console.log(res)
  })
}

var inputTester = new inputTest()
inputTester.addTest(()=>{
  return {
    pass: false,
    result : '电话号码不符合规范'
  }
})
inputTester.addTest(()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve({
        pass: false,
        result : '电话号码已经存在'
      })
    })
  }
)
```
```js
实例2
// 所有模块校验通过，保存数据，并推送数据
wrapPromise(promise) {
    return new Promise((resolve, reject) => {
        promise
            .then(() => {
                resolve({ validateRes: true })
            })
            .catch(errorInfo => {
                resolve({ validateRes: false, errorInfo })
            })
    })
},
async saveData() {
    let isValidate
    const refs = ['basePlateBasic', 'skuInfo', 'productImg', 'sizeTable', 'productAttribute']
    const validateModuleArr = refs.map(ref => this.wrapPromise(this.$refs[ref].validateData()))
    let resArr = []
    try {
        resArr = await Promise.all(validateModuleArr)
        const firstError = resArr.find(item => !item.validateRes)
        let { errorInfo: moduleName } = firstError || {}
        if (moduleName && this.anchors.includes(moduleName)) {
            this.navSelect(moduleName)
        }
        isValidate = !firstError
    } catch (error) {
        isValidate = false
    }

    if (isValidate) {
        const genSubmitData = refs.map(ref => this.$refs[ref].genSubmitData())
        Promise.all(genSubmitData).then(data => {
            const [{ basic }, { variantPlate }, { images }, { sizeDTO }, { metaFields }] = data

            this.$store.commit('createBasePlate/SET_SUBMIT_INFO', {
                basic,
                variantPlate,
                sizeDTO,
                metaFields,
                images
            })
        })
    }
}
```


###  装饰者模式
:::tip
特点：扩展某个方法，不修改原方法（1.重写新方法 2。调用老方法 3.扩展新操作）
场景：面临一些随时可能变更的半成品需求，我们把这些需求组织成一个个步骤，然后放到代码里面的一个数组，作为一个队列依次执行
例子：校验
:::

```js
实例1 
function a() {}
function b () {
  a()
  console.log('1111')
}
var decorator = function (dom,fn) {
  if(typeof dom.onclick === 'function') { // 节点有绑定事件
    var _old = dom.onclick = function() {
      _old()
      fn()
    }
  }
}
decorator(confirmButton,function() {
  console.log('操作成功')
})
decorator(confirmButton,function() {
  console.log('删除成功')
})

```

```js
实例2
// vue源码-数组监听（vue） 1.原方法不够用 2.不好改老方法
var arrayPrototype = Array.prototype
var arrayMethods = Object.create(arrayPrototype) // 拷贝原型链
var methodsArr = ['push','pop','shift']
methodsArr.forEach(method=>{
arrayMethods[method] = function() {
  var origin = arrayPrototype[method] // 调用老方法
  var result = origin.apply(this,arguments)
  dep.notify()
  return result
}
})

```

### 观察者模式
:::tip
模块之间不方便沟通，需要通过一个中介模块，来转发消息
:::

```js
var observer ={
    message={} ,// 储存注册监听的消息
    regist:function(type,fn){ //注册监听(订阅)
    this.message[type] =fn
    },
    fire:function(type){ //（发布）
        this.message[type]()
    }

  }
  ```