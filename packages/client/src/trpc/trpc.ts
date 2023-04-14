import { router } from "./utils";
import HelloRouter from "./routers/hello.router";
import { createAPIContext } from "./trpc-context";
export const appRouter = router({
	hello: HelloRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export { createAPIContext };
