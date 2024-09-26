import { useControls } from "react-decision-tree-flow";
import StepProps from "../StepProps";

export default function Step3({ data }: StepProps): JSX.Element {
	const { step, tree, destinations, back } = useControls();

	return (
		<>
			I am step 3. No steps after me!
		</>
	)
}