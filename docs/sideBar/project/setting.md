#### 项目setting设置： .vscode/setting
```js
{
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    "editor.fontSize": 14,
    "editor.autoClosingBrackets": "always",
    "editor.autoClosingQuotes": "beforeWhitespace",
    "editor.padding.bottom": 30,
    "editor.padding.top": 30,
    "editor.showFoldingControls": "always",
    "editor.formatOnPaste": true,
    "editor.formatOnType": false,
    "workbench.editor.highlightModifiedTabs": true,
    "explorer.sortOrder": "type",
    "extensions.closeExtensionDetailsOnViewChange": true,
    "vetur.format.options.tabSize": 4,
    "vetur.format.scriptInitialIndent": false,
    "vetur.format.defaultFormatter.js": "prettier",
    // "vetur.format.defaultFormatter.js": "vscode-typescript",
    // prettier、prettyhtml、js-beautify-html 差异较大
    "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false, // 句尾添加分号
            "singleQuote": true, // 使用单引号代替双引号
            "trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号
            "arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
            "printWidth": 120, // 超过最大值换行
            "proseWrap": "never", // markdown不强制换行
            "vueIndentScriptAndStyle": true
        },
        "prettyhtml": {
            "sortAttributes": true, // 属性排序
            "printWidth": 120 // 超过最大值换行
        }
    },
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    },
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[json]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "editor.formatOnSave": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": false
    },
    // 是否开启eslint检测
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "vue",
        "markdown"
    ],
    "eslint.run": "onType",
    "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": true,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
    "scm.repositories.visible": 20
}

```
#### .eslintrc.js
```js
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        allowImportExportEverywhere: true // ignore eslint error: 'import' and 'export' may only appear at the top level
    },
    // required to lint *.vue files
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-mutating-props': 0,
        'vue/no-use-v-if-with-v-for': 0,
        'vue/require-v-for-key': 0,
        'vue/require-valid-default-prop': 0,
        'vue/no-parsing-error': 0,
        'no-undef': 0,
        'no-prototype-builtins': 0,
        // 强制箭头函数的箭头前后使用一致的空格
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 强制在代码块中开括号前和闭括号后有空格
        'block-spacing': [2, 'always'],
        // 强制在代码块中使用一致的大括号风格
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        // 强制使用骆驼拼写法命名约定
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        // 禁止末尾逗号
        'comma-dangle': [2, 'never'],
        // 强制在逗号前后使用一致的空格
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 强制使用一致的逗号风格
        'comma-style': [2, 'last'],
        // 强制所有控制语句使用一致的括号风格，允许在单行中省略大括号，而if、else if、else、for、while 和 do，在其他使用中依然会强制使用大括号
        curly: [2, 'multi-line'],
        // 要求点操作符和属性放在同一行
        'dot-location': [2, 'property'],
        // 要求文件末尾保留一行空行
        'eol-last': [2, 'always'],
        // 要求使用 === 和 !==作相等判断，但不对null使用该规则
        eqeqeq: [
            2,
            'always',
            {
                null: 'ignore'
            }
        ],
        // 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 要求回调函数中有容错处理
        'handle-callback-err': [2, '^(err|error)$'],
        // 强制使用一致的缩进,4个空格
        indent: [
            'error',
            4,
            {
                SwitchCase: 1, // case 子句将相对于 switch 语句缩进 4 个空格
                VariableDeclarator: 1, // 多行变量声明将会缩进 4 个空格
                MemberExpression: 1, // 多行属性将将缩进 4 个空格
                ignoredNodes: ['ConditionalExpression'] // 忽略三元表达式的缩进
            }
        ],
        // "vue/script-indent": ["error", 4, {  // script标签缩进设置
        //     "baseIndent": 0,
        //     'switchCase': 1,
        // }],
        // 强制所有不包含单引号的 JSX 属性值使用单引号
        'jsx-quotes': [2, 'prefer-single'],
        // 强制在对象字面量的键和值之间使用一致的空格
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // 强制关键字周围空格的一致性
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 要求构造函数首字母大写
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        // 要求调用无参构造函数时带括号
        'new-parens': 2,
        // 禁止使用 Array 构造函数
        'no-array-constructor': 2,
        // 禁用 caller 或 callee
        'no-caller': 2,
        // 不允许修改类声明的变量
        'no-class-assign': 2,
        // 禁用 eval()
        'no-eval': 2,
        // 只在 函数表达式周围禁止不必要的圆括号
        'no-extra-parens': [2, 'functions'],
        // 禁用隐式的eval()
        'no-implied-eval': 2,
        // 禁用迭代器
        'no-iterator': 2,
        // 禁用与变量同名的标签
        'no-label-var': 2,
        // 禁用标签语句
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        // 禁用不必要的嵌套块
        'no-lone-blocks': 2,
        // 禁止使用 空格 和 tab 混合缩进
        'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
        // 禁止出现多个空格,忽略行尾注释前的多个空格
        'no-multi-spaces': [
            2,
            {
                ignoreEOLComments: true
            }
        ],
        // 禁止多行字符串
        'no-multi-str': 2,
        // 不允许多个空行
        'no-multiple-empty-lines': 2,
        // 不允许 new require
        'no-new-require': 2,
        // 禁止在字符串字面量中使用八进制转义序列
        'no-octal-escape': 2,
        // 当使用 _dirname 和 _filename 时不允许字符串拼接
        'no-path-concat': 2,
        // 禁用__proto__
        'no-proto': 2,
        // 禁止出现赋值语句，除非使用括号把它们括起来
        'no-return-assign': [2, 'except-parens'],
        // 禁止自身比较
        'no-self-compare': 2,
        // 不允许使用逗号操作符
        'no-sequences': 2,
        // 要求或禁止在函数标识符和其调用之间有空格
        'no-spaced-func': 2,
        // 限制可以被抛出的异常
        'no-throw-literal': 2,
        // 禁用行尾空白
        'no-trailing-spaces': 2,
        // 不允许初始化变量值为 undefined
        'no-undef-init': 2,
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,
        // 禁止未使用过的变量
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        // 禁用不必要的 .call() 和 .apply()
        'no-useless-call': 2,
        // 禁止在对象中使用不必要的计算属性
        'no-useless-computed-key': 2,
        // 禁用不必要的构造函数
        'no-useless-constructor': 2,
        // 禁止属性前有空白
        'no-whitespace-before-property': 2,
        // 强制函数中的变量在一起声明或分开声明
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        // 强制操作符使用一致的换行符风格
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        // 禁止块语句和类的开始或末尾有空行
        'padded-blocks': [2, 'never'],
        // 强制使用一致的反勾号、双引号或单引号
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // 禁止使用分号代替 ASI
        semi: [2, 'never'],
        // 强制分号前后有空格
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 要求语句块之前的空格
        'space-before-blocks': [2, 'always'],
        // 禁止函数圆括号之前有一个空格
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'never'
            }
        ],
        // 禁止圆括号内的空格
        'space-in-parens': [2, 'never'],
        // 要求中缀操作符周围有空格
        'space-infix-ops': 2,
        // 要求或禁止在一元操作符之前或之后存在空格
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        // 要求或禁止在注释前有空白
        'spaced-comment': [
            2,
            'always',
            {
                markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
            }
        ],
        // 强制模板字符串中空格的使用
        'template-curly-spacing': [2, 'never'],
        // 需要把立即执行的函数包裹起来
        'wrap-iife': [2, 'any'],
        // 禁止Yoda条件
        yoda: [2, 'never'],
        // 强制在花括号中使用一致的空格
        'object-curly-spacing': [
            2,
            'always',
            {
                objectsInObjects: true
            }
        ],
        // 禁止在括号内使用空格
        'array-bracket-spacing': [2, 'never']
    }
}

```
#### 项目eslint插件
```js
"eslint": "^7.20.0",
"eslint-plugin-prettier": "^3.3.1",
"eslint-plugin-vue": "^7.6.0",
"@vue/eslint-config-prettier": "^6.0.0",
"@vue/cli-plugin-eslint": "~5.0.0-beta.2",
"@babel/eslint-parser": "^7.12.16",
```

