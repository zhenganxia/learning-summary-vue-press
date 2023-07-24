### 复制目标仓库old-temporary  为新仓库new-temporary
1. gitlab新建仓库new-temporary
2. 打开old-temporary   切换到想要的分支下边（feature-task-pika）
      （1）复制仓库old-temporary
               执行命令 git clone --bare 旧仓库git地址
     （2）将复制内容推送到新仓库new-temporary
               执行命令git push --mirror 新仓库git地址
3.后端处理新仓库数据信息
     （1）新仓库名称 
     （2）新旧仓库跳转路径
4.运维复制old-temporary 数据卷，添加新服务 - new-temporary （前端和运维约定好） ，生成新的jenkins地址（发布流程和原来保持一致）
