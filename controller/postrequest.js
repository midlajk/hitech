const { ConnectionCheckOutFailedEvent } = require('mongodb');
const mongoose = require('mongoose');

const ClientModel = mongoose.model('Client')
const Reference = mongoose.model('Reference')
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')

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
        referenceselect: req.body.referenceselect,
        billTo: req.body.billTo,
        transportagent: req.body.transportagent,
        lorry: req.body.lorry,
        billtype: req.body.billtype,
        delivery: req.body.delivery,
        remarks: req.body.remarks,
        item: req.body.item,
        bags: req.body.bags,
        quantity: req.body.quantity,
        bagweight: req.body.bagweight,
        forignobject: req.body.forignobject,
        weightallowance: req.body.weightallowance,
        outern: req.body.outern,
        huskpercentage: req.body.huskpercentage,
        huskcutting: req.body.huskcutting,
        moisturepercentage: req.body.moisturepercentage,
        moisturecutting: req.body.moisturecutting,
        bbpercentage: req.body.bbpercentage,
        bbcutting: req.body.bbcutting,
        berryborepercentage: req.body.berryborepercentage,
        berryborecutting: req.body.berryborecutting,
        other: req.body.other,
        allowance: req.body.allowance,
        lotnumber:req.body.lotnumber,
        netepweight:req.body.netepweight,
        netWeight:req.body.netWeight,
        eppercentage:req.body.eppercentage,
        storage:req.body.netepweight - ((req.body.billedquantity*100)/req.body.eppercentage)

      });
      if(req.body.bill.length>0){
        for (const bill of req.body.bill) {

          // Push the new sales bill document to the client's salesbillSchema array
          existingClient.purchasebillSchema.push({
            date: bill.date,
            item: req.body.item,
            invoice: bill.billid,
            uniqueid: bill.uniqueid,
            commitment: bill.id,
            lotnumber: bill.lot,
            weight:parseInt((req.body.quantity*100)/req.body.eppercentage),
            qty: bill.quantity,
            amount: bill.rate,
            subtotal: bill.total,
            sgst: bill.sgst,
            cgst: bill.cgst,
            igst: bill.igst,
            total: bill.total,
            tds: bill.tds
          });
          const purchasecommitment = existingClient.purchasecommitments.find(commitment => commitment.id === bill.id);

          if (purchasecommitment) {
            // Calculate the new balance by subtracting the delivered quantity from the total quantity
            const newBalance = purchasecommitment.balance - parseInt((bill.quantity*100)/req.body.eppercentage) ;
    
            // Update the balance in the sales commitment object
            purchasecommitment.balance = newBalance<0?0:newBalance;
        }
       
        }

      }
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
        referenceselect: req.body.referenceselect,
        billTo: req.body.billTo,
        transportagent: req.body.transportagent,
        lorry: req.body.lorry,
        billtype: req.body.billtype,
        delivery: req.body.delivery,
        remarks: req.body.remarks,
        item: req.body.item,
        bags: req.body.bags,
        quantity: req.body.quantity,
        bagweight: req.body.bagweight,
        forignobject: req.body.forignobject,
        weightallowance: req.body.weightallowance,
        outern: req.body.outern,
        huskpercentage: req.body.huskpercentage,
        huskcutting: req.body.huskcutting,
        moisturepercentage: req.body.moisturepercentage,
        moisturecutting: req.body.moisturecutting,
        bbpercentage: req.body.bbpercentage,
        bbcutting: req.body.bbcutting,
        berryborepercentage: req.body.berryborepercentage,
        berryborecutting: req.body.berryborecutting,
        other: req.body.other,
        allowance: req.body.allowance,
        lotnumber:req.body.lotnumber,
        netepweight:req.body.netepweight,
        netWeight:req.body.netWeight,
        eppercentage:req.body.eppercentage,
        storage:req.body.netepweight - ((req.body.billedquantity*100)/req.body.eppercentage)
      });
      
      if(req.body.bill.length>0){
        for (const bill of req.body.bill) {

          // Push the new sales bill document to the client's salesbillSchema array
          existingClient.salesbillSchema.push({
            date: bill.date,
            item: req.body.item,
            invoice: bill.billid,
            uniqueid: bill.uniqueid,
            commitment: bill.id,
            lotnumber: bill.lot,
            weight:parseInt((req.body.quantity*100)/req.body.eppercentage),
            qty: bill.quantity,
            amount: bill.rate,
            subtotal: bill.total,
            sgst: bill.sgst,
            cgst: bill.cgst,
            igst: bill.igst,
            total: bill.total,
            tds: bill.tds
          });
          const salesCommitment = existingClient.salescommitmentsschema.find(commitment => commitment.id === bill.id);

          if (salesCommitment) {
            // Calculate the new balance by subtracting the delivered quantity from the total quantity
            const newBalance = salesCommitment.balance - parseInt((bill.quantity*100)/req.body.eppercentage) ;
    
            // Update the balance in the sales commitment object
            salesCommitment.balance = newBalance<0?0:newBalance;
        }
       
        }

      }

      await existingClient.save();
    } 

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting the form' });
  }
};
exports.addseller = async (req, res) => {

  const existingClient = await ClientModel.findOne({ name: req.body.name });
  if (existingClient) {
    res.json({ success: false, message: 'client already exist' });

  }else{
    const newClient = new ClientModel({
      name: req.body.name,
      gst: req.body.gst,
      address: req.body.address,
      phone: req.body.phone,
    });

    await newClient.save();
    res.json({ success: true, message: 'Reference added successfully' });

  }
}
exports.addpurchasecommitment = async (req, res) => {
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
 
 const trimmedItem = req.body.pcitem.trim().split(' ')[0]; // Get the first part of the item by trimming and splitting
 
 const uniqueId = `${formattedDate}-${trimmedItem}-${number}-${req.body.name}`;
  // Generate a unique ID using uuidv4 and include the reference
      // Add the new purchase commitment to the purchasecommitments array
      client.purchasecommitments.push({
        item:req.body.pcitem,
        date:req.body.pcdate,
        referance:req.body.reference,
        id:uniqueId,
        weight:req.body.pcweight,
        eppercentage:req.body.pcep,
        balance:req.body.pcweight,
        rate:req.body.pcrate,
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
        additional:req.body.pcAdditional,
        info:req.body.pcInfo
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
  console.log('ggg')

  try {
    // Create a new reference document based on the request body
    const newReference = new Reference({
      name: req.body.refference
    });

    // Save the reference document to MongoDB
    await newReference.save();

    // Send a success response to the client
    res.json({ success: true, message: 'Reference added successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.log('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
exports.addproducts = async (req, res) => {
  console.log('ggg')
  try {
    // Create a new reference document based on the request body
    const newproduct = new PoductsSchema({
      product: req.body.product,
    byproduct:req.body.byproduct
    });

    // Save the newproduct document to MongoDB
    await newproduct.save();

    // Send a success response to the client
    res.json({ success: true, message: 'Reference added successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.log('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

  
}
exports.addtransportagent = async (req, res) => {
    try {
      // Create a new reference document based on the request body
      const newproduct = new Transportagent({
        agent: req.body.agent,
        address:req.body.address,
        phone:req.body.phone,
        strength:req.body.strength,
       
      });
  
      // Save the newproduct document to MongoDB
      await newproduct.save();
  
      // Send a success response to the client
      res.json({ success: true, message: 'Reference added successfully' });
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
        date:req.body.date,
        refference:req.body.refference||'Transaction',
        revievable:req.body.revievable||0,
        payable:req.body.payable||0,
        medium:req.body.medium,
        recieved:req.body.recieved||0,
        paid:req.body.paid||0
      });
      await client.save();
   
      // Save the updated client to the database
      res.status(201).json({ message: 'Transaction saved successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  }