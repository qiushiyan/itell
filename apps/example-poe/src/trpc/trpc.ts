import { router } from "./utils";
import { createTrpcContext } from "./trpc-context";
import SummaryRouter from "./routers/summary.router";
import NoteRouter from "./routers/note.router";
export const appRouter = router({
	summary: SummaryRouter,
	note: NoteRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export { createTrpcContext };
