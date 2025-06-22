# 房产中介管理系统 - 管家后台

## 项目简介

房产中介管理系统是一个基于Vue 3 + Element Plus的现代化管理系统，专为房产中介公司设计，提供公寓管理、房间管理、用户管理等功能。

## 技术栈

- **前端框架**: Vue 3.3.4
- **路由管理**: Vue Router 4.2.4
- **状态管理**: Vuex 4.1.0
- **UI组件库**: Element Plus 2.3.8
- **HTTP客户端**: Axios 1.4.0
- **样式预处理**: Sass
- **构建工具**: Vue CLI 5.0.8

## 功能特性

### 已实现功能
- ✅ 用户认证与授权
- ✅ 响应式布局设计
- ✅ 侧边栏导航
- ✅ 面包屑导航
- ✅ 标签页管理
- ✅ 仪表盘统计
- ✅ 404错误页面
- ✅ 登录页面

### 待实现功能
- 🔄 公寓管理（列表、新增、编辑、删除）
- 🔄 房间管理（列表、新增、编辑、删除）
- 🔄 用户管理（列表、新增、编辑、删除）
- 🔄 文件上传
- 🔄 数据导入导出
- 🔄 图表统计
- 🔄 权限管理

## 项目结构

```
rent-home-admin/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API接口
│   │   ├── auth.js        # 认证相关接口
│   │   ├── apartment.js   # 公寓管理接口
│   │   ├── room.js        # 房间管理接口
│   │   └── user.js        # 用户管理接口
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   │   ├── Breadcrumb/    # 面包屑组件
│   │   └── SvgIcon/       # SVG图标组件
│   ├── layout/            # 布局组件
│   │   ├── components/    # 布局子组件
│   │   │   ├── Navbar.vue # 头部导航
│   │   │   ├── Sidebar/   # 侧边栏
│   │   │   ├── TagsView/  # 标签页
│   │   │   └── AppMain.vue # 主内容区
│   │   └── index.vue      # 主布局
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由主文件
│   ├── store/             # 状态管理
│   │   ├── modules/       # 状态模块
│   │   │   ├── user.js    # 用户状态
│   │   │   ├── app.js     # 应用状态
│   │   │   └── permission.js # 权限状态
│   │   └── index.js       # 状态主文件
│   ├── styles/            # 样式文件
│   │   ├── variables.scss # 样式变量
│   │   ├── mixin.scss     # 样式混入
│   │   ├── transition.scss # 过渡动画
│   │   ├── element-ui.scss # Element UI样式覆盖
│   │   ├── sidebar.scss   # 侧边栏样式
│   │   └── index.scss     # 全局样式
│   ├── utils/             # 工具函数
│   │   ├── request.js     # HTTP请求封装
│   │   ├── auth.js        # 认证工具
│   │   └── validate.js    # 验证工具
│   ├── views/             # 页面组件
│   │   ├── login/         # 登录页面
│   │   ├── dashboard/     # 仪表盘
│   │   ├── apartment/     # 公寓管理页面
│   │   ├── room/          # 房间管理页面
│   │   ├── user/          # 用户管理页面
│   │   ├── system/        # 系统管理页面
│   │   └── error/         # 错误页面
│   ├── App.vue            # 根组件
│   ├── main.js            # 入口文件
│   └── permission.js      # 权限控制
├── .env.development       # 开发环境配置
├── .env.production        # 生产环境配置
├── vue.config.js          # Vue配置文件
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
cd rent-home-admin
npm install
```

### 开发环境运行

```bash
npm run serve
# 或
npm run dev
```

访问 http://localhost:8080

### 生产环境构建

```bash
npm run build
# 或
npm run prod
```

### 代码检查

```bash
npm run lint
```

## 开发指南

### 添加新页面

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/index.js` 中添加路由配置
3. 在 `src/api/` 下添加相关API接口
4. 在 `src/store/modules/` 下添加状态管理（如需要）

### 添加新组件

1. 在 `src/components/` 下创建组件
2. 在需要使用的页面中导入并使用

### 样式开发

- 使用SCSS编写样式
- 遵循BEM命名规范
- 响应式设计优先
- 使用CSS变量管理主题色

### API接口

- 统一使用 `src/utils/request.js` 封装的axios实例
- 接口文件按模块划分在 `src/api/` 目录下
- 使用JSDoc注释说明接口参数和返回值

## 部署说明

### 开发环境

```bash
# 启动开发服务器
npm run serve
```

### 生产环境

```bash
# 构建生产版本
npm run build

# 部署dist目录到Web服务器
```

### Docker部署

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目维护者: Your Name
- 邮箱: your.email@example.com
- 项目地址: https://github.com/your-username/rent-home-admin

## 更新日志

### v1.0.0 (2024-01-15)
- ✅ 初始化项目结构
- ✅ 配置Vue 3 + Element Plus
- ✅ 实现基础布局组件
- ✅ 添加用户认证功能
- ✅ 创建仪表盘页面
- ✅ 配置路由和状态管理 