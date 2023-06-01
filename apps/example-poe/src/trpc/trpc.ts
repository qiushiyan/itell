import { router } from "./utils";
import { createTrpcContext } from "./trpc-context";
import SummaryRouter from "./routers/summary.router";
import NoteRouter from "./routers/note.router";
import { FocusTimeRouter } from "./routers/focus-time.router";
export const appRouter = router({
	summary: SummaryRouter,
	note: NoteRouter,
	focusTime: FocusTimeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export { createTrpcContext };
