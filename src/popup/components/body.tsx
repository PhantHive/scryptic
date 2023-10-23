import { useState, useEffect } from "react";
import { Repo } from "../../typings/types.ts";
import repo from "../../assets/repo.json"

const Body = () => {
    const [tabUrl, setTabUrl] = useState("");
    const [description, setDescription] = useState({
        title: "",
        description: "",
        usage: "",
        output: ""
    });
    const [_, setClicked] = useState(false);

    const isRepoType = (repoName: string) => {
        return typeof (repo as Repo)[repoName] === "object";
    }

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0] && tabs[0].url) {
                setTabUrl(tabs[0].url);
            }
        });

        // reponame is after last slash
        const repoName = tabUrl.split("/").splice(-1)[0];
        console.log(repoName)
        if (tabUrl.includes("github.com/ipsa-scrypt") && isRepoType(repoName)) {
            // check if it finds the repo name from the url in the repo.json
            // description should contain: product, description, usage and output key field
            setDescription({
                title: (repo as Repo)[repoName].product,
                description: (repo as Repo)[repoName].description,
                usage: (repo as Repo)[repoName].usage,
                output: (repo as Repo)[repoName].output
            });
        } else {
            setDescription({ title: "Looking for a repo... 👀", description: "", usage: "", output: "" });
        }
    }, [tabUrl]);  // Only run once when the component is mounted

    // handle click, when clicked, it should copy to clipboard the link: git@github.com:ipsa-scrypt/data-forge.git

    const handleClick = () => {
        const link = "git@github.com:ipsa-scrypt/data-forge.git";
        navigator.clipboard.writeText(link);
        setClicked(true);
    }


    return (
        <div className="web-app">
            {/* put image of scrypt*/}
            <div className="logo-container">
                <img src="/images/scrypt-icon.png" className="logo" alt="scrypt logo" />
            </div>
            <div className="head-container">
                <a>fetching: {tabUrl}</a>
            </div>
            <div className="body-container">
                <h3>{description.title}</h3>
                <p>{description.description}</p>
                <p>{description.usage}</p>
                <p>{description.output}</p>

                <div className="repo-images">
                    <img src="/images/data-forge-example.png" className="terminal" alt="terminal" />
                </div>

                <button className="get-repo-url" onClick={handleClick}>clone repository</button>
            </div>
        </div>
    );
}

export default Body;
