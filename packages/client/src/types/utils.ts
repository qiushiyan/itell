export type RequireOnly<T, P extends keyof T> = Partial<Omit<T, P>> &
	Required<Pick<T, P>>;
