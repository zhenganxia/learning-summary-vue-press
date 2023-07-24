## 上传、下载格式转化，判断本地文件是否发生变化
```js
// 上传压缩包 -- blob转base64
const parseFileToBase64 = (file) => {
   // 获取FileReader实例
   var reader = new FileReader();
   // 将文件加载进入
   reader.readAsDataURL(file);
   reader.onload = function (e) {
    // 转换完成输出该文件base64编码
   console.log( e.target?.result)
}
}
// base64   .zip---application/x-zip-compressed  .rar -- application/octet-stream
```
## 上传压缩包 -- blob转base64
```js
const parseFileToBase64 = (file) => {
   // 获取FileReader实例
   var reader = new FileReader();
   // 将文件加载进入
   reader.readAsDataURL(file);
   reader.onload = function (e) {
    // 转换完成输出该文件base64编码
   console.log( e.target?.result)
}
}
// base64   .zip---application/x-zip-compressed  .rar -- application/octet-stream
```
## 上传excel -- 格式为formData格式
+ 注意：（1.需要blob转formdata ）
```js
// 1.前端修改入参格式 -----后端使用MultipartFile接收参数需要修改Content-Type - multipart/form-data;
const uploadFile = () => {
   let formData = new FormData();
   formData.append("file", state.file.raw);
   this.axios.post(formData,`/url`,
    {
      'Content-Type': 'multipart/form-data;',
    }
   )
}
```
<img :src="$withBase('/images/v2-07eb461bfbe054865e77f01a16bc8eb4_b.jpg')" alt="foo">

+ 2.后端处理入参格式
const formData = new FormData();
formData.append("file", file);
this.formData = formData;
this.axios.post(`/upload`, this.formData, {
  params,
})
<img :src="$withBase('/images/v2-v2-8e7f20d0060741c4e24c76bf1a9647d9_b.jpg')" alt="foo">

## 下载base64
```js
// 一定要传responseType: "blob"
 this.axios.get("downloadTemplate", {
     params: {},
     responseType: "blob",
  })
.then(res => {
    // res为base64
      if (res.status === 200) {
        blobExcel(res);
      }
    })


// 导出blob
/**
 * 下载文件
 * @param {url} url 要下载的文件
 * @param {name} name  要下载的文件名
 * @param {type} type  要下载的格式
 */
export const blobExcel = (res, name, type) => {
  let blob = new Blob([res.data], {
    type: type || "application/vnd.ms-excel;charset=utf-8",
  });
  let objectUrl = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = objectUrl;
  a.download = name ? name : decodeURIComponent(
    res.headers["content-disposition"].split("=")[1]
  );

  a.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  window.URL.revokeObjectURL(blob);
}
```
## 下载url
```js
//不需要设置responseType: "blob" 
this.axios.get()
    .then(res => {
      if (res.code === '000000') {
         downloadUrl(res.data)
      }
})

/**
 * 下载文件
 * @param {url} url 要下载的文件地址
 * @param {name} name  要下载的文件名
 * @param {agreement} agreement  替换协议
 */
// 根据地址下载文件
export const downloadUrl = (url,name,agreement) => {
  const link = document.createElement('a');
  link.href = url
  if(agreement) {
    // 需要处理协议
    link.href = url.replace('http','https')
  }
  const fileName = name || url.substring(url.lastIndexOf('/') + 1, url.length);
  link.download = fileName;
  link.style.display = 'hidden'
  // 定义[a]标签属性  ---结束
  // 将[a]标签挂在到 [body]
  document.body.appendChild(link)
  // 模拟点击[a]标签
  link.click()
  // 移除[a]标签
  document.body.removeChild(link)
}
```
