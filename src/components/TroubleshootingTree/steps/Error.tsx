import { useControls } from "react-decision-tree-flow";
import StepProps from "../StepProps";

export default function Error({ data }: StepProps): JSX.Element {
	const { step, tree, destinations, back } = useControls();

	return (
		<>
			I am error
			<br />
			Path: {data.path.join(' -> ')}
			<br />
			<button onClick={() => destinations.step1({...data, path: [...data.path, step]})}>Go back to start</button>
		</>
	)
}