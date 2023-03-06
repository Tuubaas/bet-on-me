import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { BetType } from "../../../utils/enums";

export const betRouter = createTRPCRouter({
  getBets: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(({ input }) => {
      return {
        bets: [
          {
            id: "1",
            label: "This is an over/under bet",
            type: BetType.TypeOverUnder,
            odds: {
              over: 2.5,
              under: 2.5,
            },
          },
          {
            id: "2",
            label: "This is a 1X2 bet",
            type: BetType.Type1X2,
            odds: {
              one: 1.5,
              x: 8.0,
              two: 2.5,
            },
          },
        ],
      };
    }),
  getPlayerBets: publicProcedure
    .input(z.object({ date: z.string(), uid: z.string() }))
    .query(({ input }) => {
      return {
        placedBets: {
          "1": {
            choice: "over",
            amount: 100,
          },
          "2": {
            choice: "x",
            amount: 300,
          },
        },
      };
    }),
  setBets: publicProcedure
    .input(
      z.object({
        date: z.string(),
        bets: z
          .object({ id: z.string(), label: z.string(), odds: z.any() })
          .array(),
      })
    )
    .mutation(({ input }) => {
      // TODO post tot DB
      return input.bets;
    }),
});
