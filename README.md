# Hello Prisma

一个简单的 Prisma ORM TypeScript 示例项目。

## 项目描述

这是一个使用 Prisma ORM 的 TypeScript 项目，演示了如何使用 Prisma 进行数据库操作，包括：

- 用户管理
- 文章管理
- 用户资料管理
- 数据关联查询
- 数据播种（Seeding）

## 技术栈

- **TypeScript** - 类型安全的 JavaScript
- **Prisma** - 现代数据库工具包
- **MySQL** - 关系型数据库
- **Node.js** - JavaScript 运行时

## 数据模型

项目包含三个主要模型：

- **User** - 用户模型
- **Post** - 文章模型
- **Profile** - 用户资料模型

## 项目结构

```
hello-prisma/
├── index.ts              # 主程序文件
├── package.json          # 项目依赖配置
├── tsconfig.json         # TypeScript 配置
├── prisma/
│   ├── schema.prisma     # Prisma 数据模型定义
│   ├── seed.ts           # 数据播种脚本
│   └── migrations/       # 数据库迁移文件
└── generated/
    └── prisma/           # Prisma 客户端生成文件
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 设置数据库

创建 `.env` 文件并配置数据库连接：

```env
DATABASE_URL="mysql://username:password@localhost:3306/hello_prisma"
```

### 3. 运行数据库迁移

```bash
npx prisma migrate dev
```

### 4. 生成 Prisma 客户端

```bash
npx prisma generate
```

### 5. 播种数据

```bash
npx prisma db seed
```

### 6. 运行项目

```bash
npx tsx index.ts
```

## 功能示例

项目演示了以下 Prisma 操作：

1. **查询所有用户** - `findMany()`
2. **创建新用户** - `create()` 包含关联数据
3. **查询关联数据** - `include` 选项
4. **批量更新** - `updateMany()`
5. **条件查询** - `where` 子句

## 开发工具

- **Prisma Studio** - 可视化数据库管理工具
  ```bash
  npx prisma studio
  ```

## 学习资源

- [Prisma 官方文档](https://prisma.org.cn/)
- [Prisma 中文文档](https://prisma.org.cn/docs/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

## 许可证

ISC