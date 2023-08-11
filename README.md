# DriveIndex-Web

这是 `DriveIndex` 前端的 `Vue 3` 实现，代码十分拙劣，欢迎各路大佬提交优化 PR！

## 运行或构建

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

# The frontend access URL
# This url has to be the same as the redirect url prefix you configured in the Azure, otherwise the login will fail
# e.g. redirect url: 'https://example.com/MSALConfirm'; your DI_FRONTEND_URL should be 'https://example.com'
DI_FRONTEND_URL = 'http://localhost:5173'

```

3. 运行  
   请注意,你应当先使用.env文件配置好需要的环境变量

   ```shell
   npm run dev
   ```

4. 打包

   ```shell
   npm run build
   ```

---

