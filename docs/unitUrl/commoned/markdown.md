## [基础使用](https://www.jianshu.com/p/191d1e21f7ed/)
vscode插件：Markdown Preview Enhanced 预览
### 简介
markdown是一种轻量级的标记语言，易于读写，支持图片、图表、数学公式、流程图。用于帮助文档、博客等

1. ### 标题

   - 语法

     ```markdown
     # 一级标题
     ## 二级标题
     ### 三级标题
     #### 四级标题
     ##### 五级标题
     ###### 六级标题
     ```

     

   - 效果

     略

     

2. ### 字体

   - 语法

     ```markdown
     **我是加粗**
     *我是斜体*
     ***我是斜体加粗***
     ~~我是删除线~~
     ```

     

   - 效果

     **我是加粗**

     *我是斜体*

     ***我是斜体加粗***

     ~~我是删除线~~

3. ### 引用

   - 语法

     ```markdown
     > 一层引用
     >> 二层引用
     >>> 三层引用
     ....
     >>>>> 多层引用
     ```

     

   - 效果

     > 一层引用
     > > 二层引用
     > > > 三层引用
     > > > ....
     > > >
     > > > >> 多层引用

     

4. ### 分割线

   - 语法

     ```markdown
     ---
     ***
     ```

     

   - 效果

     ---

     ***

     

5. ### 图片

   - 语法

     ```markdown
     ![图片alt](图片地址 "图片标题")
     ```

     

   - 效果

     ![teleone图片](http://172.30.22.125:8080/static/2019/12/24/ecb5bb6a-ef50-4dfc-9a83-38feb244515a.jpg "teleone图片")

   - 拓展

     + [图床](https://www.jianshu.com/p/ea1eb11db63f)

6. ### 超链接

   - 语法

     ```markdown
     [百度](https://www.baidu.com)
     ```

     

   - 效果

     [百度](https://www.baidu.com)

7. ### 列表

   - 语法

     ```markdown
     - 无序列表
     + 无序列表
     1. 有序列表
     ```

     

   - 效果

     - 无序列表
     + 无序列表

     1. 有序列表

8. ### 表格

   - 语法

     ```markdown
     |表头|表头|
     |:-:|:-:|
     |内容|内容|
     
     第二行分割表头和内容（使用-）
     文字默认居左
     -两边加：表示文字居中
     -右边加：表示文字居右
     -左边加：表示文字居左
     ```

     

   - 效果

     | 表头 | 表头 |
     | :--: | :--: |
     | 内容 | 内容 |

9. ### 代码

   + **单行代码**

     - 语法

       ```markdown
       `我是效果`
       ```

     - 效果
       `我是效果`

   + **多行代码**

     - 语法

       ```markdown
       ​```markdown
       我是多行代码
       ​```
       ```

       

     - 效果

       ```markdown
       我是多行代码
       ```
### Mermaid 
Mermaid 是一个基于 Javascript 的图表绘制工具，通过解析类 Markdown 的文本语法来实现图表的创建和动态修改:    https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md


### 图形
```mermaid 
graph TD 
A[方形] 
B(圆角) 
C[(圆柱体)] 
D((圆形)) 
E[\平行四边形\] 
F[/平行四边形/] 
G{菱形} 
H[/梯形\] 
N-->M 
```

### 流程图

  ```markdown
  ```mermaid 
    graph TD 
    A[开始]-->B(第一步); 
    B-->C{是否确定}; 
    C-->|确定|D[第二步] 
    C--不确定-->A 
    ```
```


### markdown读写工具
[Typora官网](https://typoraio.cn/)
[Typora 的 Markdown 语法](https://support.typoraio.cn/zh/Markdown-Reference/)
