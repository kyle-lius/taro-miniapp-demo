# Taro 微信小程序 Demo

这是一个基于 Taro 框架开发的微信小程序项目，支持多端编译（微信小程序、支付宝小程序、字节跳动小程序等）。

修改API访问BaseUrl配置:
1. 修改 `/sr/config/env.ts` 文件中的 `DEV_BASE_URL` 配置项，设置 API 访问的 Base URL。

## 技术栈

- **框架**: Taro v4.1.11
- **前端库**: React v18
- **语言**: TypeScript
- **样式预处理**: Sass
- **构建工具**: Webpack 5
- **包管理**: npm

## 项目结构

```
taro-weapp-demo/
├── config/                 # Taro 配置文件
├── src/                    # 源码目录
│   ├── config/             # 项目配置
│   ├── pages/              # 页面文件
│   │   ├── index/          # 首页
│   │   ├── order-list/     # 订单列表页
│   │   ├── product-detail/ # 产品详情页
│   │   ├── product-list/   # 产品列表页
│   │   └── profile/        # 个人中心页
│   ├── utils/              # 工具函数
│   ├── app.config.ts       # 小程序全局配置
│   ├── app.ts              # 小程序入口文件
│   └── index.html          # H5 入口 HTML
├── types/                  # 类型定义
├── .env.*                  # 环境变量配置
├── babel.config.js         # Babel 配置
├── package.json            # 项目依赖配置
└── tsconfig.json           # TypeScript 配置
```

## 功能模块

- 首页 (index)
- 产品列表页 (product-list)
- 产品详情页 (product-detail)
- 订单列表页 (order-list)
- 个人中心页 (profile)

底部包含 TabBar 导航，包含产品、订单和个人中心三个主要功能模块。

## 开发环境搭建

1. 安装 Node.js (建议版本 >= 16.x)
2. 安装项目依赖：

```bash
npm install
```

## 启动项目

### 开发模式

根据不同平台启动开发服务器：

```bash
# 微信小程序
npm run dev:weapp

# 支付宝小程序
npm run dev:alipay

# 字节跳动小程序
npm run dev:tt

# 百度小程序
npm run dev:swan

# QQ 小程序
npm run dev:qq

# 京东小程序
npm run dev:jd

# H5
npm run dev:h5

# React Native
npm run dev:rn
```

### 构建生产版本

```bash
# 构建微信小程序
npm run build:weapp

# 构建其他平台...
npm run build:alipay
npm run build:tt
npm run build:swan
npm run build:h5
# ... 其他平台
```

## 代码规范

- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码检查
- 使用 Stylelint 进行样式检查
- 提交代码前自动格式化代码
- 使用 Husky 和 lint-staged 进行提交前检查

## 依赖说明

### 核心依赖

- `@tarojs/taro`: Taro 核心库
- `@tarojs/components`: Taro 组件库
- `@tarojs/runtime`: Taro 运行时
- `react`: React 库
- `react-dom`: React DOM 操作库

### 开发依赖

- `@tarojs/cli`: Taro 命令行工具
- `@tarojs/webpack5-runner`: Webpack 5 运行器
- `typescript`: TypeScript 编译器
- `sass`: Sass 预处理器
- `eslint`: JavaScript 代码检查工具
- `husky`: Git Hooks 工具

## 注意事项

1. 开发前确保已安装 Taro CLI (可通过 `npm install -g @tarojs/cli` 安装)
2. 微信小程序开发需在微信开发者工具中打开 dist/weapp 目录
3. 项目支持多端编译，编写一次代码可发布到多个平台
4. 所有页面路径已在 app.config.ts 中配置

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交你的代码
4. 发起 Pull Request
