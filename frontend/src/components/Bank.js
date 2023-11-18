import React, { useEffect, useState } from 'react';

function Bank({ onExport }) {
    // State for select, radios, and textarea values
    const [selectedBranch, setSelectedBranch] = useState('0');
    const [selectedIssueType, setSelectedIssueType] = useState('');
    const [issueDescription, setIssueDescription] = useState('');

    // Function to update selected branch
    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    // Function to update selected issue type
    const handleIssueTypeChange = (event) => {
        setSelectedIssueType(event.target.value);
    };

    // Function to update issue description
    const handleIssueDescriptionChange = (event) => {
        setIssueDescription(event.target.value);
    };

    useEffect(() => {
        // console.log(selectedBranch, selectedIssueType, issueDescription)
        exportBank();
    },[selectedBranch, selectedIssueType, issueDescription]);
    // Automatically export values when onExport prop is available
    const exportBank = () => {
        let values = {
            branch: selectedBranch,
            issueType: selectedIssueType,
            issueDescription: issueDescription,
        };
        // Pass the values to the parent component or another function
        if (onExport) {
            onExport(values);
        }
    };

    return (
        <div className="grievance-options bankP" id="bank-options" style={{ marginTop: "1rem" }}>
            {/* Bank Information */}
            <div className="grievance-options bankP" id="bank-options">
                {/* Select Branch */}
                <select className="form-control" id="branches" value={selectedBranch} onChange={handleBranchChange}>
                    <option value="0">Select Branch</option>
                    <option value="branch1">Branch 1</option>
                    <option value="branch2">Branch 2</option>
                    <option value="branch3">Branch 3</option>
                </select>
                {/* Issue Options */}
                <label id="Issue_b">Choose one:</label>
                {/* <label><input type="radio" name="bank-issue-type" value="Transfer" checked={selectedIssueType === "Transfer"} onChange={handleIssueTypeChange} /> Transfer</label> */}
                <label><input type="radio" name="bank-issue-type" value="Transfer" onChange={handleIssueTypeChange} /> Transfer</label>
                {/* <label><input type="radio" name="bank-issue-type" value="Withdrawal" checked={selectedIssueType === "Withdrawal"} onChange={handleIssueTypeChange} /> Withdrawal</label> */}
                <label><input type="radio" name="bank-issue-type" value="Withdrawal" onChange={handleIssueTypeChange} /> Withdrawal</label>
                {/* <label><input type="radio" name="bank-issue-type" value="Others" checked={selectedIssueType === "Others"} onChange={handleIssueTypeChange} /> Others</label> */}
                <label><input type="radio" name="bank-issue-type" value="Others" onChange={handleIssueTypeChange} /> Others</label>
                {/* Text area of the Issue */}
                <label id="Issue_b2">Describe your Issue:</label>
                <textarea className="form-control describer" value={issueDescription} onChange={handleIssueDescriptionChange} placeholder="Describe your issue"></textarea>

                {/* No export button, values will be exported automatically */}
            </div>
        </div>
    );
}

export default Bank;
