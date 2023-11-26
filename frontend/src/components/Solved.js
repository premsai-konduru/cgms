import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const GRIEVANCE_URL = '/grievance';

const Solved = () => {
  const [issues, setIssues] = useState(null);
  const { auth } = useAuth();

  const accessToken = auth?.accessToken;
  const user = auth?.user;
  const pwd = auth?.pwd;
  const grievCode = 1; // Set grievCode to 1 for fetching solved issues

  useEffect(() => {
    const fetchSolvedIssues = async () => {
      try {
        const response = await axios.get(
          GRIEVANCE_URL,
          JSON.stringify({ user, pwd, grievCode }),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

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

    // Fetch solved issues once on component mount
    fetchSolvedIssues();

  }, [accessToken, user, pwd]);

  const handleIssueClick = (issue) => {
    // Handle the click for each issue
    console.log("Clicked on issue:", issue);
  };

  return (
    <div>
      {issues &&
        issues.map((issue) => (
          <div key={issue.issueId}>
            <button
              className="collapsible-button btn btn-success"
              onClick={() => handleIssueClick(issue)}
            >
              {issue.grievanceType}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Solved;
