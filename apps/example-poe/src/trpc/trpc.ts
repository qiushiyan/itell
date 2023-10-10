import { router } from "./utils";
import { createTrpcContext } from "./trpc-context";
import SummaryRouter from "./routers/summary.router";
import NoteRouter from "./routers/note.router";
import { FocusTimeRouter } from "./routers/focus-time.router";
import { userRouter } from "./routers/user.router";
import { ClassRouter } from "./routers/class.router";
import { EventRouter } from "./routers/event.router";
export const appRouter = router({
	user: userRouter,
	summary: SummaryRouter,
	note: NoteRouter,
	focusTime: FocusTimeRouter,
	class: ClassRouter,
	event: EventRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export { createTrpcContext };
