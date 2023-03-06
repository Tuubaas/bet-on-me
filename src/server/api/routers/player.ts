import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  getPlayer: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(({ input }) => {
      return {
        user: {
          uid: input.uid,
          imageSrc: "",
          name: "Tobias Lindgren",
          email: "tuubbaas@gmail.com",
          balance: "10000",
        },
      };
    }),
});
