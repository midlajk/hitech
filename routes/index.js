var express = require('express');
var router = express.Router();
const pdfMaster = require("pdf-master");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Express' });
});
router.get('/dashboard', async function(req, res, next) {

  var students = [
    {
        id: 1,
        name: "Sam",
        age: 21
    },
    {
        id: 2,
        name: "Jhon",
        age: 20
    },
    {
        id: 3,
        name: "Jim",
        age: 24
    }
  ]

let options = {
  displayHeaderFooter: true,
  format: "A4",
  headerTemplate: `<h3> Header </h3>`,
  footerTemplate: `<h3> Copyright 2023 </h3>`,
  margin: { top: "80px", bottom: "100px" },
};

let PDF = await pdfMaster.generatePdf("template.hbs", students, options);
res.contentType("application/pdf");
res.status(200).send(PDF);
  // res.render('dashboard',{ route: 'dashboard' });
});
router.get('/generatereport', function(req, res, next) {
  res.render('generatereport',{ route: 'generatereport',refferance:'CROP 23-24' });
});
router.get('/accounts', function(req, res, next) {
  res.render('accounts',{ route: 'accounts' });
});
router.get('/transactions', function(req, res, next) {
  res.render('transactions',{ route: 'transactions' });
});
router.get('/purchasedelivered', function(req, res, next) {
  res.render('purchasedelivered',{ route: 'purchasedelivered' });
});
router.get('/purchasestorage', function(req, res, next) {
  res.render('purchasestorage',{ route: 'purchasestorage' });
});
router.get('/salesdelivered', function(req, res, next) {
  res.render('salesdelivered',{ route: 'salesdelivered' });
});
router.get('/salesstorage', function(req, res, next) {
  res.render('salesstorage',{ route: 'salesstorage' });
});
router.get('/purchaseaccount', function(req, res, next) {
  res.render('salesstorage',{ route: 'salesstorage' });
});
router.get('/settings', function(req, res, next) {
  res.render('settings',{ route: 'settings' });
});
module.exports = router;
