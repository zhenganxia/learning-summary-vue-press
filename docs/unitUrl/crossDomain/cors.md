
:::tip
1.什么是跨域：跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。<br/>
2.同源策略限制了一下行为：<br/>
Cookie、LocalStorage 和 IndexDB 无法读取<br/>
DOM 和 JS 对象无法获取<br/>
Ajax请求发送不出去<br/>
3.浏览器的同源策略：域名、协议、端口均为相同


:::
### 一、jsonp跨域
#### 原理：
jsonp跨域其实也是JavaScript设计模式中的一种代理模式。在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的，所以我们可以通过这个“犯罪漏洞”来进行跨域。一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信
#### 缺点
1.可以解决跨域问题，但只能发送 GET 请求<br/>
2.并且没有有效的错误捕获机制

```js
//原生的实现方式
let script = document.createElement('script');

script.src = 'http://www.nealyang.cn/login?username=Nealyang&callback=callback';

document.body.appendChild(script);

function callback(res) {
  console.log(res);
}
```


### 二、nginx代理跨域
nginx解决跨域的原理
例如：

前端server的域名为：fe.server.com
后端服务的域名为：dev.server.com
现在我在fe.server.com对dev.server.com发起请求一定会出现跨域。

现在我们只需要启动一个nginx服务器，将server_name设置为fe.server.com,然后设置相应的location以拦截前端需要跨域的请求，最后将请求代理回dev.server.com。如下面的配置：
```js
server {
        listen       80;
        server_name  fe.server.com;
        location / {
            proxy_pass dev.server.com;
        }
}
```
这样可以完美绕过浏览器的同源策略：fe.server.com访问nginx的fe.server.com属于同源访问，而nginx对服务端转发的请求不会触发浏览器的同源策略。

### 三、跨域资源共享 CORS 即 “跨域资源共享”
[http://www.ruanyifeng.com/blog/2016/04/cors.html](http://www.ruanyifeng.com/blog/2016/04/cors.html)
它不是一个新的 API，而是一个标准规范 。当浏览器发现该请求需要跨域时，就会自动在头信息中添加一个 Origin 字段，用以说明本次请求来自哪个源。服务器根据这个值，决定是否同意这次请求。
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。IE8+：IE8/9需要使用XDomainRequest对象来支持CORS。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。 因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

#### 两种请求
分为两种请求，一种是简单请求，另一种是非简单请求。只要满足下面条件就是简单请求

请求方式为HEAD、POST 或者 GET
http头信息不超出一下字段：Accept、Accept-Language 、 Content-Language、 Last-Event-ID、 Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)
为什么要分为简单请求和非简单请求，因为浏览器对这两种请求方式的处理方式是不同的。
### 简单请求

基本流程

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。 下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。

```js
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0
```
Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。 浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。

注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。
如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
```js
   Access-Control-Allow-Origin: http://api.bob.com
   Access-Control-Allow-Credentials: true
   Access-Control-Expose-Headers: FooBar
   Content-Type: text/html; charset=utf-8
```
上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头
```js
Access-Control-Allow-Origin :该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求
Access-Control-Allow-Credentials: 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
Access-Control-Expose-Headers:该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。
```
### withCredentials 属性

上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。

另一方面，开发者必须在AJAX请求中打开withCredentials属性。
```js
var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

// 前端设置是否带cookie
xhr.withCredentials = true;

xhr.open('post', 'http://www.domain2.com:8080/login', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('user=admin');

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
};

// jquery
$.ajax({
    ...
   xhrFields: {
       withCredentials: true    // 前端设置是否带cookie
   },
   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    ...
});
```
否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。 但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
```js
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```
浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。
```js
  OPTIONS /cors HTTP/1.1
   Origin: http://api.bob.com
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: X-Custom-Header
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...
```
"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。

除了Origin字段，"预检"请求的头信息包括两个特殊字段。

Access-Control-Request-Method：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header
预检请求的回应

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应
```js
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。

服务器回应的其他CORS相关字段如下：
```js
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
Access-Control-Allow-Methods：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
Access-Control-Allow-Headers：如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
Access-Control-Allow-Credentials： 该字段与简单请求时的含义相同。
Access-Control-Max-Age： 该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。
```
浏览器正常请求回应

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。
```js
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
浏览器的正常CORS请求。上面头信息的Origin字段是浏览器自动添加的。下面是服务器正常的回应。

Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
Access-Control-Allow-Origin字段是每次回应都必定包含的
```
#### 结束语

CORS与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。

### 三、postMessage跨域
这是由H5提出来的一个炫酷的API，IE8+，chrome,ff都已经支持实现了这个功能。这个功能也是非常的简单，其中包括接受信息的Message时间，和发送信息的postMessage方法。

发送信息的postMessage方法是向外界窗口发送信息
```js
otherWindow.postMessage(message,targetOrigin);
```
otherWindow指的是目标窗口，也就是要给哪一个window发送消息，是window.frames属性的成员或者是window.open方法创建的窗口。 Message是要发送的消息，类型为String，Object(IE8、9不支持Obj)，targetOrigin是限定消息接受范围，不限制就用星号 *

接受信息的message事件
```js
var onmessage = function(event) {
  var data = event.data;
  var origin = event.origin;
}

if(typeof window.addEventListener != 'undefined'){
    window.addEventListener('message',onmessage,false);
}else if(typeof window.attachEvent != 'undefined'){
    window.attachEvent('onmessage', onmessage);
}
```

举个栗子
```js
a.html(http://www.nealyang.cn/a.html)

<iframe id="iframe" src="http://www.neal.cn/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向neal传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.neal.cn');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from neal ---> ' + e.data);
    }, false);
</script>
b.html(http://www.neal.cn/b.html)

<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from nealyang ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回nealyang
            window.parent.postMessage(JSON.stringify(data), 'http://www.nealyang.cn');
        }
    }, false);
</script>
```
