import React, { useEffect, useState } from 'react'

function Machine({ machineDetails }) {

    const [location, setLocation] = useState(null);
    const [issueDescription, setIssueDescription] = useState(null);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    useEffect(() => {
        exportMachine();
    }, [location, issueDescription]);

    const exportMachine = () => {
        let values = {
            locationDetails: location,
            issue_Description: issueDescription
        };
        // Pass the values to the parent component or another function
        if (machineDetails) {
            machineDetails(values);
        }
    };

    return (
        <div>
            {/* <!-- ATM Machine --> */}

            <div className="atm123">
                <label className="grievance-title">Select location code:</label>
                <select className="form-control" name="location-code" value={location} style={{ width: "fit-content" }} onChange={handleLocationChange}>
                    <option value="0">Select Location</option>
                    <option value="code1">Location Code 1</option>
                    <option value="code2">Location Code 2</option>
                    <option value="code3">Location Code 3</option>
                    {/* <!-- Add more options as needed --> */}
                </select>

                <div style={{ marginTop: "1rem" }}>
                    <label className="grievance-title">Describe the issue at the location:</label>
                    <textarea className="form-control" name="location-issue-description"
                        value={issueDescription}
                        placeholder="Describe the issue at the location" style={{ width: "fit-content" }}
                        onChange={(event) => setIssueDescription(event.target.value)}
                    >
                    </textarea>
                </div>

            </div>
        </div>
    )
}

export default Machine