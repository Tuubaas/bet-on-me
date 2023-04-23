import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
dayjs().format();
const prisma = new PrismaClient();
async function main() {
  const today = new Date(dayjs().format("YYYY-MM-DD"));
  const dateBets = await prisma.dateBets.upsert({
    where: { date: today },
    update: {},
    create: {
      date: today,
    },
  });

  const bet1 = await prisma.bet.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      label: "First bet",
      type: "1x2",
      dateBetsDate: today,
    },
  });
  const bet2 = await prisma.bet.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      label: "Second bet",
      type: "over/under",
      dateBetsDate: today,
    },
  });

  const type1X2 = await prisma.type1X2.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      one: 2.43,
      x: 4.43,
      two: 9.22,
      betId: 5,
    },
  });
  const typeOverUnder = await prisma.typeOverUnder.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      over: 3.54,
      under: 1.33,
      betId: 6,
    },
  });

  //   const dateBets = await prisma.dateBets.upsert({
  //     where: { date: today },
  //     update: {},
  //     create: {
  //       date: "2023-03-08",
  //       bets: {
  //         create: [
  //           {
  //             label: "First bet",
  //             type: "1x2",
  //             type1X2: { create: { one: 2.5, x: 3.5, two: 4.5 } },
  //           },
  //           {
  //             label: "Second bet",
  //             type: "over/under",
  //             typeOverUnder: { create: { over: 2.4, under: 3.5 } },
  //           },
  //         ],
  //       },
  //     },
  //   });

  //   const alice = await prisma.date.upsert({
  //     where: { email: "alice@prisma.io" },
  //     update: {},
  //     create: {
  //       email: "alice@prisma.io",
  //       name: "Alice",
  //       posts: {
  //         create: {
  //           title: "Check out Prisma with Next.js",
  //           content: "https://www.prisma.io/nextjs",
  //           published: true,
  //         },
  //       },
  //     },
  //   });
  //   const bob = await prisma.user.upsert({
  //     where: { email: "bob@prisma.io" },
  //     update: {},
  //     create: {
  //       email: "bob@prisma.io",
  //       name: "Bob",
  //       posts: {
  //         create: [
  //           {
  //             title: "Follow Prisma on Twitter",
  //             content: "https://twitter.com/prisma",
  //             published: true,
  //           },
  //           {
  //             title: "Follow Nexus on Twitter",
  //             content: "https://twitter.com/nexusgql",
  //             published: true,
  //           },
  //         ],
  //       },
  //     },
  //   });
  //   console.log({ alice, bob });
  console.log(type1X2, typeOverUnder, bet1, bet2, dateBets);
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
