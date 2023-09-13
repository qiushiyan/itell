import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { formatRelative } from "date-fns";

export const relativeDate = (date: Date, tz = "America/Chicago") => {
	return formatRelative(utcToZonedTime(date, tz), new Date());
};

export const formatDate = (
	date: Date,
	format: string,
	tz = "America/Chicago",
) => {
	return formatInTimeZone(date, tz, format);
};
