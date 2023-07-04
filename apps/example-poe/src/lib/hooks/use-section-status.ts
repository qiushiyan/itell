import { useSession } from "next-auth/react";
import { useLocation } from "./utils";
import { useEffect, useState } from "react";
import { isLocationUnlockedWithoutUser, isLocationAfter } from "../location";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";

type Status = "unauthorized" | "locked" | "unlocked" | undefined;

export const useSectionStatus = () => {
	const [status, setStatus] = useState<Status>(undefined);
	const currentLocation = useLocation();
	const { data: session, status: sessionStatus } = useSession();
	const { data: userLocation } = trpc.user.getLocation.useQuery(undefined, {
		enabled: Boolean(session?.user),
	});

	useEffect(() => {
		// when either of the location is not defined, we don't know the status
		if (!currentLocation || !userLocation) {
			return setStatus(undefined);
		}

		// if the location is unlocked without user, we don't need to check the user
		if (isLocationUnlockedWithoutUser(currentLocation)) {
			return setStatus("unlocked");
		}

		// for later sections, the user at least needs to be logged in
		if (!session) {
			return setStatus("unauthorized");
		}

		// if the user is at the same location or after the current location, it is unlocked
		if (isLocationAfter(currentLocation, userLocation as SectionLocation)) {
			return setStatus("locked");
		} else {
			setStatus("unlocked");
		}
	}, [sessionStatus, currentLocation, userLocation]);

	return { status, userLocation };
};
