export default function DashboardLoading() {
	return (
		<div className="flex">
			<div className="flex-shrink-0">
				<span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700" />
			</div>

			<div className="ml-4 mt-2 w-full">
				<h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-[40%]" />

				<ul className="mt-5 space-y-3">
					<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
					<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
					<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
					<li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
				</ul>
			</div>
		</div>
	);
}
