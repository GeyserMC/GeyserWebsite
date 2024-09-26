import { Controls, Step, useControls, Wizard } from 'react-decision-tree-flow'

import Step1 from './steps/Step1'
import Error from './steps/Error'
import Step3 from './steps/Step3'
import Step2 from './steps/Step2'
import { useEffect, useState } from 'react'
import { StepData } from './StepProps'

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
const steps = Object.fromEntries(stepComponents.map((Component) => [formatStepName(Component.name), Component]))

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
