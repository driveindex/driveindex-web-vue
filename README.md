# DriveIndex-Web

这是 `DriveIndex` 前端的 `Vue.js 3` 实现，代码十分拙劣，欢迎各路大佬提交优化 PR！

## 开发环境

+ IDE：JetBrains IDEA Ultimate 2022.2.1
+ Vue.js：3.5.0

## 构建

自行构建需要 `Nodejs` 和 `Vue.js`，请自行查阅安装方法。

1. 项目初始化：

   ```shell
   npm install
   ```

2. 运行

   ```shell
   npm run dev
   ```

3. 打包

   ```shell
   npm run build
   ```
---

## TODO:

+ [ ] Breadcrumb nav 跳转方式重写 （@click）
+ [ ] direct重写到util，每次导航完成需要重置store的page_index
+ [ ] Admin页面：判断是否已经登录，未登录则跳转到登录页面
+ [ ] AdminPanel管理页面
+ [ ] AdminLogin登录页面
+ [ ] Pager，item number选择器重写
+ [ ] i18n，scope问题
+ [ ] 路由：若不匹配main和admin，应该跳转到？
   
