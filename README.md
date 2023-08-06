# DriveIndex-Web

这是 `DriveIndex` 前端的 `Vue 3` 实现，代码十分拙劣，欢迎各路大佬提交优化 PR！

## 构建

1. 项目初始化

   ```shell
   npm install
   ```

2. 配置环境变量  
i. 请在项目根目录下创建一个名为 `.env.development` 的文件(开发环境)
或 `.env.production` 的文件(生产环境)  
ii. 并配置以下环境变量:
```dotenv
# Development Environment
# Note only variable name with prefix 'DI_' will be available in the app

# The backend API base url
DI_API_BASE_URL = 'https://example.com/api'

```


3. 运行
 - 请注意,你应当先使用.env文件配置好需要的环境变量  

   ```shell
   vite
   ```

3. 打包

   ```shell
   vue-tsc && vite build
   ```

---

