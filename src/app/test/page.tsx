import { Input } from "@components/ui/input";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";

const TestTablePage = () => {
	return (
		<div className="block max-w-96 max-h-96 overflow-y-auto">
			<table className="w-full">
				<TableHeader className="bg-white border-b sticky top-0">
					<TableRow>
						<TableHead
							scope="col"
							className="text-md font-medium text-gray-900 px-6 py-4 text-left"
						>
							Select
						</TableHead>
						<TableHead
							scope="col"
							className="text-md font-medium text-gray-900 px-6 py-4 text-left"
						>
							Company
						</TableHead>
						<TableHead
							scope="col"
							className="text-md font-medium text-gray-900 px-6 py-4 text-left"
						>
							Address
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="h-96 overflow-y-auto">
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="1" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							BATHURST{" "}
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="2" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							BATHURST
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="3" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							MUDGEE
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="4" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							ORANGE
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="5" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							TAREN POINT
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="1" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							BATHURST{" "}
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="2" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							BATHURST
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="3" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							MUDGEE
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="4" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							ORANGE
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="5" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							TAREN POINT
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="1" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							BATHURST{" "}
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="2" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							BATHURST
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="3" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							MUDGEE
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="4" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							ORANGE
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
					<TableRow className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							<Input type="checkbox" name="address" value="5" />
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							TAREN POINT
						</TableCell>
						<TableCell className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							Address Here Address Here Address Here Address Here Address Here
							Address Here{" "}
						</TableCell>
					</TableRow>
				</TableBody>
			</table>
		</div>
	);
};

export default TestTablePage;
