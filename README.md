# QuickCart 🛒

A modern e-commerce platform built with Next.js 15, providing a complete online shopping experience.

[中文版本 / Chinese Version](#中文版本)

## ✨ Key Features

### 🛍️ User Features
- **Product Browsing** - Browse and search product catalog
- **Shopping Cart Management** - Add, remove, and modify cart items
- **User Authentication** - Secure login system powered by Clerk
- **Order Management** - Place orders, view order history, and track status
- **Address Management** - Add and manage shipping addresses
- **Responsive Design** - Perfect adaptation for desktop and mobile devices

### 🏪 Seller Features
- **Product Management** - Add, edit, and delete products
- **Order Processing** - View and manage customer orders
- **Inventory Management** - Real-time inventory tracking
- **Sales Analytics** - Order and sales data statistics

### 🔧 Technical Features
- **Real-time Processing** - Event-driven architecture powered by Inngest
- **Image Management** - Cloudinary integration for image upload and optimization
- **Database** - MongoDB data storage
- **Modern UI** - Tailwind CSS styling system
- **Type Safety** - TypeScript support

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB + Mongoose
- **Image Storage**: Cloudinary
- **Event Processing**: Inngest
- **State Management**: React Context
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📦 Installation and Setup

### Prerequisites
- Node.js 18+
- MongoDB database
- Cloudinary account
- Clerk account

### 1. Clone the Repository
```bash
git clone https://github.com/GaoHuangan/QuickCart.git
cd QuickCart
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env.local` file and configure the following environment variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. Start Development Server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build for Production
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
QuickCart/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart pages
│   ├── my-orders/         # Order management pages
│   ├── seller/            # Seller management pages
│   └── ...
├── components/            # React components
├── config/               # Configuration files
├── context/              # React Context
├── models/               # MongoDB data models
├── assets/               # Static assets
└── public/               # Public files
```

## 🔄 Main Workflows

### User Shopping Flow
1. User browses products → Adds to cart
2. Selects shipping address → Confirms order
3. Asynchronous order processing via Inngest
4. Order status updates and notifications

### Seller Management Flow
1. Seller login → Product management
2. Order reception → Process shipping
3. Inventory updates → Sales statistics

## 🛠️ Development Guide

### API Routes
- `GET /api/products` - Get product list
- `POST /api/order/create` - Create order
- `GET /api/order/list` - Get user orders
- `POST /api/user/add-address` - Add shipping address

### Data Models
- **User** - User information
- **Product** - Product information
- **Order** - Order data
- **Address** - Shipping addresses

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Automatic deployment

### Other Platforms
- **Netlify**: Supports Next.js deployment
- **Railway**: Full-stack application deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📝 Changelog

### v0.1.0 (2025-01-27)
- ✅ Basic e-commerce functionality
- ✅ User authentication system
- ✅ Shopping cart and order management
- ✅ Seller management dashboard
- ✅ Responsive design

## 🐛 Bug Reports

If you find any issues or have suggestions for improvements:
1. Check [Issues](https://github.com/GaoHuangan/QuickCart/issues)
2. Create a new Issue
3. Provide detailed problem description and reproduction steps

## 📄 License

MIT License

Copyright (c) 2025 QuickCart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORES OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 👨‍💻 Author

**QuickCart Team**
- Project Maintainer: [GaoHuangan]
- Email: nickelgao@yeah.net
- GitHub: [@GaoHuangan](https://github.com/GaoHuangan)

## 🙏 Acknowledgments

Thanks to the following open source projects and services:
- [Next.js](https://nextjs.org/) - React full-stack framework
- [Clerk](https://clerk.com/) - User authentication service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image management service
- [Inngest](https://www.inngest.com/) - Event-driven architecture

---

⭐ If this project helps you, please give us a Star!

---

# 中文版本

一个现代化的电子商务平台，基于 Next.js 15 构建，提供完整的在线购物体验。

## ✨ 主要特性

### 🛍️ 用户功能
- **产品浏览** - 浏览和搜索商品目录
- **购物车管理** - 添加、删除和修改购物车商品
- **用户认证** - 基于 Clerk 的安全登录系统
- **订单管理** - 下单、查看订单历史和状态跟踪
- **地址管理** - 添加和管理收货地址
- **响应式设计** - 完美适配桌面和移动设备

### 🏪 商家功能
- **商品管理** - 添加、编辑和删除商品
- **订单处理** - 查看和管理客户订单
- **库存管理** - 实时库存跟踪
- **销售分析** - 订单和销售数据统计

### 🔧 技术特性
- **实时处理** - 基于 Inngest 的事件驱动架构
- **图片管理** - Cloudinary 集成的图片上传和优化
- **数据库** - MongoDB 数据存储
- **现代 UI** - Tailwind CSS 样式系统
- **类型安全** - TypeScript 支持

## 🚀 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **样式**: Tailwind CSS
- **认证**: Clerk
- **数据库**: MongoDB + Mongoose
- **图片存储**: Cloudinary
- **事件处理**: Inngest
- **状态管理**: React Context
- **HTTP 客户端**: Axios
- **通知**: React Hot Toast

## 📦 安装和运行

### 环境要求
- Node.js 18+ 
- MongoDB 数据库
- Cloudinary 账户
- Clerk 账户

### 1. 克隆项目
```bash
git clone <repository-url>
cd QuickCart
```

### 2. 安装依赖
```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 3. 环境配置
创建 `.env.local` 文件并配置以下环境变量：

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk 认证
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 构建生产版本
```bash
npm run build
npm run start
```

## 📁 项目结构

```
QuickCart/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   ├── cart/              # 购物车页面
│   ├── my-orders/         # 订单管理页面
│   ├── seller/            # 商家管理页面
│   └── ...
├── components/            # React 组件
├── config/               # 配置文件
├── context/              # React Context
├── models/               # MongoDB 数据模型
├── assets/               # 静态资源
└── public/               # 公共文件
```

## 🔄 主要功能流程

### 用户购物流程
1. 用户浏览商品 → 添加到购物车
2. 选择收货地址 → 确认订单
3. 通过 Inngest 异步处理订单创建
4. 订单状态更新和通知

### 商家管理流程
1. 商家登录 → 商品管理
2. 订单接收 → 处理发货
3. 库存更新 → 销售统计

## 🛠️ 开发指南

### API 路由
- `GET /api/products` - 获取商品列表
- `POST /api/order/create` - 创建订单
- `GET /api/order/list` - 获取用户订单
- `POST /api/user/add-address` - 添加收货地址

### 数据模型
- **User** - 用户信息
- **Product** - 商品信息
- **Order** - 订单数据
- **Address** - 收货地址

## 🚀 部署

### Vercel 部署（推荐）
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 其他平台
- **Netlify**: 支持 Next.js 部署
- **Railway**: 全栈应用部署
- **Docker**: 容器化部署

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### v0.1.0 (2025-01-27)
- ✅ 基础电商功能实现
- ✅ 用户认证系统
- ✅ 购物车和订单管理
- ✅ 商家管理后台
- ✅ 响应式设计

## 🐛 问题反馈

如果您发现任何问题或有改进建议，请：
1. 查看 [Issues](https://github.com/GaoHuangan/QuickCart/issues)
2. 创建新的 Issue
3. 提供详细的问题描述和复现步骤

## 📄 许可证

MIT License

Copyright (c) 2025 QuickCart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORES OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 👨‍💻 作者

**QuickCart Team**
- 项目维护者: [GaoHuangan]
- 邮箱: nickelgao@yeah.net
- GitHub: [@GaoHuangan](https://github.com/GaoHuangan)

## 🙏 致谢

感谢以下开源项目和服务：
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Clerk](https://clerk.com/) - 用户认证服务
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [MongoDB](https://www.mongodb.com/) - 数据库
- [Cloudinary](https://cloudinary.com/) - 图片管理服务
- [Inngest](https://www.inngest.com/) - 事件驱动架构

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
