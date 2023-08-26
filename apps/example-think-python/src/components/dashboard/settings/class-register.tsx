import { useSearchParams } from "next/navigation";
import { JoinClassForm } from "./join-class-form";
import { getTeacherWithClassId } from "@/lib/class";

export const ClassRegister = async () => {
	return (
		<div className="space-y-4" id="enroll">
			<h3 className="mb-4 text-lg font-medium">Class Registration</h3>
			<JoinClassForm />
		</div>
	);
};
