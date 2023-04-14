import { z } from "zod";
import { procedure, router } from "../utils";

const HelloRouter = router({
	getMessage: procedure
		.input(
			z.object({
				text: z.string(),
			}),
		)
		.query(({ input }) => {
			return {
				greeting: `greetings ${input.text}`,
			};
		}),
});

export default HelloRouter;
