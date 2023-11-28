const ClientModel = require('../model/clientsmodal');
const mongoose = require('mongoose');

exports.getclients = async (req, res) => {
  
    try {
      const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
      const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
      const length = parseInt(req.query.length) || 10; 
      const searchValue = req.query.search.value || ''; // Get the search value
      const regex = new RegExp(searchValue, 'i');
      const docs = await ClientModel.find({
        $or: [
          { name: regex },
        ]
      }).sort({ _id: -1 }).skip(start).limit(length); 
      console.log(docs)// 'i' flag for case-insensitive search
      res.json({draw,
        recordsTotal: 10,
      recordsFiltered: 10,
        docs});
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching clients');
    }
  };
  exports.getnames = async (req, res) => {
  
    try {

      const docs = await ClientModel.find()
      console.log(docs)// 'i' flag for case-insensitive search
      res.json(docs);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching clients');
    }
  };