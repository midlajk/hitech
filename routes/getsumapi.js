var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/getsumforaccounts.js');

/* GET home page. */
router.get('/getpurchasesum', adminpostapis.getpurchasesum);
router.get('/getsalessum', adminpostapis.getsalessum);


module.exports = router;
