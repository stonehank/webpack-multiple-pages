灵感和部分框架来自:[@Array-Huang/webpack-seed](https://github.com/Array-Huang/webpack-seed)

---

* [目录结构](#目录结构)
* [使用的插件](#使用的插件)
* [页面包含的参数](#页面包含的参数)
* [页面命名规则](#页面命名规则)
* [图片编译问题](#图片编译问题)
* [如何使用多语言](#如何使用多语言)
* [关于主题和CSS变量](#关于主题和CSS变量)
* [关于公共路径publicPath](#关于公共路径publicPath)
* [注意事项](#注意事项)

### 能解决的问题：

1. 多页面解决方案
2. 多语言解决方案
3. 多框架解决方案
4. SEO解决方案

### 特性：

1. 支持框架，对每一个页面可选择`React`, `Vue`或者不含任何框架
2. 使用`ejs`模板和`layout`(用于将页面分割成多个组件并且自由搭配，概念来源于`webpack-seed`)
3. 每个页面都配有单独的`js`和`css`，同时也配有公共`js,css`，项目维护更加友好
4. 默认配置好`Webpack`压缩优化，分割`js,css`(`min-chunks:4`)及`core-js`兼容规则
5. 配置light/dark主题模式
6. 自动编译图片并且更名(可以设置长效缓存)，并且自动压缩优化
7. **目前文件路径最多支持2层嵌套！**

### 目录结构

```
├─ .babelrc # babel配置
├─ .eslintrc # eslint配置
├─ .gitignore # gitignore配置
├─ dist # 输出文件夹
│    ├─ assets
│    │    ├─ css # 放置公共assets
│    │    ├─ font # 放置公共font
│    │    ├─ images # 放置公共images
│    │    ├─ js # 放置公共js
│    │    └─ vector # 放置公共svg
│    ├─ index.html # 主要语言输出Html
│    └─ zh # 其他语言输出Html
│         └─ index.html
├─ locales # 关于语言的处理
│    ├─ config.js # 语言的配置
│    ├─ english.js # 对应每种语言的页面变量
│    ├─ chinese.js
│    └─ index.js
├─ package.json # npm的配置文件
├─ postcss.config.js # postcss配置，用于css兼容及优化
├─ src # 开发文件夹
│    ├─ assets # 放置开发时公用资源
│    │    ├─ css
│    │    │    ├─ _variables.scss # 存放变量
│    │    │    └─ common.scss # 一些通用样式
│    │    └─ js
│    │           ├─ cacheControl.js # cookie读取与写入工具
│    │           └─ themeDetect.js # 检测当前主题
│    ├─ pages # 放置页面
│    │    └─ index # 页面名称
│    │           ├─ content-prefix.ejs # 页面内容1
│    │           ├─ content.ejs # 页面内容2
│    │           ├─ content-suffix.ejs # 页面内容3 
│    │           ├─ html.js # 用于将页面内容传递给webpack进行编译(不需要修改)
│    │           └─ src # 页面独立资源，webpack默认从index.js读取
│    │                  ├─ App.js
│    │                  ├─ index.js
│    │                  └─ style.scss
│    └─ public-resource  # 各个页面使用到的公共资源
│           ├─ components # 组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
│           │    ├─ external-links # 外部链接，例如<link href='//fontawesome.css'/>
│           │    │    ├─ html.ejs # 组件内容
│           │    │    ├─ index.js # 组件js
│           │    │    └─ style.scss # 组件css
│           │    ├─ footer # 页脚
│           │    ├─ header # 放置<html>标签，用于定义不同语言的lang属性
│           │    ├─ meta # 放置页面公用的meta信息
│           │    └─ top-nav # 菜单
│           ├─ layout # UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
│           │    ├─ common-layout
│           │    │    ├─ html.ejs # 具体布局格式
│           │    │    └─ html.js # 获取布局变量并且传递给html.ejs
│           │    └─ special-layout
│           └─ logic # 放置layout通用的逻辑
│                  └─ common.common-layout.js 
├─ webpack-config
│    ├─ base
│    │    ├─ dir-vars.config.js
│    │    └─ page-entries.config.js
│    ├─ config.js # webpack的一些配置
│    ├─ entry.config.js # webpack entry的配置
│    ├─ module.config.js # webpack module配置
│    ├─ optimization.config.js # webpack optimization配置
│    ├─ plugins.config.js # webpack plugin配置
│    └─ resolve.config.js # webpack resolve配置
└─ webpack.config.js # webpack配置
```

### 使用的插件

* WebpackBar：webpack打包进度条可视化
* CleanWebpackPlugin：打包前清除输出文件夹
* BundleAnalyzerPlugin：打包文件分析
* ScriptExtHtmlWebpackPlugin：将`<script>`添加`defer`
* PurgecssPlugin：`css`摇树优化，只打包使用的`css`
* ~~DuplicatePackageCheckerPlugin：检测项目中存在的重复`package`~~
* ProvidePlugin：项目中全局使用
* ImageCompressPlugin：项目打包完毕后，开始优化压缩图片
* CopyPlugin：仅拷贝某些文件
* MiniCssExtractPlugin：分离打包`css`
* HtmlWebpackPlugin：处理`ejs`模板内容
* friendly-errors-webpack-plugin：精简的显示`webpack`编译信息

### 页面包含的参数

参数为每个页面模板内部可调用的变量(包括公共组件)

```
publicPath: 项目的公共路径,
language 当前页面使用的语言名称，例如`chinese,english`
prefixPath 当前页面的根链接，例如对url编写只需要写出相对路径，`<%= pathPrefix %>/someFolder/index.html`
pageLocalesName 当前页面的页面文件名称,
folderLocalesName1 当前页面的祖父文件夹名称(如果有),
folderLocalesName2 当前页面的父文件夹名称(如果有),
curLang 当前页面使用的语言变量，如果页面位置`/folder/sub-1.html`，那么当前curLang只会提供`sub-1.html`
$t 提供整个项目的语言变量
```

* Q: 什么是页面参数

    A: 以上的变量名可以在`ejs`模板中直接使用，语法为`<%= 变量名 %>`

* Q: `publicPath`和`prefixPath`的不同？

    A: `publicPath`即公共路径，指的是`webpack-config/config`内填写的公共路径，而`prefixPath`，包括公共路径和当前文件夹的组合；
        
    例如，在路径`cn/folder/page1.ejs`中，
    
    `publicPath`仅仅为`https://www.xxx.com`，
    
    `prefixPath`则为`https://www.xxx.com/cn/folder`

* Q: `curLang`和`$t`的区别？

    A: `$t`是全项目的语言对象引用，而`curLang`仅仅指当前页面的语言对象引用，具体参考[如何使用多语言](#如何使用多语言) 
   
* Q: `folderLocalesName1`, `folderLocalesName2`, `pageLocalesName`的用途

    A: 这3个变量提示了当前页面的具体路径，对于需要使用`面包屑`会比较方便，其中`pageLocalesName`必定存在，
    `folderLocalesName1`在1层嵌套是存在，`folderLocalesName2`在2层嵌套时存在。
        
    例如：
    
    ```
    路径: folder/page1/page1-1.ejs(2层嵌套)
    folderLocalesName1:folder
    folderLocalesName2:page1
    pageLocalesName:page1-1
    
    路径: folder/page2.ejs(1层嵌套)
    folderLocalesName1:folder
    folderLocalesName2:null
    pageLocalesName:page2
    
    路径: page3.ejs(无嵌套)
    folderLocalesName1:null
    folderLocalesName2:null
    pageLocalesName:page3
       
    ```
    
### 页面命名规则

如果当前页面存在子页面，使用`folder-`前缀命名；

如果当前页面只需要1种主要语言，使用`not-translate-`前缀命名

命名顺序`"not-translate-" => "folder-" `

例如：

```
-- page1
文件夹命名：page1

-- folder1
  |-- **
  |__ **
文件夹命名：folder-folder1

-- 404(不需要翻译成多语言)
文件夹命名：not-translate-404

-- folder2(内部所有页面都不需要翻译)
文件夹命名：not-translate-folder-folder2
```
    
### 图片编译问题
    
让图片被`webpack`编译并且提供`hash`名，图片引用分3种情况

* 图片通过`js`引用

    通过`require()`引用。
    
* 图片通过`ejs[即html]`引用

    由于`ejs`同样会被`webpack`编译，因此，可以直接当成`js`一样，通过`require()`引用原始图片位置。

* 图片通过`css`引用
    
    样式文件不需要使用`require`，因此在样式文件中，通过原始路径获取图片，`webpack`会自动检测编译和引用。
    
### 如何使用多语言

`webpack`编译时，会将当前页面对应的语言文字嵌入到页面模板`ejs`中，在模板中即可调用`<%= curLang.xxx %>`调用当前页面的语言，
也可通过`<%= $t.pageName.xxx %>`来调用任意页面的语言(其中`curLang`储存当前页面的语言变量，`$t`储存整个项目的语言变量)

1. 在`locales`文件夹中`config.js`配置当前项目的主要语言和其他语言

    ```
    {
        "primaryLang": "english",   
        "otherLangList": [
        "chinese",
        "french"
        ],
        "languageUrlStr": {     // 语言对应的路径名称，用于创建语言的文件夹路径名
            "english": "",
            "chinese": "/zh",
            "french": "/fr"
        },
        "isoCode": {            // 语言iso代码，用于填充html标签lang属性
            "english": "en",
            "chinese": "zh",
            "french": "fr"
        },
    }
    ```
2. 在语言文件，配置每个页面的语言变量和`meta`信息
    
   格式如下：
   ```
   /* chinese.js */
   {
        'top-nav':{                 // 公共组件
            home:'首页',            // 语言变量
            aboutUs:'关于',         // 语言变量
        },   
        'footer':{                  // 公共组件
            quickLinks:'快速链接'    // 语言变量
        },
        ...
        pages:{                     // 具体页面的语言(页面名称及文件夹命名)
            index:{ ... },          // index 为页面名称，内部编写具体的语言变量
            'page-1':{ ... }        // page-1 为页面名称
        }
   }
   ```
    
### 关于主题和CSS变量

目前预设`light`和`dark`主题，在`src/assets/css/_variables.scss`中配置

所有主题颜色均建立在`class`名为`theme-light`或者`theme-dark`之下，通过切换`<html>`的`class`来打到配置各种色彩方案，

默认已经配置`JS`检测`cookie`，并且根据缓存自动切换，具体可参考`assets/js/themeDetect.js`



### 关于公共路径publicPath

用于解决发布和开发公共前缀不一致的问题
* 资源路径(图片, svg, 字体, css, js等)，通过`webpack`自动配置
* 链接路径(a标签)，需要通过手动配置，添加路径前缀添加`prefixPath`
    
    例如：
    ```
    before: <a href="/about.html">About</a>  
    after:  <a href="<%= prefixPath %>/about.html">About</a>
    ```
    其中`<%= prefixPath %>`是`ejs`模板中变量写法
    
    
### 注意事项

* `PurgecssPlugin`对一些复杂组合的`css`类名无法检测，例如(**默认已关闭**)
    ```js
    let direction='hor'
    let clz1='clz1'
    let clz2='clz1'
    let classNames=[]
    classNames.push(clz1+'-'+direction,clz2)
    $ele.addClass(classNames.join(' '))
    ```
    在上面示例中, `.clz1-hor`无法被解析，因此需要根据项目具体内容判断是否需要此插件
    
* `dll`并不是必须，目前`dll`的配置是统一打包到一个文件`dll.js`(**默认已关闭**)

更加优化的做法是每个页面只引入需要的`dll`，因此通常做法是在`dll`配置使用多入口(`webpack.dll.config.js`)。

    例如:
    ```
    // 在react页面则不需要引入vue-dll.js
    entry: {
        common-dll: [
          'jquery',
          'core-js'
        ],
        vue-dll: [
          'vue'
        ],
        react: [
          'react',
          'react-dom'
        ]
      }
    ```
