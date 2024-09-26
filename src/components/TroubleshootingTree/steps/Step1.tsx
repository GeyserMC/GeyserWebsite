import { useControls } from "react-decision-tree-flow";
import StepProps from "../StepProps";

export default function Step1({ data }: StepProps): JSX.Element {
	const { step, tree, destinations, back } = useControls();

	return (
		<>
			I am step 1
			<br />
			<button onClick={() => destinations.step2({...data, path: [...data.path, step]})}>Go to Step 2</button>
		</>
	)
}