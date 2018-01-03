# shell-electron-seed

## 1. 说明
这是一个壳模板工程，使用的核心技术是electron，可以使用url方式或者本地资源的方式加载UI资源。

## 2. 环境准备

1. 源码管理：SmartGit
*  开发IDE：vscode
*  包管理：nodejs环境 及npm
*  壳： electron

## 3. 快速指南
*  安装electron方法有两种
      1. 在.npmrc中配置electron镜像路径,指定安装electron版本
      ```
      ELECTRON_MIRROR=http://localhost/nexus/content/sites/gs-assets/electron/1.6.11/electron-v1.6.11-win32-x64.zip
      ```
      ```
      npm install electron@1.6.11 -g
      ```
      2. :star: 在package.json中script中添加：
      ```
      "preinstall": "npm run install-electron",
      "install-electron": "npm install electron@1.6.11 --ELECTRON_MIRROR=http://localhost/nexus/content/sites/gs-assets/electron/"
      ```
*  使用git Clone源码
*  执行npm install
*  执行npm run build
*  运行build\output\electron-seed-win32-x64目录下electron-seed.exe即可
*  执行npm run dist可以生成window平台下的exe安装包

## 4. 特性

* [种子工程加载方式](./docs/load-ui-mode.md)
* [main(brower)线程全局异常处理方式](./docs/exception-handler.md)
* [主线程与render线程交互](./docs/load-ui-mode.md)
*  karma单元测试(与webpack结合)
*  单元测试覆盖率与jenkins整合
*  electron 无边框
*  electron 多屏(登录屏与主屏)
*  electron-packager打包electron程序
*  winston日志组件
*  质量控制及与sonarQuber平台整合
*  持续构建
*  加载owlet5-seed工程
*  git提交执行构建任务控制
*  git提交谓词控制

## 5. 开发文档
暂无！

## 6. electron-seed工程结构图及说明

本目录符合npm结构，其中build、dist、node_modules目录不受版本控制。

```
electron-seed/
  |- build/                                        - 应用输出目录，类似于Debug
  |  |- output/                                    - electron 打包后的输出目录
  |  |  |- electron-seed-win32-x64                 - windows 打包输出目录
  |  |  |  |- locales/                             - 
  |  |  |  |- resources/                           - asar 文件目录
  |  |  |  |  |- app.asar.unpacked/                - 该目录存放壳相关配置文件
  |  |  |  |  └─ electron.asar                     - 壳相关代码文件
  |  |  |  |- ...                 	      		     - eclectron 依赖文件
  |  |  |  └─ electron-seed.exe                    - 可执行程序
  |  |- reports/                                   - 测试报告输出目录
  |  |  |- karma/                                  - 
  |  |  |  └─ lcov.info                            - 测试覆盖率相关信息
  |  └─ temp/                                      - 打包依赖文件临时目录
  |- config/                                       - 工程配置相关脚本
  |  |- gulp/                                      - gulp构建相关脚本
  |  |- jenkins/                                   - jenkins依赖脚本目录
  |  |- gulp.config.js                             - gulp配置脚本
  |  └─ helpers.js                                 - js通用库
  |- dist/                                         - 应用发布目录
  |  |- electron-seed-win32-x64/                   - electron 制作安装包发布目录
  |  |  |- electron-seed-v0.1.1-alpha-setup        - 安装文件
  |  |  |- electron-seed-0.1.1-alpha-full.nupkg    - 安装文件依赖包
  |  |  └─ RELEASES                                - 安装文件依赖包标识和增量更新关系
  └─ docs/                                         - 文档相关目录
  |- node_modules/                                 - 依赖的第三方node组件
  |  |- @gsafety/                                  - 自定义上传的npm包
  |  |- gulp/
  |  |- webpack/
  |  └─ <other npm modules>/                       - 
  |- src/                                          - 源代码目录
  |  |- app                                        - shell 配置文件
  |  |  |- common                                  - 通用模块
  |  |  |  |- config.js                            - 配置管理
  |  |  |  |- electron-install.js                  - electron 安装、更新、卸载事件
  |  |  |  |- exceptionHandler.js                  - 主线程未捕获异常处理
  |  |  |  └─ logger.js                            - 日志处理
  |  |  |- ipc-handler                             - 通信模块
  |  |  |  |- ipc-handler.js                       - 消息处理
  |  |  |  └─ ipc.json                             - 消息主题配置
  |  |  |- main-process                            - 主线程处理业务模块
  |  |  |  └─ main-window.js                       - 主窗体
  |  |- config.json                                - 壳程序配置
  |  └─ main.js                                    - 主线程处理入口
  |- test/                                         - 应用发布目录
  |  |- e2e/                                       - e2e测试
  |  |- render/                                    - 渲染进程相关js测试
  |  └─ unit                                       - 单元测试
  |- .gitattributes                                - git属性配置
  |- .gitignore                                    - git忽略配置
  |- shell.ico                                     - 系统图标
  |- CHANGELOG.md                                  - 版本变更历史
  |- gulpfile.js                                   - 构建配置任务
  |- index.js                                      - 程序入口(直接导出main入口)
  |- karma.conf.js                                 - karma 配置文件
  |- karma.shim.js                                 - karma shim配置
  |- package.json                                  - npm包配置文件
  └─ README.md                                     - 项目的基本说明
```

## 6.其它