import { useControls } from "react-decision-tree-flow";
import StepProps from "../StepProps";

export default function MarkDownStep(Component: any): Function {
	return function InternalStep({ data }: StepProps): JSX.Element {
		const { step, tree, destinations, back } = useControls();

		return (<Component step={step} tree={tree} destinations={destinations} back={back} data={data}/>)
	}
}