#### vscode插件
ESLint、Prettier - Code formatter

#### 本地setting
```js
{
    "git.path": "C:\\Program Files\\Git\\bin\\git.exe",
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    },
    "files.associations": {
        "*.vue": "vue"
    },
    "editor.tabCompletion": "onlySnippets",
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    // C:\\Windows\\System32\\cmd.exe,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe", // 本机安装bash地址
    "terminal.external.windowsExec": "C:\\Program Files\\Git\\bin\\bash.exe",
    /// ### [wrap_attributes]
    /// - auto: 仅在超出行长度时才对属性进行换行。
    /// - force: 对除第一个属性外的其他每个属性进行换行。
    /// - force-aligned: 对除第一个属性外的其他每个属性进行换行，并保持对齐。
    /// - force-expand-multiline: 对每个属性进行换行。
    /// - aligned-multiple: 当超出折行长度时，将属性进行垂直对齐。 
    // ### [eslint rules](https://cn.eslint.org/docs/rules/),
    "files.exclude": {
        "**/.git": false,
        // "**/.svn": true,
        // "**/.hg": true,
        // "**/CVS": true,
        // "**/.DS_Store": true
    },
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src"
    },
    "path-intellisense.extensionOnImport": true,
    "path-intellisense.autoSlashAfterDirectory": true,
    "path-intellisense.showHiddenFiles": true,
    "path-intellisense.absolutePathToWorkspace": false,
    "css.completion.completePropertyWithSemicolon": false,
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "workbench.colorTheme": "Material Theme",
    "materialTheme.accent": "Bright Teal",
    "editor.tokenColorCustomizations": {
        "[Material Theme]": {
            "comments": "#229977"
        }
    },
    // 【配置参考地址】（https://blog.csdn.net/dscn15848078969/article/details/107578108）
    "workbench.colorCustomizations": {
        "terminal.border": "#030202",
        // 编辑区域背景
        "editor.background": "#2E2E2E",
        // 侧边栏
        "sideBar.foreground": "#999",
        "sideBar.border": "#2b2b2b",
        // 侧边栏列表
        "list.inactiveSelectionBackground": "#32363d",
        "list.inactiveSelectionForeground": "#dfdfdf",
        "list.hoverBackground": "#32363d",
        "list.hoverForeground": "#dfdfdf",
        "editorError.foreground": "#ff0000"
    },
    "bookmarks.navigateThroughAllFiles": false,
    "leek-fund.funds": [
        "320007",
        "001102",
        "001632",
        "420009",
        "003096",
        "003885",
        "001071",
        "005963"
    ],
    "leek-fund.stocks": [
        "sh000001",
        "sh000300",
        "sh000016",
        "sh000688",
        "hk03690",
        "hk00700",
        "usr_ixic",
        "usr_dji",
        "usr_inx",
        "sh600109",
        "sh601012",
        "sh600276",
        "sh600906",
        "sh601919",
        "sz002385",
        "sh600703"
    ],
    "material-icon-theme.folders.theme": "specific",
    "workbench.iconTheme": "material-icon-theme",
    "material-icon-theme.folders.color": "#26a69a",
    "material-icon-theme.activeIconPack": "vue_vuex",
    "material-icon-theme.saturation": 1,
    "material-icon-theme.hidesExplorerArrows": false,
    "cSpell.allowedSchemas": [
        "file",
        "gist",
        "sftp",
        "untitled",
        "vue"
    ],
    "cSpell.diagnosticLevel": "Error",
    "cSpell.enableFiletypes": [
        "vue"
    ],
    "cSpell.userWords": [
        "antd",
        "appstore",
        "concat",
        "typeof"
    ],
    "workbench.editor.enablePreview": false,
    "editor.quickSuggestions": {
        "strings": true
    },
    "editor.fontLigatures": null,
    "terminal.integrated.automationShell.linux": "C:\\Program Files\\Git\\bin\\bash.exe",
    "gitlens.advanced.messages": {
        "suppressGitVersionWarning": true
    }
}
```