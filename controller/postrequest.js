const { ConnectionCheckOutFailedEvent } = require('mongodb');
const ClientModel = require('../model/clientsmodal');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');

exports.generatepurchasereport = async (req, res) => {
  console.log(req.body);
  try {
    const existingClient = await ClientModel.findOne({ name: req.body.billTo });

    if (existingClient) {
      // If the client exists, update the coffee array
      existingClient.coffee.push({
        date: req.body.dateOfIssue,
        invoice: req.body.invoicenumber,
        item: req.body.item,
        bags: req.body.bags,
        qty: req.body.quantity,
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
        pberry: req.body.pberry,
      });

      await existingClient.save();
    }

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting the form' });
  }
};
exports.generatesalesreport = async (req, res) => {
  try {
    const existingClient = await ClientModel.findOne({ name: req.body.billTo });

    if (existingClient) {
      // If the client exists, update the coffee array
      existingClient.despatch.push({
        date: req.body.dateOfIssue,
        invoice: req.body.invoicenumber,
        item: req.body.item,
        bags: req.body.bags,
        qty: req.body.quantity,
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
        pberry: req.body.pberry,
      });

      await existingClient.save();
    } 

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting the form' });
  }
};
exports.addseller = async (req, res) => {
  console.log(req.body)

  const existingClient = await ClientModel.findOne({ name: req.body.billTo });
  console.log(existingClient)
  if (existingClient) {
    res.redirect('/accounts');

  }else{
    const newClient = new ClientModel({
      name: req.body.name,
      gst: req.body.gst,
      address: req.body.address,
      phone: req.body.phone,
    });

    await newClient.save();
    res.redirect('/accounts');

  }
}
exports.addpurchasecommitment = async (req, res) => {
  try {

      // Find the client by name
      const client = await ClientModel.findOne({ name: req.body.name });

      if (!client) {
          return res.status(404).json({ error: 'Client not found' });
      }
 const reference = req.body.pcreference || '';
 
 const currentDate = new Date().getTime();
    
  // Generate a unique ID using uuidv4 and include the reference
  const uniqueId = `pc-${reference}-${currentDate}`;
      // Add the new purchase commitment to the purchasecommitments array
      client.purchasecommitments.push({
        item:req.body.pcitem,
        date:req.body.pcdate,
        referance:req.body.reference,
        id:uniqueId,
        weight:req.body.pcweight,
        eppercentage:req.body.pcep,
        balance:req.body.pcweight,
        rate:req.body.pcrate
      });
   
      // Save the updated client to the database
      await client.save();

      res.status(200).json({ message: 'Purchase commitment added successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.addsalecommitment = async (req, res) => {
  try {
console.log(req.body)
      const client = await ClientModel.findOne({ name: 'Dubai' });

      if (!client) {
          return res.status(404).json({ error: 'Client not found' });
      }
 const reference = req.body.screference || '';
 
 const currentDate = new Date().getTime();
    
  // Generate a unique ID using uuidv4 and include the reference
  const uniqueId = `sc-${reference}-${currentDate}`;
      // Add the new purchase commitment to the purchasecommitments array
      client.salescommitmentsschema.push({
        item:req.body.scitem,
        date:req.body.scdate,
        referance:req.body.reference,
        id:uniqueId,
        weight:req.body.scweight,
        eppercentage:req.body.scep,
        balance:req.body.scweight,
        rate:req.body.scrate
      });
   
      // Save the updated client to the database
      await client.save();
      res.status(200).json({ message: 'Purchase commitment added successfully!' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};