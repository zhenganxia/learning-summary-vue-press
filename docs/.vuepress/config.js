module.exports = {
  title: "峖小虾技术网站",
  description: "",
  base: "/learning-summary-vue-press/", // 设置站点根路径和github项目名称保持一致
  plugins: [ // 配置插件
    'demo-container',
    'vuepress-plugin-cat',
    "@vuepress/nprogress",
    "vuepress-plugin-nuggets-style-copy",
    {
      copyText: "复制代码",
      tip: {
        content: "复制成功",
      },
    },
    "@vuepress/active-header-links",
      {
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
      },

   "@vuepress-reco/vuepress-plugin-bgm-player",
   {
    audios: [
      // 本地文件示例
      {
        name: '장가갈 수 있을까',
        artist: '咖啡少年',
        url: '/bgm/1.mp3',
        cover: '/bgm/1.jpg'
      },
      // 网络文件示例
      {
        name: '강남역 4번 출구',
        artist: 'Plastic / Fallin` Dild',
        url: 'https://assets.smallsunnyfox.com/music/2.mp3',
        cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
      },
      {
        name: '用胳膊当枕头',
        artist: '최낙타',
        url: 'https://assets.smallsunnyfox.com/music/3.mp3',
        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
      }
    ]  
    // audios: [
    //    {
    //      //名字
    //      name: "错位时空",
    //      //作者
    //      artist: "艾辰",
    //      //地址
    //      url: "http://m801.music.126.net/20230721172406/ed9aa8d356bf9be3506a4c935d68eb0c/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/15755693612/b983/5f8b/4f00/60764f5cd06ba4482d98842a58e69d69.mp3",
    //      //封面图片
    //      cover:
    //        "https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200",
    //    },
    //  ],
    //  autoplay:true,
    //  // 是否默认缩小
    //  autoShrink: true,
    //  // 缩小时缩为哪种模式
    //  shrinkMode: "float",
    //  // 悬浮窗样式
    //  floatStyle: { bottom: "30px", "z-index": "999999" },
   },
    '@vuepress/plugin-google-analytics',
    'reading-progress'
  ],
  head: [
    ['link',
      { rel: 'icon', href: '/images/headericon.png' }
    ],
  ],
  themeConfig: {
    logo: '/images/headericon.png',
    nav: [
      {
        text: "日常工具",
        items: [
          { text: "Json在线解析", link: "https://www.json.cn/" },
          { text: "Can i use", link: "https://caniuse.com/?search=flex-start/" },
          { text: "MDN", link: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content/" },
        ],
      },
      {
        text: "微前端",
        items: [
          { text: "single-spa", link: "https://single-spa.js.org/docs/getting-started-overview" },
          { text: "qiankun", link: "https://qiankun.umijs.org/zh/guide" },
          { text: "webpack模块联邦", link: "https://webpack.docschina.org/concepts/module-federation/" }
        ],
      },
      {
        text: "关注",
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
            text: "适配",
            items: [
              { text: "postcss-pxtorem", link: "https://www.npmjs.com/package/postcss-pxtorem/" },
              { text: "postcss-px2rem", link: "https://www.npmjs.com/package/postcss-px2rem/" },
              { text: "postcss-plugin-px2rem", link: "https://www.npmjs.com/package/postcss-plugin-px2rem/" },
            ],
          },
        ],
      }
    ],
    sidebar: {
      '/project/': [
        {
          title: "项目搭建基础",
          collapsable: false,
          children: [
            { title: "axios", path: "project/axios" },
            { title: "全局数据引入", path: "project/problem" },
            { title: "全局组件", path: "project/directive" },
            { title: "工具", path: "project/until" },
          ],
        },
        {
          title: "问题整理",
          collapsable: false,
          children: [
            {
              title: "vue2",
              children: [
                {
                  title: "view design",
                  path: "problem/iview",
                },
                {
                  title: "element",
                  path: "problem/element",
                },
                {
                  title: "vue2常见问题",
                  path: "problem/vue2",
                },
                {
                  title: "vue3常见问题",
                  path: "problem/vue3",
                },
                {
                  title: "数据结构处理",
                  path: "problem/data",
                },
                {
                  title: "上传/下载",
                  path: "problem/download",
                },
              ],
            },
          ],
        },
        {
          title: "组件封装-二次封装",
          collapsable: false,
          children: [
            {
              title: "vue2+element",
              collapsable: false,
              children: [
                {
                  title: "list",
                  path: "vue2/list",
                },
                {
                  title: "select",
                  path: "vue2/select",
                }
              ],
            },
            {
              title: "vue3+element-plus",
              collapsable: false,
              children: [
                {
                  title: "Table",
                  path: "vue3/XdTable",
                },
                {
                  title: "RenderComponent",
                  path: "vue3/RenderComponent",
                },
                {
                  title: "Select",
                  path: "vue3/XdSelect",
                },
                {
                  title: "Space",
                  path: "vue3/XdSpace",
                },
                {
                  title: "ListView",
                  path: "vue3/XdListView",
                },
                {
                  title: "Form",
                  path: "vue3/XdForm",
                },
                {
                  title: "Pagination",
                  path: "vue3/XdPagination",
                },
                {
                  title: "Area",
                  path: "vue3/XdArea",
                },
                {
                  title: "UploadImage",
                  path: "vue3/XdUploadImage",
                },
                {
                  title: "DateTimeRange",
                  path: "vue3/XdDateTimeRange",
                }
              ],
            },
          ],
        },
        {
          title: "三方插件使用",
          collapsable: false,
          children: [
            { title: "video", path: "plugins/video" },
            { title: "audio", path: "plugins/audio" },
            { title: "vue-awesome-swiper", path: "plugins/swiper" },
            { title: "模拟swiper前进后退", path: "plugins/custom" },
            { title: "Tinymce", path: "plugins/tinymce" },
          ],
        },
        {
          title: "VSCODE",
          collapsable: false,
          children: [
            {
              title: "设置",
              collapsable: false,
              children: [
                {
                  title: "代码片段",
                  path: "vscode/setting/codeSnippet",
                },
                {
                  title: "linux终端",
                  path: "vscode/setting/linuxTerminal",
                },
                { title: "setting+vscode", path: "vscode/setting/settings" },
              ],
            },
          ],
        },

      ],

      '/learning/': [
        {
          title: "扩展",
          collapsable: false,
          children: [
            { title: "vuePress+gitPage", path: "npmPublic/vuePress" },
            { title: "docsify", path: "npmPublic/docsify" },
            { title: "ModuleFederation", path: "npmPublic/ModuleFederation" }
          ],
        },
        {
          title: "源码",
          collapsable: false,
          children: [
            { title: "promise", path: "sourceCode/promise" },
            { title: "axios", path: "sourceCode/axios" },
            {
              title: "vue",
              children: [
                {
                  title: "vue2",
                  path: "sourceCode/vue/vue2",
                },
                {
                  title: "vue3",
                  path: "sourceCode/vue/vue3",
                },
              ],
            },
          ],
        },
        {
          title: "算法",
          collapsable: false,
          children: [
            { title: "数据结构", path: "algorithm/data" },
            { title: "求和", path: "algorithm/sum" },
            { title: "排序", path: "algorithm/sort" },
            { title: "其他", path: "algorithm/others" }
          ],
        },
      ],

      '/unitUrl/': [
        {
          title: '命令',
          // sidebarDepth: 2, // 这里对侧边栏目录显示的标题级别深度起作用
          collapsable: false,
          children: [
            { title: 'git/npm/linux', path: 'commoned/git' },
            { title: 'nrm/nvm', path: 'commoned/nrm' },
            { title: 'submodule', path: 'commoned/submodule' },
            { title: 'markdown', path: 'commoned/markdown' },
            { title: '复制当前仓库为新仓库', path: 'commoned/new' },
            { title: 'gitError', path: 'commoned/gitError' },
          ]
        },
        // {
        //   title: "插件地址",
        //   collapsable: true,
        //   path: "pluginsUrl/url"
        // },
        {
          title: "性能优化",
          collapsable: false,
          children: [
            { title: "webpack", path: "performanceOptimization/webpack" },
            { title: "长列表优化", path: "performanceOptimization/list" },
            { title: "其他", path: "performanceOptimization/others" },
            { title: "检测分析页面性能", path: "performanceOptimization/plugin" },
          ],
        },
        {
          title: "设计模式",
          collapsable: false,
          children: [
            { title: "优化", path: "designMode/optimization" },
            { title: "对象", path: "designMode/object" },
            { title: "其他", path: "designMode/others" },
          ],
        },
        {
          title: "跨域",
          collapsable: false,
          children: [
            { title: "跨域", path: "crossDomain/cors" },
            { title: "nginx", path: "crossDomain/nginx" }
          ],
        },
        {
          title: "兼容",
          collapsable: false,
          path: "compatibility/js"
        },
        {
          title: "vue3",
          collapsable: false,
          children: [
            { title: "vue3改变", path: "vue3/performance" }
          ],
        },
        {
          title: "JavaScript",
          collapsable: false,
          children: [
            { title: "队列", path: "js/queueing.md" },
            { title: "js", path: "js/js.md" },
            // { title: "es6", path: "/sideBar/js/es6" },
          ],
        },
        {
          title: "node",
          collapsable: false,
          children: [
            { title: "node", path: "node/node" },
            { title: "服务端", path: "node/server" }
          ],
        },
      ],
      '/cssUrl/': [
        {
          title: 'css',
          // sidebarDepth: 2, // 这里对侧边栏目录显示的标题级别深度起作用
          collapsable: false,
          children: [
            { title: '常见', path: 'commoned/daily' },
            { title: '炫酷', path: 'commoned/individuality' },
          ]
        }
      ]
    }
  },
};
