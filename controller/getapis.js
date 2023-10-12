const ClientModel = require('../model/clientsmodal');
const mongoose = require('mongoose');

exports.getclients = async (req, res) => {
    try {
      const docs = await ClientModel.find();
      console.log(docs)
      res.send(docs);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching clients');
    }
  };