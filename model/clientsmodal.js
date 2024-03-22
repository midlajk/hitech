const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const coffeeSchema = new Schema({
  date: Date,
  referenceselect: String,
  billTo: String,
  transportagent: String,
  lorry: String,
  billtype: String,
  delivery: String,
  remarks: String,
  item: String,
  bags: Number,
  quantity: Number,
  bagweight: Number,
  forignobject: Number,
  weightallowance: Number,
  outern: Number,
  huskpercentage: Number,
  huskcutting: Number,
  moisturepercentage: Number,
  moisturecutting: Number,
  bbpercentage: Number,
  bbcutting: Number,
  berryborepercentage: Number,
  berryborecutting: Number,
  other: Number,
  allowance: Number,
  lotnumber:String,
  netepweight:Number,
  netWeight:Number,
  eppercentage:Number,
  storage:Number,
  stat:String
});
const despatch = new Schema({
  date: Date,
  referenceselect: String,
  billTo: String,
  transportagent: String,
  lorry: String,
  billtype: String,
  delivery: String,
  remarks: String,
  item: String,
  bags: Number,
  quantity: Number,
  bagweight: Number,
  forignobject: Number,
  weightallowance: Number,
  outern: Number,
  huskpercentage: Number,
  huskcutting: Number,
  moisturepercentage: Number,
  moisturecutting: Number,
  bbpercentage: Number,
  bbcutting: Number,
  berryborepercentage: Number,
  berryborecutting: Number,
  other: Number,
  allowance: Number,
  lotnumber:String,
  netepweight:Number,
  netWeight:Number,
  eppercentage:Number,
  storage:Number,
  stat:String

});


const purchasecommitmentsschema = new Schema({
    item:String,
    date:Date,
    referance:String,
    id:String,
    weight:Number,
    eppercentage:Number,
    balanceweight:Number,
    balance:Number,
    rate:Number,
    additional:String,
    info:String
     // Price/Rate
});
const salescommitmentsschema = new Schema({
    item:String,
    date:Date,
    referance:String,
    id:String,
    weight:Number,
    eppercentage:Number,
    delivered:Number,
    balanceweight:Number,
    balance:Number,
    rate:Number,
    additional:String,
    info:String
     // Price/Rate
});
const purchasebillSchema = new Schema({
  // Define fields for the bill schema
  // Example fields:
  date: Date,
  item: String,
  invoice:String,
  uniqueid:String,
  commitment:String,
  lotnumber:String,
  qty:Number,
  weight:Number,

  amount: Number,
  subtotal:Number,
  tax:Number,
  total:Number,
  tds:Number
  // Add other fields as needed
});
const salesbillSchema = new Schema({
  // Define fields for the bill schema
  // Example fields:
  date: Date,
  item: String,
  invoice:String,
  uniqueid:String,
  commitment:String,
  lotnumber:String,
  weight:Number,
  qty:Number,
  amount: Number,
  subtotal:Number,
  sgst:Number,
  cgst:Number,
  igst:Number,
  total:Number,
  tds:Number
  // Add other fields as needed
});
const Transaction = new Schema({
  name:String,
  date: Date,
  refference: String,
  revievable:Number,
  payable:Number,
  medium:String,
  id:String,
  recieved:Number,
  paid:Number,

  // Add other fields as needed
});
const clientSchema = new Schema({
    name: String,
    gst: String,
    address: String,
    phone: String,
    recievable: Number,
    payable: Number,
    paid:Number,
    recieved:Number,
    storein:Number,
    storeout:Number,
    coffee: [coffeeSchema],
    purchasecommitments:[purchasecommitmentsschema],
    salescommitmentsschema:[salescommitmentsschema],
    despatch:[despatch],
    purchasebillSchema:[purchasebillSchema],
    salesbillSchema:[salesbillSchema],
    transaction:[Transaction]
});

const referenceSchema = new mongoose.Schema({
    name: String,
    defaulted:Date
  });
  const productsSchema = new mongoose.Schema({
    itemtype:String,
    product: String,
    stockweight:Number,
    stockep:Number,
    stockpercentage:Number,
    byproduct:[]

  });
  const transportagent = new mongoose.Schema({
    agent: String,
    address:String,
    phone:String,
    strength:Number,
    loads:[]

  });
  const variables = new mongoose.Schema({
    refference: String,
    pbillid: Number,
    sbill: Number,
    creditnoteid: Number,
    debitnoteid: Number,
    urdbillid: Number,
    financialyear: String,

  });
const ClientModel = mongoose.model('Client', clientSchema); // Use a different variable name here
const CoffeeSchema = mongoose.model('CoffeeSchema', coffeeSchema); // Use a different variable name here

const Transportagent = mongoose.model('Transportagent', transportagent);

  // Create a model based on the schema
const PoductsSchema = mongoose.model('PoductsSchema', productsSchema);

const Reference = mongoose.model('Reference', referenceSchema);
const Variables = mongoose.model('Variables', variables);

module.exports = ClientModel;
module.exports = Reference;
module.exports = PoductsSchema;
module.exports = Transportagent;
module.exports = CoffeeSchema;
module.exports = Variables;
