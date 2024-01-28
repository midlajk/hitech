const mongoose = require('mongoose');

exports.individualpurchaseaccount = async (req, res) => {

console.log(req.params.name)
    res.render('individualpurchase',{ route: 'accounts',name: req.params.name})
  
};