import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
} from "@itell/ui/server";
import {
	Button,
	Label,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui-components";

async function handleStudent(data: FormData) {
	"use server";
	console.log(data.get("code"));
}

async function handleTeacher(data: FormData) {
	"use server";

	console.log(data.get("message"));
}

export default function () {
	return (
		<Tabs defaultValue="student" className="w-[600px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="student">Student</TabsTrigger>
				<TabsTrigger value="teacher">Teacher</TabsTrigger>
			</TabsList>
			<TabsContent value="student">
				<Card>
					<CardHeader>
						<CardTitle>Student</CardTitle>
						<CardDescription>
							Enter your class code here to join a class.
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* @ts-ignore */}
						<form className="space-y-2" action={handleStudent}>
							<Label htmlFor="code">Code</Label>
							<Input id="code" name="code" />
							<Button className="mt-16" type="submit">
								Join
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="teacher">
				<Card>
					<CardHeader>
						<CardTitle>Teacher</CardTitle>
						<CardDescription>
							Send us an email to request a teacher account for this textbook.
							After it is approved, you will receive a class code to share with
							your students.
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* @ts-ignore */}

						<form className="space-y-2" action={handleTeacher}>
							<Label htmlFor="message">Message</Label>
							<textarea
								className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								name="message"
							/>
							<Button className="mt-16" type="submit">
								Send
							</Button>
						</form>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
