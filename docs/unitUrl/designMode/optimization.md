### 享元模式
:::tip
多个代码块或者模块绝大部分处理逻辑相同,需要提取不同点
:::
``` js 
实例：
 customAttributes: {
    handler(data) {
        this.form.matchMetaFields = []
        const { matchMetaFields, customAttributesData } = data
        if (isEmpty(customAttributesData)) return
        let matchInfo = customAttributesData.map(attribute => {
            // termValueType [1: 标准化文本select] [2: 自定义文本input]
            // 不同点（value，matchId）
            let value = attribute.checkbox ? [] : ''
            let matchId
            if (!isEmpty(matchMetaFields)) {
                const { matchValue, id } = this.productMetaFields(matchMetaFields, attribute)
                value = matchValue
                matchId = id
            }
            return {
                id: matchId || null, // 回显有值保存无值
                attributeId: attribute.id,
                code: `${attribute.id}`,
                attributeName: attribute.name,
                value
            }
        })
        this.$set(this.form, 'matchMetaFields', matchInfo)
    },
    immediate: true,
    deep: true
}

```

### 桥接模式
#### 使用场景
```js
```



### 策略模式
:::tip
只执行一次
:::

```js
实例1
var category = {
  phone : function() {},
  isNumber : function() {},
  isString : function() {},
}
category[type]
```

```js
实例2
 showRating() {
    return row => {
        const colors = {
            A: 'blue',
            B: 'green',
            C: 'orange',
            D: 'red'
        }
        return `similar-tag--${colors[row.sampleGrade]}`
    }
}
```

```js
实例3
initDirection() {
    let direction = this.$getDirection()
    direction.on('keyup', function (e) {
        e.preventDefault()
        const obj = {
            39: 'next',
            37: 'previous',
            38: 'previousLine',
            40: 'nextLine'
        }
        try {
            direction[obj[e.keyCode]]()
        } catch (e) {
            return
        }
    })
}
```

### 状态模式
:::tip
有状态管理的策略模式
:::

```js
实例：可以上下左右或者左上、右下移动div
function moveDiv() {
  this.actionArr = []
}
moveDiv.prototype.move = function(typeArr) {
  this.actionArr = typeArr
  var category = {
    top:function(){},
    bottom:function(){}
  }
  this.actionArr.forEach(action=>{
    category[action]
  })
}
var mover = new moveDiv()
mover.move(['left'])
mover.move(['left','top'])

```