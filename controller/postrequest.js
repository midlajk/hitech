const { ConnectionCheckOutFailedEvent } = require('mongodb');
const mongoose = require('mongoose');

const ClientModel = mongoose.model('Client')
const Reference = mongoose.model('Reference')
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const pdfMaster = require("pdf-master");


exports.addseller = async (req, res) => {
  const name = req.body.name.trim().toUpperCase();

  const existingClient = await ClientModel.findOne({ name: name });
  if (existingClient) {
    res.json({ success: false, message: 'client already exist' });

  }else{
    const newClient = new ClientModel({
      name: name,
      gst: req.body.gst,
      address: req.body.address,
      phone: req.body.phone,
    });

    await newClient.save();
    res.json({ success: true, message: 'Reference added successfully' });

  }
}
exports.addpurchasecommitment = async (req, res) => {
  console.log(req.body)
  try {

      // Find the client by name
      const client = await ClientModel.findOne({ name: req.body.name });

      if (!client) {
          return res.status(404).json({ error: 'Client not found' });
      }
      const number = client.purchasecommitments.length+1 
 const currentDate = new Date();
 const day = ('0' + currentDate.getDate()).slice(-2); // Get the day with leading zero if necessary
 const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Get the month with leading zero if necessary

 const formattedDate = `${month}${day}`;
 
 const trimmedItem = req.body.pccomitem.trim().split(' ')[0]; // Get the first part of the item by trimming and splitting
 
 const uniqueId = `${formattedDate}-${trimmedItem}-${number}-${req.body.name}`;
  // Generate a unique ID using uuidv4 and include the reference
      // Add the new purchase commitment to the purchasecommitments array
      client.purchasecommitments.push({
        item:req.body.pccomitem,
        date:req.body.pccomdate,
        referance:req.body.reference,
        id:uniqueId,
        weight:req.body.pccomweight,
        eppercentage:req.body.pccomep,
        balance:req.body.pccomweight,
        rate:req.body.pccomrate,
        additional:req.body.pccomAdditional,
        info:req.body.pccomInfo
      });
   
      // Save the updated client to the database
      await client.save();

      res.status(200).json({ message: 'Purchase commitment added successfully!' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.addsalecommitment = async (req, res) => {
  try {
      const client = await ClientModel.findOne({ name: req.body.name });

      if (!client) {
          return res.status(404).json({ error: 'Client not found' });
      }
 const number = client.salescommitmentsschema.length+1
 
 const currentDate = new Date();
 const day = ('0' + currentDate.getDate()).slice(-2); // Get the day with leading zero if necessary
 const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Get the month with leading zero if necessary

 
 const formattedDate = `${month}${day}`;
 
 const trimmedItem = req.body.scitem.trim().split(' ')[0]; // Get the first part of the item by trimming and splitting
 
 const uniqueId = `${formattedDate}-${trimmedItem}-${number}-${req.body.name }`;
      // Add the new purchase commitment to the purchasecommitments array
      client.salescommitmentsschema.push({
        item:req.body.scitem,
        date:req.body.scdate,
        referance:req.body.reference,
        id:uniqueId,
        weight:req.body.scweight,
        eppercentage:req.body.scep,
        balance:req.body.scweight,
        rate:req.body.scrate,
        additional:req.body.scAdditional,
        info:req.body.scInfo
      });
   
      // Save the updated client to the database
      await client.save();
      res.status(200).json({ message: 'Purchase commitment added successfully!' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.addrefference = async (req, res) => {
  const name = req.body.refference.trim().toUpperCase();

  try {
     const existingClient = await Reference.findOne({ name: name });
  if (existingClient) {
    res.json({ success: true, message: 'Reference added successfully' });

  }else{
    // Create a new reference document based on the request body
    const newReference = new Reference({
      name: name
    });

    // Save the reference document to MongoDB
    await newReference.save();

    // Send a success response to the client
    res.json({ success: true, message: 'Reference added successfully' });
  }
  } catch (error) {
    // Handle errors and send an error response
    console.log('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
exports.addproducts = async (req, res) => {
  const name = req.body.product.trim().toUpperCase();
  try {
    const existingClient = await PoductsSchema.findOne({ product: name });
    if (existingClient) {
      res.json({ success: true, message: 'Reference added successfully' });
  
    }else{
    // Create a new reference document based on the request body
    const newproduct = new PoductsSchema({
      itemtype:req.body.itemtype,
      product: name,
    byproduct:req.body.byproduct
    });

    // Save the newproduct document to MongoDB
    await newproduct.save();

    // Send a success response to the client
    res.json({ success: true, message: 'Reference added successfully' });
  }
  } catch (error) {
    // Handle errors and send an error response
    console.log('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

  
}
exports.addtransportagent = async (req, res) => {
  const name = req.body.agent.trim().toUpperCase();

    try {
      const existingClient = await Transportagent.findOne({ agent: name });
      if (existingClient) {
        res.json({ success: true, message: 'Reference added successfully' });

    
      }else{
      // Create a new reference document based on the request body
      const newproduct = new Transportagent({
        agent: name,
        address:req.body.address,
        phone:req.body.phone,
        strength:req.body.strength,
       
      });
  
      // Save the newproduct document to MongoDB
      await newproduct.save();
  
      // Send a success response to the client
      res.json({ success: true, message: 'Reference added successfully' });
    }
    } catch (error) {
      // Handle errors and send an error response
      console.log('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

  ////Transactions //////
  exports.addTransactions = async (req, res) => {

    try {
      console.log(req.body.name)
      const client = await ClientModel.findOne({ name: req.body.name });

      if (!client) {
          return res.status(404).json({ error: 'Client not found' });
      }


      client.transaction.push({
        name:req.body.name,
        date:req.body.date,
        refference:req.body.refference||'Transaction',
        revievable:req.body.revievable||0,
        payable:req.body.payable||0,
        medium:req.body.medium,
        recieved:req.body.recieved||0,
        paid:req.body.paid||0
      });
 
      const paid = (client.paid||0) + req.body.paid||0
      const recieved = (client.recieved||0) + req.body.recieved||0

      client.paid = paid;
      client.recieved = recieved;
      await client.save();
   
      // Save the updated client to the database
      res.status(201).json({ message: 'Transaction saved successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  }