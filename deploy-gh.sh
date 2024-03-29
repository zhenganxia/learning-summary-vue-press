#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：这里是本项目打包后存储的仓库地址
git push -f git@github.com:zhenganxia/learning-summary-vue-press.git main:gh-page

cd -