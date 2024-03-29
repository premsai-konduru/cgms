const User = require('../model/User');

const getUsers = async () => {
    try {
        const allUsers = await User.find().exec();
        return allUsers;
    } catch (error) {
        console.error("Error fetching users", error.message);
        throw error; // Throw the error instead of returning it
    }
}

const getBankIssues = async (req, res) => {
    try {
        const allUsers = await getUsers(); // Await the getUsers function

        const issues = [];

        allUsers.forEach(user => {
            const arr = user.unsolvedIssues.filter(issue => issue.grievanceType === "Bank");
            if (arr.length > 0) {
                arr.forEach(issue => {
                    issue.userId = user._id;
                });
                issues.push(arr);
            }
        });

        module.exports = issues;


        return res.status(200).json({ issues });
    } catch (error) {
        console.error("Error fetching issues:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getATMIssues = async (req, res) => {
    try {
        const allUsers = await getUsers();

        const issues = [];

        allUsers.forEach(user => {
            const arr = user.unsolvedIssues.filter(issue => issue.grievanceType === "ATM");
            if (arr.length > 0) {
                arr.forEach(issue => {
                    issue.userId = user._id;
                });
                issues.push(arr);
            }
        });

        return res.status(200).json({ issues });
    } catch (error) {
        console.error("Error fetching issues:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getBankIssues, getATMIssues };
