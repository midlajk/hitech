
require('../model/clientsmodal')
const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const CoffeeSchema = mongoose.model('CoffeeSchema');
const Reference = mongoose.model('Reference');
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')


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
      // 'i' flag for case-insensitive search
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
    console.log('ss')
    try {
      const searchTerm = req.query.term;
  if(!searchTerm){

    const clients = await ClientModel.aggregate([{ $sample: { size: 20 } }]);

    const names = clients.map(client => client.name);  
      res.json({ results: names })
  }else{

    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      const clients = await ClientModel.find({ name: { $regex: escapedSearchTerm, $options: 'i' } }, 'name');
  
      const names = clients.map(client => client.name);
      console.log(clients,'hhhh')
  
      res.json({ results: names });
      
  }
      
        
  
    
    } catch (error) {
      console.log(error);
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
  exports.getproducts = async (req, res) => {
    try {
      const searchTerm = req.query.term;
  if(!searchTerm){

    const products = await PoductsSchema.aggregate([{ $sample: { size: 20 } }]);

    const names = products.map(p => p.product);  
      res.json({ results: names })
  }else{

    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      const product = await PoductsSchema.find({ product: { $regex: escapedSearchTerm, $options: 'i' } }, 'product');
  
      const names = product.map(p => p.product);
  
      res.json({ results: names });
      
  }
      
        
  
    
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  };


// exports.purchasecommitment = async (req, res) => {
//   try {
//       const draw = parseInt(req.query.draw) || 1;
//       const name = req.query.name; // Get the name parameter
//       const item = req.query.item; // Get the item parameter
//       const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
//       const length = parseInt(req.query.length) || 10; // Get the number of records per page

//       // Construct the aggregation pipeline
//       const countPipeline = [
//           {
//               $match: { name: name } // Match documents by name
//           },
//           {
//               $unwind: '$purchasecommitments' // Unwind the purchasecommitments array
//           }
//       ];

//       // If item parameter is provided, add match stage for item
//       if (item) {
//         countPipeline.push({
//               $match: { 'purchasecommitments.item': item } // Match documents by item
//           });
//       }
//       countPipeline.push(
//         {
//             $group: {
//                 _id: '$_id',
//                 totalCount: { $sum: 1 } // Count the total number of documents
//             }
//         }
//     );

//     const totalCountResult = await ClientModel.aggregate(countPipeline);
//     const totalCount = totalCountResult.length > 0 ? totalCountResult[0].totalCount : 0;
//     countPipeline.pop()
//     const pipeline = [...countPipeline]; 
//     pipeline.push({ $sort: { 'purchasecommitments._id': -1 } });
//     // pipeline.push({ $sort: { 'purchasecommitments.date': -1 } }); 
//       // Add pagination stages
//       pipeline.push(
//           { $skip: start }, // Skip records for pagination
//           { $limit: length } // Limit records for pagination
//       );
      
//       pipeline.push({
//           $group: {
//               _id: '$_id',
//               name: { $first: '$name' },
//               purchasecommitments: { $push: '$purchasecommitments' } // Push matching purchasecommitments to array
//           }
//       });

//       const client = await ClientModel.aggregate(pipeline);
//       const purchasecommitments = client.length>0?client[0].purchasecommitments:[];
//       console.log(purchasecommitments)

//       if (!client || client.length === 0) {
//           // Handle case where client with the specified name is not found
//           return res.status(404).json({ error: 'Client with specified name not found' });
//       }

//       res.json({
//       draw,
//       recordsTotal: totalCount,
//       recordsFiltered: totalCount,
//       data: purchasecommitments,
//       });
//   } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Server error' });
//   }
// };
exports.purchasecommitment = async (req, res) => {
  try {
      const draw = parseInt(req.query.draw) || 1;
      const name = req.query.name; // Get the name parameter
      const item = req.query.item; // Get the item parameter
      const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
      const length = parseInt(req.query.length) || 10; // Get the number of records per page

      // Construct the aggregation pipeline
      const pipeline = [
          {
              $match: { name: name } // Match documents by name
          },
          {
              $unwind: '$purchasecommitments' // Unwind the salescommitmentsschema array
          }
      ];

      // If item parameter is provided, add match stage for item
      if (item) {
          pipeline.push({
              $match: { 'purchasecommitments.item': item } // Match documents by item
          });
      }

      // Count the total number of documents
      const countPipeline = [...pipeline, { $count: 'totalCount' }];
      const countResult = await ClientModel.aggregate(countPipeline);
      const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
      pipeline.push({ $sort: { 'purchasecommitments._id': -1 } });

      // Add pagination stages
      pipeline.push(
          { $skip: start }, // Skip records for pagination
          { $limit: length } // Limit records for pagination
      );

      // Group the data
      pipeline.push({
          $group: {
              _id: '$_id',
              name: { $first: '$name' },
              purchasecommitments: { $push: '$purchasecommitments' } // Push matching salescommitmentsschema to array
          }
      });

      // Execute the aggregation pipeline
      const client = await ClientModel.aggregate(pipeline);
      const purchasecommitments = client.length > 0 ? client[0].purchasecommitments : [];

      res.json({
          draw,
          recordsTotal: totalCount,
          recordsFiltered: totalCount,
          data: purchasecommitments,
      });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Server error' });
  }
};
exports.salescommitments = async (req, res) => {
  try {
      const draw = parseInt(req.query.draw) || 1;
      const name = req.query.name; // Get the name parameter
      const item = req.query.item; // Get the item parameter
      const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
      const length = parseInt(req.query.length) || 10; // Get the number of records per page

      // Construct the aggregation pipeline
      const pipeline = [
          {
              $match: { name: name } // Match documents by name
          },
          {
              $unwind: '$salescommitmentsschema' // Unwind the salescommitmentsschema array
          }
      ];

      // If item parameter is provided, add match stage for item
      if (item) {
          pipeline.push({
              $match: { 'salescommitmentsschema.item': item } // Match documents by item
          });
      }

      // Count the total number of documents
      const countPipeline = [...pipeline, { $count: 'totalCount' }];
      const countResult = await ClientModel.aggregate(countPipeline);
      const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
      pipeline.push({ $sort: { 'salescommitmentsschema._id': -1 } });
      // Add pagination stages
      pipeline.push(
          { $skip: start }, // Skip records for pagination
          { $limit: length } // Limit records for pagination
      );

      // Group the data
      pipeline.push({
          $group: {
              _id: '$_id',
              name: { $first: '$name' },
              salescommitmentsschema: { $push: '$salescommitmentsschema' } // Push matching salescommitmentsschema to array
          }
      });

      // Execute the aggregation pipeline
      const client = await ClientModel.aggregate(pipeline);
      console.log(client)
      const salescommitmentsschema = client.length > 0 ? client[0].salescommitmentsschema : [];

      res.json({
          draw,
          recordsTotal: totalCount,
          recordsFiltered: totalCount,
          data: salescommitmentsschema,
      });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

 
    //////arrivals   ////////////
    exports.arrivals = async (req, res) => {
      console.log('here')
      try {
          const name = req.query.name;
          const draw = parseInt(req.query.draw) || 1;
          const start = parseInt(req.query.start) || 0;
          const length = parseInt(req.query.length) || 10;
  
          let pipeline = [
              {
                  $unwind: "$coffee"
              },
              {
                  $skip: start
              },
              {
                  $limit: length
              },
              {
                $group: {
                  _id: null,
                  coffee: { $push: '$coffee' } // Push matching salescommitmentsschema to array
              }}
          ];
  
          // If name is provided in the query, add a $match stage to filter by name
          if (name) {
              pipeline.unshift({
                  $match: { name: name }
              });
          }
  
          const client = await ClientModel.aggregate(pipeline);
  
          if (!client || client.length === 0) {
              res.status(404).json({ error: 'No client or coffee data found' });
              return;
          }
  
          const totalclients = await ClientModel.aggregate([{ $unwind: "$coffee" }]);
  
          res.json({
              draw,
              recordsTotal: totalclients.length,
              recordsFiltered: totalclients.length,
              data: client[0].coffee,
          });
      } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Server error' });
      }
  };
  exports.despatch = async (req, res) => {
    try {
        const draw = parseInt(req.query.draw) || 1;
        const start = parseInt(req.query.start) || 0;
        const length = parseInt(req.query.length) || 10;

        let pipeline = [
            {
                $unwind: "$despatch"
            },
            {
                $skip: start
            },
            {
                $limit: length
            },
            {
              $group: {
                _id: null,
                despatch: { $push: '$despatch' } // Push matching salescommitmentsschema to array
            }}
        ];

        // If name is provided in the query, add a $match stage to filter by name
        // if (name) {
        //     pipeline.unshift({
        //         $match: { name: name }
        //     });
        // }

        const client = await ClientModel.aggregate(pipeline);


        const totalclients = await ClientModel.aggregate([{ $unwind: "$despatch" }]);

        res.json({
            draw,
            recordsTotal: totalclients.length,
            recordsFiltered: totalclients.length,
            data: client.length>0?client[0].despatch:[],
        });
       
    } catch (error) {
        console.log('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
   
      ///////////////////////////////////////////////////////////////// biills
      exports.salesbills  = (async (req, res) => {
        console.log('sdsd')
        // Assuming you have already imported required modules and set up your Express app
        
        // API endpoint for paginated data
          try {
            const name = req.query.name;
            const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
            const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
            const length = parseInt(req.query.length) || 10; // Get the number of records per page
            // Fetch data from the database with pagination
            const client = await ClientModel.aggregate([
              {
                $match: { name: name } // Match documents by name
            },
              {
                  $unwind: "$salesbillSchema"
              },
              {
                  $skip: start
              },
              {
                  $limit: start+length
              },
              {
              $group: {
                _id: '$_id',
                name: { $first: '$name' },
                salesbillSchema: { $push: '$salesbillSchema' } // Push matching salescommitmentsschema to array
            }}
              // {
              //     $project: {
              //         draw: { $literal: draw }, // Include the draw value in the result
              //         coffee: "$coffee"
              //     }
              // }
            
            ])
            const salesbills = client.length > 0 ? client[0].salesbillSchema : [];

          //   if (!client || client.length === 0) {
          //     // Handle case where no client or coffee data is found
          //     res.status(404).json({ error: 'No client or coffee data found' });
          //     return;
          // }
          const totalclients = await ClientModel.aggregate([
            {
                $unwind: "$salesbillSchema"
            }])
          res.json({
              draw,
              recordsTotal: totalclients.length,
              recordsFiltered: totalclients.length,
              data: salesbills,
          });
          } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Server error' });
          }
        
        
        });
      
      
        exports.purchasebills  = (async (req, res) => {
          // Assuming you have already imported required modules and set up your Express app
          
          // API endpoint for paginated data
            try {
              const name = req.query.name;
              const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
              const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
              const length = parseInt(req.query.length) || 10; // Get the number of records per page
              // Fetch data from the database with pagination
              const client = await ClientModel.aggregate([
                {
                  $match: { name: name } // Match documents by name
              },
                {
                    $unwind: "$purchasebillSchema"
                },
                {
                    $skip: start
                },
                {
                    $limit: start+length
                },
                {
                $group: {
                  _id: '$_id',
                  name: { $first: '$name' },
                  purchasebillSchema: { $push: '$purchasebillSchema' } // Push matching salescommitmentsschema to array
              }}
                // {
                //     $project: {
                //         draw: { $literal: draw }, // Include the draw value in the result
                //         coffee: "$coffee"
                //     }
                // }
              
              ])
              const purchasebills = client.length > 0 ? client[0].purchasebillSchema : [];
            const totalclients = await ClientModel.aggregate([
              {
                $match: { name: name } // Match documents by name
            },
              {
                  $unwind: "$salesbillSchema"
              }])
            
            res.json({
                draw,
                recordsTotal: totalclients.length,
                recordsFiltered: totalclients.length,
                data: purchasebills,
            });
            } catch (error) {
              console.LOG('Error fetching data:', error);
              res.status(500).json({ error: 'Server error' });
            }
          
          
          });
        
      ///////// storages

      exports.storein  = (async (req, res) => {
        // Assuming you have already imported required modules and set up your Express app
        
        // API endpoint for paginated data
          try {
            const name = req.query.name;

            const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
            const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
            const length = parseInt(req.query.length) || 10; // Get the number of records per page
            // Fetch data from the database with pagination
            const client = await ClientModel.aggregate([
              
              {
                $match: { name: name } // Match documents by name
            },
              {
                  $unwind: "$coffee"
              },
              {
                $match: { "coffee.storage": { $gt: 0 } } // Match documents where coffee.storage is greater than 0
            },
              {
                  $skip: start
              },
              {
                  $limit: start+length
              },
              
                {
                $group: {
                  _id: '$_id',
                  name: { $first: '$name' },
                  coffee: { $push: '$coffee' } // Push matching salescommitmentsschema to array
              }}
              // {
              //     $project: {
              //         draw: { $literal: draw }, // Include the draw value in the result
              //         coffee: "$coffee"
              //     }
              // }
            ])
            const coffee = client.length > 0 ? client[0].coffee : [];

          //   if (!client || client.length === 0) {
          //     // Handle case where no client or coffee data is found
          //     res.status(404).json({ error: 'No client or coffee data found' });
          //     return;
          // }
          const totalclients = await ClientModel.aggregate([
            {
              $match: { name: name } // Match documents by name
          },
            {
                $unwind: "$coffee"
            },
            {
              $match: { "coffee.storage": { $gt: 0 } } // Match documents where coffee.storage is greater than 0
          },])


          res.json({
              draw,
              recordsTotal: totalclients.length,
              recordsFiltered: totalclients.length,
              data: coffee,
          });
          } catch (error) {
            console.log('Error fetching data:', error);
            res.status(500).json({ error: 'Server error' });
          }
        
        
        });
        exports.storeout  = (async (req, res) => {
          console.log('heheh')
          // Assuming you have already imported required modules and set up your Express app
          
          // API endpoint for paginated data
            try {
              const name = req.query.name;
              const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
              const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
              const length = parseInt(req.query.length) || 10; // Get the number of records per page
              // Fetch data from the database with pagination
              const client = await ClientModel.aggregate([
                {
                  $match: { name: name } // Match documents by name
              },
                {
                    $unwind: "$despatch"
                },
                {
                  $match: { "despatch.storage": { $gt: 0 } } // Match documents where coffee.storage is greater than 0
              },
              
                {
                    $skip: start
                },
                {
                    $limit: start+length
                },
                {
                  $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    despatch: { $push: '$despatch' } // Push matching salescommitmentsschema to array
                }}
                // {
                //     $project: {
                //         draw: { $literal: draw }, // Include the draw value in the result
                //         coffee: "$coffee"
                //     }
                // }
              ])
             
            //   if (!client || client.length === 0) {
            //     // Handle case where no client or coffee data is found
            //     res.status(404).json({ error: 'No client or coffee data found' });
            //     return;
            // }
            const despatch = client.length > 0 ? client[0].despatch : [];

            const totalclients = await ClientModel.aggregate([
              {
                $match: { name: name } // Match documents by name
            },
            {
              $match: { "despatch.storage": { $gt: 0 } } // Match documents where coffee.storage is greater than 0
          },
              {
                  $unwind: "$despatch"
              }])
            res.json({
                draw,
                recordsTotal: totalclients.length,
                recordsFiltered: totalclients.length,
                data: despatch,
            });
            } catch (error) {
              console.error('Error fetching data:', error);
              res.status(500).json({ error: 'Server error' });
            }
          
          
          });



      /////
      exports.transactions  = (async (req, res) => {
        console.log('here')
        // Assuming you have already imported required modules and set up your Express app
        
        // API endpoint for paginated data
        
          try {
            const name = req.query.name;
            const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
            const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
            const length = parseInt(req.query.length) || 10; // Get the number of records per page
            // Fetch data from the database with pagination
            let pipeline = [
              {
                  $unwind: "$transaction"
              },
              {
                  $skip: start
              },
              {
                  $limit: length
              },
              {
                $group: {
                  _id: null,
                  transaction: { $push: '$transaction' } // Push matching salescommitmentsschema to array
              }}
          ];
  
          // If name is provided in the query, add a $match stage to filter by name
          if (name) {
              pipeline.unshift({
                  $match: { name: name }
              });
          }
  
          const client = await ClientModel.aggregate(pipeline);
  
            // const client = await ClientModel.aggregate([
            //   {
            //     $match: { name: name } // Match documents by name
            // },
            //   {
            //       $unwind: "$transaction"
            //   },
             
            
            //   {
            //       $skip: start
            //   },
            //   {
            //       $limit: start+length
            //   },
            //   {
            //     $group: {
            //       _id: '$_id',
            //       name: { $first: '$name' },
            //       transaction: { $push: '$transaction' } // Push matching salescommitmentsschema to array
            //   }}
            //   // {
            //   //     $project: {
            //   //         draw: { $literal: draw }, // Include the draw value in the result
            //   //         coffee: "$coffee"
            //   //     }
            //   // }
            // ])
           
          //   if (!client || client.length === 0) {
          //     // Handle case where no client or coffee data is found
          //     res.status(404).json({ error: 'No client or coffee data found' });
          //     return;
          // }
          const transaction = client.length > 0 ? client[0].transaction : [];
          let pipeline2 = [
            {
                $unwind: "$transaction"
            },
           
        ];

        // If name is provided in the query, add a $match stage to filter by name
        if (name) {
          pipeline2.unshift({
                $match: { name: name }
            });
        }

          const totalclients = await ClientModel.aggregate(pipeline2)
          res.json({
              draw,
              recordsTotal: totalclients.length,
              recordsFiltered: totalclients.length,
              data: transaction,
          });
          } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Server error' });
          }
        
        
        });
      /////
    exports.individualarrivals  = (async (req, res) => {
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
          const refferences = await Reference.aggregate([{ $sample: { size: 20 } }]);
          const names = refferences.map(reff => reff.name);  
            res.json({ results: names })
        }else{
          const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

            const refferences = await Reference.find({ name: { $regex: escapedSearchTerm, $options: 'i' } }, 'newRouteName');
        
            const names = refferences.map(reff => reff.name);
        
            res.json({ results: names });
            
        }
            
              
        
          
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    
        };
      
        exports.getTransportAgent = async (req, res) => {
          try {
            const searchTerm = req.query.term;
        if(!searchTerm){
          const agents = await Transportagent.aggregate([{ $sample: { size: 20 } }]);
      
          const names = agents.map(agent => agent.agent);  
            res.json({ results: names })
        }else{
          const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

            const agents = await Transportagent.find({ agent: { $regex: escapedSearchTerm, $options: 'i' } }, 'agent');
        
            const names = agents.map(agent => agent.agent);
        
            res.json({ results: names });
            
        }
            
              
        
          
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    
        };


        ///////////////////// purchase bills /////////////
        exports.invoicebasepurchasebills = async (req, res) => {
          console.log('here');
          const { lotnumber } = req.query;
          console.log(lotnumber)
          try {
              const bills = await ClientModel.aggregate([
                  // Unwind the purchasebillSchema array to de-normalize it
                  { $unwind: "$purchasebillSchema" },
                  // Match documents where the lotnumber matches
                  { $match: { "purchasebillSchema.invoice": lotnumber } },
                  // Group to get back purchasebillSchema array
                  {
                      $group: {
                          _id: null,
                          purchasebillSchema: { $push: '$purchasebillSchema' }
                      }
                  },
                  // Project to include only the purchasebillSchema field
                  {
                      $project: {
                          _id: 0, // Exclude _id field
                          purchasebillSchema: 1
                      }
                  }
              ]);
              // Send the purchasebillSchema array as response
              res.json(bills.length > 0 ? bills[0].purchasebillSchema : []);
          } catch (error) {
              console.error(error);
              res.status(500).send('An error occurred while fetching purchase bills');
          }
      };
      