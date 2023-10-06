const ClientModel = require('../model/clientsmodal'); // Replace '../models/formData' with the correct path to your FormData model file

const mongoose = require('mongoose');

exports.generatebill = async (req, res) => {
  console.log(req.body)
    try {
      var biill = new ClientModel({
        name: req.body.billto,
        gst: req.body.gst,
        address: req.body.billToAddress,
        phone: req.body.phone,
        coffee: [{
          date:req.body.dateOfIssue,
          invoice: req.body.invoicenumber,
          item: req.body.item,      // Item name
          bags: req.body.bags,      // Number of bags
          qty: req.body.quantity,       // Quantity
          priceRate: req.body.price,
          lorry: req.body.lorry,
          billtype: req.body.billtype,
          Commitment: req.body.commitment,
          igst: req.body.igst,
          sgst: req.body.sgst,
          cgst: req.body.cgst,
          total: req.body.total,
          aftercutting: req.body.aftercutting,
          outern: req.body.outern,
          Moisture: req.body.moisture,
          blacks: req.body.blacks,
          husk: req.body.husk,
          aaa: req.body.aaa,
          aa: req.body.aa,
          a: req.body.a,
          b: req.body.b,
          c: req.body.c,
          pberry: req.body.pberry
        }]
      })
      biill.save()
        // Create a new Coffee instance with data from the form
        // const newCoffee = new Client(req.body);
    
        // // Save the newCoffee instance to the database
        // await newCoffee.save();
    
        res.status(201).json({ message: 'Form submitted successfully' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error submitting the form' });
      }
};