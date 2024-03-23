
require('../model/clientsmodal')
const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const CoffeeSchema = mongoose.model('CoffeeSchema');
const Reference = mongoose.model('Reference');
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const pdfMaster = require("pdf-master");
const { Console } = require('console');

exports.editentry = async (req, res) => {
  const clientId = new mongoose.Types.ObjectId(req.params.id); // Convert id to ObjectId
  const clientName = req.params.idname;

  const client = await ClientModel.aggregate([
    {
      $match: { name: clientName } // Match the client by name
    },
    {
      $project: {
        coffee: {
          $filter: {
            input: '$coffee', // Array to filter
            as: 'coffee', // Variable to represent each element in the array
            cond: { $eq: ['$$coffee._id', clientId] } // Condition to match coffee id
          }
        }
      }
    }
  ])
    .exec();
  if (client.length > 0 && client[0].coffee.length == 1) {
    return res.render('editreport', { route: 'generatereport', coffee: client[0].coffee[0], status: 'Purchase' });
  } else {
    return
  }


};
exports.editsalesentry = async (req, res) => {
  const clientId = new mongoose.Types.ObjectId(req.params.id); // Convert id to ObjectId
  const clientName = req.params.idname;
  console.log(req.params)

  const client = await ClientModel.aggregate([
    {
      $match: { name: clientName } // Match the client by name
    },
    {
      $project: {
        despatch: {
          $filter: {
            input: '$despatch', // Array to filter
            as: 'despatch', // Variable to represent each element in the array
            cond: { $eq: ['$$despatch._id', clientId] } // Condition to match coffee id
          }
        }
      }
    }
  ])
    .exec();
  if (client.length > 0 && client[0].despatch.length == 1) {
    return res.render('editreport', { route: 'generatereport', coffee: client[0].despatch[0], status: 'Sales' });
  } else {
    return
  }


};


