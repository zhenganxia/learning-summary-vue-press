module.exports = {
  title: "峖小虾技术网站",
  description: "",
  base: "/learning-summary-vue-press/", // 设置站点根路径和github项目名称保持一致
  plugins: ['demo-container'], // 配置插件
  themeConfig: {
    navbar: [
      { text: "首页", link: "/" },
      { text: "编程规范", link: "/nav/rule.md" },
      { text: "Ajax跨域详解", link: "/nav/ajax.md" },
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
      // {
      //   title: "JavaScript",
      //   collapsable: true,
      //   children: [
      //     { title: "内置功能", path: "/sideBar/js/scope.md" },
      //     { title: "展望未来", path: "" },
      //   ],
      // },
      {
        text: "项目",
        link: '/sideBar/',
        children: [
          { text: "问题", link: "/sideBar/project/problem.md" },
          { text: "工具", link: "/sideBar/project/until.md" },
          // { text: "公共组件", link: "/sideBar/project/exportComponents/exportResourceSelect" },
          { text: "插件", link: "/sideBar/project/public.md" },
          { text: "指令", link: "/sideBar/project/directive.md" },
        ],
      },
      {
        text: "常用命令",
        children: [
          { text: "git", link: "/sideBar/command/git.md" },
          { text: "npm", link: "/sideBar/command/npm.md" },
          { text: "linux", link: "/sideBar/command/linux.md" },
          { text: "submodule", link: "/sideBar/command/submodule.md" },
          { text: "markdown", link: "/sideBar/command/markdown.md" },
        ],
      },
      {
        text: "VSCODE",
        children: [
          { text: "插件", link: "/sideBar/vscode/public.md" },
          {
            text: "设置",
            children: [
              {
                text: "代码片段",
                link: "/sideBar/vscode/setting/codeSnippet.md",
              },
              {
                text: "linux终端",
                link: "/sideBar/vscode/setting/linuxTerminal.md",
              },
            ],
          },
        ],
      },
      {
        text: "源码",
        children: [
          { text: "promise", link: "/sideBar/sourceCode/promise.md" },
          { text: "axios", link: "/sideBar/sourceCode/axios.md" },
          {
            text: "vue",
            children: [
              {
                text: "vue2",
                link: "/sideBar/sourceCode/vue/vue2.md",
              },
              {
                text: "vue3",
                link: "/sideBar/sourceCode/vue/vue3.md",
              },
            ],
          },
        ],
      },
      {
        text: "设计模式",
        children: [
          // { text: "promise", link: "/sideBar/sourceCode/promise" },
          // { text: "axios", link: "/sideBar/sourceCode/axios" },
          // {
          //   text: "vue",
          //   children: [
          //     {
          //       text: "vue2",
          //       link: "/sideBar/sourceCode/vue/vue2",
          //     },
          //     {
          //       text: "vue3",
          //       link: "/sideBar/sourceCode/vue/vue3",
          //     },
          //   ],
          // },
        ],
      },
      {
        text: "安装插件",
        children: [
          { text: "vuePress+gitPage", link: "/sideBar/npmPublic/vuePress.md" },
          // { text: "axios", link: "/sideBar/sourceCode/axios" },
          // {
          //   text: "vue",
          //   children: [
          //     {
          //       text: "vue2",
          //       link: "/sideBar/sourceCode/vue/vue2",
          //     },
          //     {
          //       text: "vue3",
          //       link: "/sideBar/sourceCode/vue/vue3",
          //     },
          //   ],
          // },
        ],
      },
      {
        text: "整理报错",
        children: [
          { text: "vuePress+gitPage", link: "/sideBar/npmPublic/vuePress.md" }
        ],
      },
      {
        text: "性能优化",
        children: [
          { text: "vuePress+gitPage", link: "/sideBar/npmPublic/vuePress.md" }
        ],
      },
    ],
    sidebarDepth: 5,
  },
};
