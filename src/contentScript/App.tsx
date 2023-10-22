import useExtensionState from "../hooks/useExtensionState";

function App() {
    const extensionState = useExtensionState();
    return (
        <>
            <div>{extensionState.isBulkDeleteEnabled ? "ENABLED" : "DISABLED"}</div>
        </>
    );
}

export default App;