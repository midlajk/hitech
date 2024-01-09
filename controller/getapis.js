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
      const searchTerm = req.query.term;
  console.log(searchTerm)
  if(!searchTerm){
    const clients = await ClientModel.aggregate([{ $sample: { size: 20 } }]);

    const names = clients.map(client => client.name);  
      res.json({ results: names })
  }else{
    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      const clients = await ClientModel.find({ name: { $regex: escapedSearchTerm, $options: 'i' } }, 'name');
  
      const names = clients.map(client => client.name);
  
      res.json({ results: names });
      
  }
      
        
  
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
//     try {

//       const docs = await ClientModel.find()
// // 'i' flag for case-insensitive search
//       res.json(docs);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('An error occurred while fetching clients');
//     }
  };

  ////
exports.purchasecommitment  = (async (req, res) => {
  // Assuming you have already imported required modules and set up your Express app
  
  // API endpoint for paginated data
    try {
      const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
      const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
      const length = parseInt(req.query.length) || 10; // Get the number of records per page
      // Fetch data from the database with pagination
      const client = await ClientModel.findOne({ name: 'Dubai' });

      if (!client) {
        // Handle case where client with the specified name is not found
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      const purchaseCommitments = client.purchasecommitments.slice(start, start + length);

      res.json({
        draw,
      recordsTotal: client.purchasecommitments.length,
      recordsFiltered: client.purchasecommitments.length,
      data: purchaseCommitments,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  
  
  });