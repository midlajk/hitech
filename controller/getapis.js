const ClientModel = require('../model/clientsmodal');
const CoffeeSchema = require('../model/clientsmodal');
const Reference = require('../model/clientsmodal');

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
  console.log('here')
  // Assuming you have already imported required modules and set up your Express app
  
  // API endpoint for paginated data
    try {
      const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
      const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
      const length = parseInt(req.query.length) || 10; // Get the number of records per page
      // Fetch data from the database with pagination
      const name = req.query.name; // Assuming 'name' is sent as a query parameter

      const client = await ClientModel.findOne({ name: name});
   

      if (!client) {
        // Handle case where client with the specified name is not found
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      const purchaseCommitments = client.purchasecommitments.slice(start, start + length);
      console.log(purchaseCommitments)
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
  exports.salescommitments  = (async (req, res) => {
    console.log('here')
    // Assuming you have already imported required modules and set up your Express app
    
    // API endpoint for paginated data
      try {
        const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
        const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
        const length = parseInt(req.query.length) || 10; // Get the number of records per page
        // Fetch data from the database with pagination
        const client = await ClientModel.findOne({ name: req.query.name });
  
        if (!client) {
          // Handle case where client with the specified name is not found
          res.status(404).json({ error: 'Client not found' });
          return;
        }
        const salescommitmentsschema = client.salescommitmentsschema.slice(start, start + length);
  
        res.json({
          draw,
        recordsTotal: client.salescommitmentsschema.length,
        recordsFiltered: client.salescommitmentsschema.length,
        data: salescommitmentsschema,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
      }
    
    
    });
    //////arrivals   ////////////
    exports.arrivals  = (async (req, res) => {
      // Assuming you have already imported required modules and set up your Express app
      
      // API endpoint for paginated data
        try {
          const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
          const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
          const length = parseInt(req.query.length) || 10; // Get the number of records per page
          // Fetch data from the database with pagination
          const client = await ClientModel.aggregate([
            {
                $unwind: "$coffee"
            },
            {
                $skip: start
            },
            {
                $limit: start+length
            },
            // {
            //     $project: {
            //         draw: { $literal: draw }, // Include the draw value in the result
            //         coffee: "$coffee"
            //     }
            // }
          ])
          if (!client || client.length === 0) {
            // Handle case where no client or coffee data is found
            res.status(404).json({ error: 'No client or coffee data found' });
            return;
        }
        const totalclients = await ClientModel.aggregate([
          {
              $unwind: "$coffee"
          }])
          console.log(client)
        res.json({
            draw,
            recordsTotal: totalclients.length,
            recordsFiltered: totalclients.length,
            data: client,
        });
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Server error' });
        }
      
      
      });
      exports.despatch  = (async (req, res) => {
        // Assuming you have already imported required modules and set up your Express app
        
        // API endpoint for paginated data
          try {
            const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
            const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
            const length = parseInt(req.query.length) || 10; // Get the number of records per page
            // Fetch data from the database with pagination
            const client = await ClientModel.aggregate([
              {
                  $unwind: "$despatch"
              },
              {
                  $skip: start
              },
              {
                  $limit: start+length
              },
              // {
              //     $project: {
              //         draw: { $literal: draw }, // Include the draw value in the result
              //         coffee: "$coffee"
              //     }
              // }
            ])
            console.log(client)
            if (!client || client.length === 0) {
              // Handle case where no client or coffee data is found
              res.status(404).json({ error: 'No client or coffee data found' });
              return;
          }
          const totalclients = await ClientModel.aggregate([
            {
                $unwind: "$despatch"
            }])
          res.json({
              draw,
              recordsTotal: totalclients.length,
              recordsFiltered: totalclients.length,
              data: client,
          });
          } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Server error' });
          }
        
        
        });
      ////////////////////////////////////////////////////////////////
    exports.individualarrivals  = (async (req, res) => {
      // Assuming you have already imported required modules and set up your Express app
      
      // API endpoint for paginated data
        try {
          const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
          const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
          const length = parseInt(req.query.length) || 10; // Get the number of records per page
          // Fetch data from the database with pagination
          const client = await ClientModel.findOne({ name: req.query.name });
    
          if (!client) {
            // Handle case where client with the specified name is not found
            res.status(404).json({ error: 'Client not found' });
            return;
          }
          const coffee = client.coffee.slice(start, start + length);
    console.log(coffee)
          res.json({
            draw,
          recordsTotal: client.coffee.length,
          recordsFiltered: client.coffee.length,
          data: coffee,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Server error' });
        }
      
      
      });
      exports.individualdespatch  = (async (req, res) => {
        // Assuming you have already imported required modules and set up your Express app
        
        // API endpoint for paginated data
          try {
            const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
            const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
            const length = parseInt(req.query.length) || 10; // Get the number of records per page
            // Fetch data from the database with pagination
            const client = await ClientModel.findOne({ name: req.query.name });
      
            if (!client) {
              // Handle case where client with the specified name is not found
              res.status(404).json({ error: 'Client not found' });
              return;
            }
            const coffee = client.despatch.slice(start, start + length);
            res.json({
              draw,
            recordsTotal: client.despatch.length,
            recordsFiltered: client.despatch.length,
            data: coffee,
            });
          } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Server error' });
          }
        
        
        });



        exports.getrefference = async (req, res) => {
          try {
            const searchTerm = req.query.term;
        if(!searchTerm){
          const clients = await Reference.aggregate([{ $sample: { size: 20 } }]);
      
          const names = clients.map(client => client.newRouteName);  
            res.json({ results: names })
        }else{
          const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

            const clients = await Reference.find({ newRouteName: { $regex: escapedSearchTerm, $options: 'i' } }, 'newRouteName');
        
            const names = clients.map(client => client.newRouteName);
        
            res.json({ results: names });
            
        }
            
              
        
          
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    
        };
      