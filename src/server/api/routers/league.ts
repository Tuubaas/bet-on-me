import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const leagueRouter = createTRPCRouter({
  getPlayerLeagues: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(({ input }) => {
      return {
        leagues: [
          {
            id: "league-id",
            name: "Test League",
            podium: [
              { name: "first place" },
              { name: "second place" },
              { name: "third place" },
            ],
          },
        ],
        uid: input.uid,
      };
    }),
});
