var express = require('express');
var router = express.Router();
const pdfMaster = require("pdf-master");
const mongoose = require('mongoose');

const ClientModel = mongoose.model('Client')
const Reference = mongoose.model('Reference')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Express' });
});
router.get('/dashboard', async function(req, res, next) {

  res.render('dashboard',{ route: 'dashboard' });

  // res.render('dashboard',{ route: 'dashboard' });
});
router.get('/generatereport', async function(req, res, next) {

   const reference = await Reference.findOne({})
    .sort({ defaulted: -1 }) // Sort by 'defaulted' date in descending order
    
    res.render('generatereport',{ route: 'generatereport',refferance:reference?reference.name:'' });
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
