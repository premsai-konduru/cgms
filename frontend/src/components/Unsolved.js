import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import useGriev from '../hooks/useGriev';
import useAuth from '../hooks/useAuth';

const GRIEVANCE_URL = '/grievance';

const Unsolved = () => {
  const [issues, setIssues] = useState(null);
  const { grievance } = useGriev();
  const { auth } = useAuth();

  console.log(grievance);

  const grievCode = 0;

  useEffect(() => {
    console.log("Fetching Unsolved Issues");
    const fetchUnsolvedIssues = async () => {
      try {
        console.log(axios.defaults.headers);

        const config = {
          headers: {
            "Authorization": `Bearer ${auth?.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };

        const user = auth?.user;
        const pwd = auth?.pwd;

        const response = await axios.get(GRIEVANCE_URL, JSON.stringify({ user, pwd, grievCode }), config);

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

    fetchUnsolvedIssues();

  }, [grievance?.SubmittedStatus, accessToken]);

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
              className="collapsible-button btn btn-primary"
              onClick={() => handleIssueClick(issue)}
            >
              {issue.grievanceType}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Unsolved;
