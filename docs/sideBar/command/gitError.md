### 1.github添加ssh，本地无法gitclone 
### 2.git push Failed to connect to github.com port 443: Operation timed out
```js
需要clone地址：git clone git@github.com:zhenganxia/learning-summary-vue-press.git
ssh -T git@github.com
返回结果：
Permission denied (publickey).
解决办法：
ssh-add ~/.ssh/id_rsa(跟本地生成的rsa文件名保持一致)
然后再次执行：
ssh -T git@github.com
返回结果如下：
Hi 你的用户名! You've successfully authenticated, but GitHub does not provide shell access.
说明你目前本地的ssh已经切换到了自己设置用户名这个账号，
设置成功可以git clone
参考地址：https://www.jianshu.com/p/9cefa5170fe0
```


### waring 
```js
hint: Pulling without specifying how to reconcile divergent branches is
hint: discouraged. You can squelch this message by running one of the following
hint: commands sometime before your next pull:
hint: 
hint:   git config pull.rebase false  # merge (the default strategy)
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
解决办法：git config pull.rebase false
```