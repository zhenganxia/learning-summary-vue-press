### 环境安装:安装nvm管理node版本：12.17.0（不要安装node）
1. <https://github.com/coreybutler/nvm-windows/releases下载nvm-setup.zip><br/>
2. 安装nvm-setup.zip，安装路径：D:\sofeware\nvm 下nvm和nodejs文件夹<br/>
<img :src="$withBase('/images/nvm/1.png')" alt="foo">
<img :src="$withBase('/images/nvm/2.png')" alt="foo">
 
### cmd执行：
- nvm查看nvm命令
- nvm install node版本号
- nvm use node版本号

### 注意：node和npm丢失问题
- 如果找不node 查看 D:\sofeware\nvm\nvm 中setting.txt 文件下内容是否和环境变量一致<br/>
setting.txt<br/>
<img :src="$withBase('/images/nvm/3.png')" alt="foo">

系统环境变量
<img :src="$withBase('/images/nvm/4.png')" alt="foo">
 
path都要有 %NVM_HOME%  %NVM_SYMLINK% 
- npm找不到，执行nvm install node其他版本号生成npm包：这里使用的是12.10.10


