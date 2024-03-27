var express = require('express');
var router = express.Router();
const adminget = require('../controller/editapis');

/* GET home page. */
router.get('/editentry/:idname/:id', adminget.editentry);
router.get('/editsalesentry/:idname/:id', adminget.editsalesentry);

router.post('/edit-bill', (req, res, next) => {
    // Check the value of req.body.billtype
  
    if (req.body.billtype === 'Sales') {
      // If billType is 'sales', route to generatesalesreport
      adminget.editpurchase(req, res);
    } else {
      // For any other value or if not specified, route to generatepurchasereport
      adminget.editsales(req, res);

    }
});

router.get('/viewcurrentreport',  (req, res) => {
    // Check the value of req.query.status
    if (req.query.status === 'Purchase') {
        adminget.viewcurrentpurchasereport(req, res);

        // If status is 'Purchase', render the current purchase report
        // Render your current purchase report template
    } else {
        adminget.viewcurrentsales(req, res);

        // If status is not 'Purchase', assume it's for sales report
        // Render your current sales report template
    }
});
router.post('/updateproduct', adminget.updateproduct);
router.post('/deleteproduct', adminget.deleteproduct);
router.post('/updaterefferencedefault', adminget.updaterefferencedefault);

module.exports = router;
