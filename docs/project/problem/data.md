## 树形结构获取所有层级path
```js
const  info = [
 {
   path:"/path",
   name:"path",
   children:[
       path:"/path1",
       name:"path1",
    ]
  }
]

const menuMap = new Map()

this.menuAllMap(info)

function menuAllMap(menus) {
      return new Promise((resolve) => {
        const menuMap = this.menusItem(menus);
        resolve({ menuMap });
      });
 }
    // 获取所有菜单多级字符串拼接path
function   menusItem(data, parentName = "") {
      data.forEach((item) => {
        menuMap.set(item.path, item);
        let itemName = item.path;
        if (parentName) {
          itemName = `${parentName}|${item.path}`;
          this.menuMap.set(itemName, item);
        }
        item.pathName = itemName;
        if (item.children && item.children.length > 0) {
          this.menusItem(item.children, itemName);
        }
      });
      return menuMap;
  }
console.log(menuMap)=>{
"/path|/path1":object
}
```