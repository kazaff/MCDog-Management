该项目是[mosquito-coil-dog](https://github.com/kazaff/mosquito-coil-dog)的配套管理后台界面。

基于[vue-admin](https://github.com/taylorchen709/vue-admin)的UI设计。

### 运行

1. 下载项目源文件到本地
2. 在该目录下执行`npm run dev`

也可以执行`npm run build`，然后将`dist`文件夹下打包好的文件放在webserver的根目录。

### snapshot

![](https://github.com/kazaff/MCDog-Management/blob/master/docs/login.png)

请使用[MCDog](https://github.com/kazaff/mosquito-coil-dog/blob/master/config.js#L17-L18)中的对应配置认证信息来登录。

![](https://github.com/kazaff/MCDog-Management/blob/master/docs/list.png)

![](https://github.com/kazaff/MCDog-Management/blob/master/docs/add.png)

### 注意

请修改该项目的[api.js](https://github.com/kazaff/MCDog-Management/blob/master/src/api/api.js#L3)中的配置，请匹配[MCDog](https://github.com/kazaff/mosquito-coil-dog/blob/master/config.js#L15-L16)中的设置。
