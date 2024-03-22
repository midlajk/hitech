
require('../model/clientsmodal')
const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const CoffeeSchema = mongoose.model('CoffeeSchema');
const Reference = mongoose.model('Reference');
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')


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
if(client.length>0&&client[0].coffee.length==1){
  return res.render('editreport',{ route: 'generatereport',coffee:client[0].coffee[0] ,status:'Purchase'});
}else{
  return
}


  };
  exports.editsalesentry = async (req, res) => {
    console.log('gee')
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
  if(client.length>0&&client[0].despatch.length==1){
    return res.render('editreport',{ route: 'generatereport',coffee:client[0].despatch[0] ,status:'Sales'});
  }else{
    return
  }
  
  
    };