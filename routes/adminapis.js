var express = require('express');
var router = express.Router();
const dashboardApis = require('../controller/dashboardapis');

/* GET home page. */
router.get('/dashboard', dashboardApis.dashboardapi);


module.exports = router;
