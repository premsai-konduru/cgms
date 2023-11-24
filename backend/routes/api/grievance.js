const express = require('express');
const router = express.Router();
const grievController = require('../../controllers/grievController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

console.log("griev route")

if (verifyRoles(ROLES_LIST.User)) {
    // console.log("Verifed Roles");
    router.post('/', grievController.createIssue);
    // console.log("Below")
}
else
    console.log("could not verify");

// router.route('/:id')
//     .get(employeesController.getEmployee);

module.exports = router;