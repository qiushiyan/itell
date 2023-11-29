"use client";

import {
	ClickEventData,
	FocusTimeEventData,
	ScrollEventData,
} from "@itell/core/types";
import { createEvent, createFocusTime } from "@/lib/server-actions";
import { EventTracker as Tracker } from "@itell/core/components";
import { FOCUS_TIME_SAVE_INTERVAL } from "@/lib/constants";
import { User } from "@prisma/client";

export const EventTracker = ({ user }: { user: User }) => {
	if (typeof window === "undefined") return null;

	const onClick = async (data: ClickEventData) => {
		createEvent({
			eventType: "click",
			page: location.href,
			data,
			user: {
				connect: {
					id: user.id,
				},
			},
		});
	};

	const onScroll = async (data: ScrollEventData) => {
		createEvent({
			eventType: "scroll",
			page: location.href,
			data,
			user: {
				connect: {
					id: user.id,
				},
			},
		});
	};

	const onFocusTime = async (data: FocusTimeEventData) => {
		if (data.totalViewTime !== 0) {
			createEvent({
				eventType: "focus-time",
				page: location.href,
				data,
				user: {
					connect: {
						id: user.id,
					},
				},
			});

			createFocusTime({
				totalViewTime: data.totalViewTime,
				user: {
					connect: {
						id: user.id,
					},
				},
			});
		}
	};

	const chunks = Array.from(
		document.querySelectorAll("#page-content .content-chunk"),
	) as HTMLDivElement[];

	return (
		<Tracker
			onClickEvent={onClick}
			onScrollEvent={onScroll}
			onFocusTimeEvent={onFocusTime}
			chunks={chunks}
			focusTimeSaveInterval={FOCUS_TIME_SAVE_INTERVAL}
		/>
	);
};
