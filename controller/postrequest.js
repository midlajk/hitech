const ClientModel = require('../model/clientsmodal');
const mongoose = require('mongoose');

exports.generatebill = async (req, res) => {
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
    } else {
      // If the client doesn't exist, create a new client document
      const newClient = new ClientModel({
        name: req.body.billTo,
        gst: req.body.gst,
        address: req.body.billToAddress,
        phone: req.body.phone,
        coffee: [
          {
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
          },
        ],
      });

      await newClient.save();
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