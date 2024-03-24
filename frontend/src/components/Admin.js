import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  // State to hold fetched issues
  const [bankIssues, setBankIssues] = useState([]);
  const [atmIssues, setAtmIssues] = useState([]);
  // State to hold selected issue details
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Fetch issues from the backend on component mount
  useEffect(() => {
    // Fetch bank issues
    axios.get('/api/bank-issues')
      .then(response => {
        setBankIssues(response.data);
      })
      .catch(error => {
        console.error('Error fetching bank issues:', error);
      });

    // Fetch ATM issues
    axios.get('/api/atm-issues')
      .then(response => {
        setAtmIssues(response.data);
      })
      .catch(error => {
        console.error('Error fetching ATM issues:', error);
      });
  }, []);

  // Function to handle click on an issue
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  return (
    <div>

      {/* Container for bank issues */}
      <div className="container shadow" style={{ backgroundColor: "wheat", borderRadius: "1rem", marginTop: "1.5em", marginBottom: "1.5em" }}>
        <h2 style={{ padding: "10px 15px 20px 0", color: "#4E73BA" }}>Bank Issues</h2>
        {/* Display bank issues */}
        {bankIssues.map(issue => (
          <div key={issue.id} className="issue-container">
            <h3 onClick={() => handleIssueClick(issue)}>{issue.title}</h3>
            {/* Render issue details if it's selected */}
            {selectedIssue && selectedIssue.id === issue.id && (
              <div className="issue-details">
                <p>{issue.description}</p>
                {/* Add more fields as needed */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Container for ATM issues */}
      <div className="container shadow" style={{ "backgroundColor": "wheat", borderRadius: "1rem" }}>
        <h2 style={{ padding: "10px 15px 20px 0", color: "#4E73BA" }}>ATM Issues</h2>
        {/* Display ATM issues */}
        {atmIssues.map(issue => (
          <div key={issue.id} className="issue-container">
            <h3 onClick={() => handleIssueClick(issue)}>{issue.title}</h3>
            {/* Render issue details if it's selected */}
            {selectedIssue && selectedIssue.id === issue.id && (
              <div className="issue-details">
                <p>{issue.description}</p>
                {/* Add more fields as needed */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
