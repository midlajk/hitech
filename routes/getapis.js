var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/getapis');

/* GET home page. */
router.get('/getclients', adminpostapis.getclients);
router.get('/getnames', adminpostapis.getnames);
router.get('/getproducts', adminpostapis.getproducts);

router.get('/purchasecommitments', adminpostapis.purchasecommitment);
router.get('/salescommitments', adminpostapis.salescommitments);
router.get('/individualarrivals', adminpostapis.individualarrivals);
router.get('/individualdespatch', adminpostapis.individualdespatch);
router.get('/getrefferance', adminpostapis.getrefference);
router.get('/getTransportAgent', adminpostapis.getTransportAgent);
router.get('/salesbills', adminpostapis.salesbills);
router.get('/purchasebills', adminpostapis.purchasebills);

module.exports = router;
