const User = require('../model/User');
const { ObjectId } = require('mongodb');

const createIssue = async (req, res) => {
    const { data } = req.body;
    const user = data.user;

    try {
        const foundUser = await User.findOne({ username: user }).exec();

        if (!foundUser) {
            // User not found
            return res.status(400).json({ error: "User not found" });
        }

        if (!foundUser.refreshToken) {
            // User found, but refreshToken is falsy
            return res.status(403).json({ error: "Check everything on your side or reload the page" });
        }

        let issue = data.issue;
        issue = { issueId: new ObjectId(), username: user, ...issue };
        foundUser.unsolvedIssues.push(issue);
        await foundUser.save();

        return res.status(200).json({ success: "Successfully submitted" });
    } catch (error) {
        console.error("Error creating issue:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteIssue = async (req, res) => {
    const { data } = req.body;
    const user = data.user;

    try {
        const foundUser = await User.findOne({ username: user }).exec();

        if (!foundUser) {
            // User not found
            return res.status(400).json({ error: "User not found" });
        }

        let issueId = data.issue.issueId;
        // Remove the issue with the issueID from the unsolvedIssues
        foundUser.unsolvedIssues = foundUser.unsolvedIssues.filter(issue => issue.issueId !== issueId);
        // Add it to the solvedIssues array
        foundUser.solvedIssues.push(data.issue);

        // Save the changes to the user
        await foundUser.save();

        return res.status(200).json({ success: "Successfully moved issue to solvedIssues" });
    } catch (error) {
        console.error("Error forwarding the issue", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = { createIssue, deleteIssue };
