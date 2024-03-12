var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/postrequest');
const generatereport = require('../controller/generatereport');

/* GET home page. */

router.post('/submit-bill', (req, res, next) => {
    // Check the value of req.body.billtype
  
    if (req.body.billtype === 'Sales') {
      // If billType is 'sales', route to generatesalesreport
      generatereport.generatesalesreport(req, res, next);
    } else {
      // For any other value or if not specified, route to generatepurchasereport
      generatereport.generatepurchasereport(req, res, next);
    }
});
router.post('/addseller', adminpostapis.addseller);
router.post('/addpurchasecommitment', adminpostapis.addpurchasecommitment);
router.post('/addsalecommitment', adminpostapis.addsalecommitment);
router.post('/addreference', adminpostapis.addrefference);
router.post('/addproducts', adminpostapis.addproducts);
router.post('/addtransportagent', adminpostapis.addtransportagent);
router.post('/saveTransaction', adminpostapis.addTransactions);


module.exports = router;
