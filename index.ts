import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 开始 Prisma Client 查询示例\n");

  // 第一步：查询所有用户
  console.log("1. 查询所有用户:");
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  console.log("\n");

  // 第二步：创建新用户（如果不存在）
  console.log("2. 创建新用户 Charlie:");
  const newUser = await prisma.user.create({
    data: {
      name: "Charlie",
      email: "charlie@prisma.io",
      posts: {
        create: [
          {
            title: "我的第一篇博客",
            content: "这是我在这个平台上的第一篇文章！",
          },
          {
            title: "学习 Prisma",
            content: "Prisma 是一个很棒的 ORM 工具！",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: "我是一个热爱编程的开发者",
        },
      },
    },
  });
  console.log("新创建的用户:", newUser);
  console.log("\n");

  // 第三步：查询所有用户，包括关联数据
  console.log("3. 查询所有用户及其关联数据:");
  const usersWithRelations = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(usersWithRelations, { depth: null });
  console.log("\n");

  // 第四步：更新操作 - 发布未发布的帖子
  console.log("4. 发布所有未发布的帖子:");
  const updatedPosts = await prisma.post.updateMany({
    where: { published: false },
    data: { published: true },
  });
  console.log(`已发布 ${updatedPosts.count} 篇帖子`);
  console.log("\n");

  // 第五步：查询已发布的帖子
  console.log("5. 查询所有已发布的帖子:");
  const publishedPosts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  console.log("已发布的帖子:");
  console.dir(publishedPosts, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
