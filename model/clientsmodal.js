const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    invoice: String,
    item: String,      // Item name
    bags: Number,      // Number of bags
    qty: Number,       // Quantity
    priceRate: Number,
    lorry: String,
    billtype: String,
    Commitment: String,
    igst: String,
    sgst: String,
    cgst: String,
    total: String,
    aftercutting: Number,
    outern: Number,
    Moisture: Number,
    blacks: Number,
    husk: Number,
    aaa: Number,
    aa: Number,
    a: Number,
    b: Number,
    c: Number,
    pberry: Number
     // Price/Rate
});

const despatch = new Schema({
    invoice: String,
    item: String,      // Item name
    bags: Number,      // Number of bags
    qty: Number,       // Quantity
    priceRate: Number,
    lorry: String,
    billtype: String,
    Commitment: String,
    igst: String,
    sgst: String,
    cgst: String,
    total: String,
    aftercutting: Number,
    outern: Number,
    Moisture: Number,
    blacks: Number,
    husk: Number,
    aaa: Number,
    aa: Number,
    a: Number,
    b: Number,
    c: Number,
    pberry: Number
     // Price/Rate
});
const purchasecommitmentsschema = new Schema({
    item:String,
    date:Date,
    referance:String,
    id:String,
    weight:Number,
    eppercentage:Number,
    delivered:Number,
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
    balance:Number,
    rate:Number,
     // Price/Rate
});
const clientSchema = new Schema({
    name: String,
    gst: String,
    address: String,
    phone: String,
    coffee: [coffeeSchema],
    purchasecommitments:[purchasecommitmentsschema],
    salescommitmentsschema:[salescommitmentsschema],
    despatch:[despatch]
});

const referenceSchema = new mongoose.Schema({
    name: String
  });
  const productsSchema = new mongoose.Schema({
    product: String,
    byproduct:[]

  });
  const transportagent = new mongoose.Schema({
    agent: String,
    address:String,
    phone:String,
    strength:Number,
    loads:[]

  });
const ClientModel = mongoose.model('Client', clientSchema); // Use a different variable name here
const CoffeeSchema = mongoose.model('CoffeeSchema', coffeeSchema); // Use a different variable name here

const Transportagent = mongoose.model('Transportagent', transportagent);

  // Create a model based on the schema
const PoductsSchema = mongoose.model('PoductsSchema', productsSchema);

const Reference = mongoose.model('Reference', referenceSchema);
  
module.exports = ClientModel;
module.exports = Reference;
module.exports = PoductsSchema;
module.exports = Transportagent;
module.exports = CoffeeSchema;
