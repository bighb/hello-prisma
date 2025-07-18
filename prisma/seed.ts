import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始数据播种...");

  // 使用 upsert 确保数据的幂等性（可以多次运行而不会重复插入）
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      posts: {
        create: {
          title: "Check out Prisma with Next.js",
          content: "https://prisma.org.cn/nextjs",
          published: true,
        },
      },
      profile: {
        create: {
          bio: "I like turtles",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: "https://twitter.com/prisma",
            published: true,
          },
          {
            title: "Follow Nexus on Twitter",
            content: "https://twitter.com/nexusgql",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: "I am a software engineer",
        },
      },
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: "charlie@dev.io" },
    update: {},
    create: {
      email: "charlie@dev.io",
      name: "Charlie",
      posts: {
        create: [
          {
            title: "Getting Started with Prisma",
            content: "Prisma makes database access easy",
            published: false,
          },
          {
            title: "TypeScript and Databases",
            content: "Type-safe database access is amazing",
            published: true,
          },
        ],
      },
      profile: {
        create: {
          bio: "Full-stack developer passionate about type safety",
        },
      },
    },
  });

  console.log("✅ 数据播种完成！");
  console.log({ alice, bob, charlie });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ 数据播种失败:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
