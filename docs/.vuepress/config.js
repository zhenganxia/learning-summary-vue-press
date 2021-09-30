module.exports = {
  title: "峖小虾技术网站",
  description: "",
  base: "/learning-summary-vue-press/", // 设置站点根路径和github项目名称保持一致
  plugins: ['demo-container'], // 配置插件
  themeConfig: {
    navbar: [
      { text: "首页", link: "/" },
      { text: "编程规范", link: "/nav/rule/index.md" },
      { text: "Ajax跨域详解", link: "/nav/ajax/index.md" },
      {
        text: "关注工具",
        items: [
          {
            text: "UI框架",
            items: [
              { text: "Element", link: "https://element.eleme.cn/#/zh-CN/component/installation" },
              { text: "Ant Design Vue", link: "https://2x.antdv.com/components/overview-cn/" },
            ],
          },
          {
            text: "JS",
            items: [
              { text: "ES6", link: "https://es6.ruanyifeng.com/" },
              { text: "ES2020", link: "https://www.cnblogs.com/mengfangui/p/13885589.html/" },
              { text: "TS", link: "https://typescript.bootcss.com/" },
            ],
          },
          {
            text: "构建工具",
            items: [
              { text: "Webpack", link: "https://webpack.docschina.org/concepts/" },
              { text: "Webpack-模块联邦", link: "https://webpack.docschina.org/concepts/module-federation/" },
              { text: "Vite", link: "https://cn.vitejs.dev/guide/" },
            ],
          },
          {
            text: "日常工具",
            items: [
              { text: "Json在线解析", link: "https://www.json.cn/" },
              { text: "Can i use", link: "https://caniuse.com/?search=flex-start/" },
              { text: "MDN", link: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content/" },
            ],
          },
          {
            text: "适配",
            items: [
              { text: "postcss-pxtorem", link: "https://www.npmjs.com/package/postcss-pxtorem/" },
              { text: "postcss-px2rem", link: "https://www.npmjs.com/package/postcss-px2rem/" },
              { text: "postcss-plugin-px2rem", link: "https://www.npmjs.com/package/postcss-plugin-px2rem/"},
            ],
          },
        ],
      },
      {
        text: "关注博客",
        items: [
          // {
          //   text: "日常工具",
          //   items: [
          //     { text: "Json在线解析", link: "https://www.json.cn/" },
          //     { text: "Can i use", link: "https://caniuse.com/?search=flex-start" },
          //     { text: "MDN", link: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content" },
          //   ],
          // }
        ],
      },
    ],
    sidebar: [
      {
        title: "JavaScript",
        collapsable: true,
        children: [
          { title: "内置功能", path: "/sideBar/js/scope.md" },
          { title: "展望未来", path: "" },
        ],
      },
      {
        title: "项目",
        collapsable: true,
        children: [
          { title: "问题", path: "/sideBar/project/problem" },
          { title: "工具", path: "/sideBar/project/until" },
          // { title: "公共组件", path: "/sideBar/project/exportComponents/exportResourceSelect" },
          { title: "插件", path: "/sideBar/project/public" },
          { title: "指令", path: "/sideBar/project/directive" },
        ],
      },
      {
        title: "常用命令",
        collapsable: true,
        children: [
          { title: "git", path: "/sideBar/command/git" },
          { title: "npm", path: "/sideBar/command/npm" },
          { title: "linux", path: "/sideBar/command/linux" },
          { title: "submodule", path: "/sideBar/command/submodule" },
          { title: "markdown", path: "/sideBar/command/markdown" },
        ],
      },
      {
        title: "VSCODE",
        collapsable: true,
        children: [
          { title: "插件", path: "/sideBar/vscode/public" },
          {
            title: "设置",
            children: [
              {
                title: "代码片段",
                path: "/sideBar/vscode/setting/codeSnippet",
              },
              {
                title: "linux终端",
                path: "/sideBar/vscode/setting/linuxTerminal",
              },
            ],
          },
        ],
      },
      {
        title: "源码",
        collapsable: true,
        children: [
          { title: "promise", path: "/sideBar/sourceCode/promise" },
          { title: "axios", path: "/sideBar/sourceCode/axios" },
          {
            title: "vue",
            children: [
              {
                title: "vue2",
                path: "/sideBar/sourceCode/vue/vue2",
              },
              {
                title: "vue3",
                path: "/sideBar/sourceCode/vue/vue3",
              },
            ],
          },
        ],
      },
      {
        title: "设计模式",
        collapsable: true,
        children: [
          // { title: "promise", path: "/sideBar/sourceCode/promise" },
          // { title: "axios", path: "/sideBar/sourceCode/axios" },
          // {
          //   title: "vue",
          //   children: [
          //     {
          //       title: "vue2",
          //       path: "/sideBar/sourceCode/vue/vue2",
          //     },
          //     {
          //       title: "vue3",
          //       path: "/sideBar/sourceCode/vue/vue3",
          //     },
          //   ],
          // },
        ],
      },
      {
        title: "安装插件",
        collapsable: true,
        children: [
          { title: "vuePress+gitPage", path: "/sideBar/npmPublic/vuePress" },
          // { title: "axios", path: "/sideBar/sourceCode/axios" },
          // {
          //   title: "vue",
          //   children: [
          //     {
          //       title: "vue2",
          //       path: "/sideBar/sourceCode/vue/vue2",
          //     },
          //     {
          //       title: "vue3",
          //       path: "/sideBar/sourceCode/vue/vue3",
          //     },
          //   ],
          // },
        ],
      },
      {
        title: "整理报错",
        collapsable: true,
        children: [
          { title: "vuePress+gitPage", path: "/sideBar/npmPublic/vuePress" }
        ],
      },
      {
        title: "性能优化",
        collapsable: true,
        children: [
          { title: "vuePress+gitPage", path: "/sideBar/npmPublic/vuePress" }
        ],
      },
    ],
    sidebarDepth: 5,
  },
};
