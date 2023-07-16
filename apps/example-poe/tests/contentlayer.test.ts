import {
	getHeadings,
	getLocationFromFlattenedPath,
	getSlugFromFlattenedPath,
} from "@/lib/contentlayer";
import { it, expect } from "vitest";

const docRaw = `
## Decisions ... Decisions in the Social Media Age

Every day we are faced with a myriad of decisions.

## Introduction

What is economics and why should you spend your time learning it?

### Details
`;

it("generates url", () => {
	const path1 = "/section/module-1/chapter-1";

	expect(getSlugFromFlattenedPath(path1, "/section")).toEqual(
		"/module-1/chapter-1",
	);
});

it("parses flattened path", () => {
	const path1 = "/section/module-1/chapter-1";
	const path2 = "/section/module-1/chapter-1/section-1";

	expect(getLocationFromFlattenedPath(path1)).toEqual({
		module: 1,
		chapter: 1,
		section: 0,
	});

	expect(getLocationFromFlattenedPath(path2)).toEqual({
		module: 1,
		chapter: 1,
		section: 1,
	});
});

it("generates headings", () => {
	expect(getHeadings(docRaw)).toEqual([
		{
			level: "two",
			slug: "decisions--decisions-in-the-social-media-age",
			text: "Decisions ... Decisions in the Social Media Age",
		},
		{
			level: "two",
			slug: "introduction",
			text: "Introduction",
		},
		{
			level: "three",
			slug: "details",
			text: "Details",
		},
	]);
});
