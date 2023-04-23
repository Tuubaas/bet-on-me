import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const betRouter = createTRPCRouter({
  getBets: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      const date = new Date(dayjs().format("YYYY-MM-DD"));
      const response = await ctx.prisma.dateBets.findUnique({
        include: { bets: { include: { type1x2: true, typeOverUnder: true } } },
        where: { date: date },
      });

      console.log(response);

      return response;
    }),
  getPlayerBets: publicProcedure
    .input(z.object({ date: z.string(), uid: z.number() }))
    .query(async ({ ctx, input }) => {
      const testdate = new Date(dayjs().format("YYYY-MM-DD"));
      const response = await ctx.prisma.playerBets.findUnique({
        include: { placedBets: true },
        where: { date_playerId: { date: testdate, playerId: input.uid } },
      });
      return response;
    }),
  setBets: publicProcedure
    .input(
      z.object({
        date: z.string(),
        bets: z
          .object({ id: z.number(), label: z.string(), odds: z.any() })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      for (const bet of input.bets) {
        await ctx.prisma.bet.update({ where: { id: bet.id }, data: bet });
      }
      return input;
    }),
});
