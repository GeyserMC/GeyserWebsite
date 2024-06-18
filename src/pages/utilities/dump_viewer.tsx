import { useEffect } from "react";

/**
 * This file exists as a simple redirect for the old geyser site path to the new one.
 */
export default function DumpViewerRedirect() {
    useEffect(() => {
        window.location.href = "/utilities/dump-viewer" + (window.location.hash || "");
    }, []);
    return <h1>Redirecting...</h1>
}