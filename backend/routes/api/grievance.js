const express = require('express');
const router = express.Router();
const grievController = require('../../controllers/grievController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.User), grievController.createIssue)

// router.route('/:id')
//     .get(employeesController.getEmployee);

module.exports = router;