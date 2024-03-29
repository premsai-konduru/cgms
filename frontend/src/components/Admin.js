import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import Buttons from './Buttons';

function Admin() {
  const { auth } = useAuth();
  // State to hold fetched issues
  const [bankIssues, setBankIssues] = useState([]);
  const [atmIssues, setAtmIssues] = useState([]);
  // State to hold open issues
  const [openIssues, setOpenIssues] = useState({});

  // Fetch bank issues
  useEffect(() => {
    axios.get('/admin/bank-issues', {
      headers: {
        "Authorization": `Bearer ${auth?.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(response => {
        setBankIssues(response.data.issues.flat());
      })
      .catch(error => {
        console.error('Error fetching bank issues:', error);
      });
  }, [auth]);

  // Fetch ATM issues
  useEffect(() => {
    axios.get('/admin/atm-issues', {
      headers: {
        "Authorization": `Bearer ${auth?.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(response => {
        setAtmIssues(response.data.issues.flat());
      })
      .catch(error => {
        console.error('Error fetching ATM issues:', error);
      });
  }, [auth]);

  // Function to toggle issue content
  const toggleIssueContent = (issueId) => {
    setOpenIssues(prevOpenIssues => ({
      ...prevOpenIssues,
      [issueId]: !prevOpenIssues[issueId]
    }));
  };

  return (
    <div>
      {/* Container for bank issues */}
      <div className="container shadow" style={{ backgroundColor: "wheat", borderRadius: "1rem", marginTop: "1.5em", marginBottom: "1.5em" }}>
        <h3 style={{ padding: "10px 15px 20px 0", color: "#4E73BA" }}>Bank Issues</h3>
        {/* Display bank issues */}
        {bankIssues.map(issue => (
          <div key={issue.issueId} className="issue-container" style={{ paddingBottom: "0.5rem" }}>
            <button
              className="collapsible-button btn btn-info" style={{ backgroundColor: "gray" }}
              onClick={() => toggleIssueContent(issue.issueId)}
            >
              {openIssues[issue.issueId] ? '▲' : '▼'} {/* Arrow button */}
              <span style={{ paddingLeft: "1rem" }}>{issue.issueType}</span>
            </button>
            {/* Render issue details if it's selected */}
            {openIssues[issue.issueId] && (
              <div className="collapsible-content" style={{ backgroundColor: "#CAC8C8" }}>
                <p>User id: {issue.userId}</p>
                <p>Issue id : {issue.issueId}</p>
                <p>Issue Description: {issue.issueDescription}</p>
                <Buttons uniqueId={issue.issueId + issue.userId} />
              </div>
            )}
          </div>
        ))}
        <br />
      </div>

      {/* Container for ATM issues */}
      <div className="container shadow" style={{ "backgroundColor": "wheat", borderRadius: "1rem" }}>
        <h3 style={{ padding: "10px 15px 20px 0", color: "#4E73BA" }}>ATM Issues</h3>
        {/* Display ATM issues */}
        {atmIssues.map(issue => (
          <div key={issue.issueId} className="issue-container" style={{ paddingBottom: "0.5rem" }}>
            <button
              className="collapsible-button btn btn-info" style={{ backgroundColor: "gray" }}
              onClick={() => toggleIssueContent(issue.issueId)}
            >
              {openIssues[issue.issueId] ? '▲' : '▼'} {/* Arrow button */}
              <span style={{ paddingLeft: "1rem" }}>{issue.issueWith}</span>
            </button>
            {/* Render issue details if it's selected */}
            {openIssues[issue.issueId] && (
              <div className="collapsible-content" style={{ backgroundColor: "#CAC8C8" }}>
                <p>User id: {issue.userId}</p>
                <p>Issue id : {issue.issueId}</p>
                <p>Issue Description: {issue.issueDescription}</p>
                <Buttons uniqueId={issue.issueId + issue.username} />
              </div>
            )}
          </div>
        ))}
        <br />
      </div>
    </div>
  );
}

export default Admin;
