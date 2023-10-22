import { useState, useEffect } from "react";

const Body = () => {
    const [tabUrl, setTabUrl] = useState("");

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0] && tabs[0].url) {
                setTabUrl(tabs[0].url);
            }
        });
    }, []);  // Only run once when the component is mounted

    return (
        <div>
            <div>
                <h1>Scryptic - your repo analyst</h1>
                <h2>{tabUrl}</h2>
            </div>
            <div>
                <h3>What do you want to do?</h3>
                <button>Get the repo's readme</button>
                <button>Get the repo's languages</button>
                <button>Get the repo's contributors</button>
                <button>Get the repo's issues</button>
                <button>Get the repo's pull requests</button>
                <button>Get the repo's commits</button>
            </div>
        </div>
    )
}

export default Body;
