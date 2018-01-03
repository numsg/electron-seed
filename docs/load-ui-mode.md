# shell工程加载UI资源两种方式
这里会介绍壳工程加载UI资源的两种不同方式，调试模式加载，发布模式加载。

## 调试模式加载
现在我们实现了shell工程和UI工程的分离，但UI工程又是在壳里面渲染的，那么为了方式两个工程的联合调试，我们推荐使用调试模式加载。使用方式如下。

1. 在config.json文件节点找到debug_config,将isDebug设置为ture，将loadURL指向UI工程宿主的web服务。
```
"debug_config": {
  "isDebug": true,
  "isShowDevTools": true,
  "loadURL": "http://localhost:8080/"
}
``` 
```
if(configData.debug_config.isDebug){
  mainWindow.loadURL(configData.debug_config.loadURL); 
  //Open the DevTools.
  if(configData.debug_config.isShowDevTools){
    mainWindow.webContents.openDevTools()
  }
}else{
  //and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../../../resource/index.html`);
}
``` 
2. 在ui工程执行npm start(在ui工程中我们通常会使用webpack宿主一个web服务),宿主一个web服务。
3. 在壳工程执行npm start 启动壳程序。
4. 到此就可以达到两个工程交互时调试。

## 发布模式加载
shell工程最后发布后会通过加载本地资源的方式来加载UI资源，把UI资源发布成一个npm包，组织成shell工程的本地资源。使用方式如下。

1. 在config.json文件节点找到debug_config,将isDebug设置为false。
```
"debug_config": {
  "isDebug": true,
  "isShowDevTools": true,
  "loadURL": "http://localhost:8080/"
}
``` 
```
if(configData.debug_config.isDebug){
  mainWindow.loadURL(configData.debug_config.loadURL); 
  //Open the DevTools.
  if(configData.debug_config.isShowDevTools){
    mainWindow.webContents.openDevTools()
  }
}else{
  //and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../../../resource/index.html`);
}
``` 
2. 执行npm run build,运行shell-seed.exe。

