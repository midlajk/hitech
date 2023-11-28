var express = require('express');
var router = express.Router();
const adminget = require('../controller/getdetailedview');

/* GET home page. */
router.get('/purchaseaccount/:name', adminget.individualpurchaseaccount);


module.exports = router;
