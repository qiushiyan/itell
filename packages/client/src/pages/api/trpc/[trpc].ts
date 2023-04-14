import { appRouter, createAPIContext } from "@/trpc/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";
export default createNextApiHandler({
	router: appRouter,
	createContext: createAPIContext,
});
