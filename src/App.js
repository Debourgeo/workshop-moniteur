import React, { useEffect, useState } from "react";
import "./App.css";

const SystemSpecs = () => {
    const channels = ["type", "arch", "platform", "freemem", "totalmem", "hostname", "userInfo", "cpus"];
    const [specs, setSpecs] = useState({
        type: "",
        arch: "",
        platform: "",
        freemem: "",
        totalmem: "",
        hostname: "you",
        userInfo: {},
        cpus: {}
    });

    function receiveSpecs(elements) {
        let object = {};
        elements.map(element => {
            window.ipcRenderer.on(element, (event, message) => {
                object[element] = message;
            });
        });
        setSpecs(object);
        console.log(object);
        return object;
    }

    useEffect(() => {
        receiveSpecs(channels);
    }, []);

    const bigoula = () => {
        receiveSpecs(channels);
    };

    console.log(specs);

    return (
        <div>
            <div className="SystemSpecs">hello {specs.hostname}</div>
            <div>
                <pre>{channels}</pre>
            </div>
            <button onClick={bigoula}>Click!</button>
        </div>
    );
};

export default SystemSpecs;
