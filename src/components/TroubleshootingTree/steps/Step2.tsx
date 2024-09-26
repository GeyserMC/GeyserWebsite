import { useControls } from "react-decision-tree-flow";
import StepProps from "../StepProps";

export default function Step2({ data }: StepProps): JSX.Element {
	const { step, tree, destinations, back } = useControls();

	return (
		<>
			I am step 2
			<br />
			<div>
				<button onClick={() => destinations.error({...data, path: [...data.path, step]})}>Go to error</button>
				<button onClick={() => destinations.step3({...data, path: [...data.path, step]})}>Go to Step 3</button>
			</div>
		</>
	)
}