const express = require('express');
const router = express.Router();
const grievController = require('../../controllers/grievController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// Define protectRoute middleware
const protectRoute = (req, res, next) => {
    if (verifyRoles(ROLES_LIST.User)) {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
};

// Apply middleware to routes that need protection
router.route('/')
    .post(protectRoute, grievController.getAllIssues)
    .delete(protectRoute, grievController.deleteIssue);

router.post('/issue', protectRoute, grievController.createIssue);

module.exports = router;
