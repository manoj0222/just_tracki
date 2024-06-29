const express = require('express');
const router = express.Router();
const visterscontrollers = require("../controller/VistersController");



router.post('/user/', visterscontrollers.createVisitedUser);
router.get('/:_id', visterscontrollers.getAllVisitedUsersForUrl);

module.exports = router;