exports.editpurchase = async (req, res, hi) => {

  try {
    let existingClient = await ClientModel.findOne({ name: req.body.billTo });
    console.log(req.body)
    if (existingClient) {
      // Find the coffee item with the specified lotnumber
      const coffeeItemToUpdate = existingClient.coffee.find(coffee => coffee.lotnumber === req.body.lotnumber);
      console.log(coffeeItemToUpdate)

      if (coffeeItemToUpdate) {
        // Update the properties of the found coffee item
        coffeeItemToUpdate.date = req.body.dateOfIssue;
        coffeeItemToUpdate.referenceselect = req.body.referenceselect;
        coffeeItemToUpdate.billTo = req.body.billTo;
        coffeeItemToUpdate.transportagent = req.body.transportagent;
        coffeeItemToUpdate.lorry = req.body.lorry;
        coffeeItemToUpdate.billtype = req.body.billtype;
        coffeeItemToUpdate.delivery = req.body.delivery;
        coffeeItemToUpdate.remarks = req.body.remarks;
        coffeeItemToUpdate.item = req.body.item;
        coffeeItemToUpdate.bags = req.body.bags;
        coffeeItemToUpdate.quantity = req.body.quantity;
        coffeeItemToUpdate.bagweight = req.body.bagweight;
        coffeeItemToUpdate.forignobject = req.body.forignobject;
        coffeeItemToUpdate.weightallowance = req.body.weightallowance;
        coffeeItemToUpdate.outern = req.body.outern;
        coffeeItemToUpdate.huskpercentage = req.body.huskpercentage;
        coffeeItemToUpdate.huskcutting = req.body.huskcutting;
        coffeeItemToUpdate.moisturepercentage = req.body.moisturepercentage;
        coffeeItemToUpdate.moisturecutting = req.body.moisturecutting;
        coffeeItemToUpdate.bbpercentage = req.body.bbpercentage;
        coffeeItemToUpdate.bbcutting = req.body.bbcutting;
        coffeeItemToUpdate.berryborepercentage = req.body.berryborepercentage;
        coffeeItemToUpdate.berryborecutting = req.body.berryborecutting;
        coffeeItemToUpdate.other = req.body.other;
        coffeeItemToUpdate.allowance = req.body.allowance;
        coffeeItemToUpdate.lotnumber = req.body.lotnumber;
        coffeeItemToUpdate.netepweight = req.body.netepweight;
        coffeeItemToUpdate.netWeight = req.body.netWeight;
        coffeeItemToUpdate.eppercentage = req.body.eppercentage;
        coffeeItemToUpdate.storage = req.body.netepweight - req.body.billedquantity; // Update storage value

        // Save the changes to the existingClient
      }

      const storeout = existingClient.storeout + 0
      const storein = existingClient.storein + (parseFloat(req.body.netepweight)) - (parseFloat(req.body.prevnetepweight))
      existingClient.storeout = storeout;
      existingClient.storein = storein;
      await existingClient.save();







      await existingClient.save();

    }
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error submitting the form' });
  }
};
exports.editsales = async (req, res, hi) => {

  try {
    let existingClient = await ClientModel.findOne({ name: req.body.billTo });
    console.log(req.body)
    if (existingClient) {
      // Find the coffee item with the specified lotnumber
      const coffeeItemToUpdate = existingClient.despatch.find(coffee => coffee.lotnumber === req.body.lotnumber);

      if (coffeeItemToUpdate) {
        // Update the properties of the found coffee item
        coffeeItemToUpdate.date = req.body.dateOfIssue;
        coffeeItemToUpdate.referenceselect = req.body.referenceselect;
        coffeeItemToUpdate.billTo = req.body.billTo;
        coffeeItemToUpdate.transportagent = req.body.transportagent;
        coffeeItemToUpdate.lorry = req.body.lorry;
        coffeeItemToUpdate.billtype = req.body.billtype;
        coffeeItemToUpdate.delivery = req.body.delivery;
        coffeeItemToUpdate.remarks = req.body.remarks;
        coffeeItemToUpdate.item = req.body.item;
        coffeeItemToUpdate.bags = req.body.bags;
        coffeeItemToUpdate.quantity = req.body.quantity;
        coffeeItemToUpdate.bagweight = req.body.bagweight;
        coffeeItemToUpdate.forignobject = req.body.forignobject;
        coffeeItemToUpdate.weightallowance = req.body.weightallowance;
        coffeeItemToUpdate.outern = req.body.outern;
        coffeeItemToUpdate.huskpercentage = req.body.huskpercentage;
        coffeeItemToUpdate.huskcutting = req.body.huskcutting;
        coffeeItemToUpdate.moisturepercentage = req.body.moisturepercentage;
        coffeeItemToUpdate.moisturecutting = req.body.moisturecutting;
        coffeeItemToUpdate.bbpercentage = req.body.bbpercentage;
        coffeeItemToUpdate.bbcutting = req.body.bbcutting;
        coffeeItemToUpdate.berryborepercentage = req.body.berryborepercentage;
        coffeeItemToUpdate.berryborecutting = req.body.berryborecutting;
        coffeeItemToUpdate.other = req.body.other;
        coffeeItemToUpdate.allowance = req.body.allowance;
        coffeeItemToUpdate.lotnumber = req.body.lotnumber;
        coffeeItemToUpdate.netepweight = req.body.netepweight;
        coffeeItemToUpdate.netWeight = req.body.netWeight;
        coffeeItemToUpdate.eppercentage = req.body.eppercentage;
        coffeeItemToUpdate.storage = req.body.netepweight - req.body.billedquantity; // Update storage value

        // Save the changes to the existingClient
      }

      const storeout = existingClient.storeout  + (parseFloat(req.body.netepweight)) - (parseFloat(req.body.prevnetepweight))
      const storein = existingClient.storein + 0
      existingClient.storeout = storeout;
      existingClient.storein = storein;
      await existingClient.save();
    }
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error submitting the form' });
  }
};
exports.viewcurrentpurchasereport = async (req, res, hi) => {

  try {
    let existingClient = await ClientModel.findOne({ name: req.query.billTo });
    if (existingClient) {
      // Find the coffee item with the specified lotnumber
      const coffee = existingClient.coffee.find(coffee => coffee.lotnumber === req.query.lotnumber);
      const bills = await ClientModel.aggregate([
        { $match: { "purchasebillSchema.lotnumber": req.query.lotnumber } }, // Match bills by lotnumber
        { $unwind: "$purchasebillSchema" }, // Unwind the purchasebillSchema array
        {
          $addFields: { // Add new field formatted_date to hold the formatted date
            "purchasebillSchema.formatted_date": {
              $dateToString: {
                format: "%d:%m:%Y", // Format date as dd:mm:YYYY
                date: "$purchasebillSchema.date" // Date field to format
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            subtotal: { $sum: "$purchasebillSchema.subtotal" },
            tax: { $sum: "$purchasebillSchema.tax" },
            total: { $sum: "$purchasebillSchema.total" },
            bills: { $push: "$purchasebillSchema" } // Push individual purchase bills into an array
          }
        }
      ]);

      var taxtotal = bills.length > 0 ? bills[0].tax : 0
      var total = bills.length > 0 ? bills[0].subtotal : 0
      var grandtotal = bills.length > 0 ? bills[0].total : 0
      var tax = (taxtotal && total) > 0 ? parseFloat((total / taxtotal) * 100) : 0
      var data = {
        companyname: 'HI TECH COFFEE',
        party: coffee.billTo,
        item: coffee.item,
        delivery: coffee.delivery,
        date: coffee.dateOfIssue,
        vehicleno: coffee.lorry,
        type: 'Purchase',
        bags: coffee.bags,
        quantity: coffee.quantity,
        bagweight: parseInt(coffee.bagweight * coffee.bags),
        netweights: parseInt(coffee.quantity - parseFloat(coffee.bagweight * coffee.bags)),
        forignobject: coffee.forignobject,
        weightallowance: parseFloat(coffee.quantity) - parseFloat(coffee.netWeight),
        huskpercentage: coffee.huskpercentage,
        outern: coffee.outern,
        huskcutting: coffee.huskcutting,
        moisturepercentage: coffee.moisturepercentage,
        moisturecutting: coffee.moisturecutting,
        bbpercentage: coffee.bbpercentage,
        bbcutting: coffee.bbcutting,
        berryborepercentage: coffee.berryborepercentage,
        berryborecutting: coffee.berryborecutting,
        other: coffee.other,
        allowance: coffee.allowance,
        lotnumber: coffee.lotnumber,
        netepweight: coffee.netepweight,
        eppercentage: parseFloat(coffee.eppercentage).toFixed(2),
        refference: coffee.referenceselect,
        netWeight: coffee.netWeight - coffee.huskcutting,
        status: coffee.stat,
        bill: bills.length > 0 ? bills[0].bills : [],
        tax: tax,
        taxtype: tax == 0 ? 'tax-exempt' : tax == 5 ? 'cgst 2.5% + sgst 2.5%' : 'cgst 2.5% + sgst 2.5% + igst 5%',
        taxtotal: taxtotal,
        total: total,
        grandtotal: grandtotal,
        cuttings: parseInt(coffee.epweight) - parseInt(coffee.netepweight)

      }

      let options = {
        // displayHeaderFooter: true,
        format: "A4",
        margin: { top: "60px", bottom: "100px" },
        // base: 'file://' + path.resolve('./public') + '/'

      };

      let PDF = await pdfMaster.generatePdf("template.hbs", { data }, options);

      const filePath = path.join(__dirname, '..', 'public', 'report.pdf');
      fs.writeFileSync(filePath, PDF);


    }
    res.redirect('/report.pdf')

  } catch (error) {
    res.redirect('/report.pdf')
  }
};
exports.viewcurrentsales = async (req, res, hi) => {

  try {
    let existingClient = await ClientModel.findOne({ name: req.query.billTo });
    if (existingClient) {
      // Find the coffee item with the specified lotnumber
      const coffee = existingClient.despatch.find(coffee => coffee.lotnumber === req.query.lotnumber);
      const bills = await ClientModel.aggregate([
        { $match: { "salesbillSchema.lotnumber": req.query.lotnumber } }, // Match bills by lotnumber
        { $unwind: "$salesbillSchema" }, // Unwind the purchasebillSchema array
        {
          $addFields: { // Add new field formatted_date to hold the formatted date
            "salesbillSchema.formatted_date": {
              $dateToString: {
                format: "%d:%m:%Y", // Format date as dd:mm:YYYY
                date: "$salesbillSchema.date" // Date field to format
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            subtotal: { $sum: "$salesbillSchema.subtotal" },
            tax: { $sum: "$salesbillSchema.tax" },
            total: { $sum: "$salesbillSchema.total" },
            bills: { $push: "$salesbillSchema" } // Push individual purchase bills into an array
          }
        }
      ]);

      var taxtotal = bills.length > 0 ? bills[0].tax : 0
      var total = bills.length > 0 ? bills[0].subtotal : 0
      var grandtotal = bills.length > 0 ? bills[0].total : 0
      var tax = (taxtotal && total) > 0 ? parseFloat((total / taxtotal) * 100) : 0
      var data = {
        companyname: 'HI TECH COFFEE',
        party: coffee.billTo,
        item: coffee.item,
        delivery: coffee.delivery,
        date: coffee.dateOfIssue,
        vehicleno: coffee.lorry,
        type: 'Sales',
        bags: coffee.bags,
        quantity: coffee.quantity,
        bagweight: parseInt(coffee.bagweight * coffee.bags),
        netweights: parseInt(coffee.quantity - parseFloat(coffee.bagweight * coffee.bags)),
        forignobject: coffee.forignobject,
        weightallowance: parseFloat(coffee.quantity) - parseFloat(coffee.netWeight),
        huskpercentage: coffee.huskpercentage,
        outern: coffee.outern,
        huskcutting: coffee.huskcutting,
        moisturepercentage: coffee.moisturepercentage,
        moisturecutting: coffee.moisturecutting,
        bbpercentage: coffee.bbpercentage,
        bbcutting: coffee.bbcutting,
        berryborepercentage: coffee.berryborepercentage,
        berryborecutting: coffee.berryborecutting,
        other: coffee.other,
        allowance: coffee.allowance,
        lotnumber: coffee.lotnumber,
        netepweight: coffee.netepweight,
        eppercentage: parseFloat(coffee.eppercentage).toFixed(2),
        refference: coffee.referenceselect,
        netWeight: coffee.netWeight - coffee.huskcutting,
        status: coffee.stat,
        bill: bills.length > 0 ? bills[0].bills : [],
        tax: tax,
        taxtype: tax == 0 ? 'tax-exempt' : tax == 5 ? 'cgst 2.5% + sgst 2.5%' : 'cgst 2.5% + sgst 2.5% + igst 5%',
        taxtotal: taxtotal,
        total: total,
        grandtotal: grandtotal,
        cuttings: parseInt(coffee.epweight) - parseInt(coffee.netepweight)

      }

      let options = {
        // displayHeaderFooter: true,
        format: "A4",
        margin: { top: "60px", bottom: "100px" },
        // base: 'file://' + path.resolve('./public') + '/'

      };

      let PDF = await pdfMaster.generatePdf("template.hbs", { data }, options);

      const filePath = path.join(__dirname, '..', 'public', 'report.pdf');
      fs.writeFileSync(filePath, PDF);


    }
    res.redirect('/report.pdf')

  } catch (error) {
    res.redirect('/report.pdf')
  }
};