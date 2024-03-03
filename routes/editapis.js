var express = require('express');
var router = express.Router();
const adminget = require('../controller/editapis');

/* GET home page. */
router.get('/editentry/:idname/:id', adminget.editentry);


module.exports = router;
