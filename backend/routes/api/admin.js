const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// Define protectRoute middleware
const protectRoute = (req, res, next) => {
    if (verifyRoles(ROLES_LIST.Admin)) {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
};

// Apply middleware to routes that need protection
router.get('/bank-issues', protectRoute, adminController.getBankIssues)

router.get('/atm-issues', protectRoute, adminController.getATMIssues);

module.exports = router;