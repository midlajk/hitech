var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/postrequest');

/* GET home page. */

router.post('/submit-bill', adminpostapis.generatereport);
router.post('/addseller', adminpostapis.addseller);


module.exports = router;
