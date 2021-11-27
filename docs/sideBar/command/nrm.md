nrm(npm registry manager )是npm的镜像源管理工具。
### nrm 安装

#### window:
npm install nrm -g

#### mac: 
sudo npm install nrm -g

### nrm 命令

#### nrm有自带默认配置，*为当前的配置
nrm ls
```js
  npm -------- https://registry.npmjs.org/

  yarn ------- https://registry.yarnpkg.com/

  cnpm ------- http://r.cnpmjs.org/

* taobao ----- https://registry.npm.taobao.org/

  nj --------- https://registry.nodejitsu.com/

  npmMirror -- https://skimdb.npmjs.com/registry/
```

#### 切换当前源地址

nrm use taobao

#### 删除源地址

nrm del taobao

#### 添加源地址

nrm add *** https://****.***/

#### 测试时间

nrm test npm 



#### 直接安装cnpm 

npm install cnpm -g --registry=https://registry.npm.taobao.org

#### 直接更改源地址

npm set registry https://registry.npm.taobao.org/

#### 查看npm源地址

npm config list

#### 删除源地址

npm config rm registry


