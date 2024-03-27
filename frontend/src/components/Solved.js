import React, { useState,useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const GRIEVANCE_URL = '/grievance';

const Solved = () => {
  const { auth } = useAuth();
  const [issues, setIssues] = useState(null);
  const [openIssues, setOpenIssues] = useState({}); // State to manage open issues

  useEffect(() => {
    console.log("Fetching Solved Issues");
    const fetchSolvedIssues = async () => {
      try {
        const config = {
          headers: {
            "Authorization": `Bearer ${auth?.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };

        const user = auth?.user;
        const pwd = auth?.pwd;
        const grievCode = 1;

        const response = await axios.post(GRIEVANCE_URL, JSON.stringify({ user, pwd, grievCode }), config);

        setIssues(response?.data?.issues);
      } catch (err) {
        // Handle errors
        if (!err?.response) {
          alert("No response from the server");
        } else if (err?.response.status === 400) {
          alert("Missing some data");
        } else if (err?.response.status === 403) {
          alert("You are forbidden");
        } else {
          alert(err.message);
        }
      }
    };

    fetchSolvedIssues();

  }, [auth?.accessToken]);

  const toggleIssueContent = (issueId) => {
    setOpenIssues(prevOpenIssues => ({
      ...prevOpenIssues,
      [issueId]: !prevOpenIssues[issueId]
    }));
  };

  return (
    <div>
      {issues &&
        issues.map((issue) => (
          <div key={issue.issueId}>
            <button
              className="collapsible-button btn btn-primary"
              onClick={() => toggleIssueContent(issue.issueId)}
            >
              {openIssues[issue.issueId] ? '▲' : '▼'} {/* Arrow button */}
              <span style={{paddingLeft:"1rem"}}>{issue.grievanceType}</span>
            </button>
            {/* Issue content */}
            {openIssues[issue.issueId] && (
              <div className="collapsible-content">
                <p>Issue Details: {issue.details}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Solved;
