const express = require('express');
const router = express.Router();
const grievController = require('../../controllers/grievController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


if (verifyRoles(ROLES_LIST.User)) {
    router.route('/')
        .post(grievController.getAllIssues)
        .delete(grievController.deleteIssue)
        .post(grievController.createIssue);
}
else
    console.log("could not verify");

module.exports = router;