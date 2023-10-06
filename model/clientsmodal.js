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

const clientSchema = new Schema({
    name: String,
    gst: String,
    address: String,
    phone: String,
    coffee: [coffeeSchema]
});

const ClientModel = mongoose.model('Client', clientSchema); // Use a different variable name here

module.exports = ClientModel;
