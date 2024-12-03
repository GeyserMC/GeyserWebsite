import { Controls, Step, useControls, Wizard } from 'react-decision-tree-flow'

import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Error from './steps/Error'
import { useEffect, useState } from 'react'
import { StepData } from './StepProps'
import MarkDownStep from './steps/MarkDownStep'


// React components for each step
const stepComponents = [
	Step1,
	Step2,
	Step3,
	Error
]

// Build the steps object from the stepComponents array
function formatStepName(name: string): string {
	return name.charAt(0).toLowerCase() + name.slice(1)
}
let steps = Object.fromEntries(stepComponents.map((Component) => [formatStepName(Component.name), Component]))

// Add the markdown steps
steps = {
	//test: MarkDownStep(Test),
	...steps
}


// Make a tree so all steps can go to all others
const tree = Object.fromEntries(Object.keys(steps).map((key, i, arr) => {
	return [key, arr]
}))

function TreeInternals(): JSX.Element {
	const [data, setData] = useState<StepData>({
		path: []
	})
	
	const { step } = useControls();
	useEffect(() => {
		if (step == 'internalStep') {
			console.log()
		}
		setData(data => ({...data, path: [...data.path, step as string]}))
	}, [step])

	return (
		<>
			{Object.entries(steps).map(([name, Component]) => <Step key={name} name={name}><Component data={data}/></Step>)}
		</>
	)
}

export default function TroubleshootingTree(): JSX.Element {
	return (
		<Wizard tree={tree} first={Object.keys(steps)[0]}>
			<TreeInternals />
		</Wizard>
	)
}
