var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/postrequest');

/* GET home page. */

router.post('/submit-bill', (req, res, next) => {
    // Check the value of req.body.billtype
    console.log(req.body)
    const billType = req.body.billtype;
  
    if (billType === 'Sales') {
      // If billType is 'sales', route to generatesalesreport
      adminpostapis.generatesalesreport(req, res, next);
    } else {
      // For any other value or if not specified, route to generatepurchasereport
      adminpostapis.generatepurchasereport(req, res, next);
    }
});
router.post('/addseller', adminpostapis.addseller);
router.post('/addpurchasecommitment', adminpostapis.addpurchasecommitment);
router.post('/addsalecommitment', adminpostapis.addsalecommitment);
router.post('/addreference', adminpostapis.addrefference);
router.post('/addproducts', adminpostapis.addproducts);


module.exports = router;
