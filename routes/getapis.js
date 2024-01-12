var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/getapis');

/* GET home page. */
router.get('/getclients', adminpostapis.getclients);
router.get('/getnames', adminpostapis.getnames);
router.get('/purchasecommitments', adminpostapis.purchasecommitment);

router.get('/salescommitments', adminpostapis.salescommitments);


module.exports = router;
