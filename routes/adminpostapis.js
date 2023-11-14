var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/postrequest');

/* GET home page. */
<<<<<<< HEAD
router.post('/submit-bill', adminpostapis.generatereport);
=======
router.post('/addseller', adminpostapis.addseller);
>>>>>>> 155a54eb23f1fbd0ad49d5375588a2d1c2bb960b


module.exports = router;
