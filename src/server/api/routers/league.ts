import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const leagueRouter = createTRPCRouter({
  getPlayerLeagues: publicProcedure
    .input(z.object({ leagueIds: z.array(z.number()) }))
    .query(async ({ input, ctx }) => {
      const response = await ctx.prisma.league.findMany({
        where: {
          id: { in: input.leagueIds },
        },
      });

      return response;
    }),
});
