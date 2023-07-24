### 添加submodule
```
git submodule add https://github.com/phpgao/BaiduSubmit.git usr/plugins/BaiduSubmit

查看项目.gitmodules和.git/config这两个文件，应该会发现相关信息已被记录下来！
```
### 更新submodule
```
当clone项目时有子模块存在时，第一次是不会顺便clone出子模块的，需要执行一些命令
git clone xxx.git

# 初始化子模块
git submodule init

# 将子模块的文件check出来
git submodule update

# 现在所有子模块已经把被checkout到本地
```
### 删除submodule
```
git没有提供类似 git submodule remove 那么easy的方法，所以我们要借助deinit。所以如果之前你是直接编辑.gitmodules文件就以为删除了那你就错了！

# 我们以BaiduSubmit为例，之前我们添加在了 usr/plugins/BaiduSubmit
# 首先我们反初始化
git submodule deinit usr/plugins/BaiduSubmit

# 此时 .git/config 已被重写，BaiduSubmit的相关信息已经不存在了
git rm usr/plugins/BaiduSubmit
# 这时，子模块文件被删除，同时 .gitmodules 文件中的相关信息被删除

# 还有一种情况，就是子模块刚被add，但是还没有commit的时候，这时如果反悔了，但是还想保留工作现场，可以这样。
# 如果不想保留，看下一条
git rm --cached usr/plugins/BaiduSubmit
rm -rf .git/modules/usr/plugins/BaiduSubmit

# 或者直接全部删除
git submodule deinit --force usr/plugins/BaiduSubmit
```
### 子模块修改并提交submodule
```
#子模块修改
cd xx/xx/sub
git add .
git commit -m "备注"
git push 分支名
```
### 更新所有子模块
```
git submodule update
git submodule foreach git checkout master 
git submodule foreach git pull 
cd 子模块路径
git checkout 子模块分支
```

### 子仓库分支游离状态
```
原因：使用 git submodule update 的时候，子模块会checkout到最新的子模块 commit id，
从而变成'游离'的HEAD状态，因为本地找不到这个最新的commit id
解决：git submodule update --merge
```
