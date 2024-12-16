import { useControls } from "react-decision-tree-flow";
import StepProps from "../StepProps";

export default function OwnerPrerequesites({ data }: StepProps): JSX.Element {
    const { step, tree, destinations, back } = useControls();

	return (
		<>

            # Before we start...

			Are you hosting a Geyser instance yourself?

            You should click "Yes" if you...:
            - ...own and operate a Minecraft: Java edition server with the Geyser plugin/mod installed.
            - ...have a Geyser-Standalone / Geyser-ViaProxy instance set up to connect to other servers.
            - ...use any variant of Geyser on any supported platform.

            If you are NOT hosting your own Geyser instance or server - and are intead connecting to someone's server -
            then please contact the server administrator for help.

			<br />
            // TODO add "return" button
			<button onClick={() => destinations.step2({...data, path: [...data.path, step]})}>Go to Step 2</button>
		</>
	)
}