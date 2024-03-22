var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/deleteapis');

/* GET home page. */
router.delete('/deletepurchasecommitments/:id/:name', adminpostapis.deletepurchasecommitment);
router.delete('/deletesalescommitments/:id/:name', adminpostapis.deletesalescommitments);
router.delete('/bills/:billId/:name', adminpostapis.deletepurchasebill);


module.exports = router;
