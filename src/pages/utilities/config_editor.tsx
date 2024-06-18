import { useEffect } from "react";

/**
 * This file exists as a simple redirect for the old geyser site path to the new one.
 */
export default function ConfigEditorRedirect() {
    useEffect(() => {
        window.location.href = "/utilities/config-editor";
    }, []);
    return <h1>Redirecting...</h1>
}