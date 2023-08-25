"use client";

import { useCallback, useState } from "react";
import { Cell } from "./cell";
import Spinner from "../spinner";
import { usePython } from "@/lib/hooks/ues-python";

export const CellGroup = ({ codes }: { codes: string[] }) => {
	const cellsData = codes.map((code) => ({
		code,
		deletable: false,
		id: crypto.randomUUID(),
	}));
	const [cells, setCells] = useState(() => cellsData);

	const addCell = useCallback(() => {
		setCells((cells) => [
			...cells,
			{ code: "", deletable: true, id: crypto.randomUUID() },
		]);
	}, []);

	const deleteCell = useCallback((id: string) => {
		setCells((cells) => cells.filter((cell) => cell.id !== id));
	}, []);

	const { isLoading } = usePython();

	return (
		<div className="cells-group space-y-6 mb-8">
			{isLoading ? (
				<div className="rounded-md border p-2 lg:p-4 flex gap-2 items-center justify-center">
					<Spinner className="w-4 h-4" />
					setting up python environment
				</div>
			) : (
				cells.map((cell) => (
					<Cell
						{...cell}
						addCell={addCell}
						deleteCell={deleteCell}
						key={cell.id}
					/>
				))
			)}
		</div>
	);
};
