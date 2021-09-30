### nrm 管理下载使用镜像
```
#查看镜像资源
nrm ls
#使用某个资源
nrm use 资源名
```
### nvm 管理node版本
```
#查看node版本
nvm ls
#使用某个node版本
nvm use node版本
```
### 常用命令
```
#下载插件使用临时淘宝镜像下载，尽量使用nrm
npm i 插件名 --registry https://registry.npm.taobao.org
#查看插件版本号
npm view 插件名 versions
#卸载模块
npm uninstall 模块名称
#查看 /node_modules/ 目录
npm ls
#更新模块
npm update 模块名称（express）
#全局安装的对应命令行程序更新至最新版
npm update <package> -g
```