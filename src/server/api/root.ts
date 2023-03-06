import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { betRouter } from "~/server/api/routers/bets";
import { leagueRouter } from "./routers/league";
import { playerRouter } from "./routers/player";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  bets: betRouter,
  league: leagueRouter,
  player: playerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
