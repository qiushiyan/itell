"use client";
import SummaryEditor from "./summary-editor";
import { allSectionsSorted } from "@/lib/sections";
import SectionCombobox from "./section-combobox";
import { useState } from "react";
import { SectionLocation } from "@/types/location";
import SectionDialog from "../section-dialog";

export default function () {
	const [selectedLocation, setSelectedLocation] =
		useState<SectionLocation | null>(null);
	const section = selectedLocation
		? allSectionsSorted.find(
				(s) =>
					s.location.chapter === selectedLocation.chapter &&
					s.location.section === selectedLocation.section,
		  )
		: null;

	return (
		<div className="mt-4 space-y-6">
			<h1 className="font-heading text-2xl md:text-4xl">
				Create a new summary
			</h1>
			<SectionCombobox onValueChange={setSelectedLocation} />

			{section && <SectionDialog section={section} title="View section" />}
			{selectedLocation && (
				<SummaryEditor published={false} location={selectedLocation} />
			)}
		</div>
	);
}
