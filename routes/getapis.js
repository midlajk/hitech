var express = require('express');
var router = express.Router();
const adminpostapis = require('../controller/getapis');

/* GET home page. */
router.get('/getclients', adminpostapis.getclients);
router.get('/getnames', adminpostapis.getnames);



module.exports = router;
