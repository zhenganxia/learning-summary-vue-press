### 查看分支情况
```
git branch: 查看本地分支信息
git branch -a:查看所有的分支信息
git branch --merged 查看哪些分支已被并入当前分支（译注：也就是说哪些分支是当前分支的直接上游。）
git branch -a --list "*plm*": 查询有plm的分支
```
### 撤销本地提交
```
git reset --soft HEAD^/版本号 :撤回最近一次commit内容到工作区/撤回指定版本号commit内容到工作区
git reset --hard HEAD^/版本号:撤回最近一次的commit内容为上一个版本/撤回到指定版本号内容
```
### 撤销远程提交
```
git reset --hard HEAD^/版本号:撤回最近一次的commit内容为上一个版本/撤回到指定版本号内容
git push -f :撤销本地并且删除远程提交需要强制提交
```
### 处理本地回滚
```
git reset --hard commitId：回滚到指定commitId
git reset --hard head : 回滚到上一个版本
git reset --soft head ：回滚上一个版本到工作区
```
### 处理远程仓库回滚
```
git reset --hard commit {commitId}（直接回滚到commitId）
git push --force origin {branchName}
# 其他本地已有该分支的小伙伴本地
git reset --hard origin/{branchName}
git pull origin {branchName}
```
### 暂存
```
git stash :暂存
git stash list : 查看缓存列表
git stash pop :取消最近一次的暂存
```
### 创建分支
```
git checkout -b 新分支名 基于创建的分支名
git push -u origin 新分支名 （推到远程）
本地与远程创建联系： git branch –set-upstream-to=origin/远程分支的名字  本地分支的名字
```
### 创建本地分支并且同步远程分支(本地没有master分支，需要重新创建一个本地master分支并且要同步远程的master)
```
git checkout -b master origin/master
```
### 删除本地分支：需要切其他分支操作
```
git branch -D 要删除分支名
```
### 删除远程分支
```
git push -u origin --delete 分支名
```

### 查看远程分支状态
git remote show origin

### 更新远程分支和本地分支保持一致（本地、远程分支都删除，使用git branch -a 依然有远程分支）
git remote prune  origin

### 分支强制合并（将modify分支内容强制合并到master）
git push origin modify:master --force
### 同步本地远程分支：（远程删除分支，本地依然有）
```
git remote prune origin
```
### 批量删除本地分支
```
git branch | grep -v "master" | xargs git branch -D
```
### 合并分支
```
git merge --no-f -m "merge 的备注"  需要merge的分支名： merge分支提交备注
```
### 创建SSH Key 创建免登录的授权
```
1.ssh-keygen -t rsa -C 769461729@qq.com（setting的中查找邮箱地址 邮箱不写）
   或者使用ssh-keygen -t rsa命令
2.找到rsa.pub key,导入到gitlib中（执行代码会有key的地址，然后在gitlab中ssh key
中粘贴入key）
```
### 仓库迁移
```
旧项目web-district地址： ssh://git@gitlab.dev.zhoukoudian.top:2289/pzy/web-district.gitls
新项目web-district地址：http://git.opt.zhoukoudian.top/pzy/web-district.git
1、新项目创建一个新的web-district空仓库
2、进入旧项目web-district项目2.1.6分支下：
1.原地址克隆一份裸版本库：git clone --bare ssh://git@gitlab.dev.zhoukoudian.top:2289/pzy/web-district.git 
2.推送裸版本库到新的地址：git push --mirror http://git.opt.zhoukoudian.top/pzy/web-district.git
```
### 多个仓库使用gitclone没有办法下载（ssh和http都下载不了）
```
1.控制面板---用户账号---凭证管理----windos凭证---找到新仓库的普通凭证然后编辑，修改新仓库的名称和密码然后执行下边命令
2.git clone http://liuxx@git.pro.zhoukoudian.top/athlon/web-business-student.git（liuxx 这是git账号名）
```
### git help gc：本地悬空对象过多（删除stash没有真正删除）
```
git fsck --lost-found
git gc --prune=now
```
### 日常使用
```
git log:查看提交记录
git log --oneline :查看提交记录，只有备注和commitId
git reflog:查看历史命令git 
git show / git show 版本号:查看最近一次提交详情/查看指定提交版本号详情
git status:查看提交状态
pwd：当前项目本地存放地址 /e/starlinke/web-front
git remote -v:查看当前项目远程的地址 ssh://git@code.starlinke.cn:222/erp/web-front.git 
```