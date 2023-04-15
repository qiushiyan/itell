import { router } from "./utils";
import { createTrpcContext } from "./trpc-context";
import SummaryRouter from "./routers/summary.router";
export const appRouter = router({
	summary: SummaryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export { createTrpcContext };
