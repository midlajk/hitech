
require('../model/clientsmodal')
const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client')
const CoffeeSchema = mongoose.model('CoffeeSchema');
const Reference = mongoose.model('Reference');
const PoductsSchema = mongoose.model('PoductsSchema')
const Transportagent = mongoose.model('Transportagent')


exports.deletepurchasecommitment = async (req, res) => {
    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const purchaseCommitmentIndex = client.purchasecommitments.findIndex(commitment => commitment._id == req.params.id);

        if (purchaseCommitmentIndex === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }

        // Remove the purchase commitment from the array
        client.purchasecommitments.splice(purchaseCommitmentIndex, 1);
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.error('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.deletesalescommitments = async (req, res) => {
    console.log('here')
    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const salescommitmentindex = client.salescommitmentsschema.findIndex(commitment => commitment._id == req.params.id);

        if (salescommitmentindex === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }

        // Remove the purchase commitment from the array
        client.salescommitmentsschema.splice(salescommitmentindex, 1);
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.error('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


exports.deletepurchasebill = async (req, res) => {
    console.log(req.params)
    const billId = req.params.billId;

    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const purchasebill = client.purchasebillSchema.find(commitment => commitment.uniqueid == billId);
        const transaction = client.transaction.find(data => data.id == billId);
        const coffee = client.coffee.find(data => data.lotnumber == purchasebill.lotnumber);
        if (coffee) {
            coffee.storage = coffee.storage + purchasebill.qty

        }
        const purchasebillSchema = client.purchasebillSchema.findIndex(commitment => commitment.uniqueid == billId);
        const transactionindex = client.transaction.findIndex(data => data.id == billId);
        var payable = transaction.payable
        var recievable = transaction.revievable
        var paid = transaction.paid
        var recieved = transaction.recieved
        const storeout = client.storeout + 0
        const storein = client.storein + parseFloat(purchasebill.qty)

        if (purchasebillSchema === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }
        const purchasecommitment = client.purchasecommitments.find(commitment => commitment.id === purchasebill.commitment);

        if (purchasecommitment) {
            // Calculate the new balance by subtracting the delivered quantity from the total quantity
            // Update the balance in the sales commitment object
            var weight = purchasecommitment.balanceweight + purchasebill.weight
            purchasecommitment.balanceweight = purchasecommitment.balanceweight + purchasebill.weight;
            purchasecommitment.balance = parseInt(weight * eppercentage / 100);

        }
        // Remove the purchase commitment from the array
        client.purchasebillSchema.splice(purchasebillSchema, 1);
        client.transaction.splice(transactionindex, 1);
        client.payable = client.payable - payable;
        client.recievable = client.recievable - recievable;
        client.paid = client.paid - paid;
        client.recieved = client.recieved - recieved;

        client.storeout = storeout;
        client.storein = storein;
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


exports.deletesalesbill = async (req, res) => {
    const billId = req.params.billId;

    try {
        const client = await ClientModel.findOne({ name: req.params.name });

        if (!client) {

            return res.status(404).json({ error: 'Client not found' });
        }
        const salesbill = client.salesbillSchema.find(commitment => commitment.uniqueid == billId);
        const transaction = client.transaction.find(data => data.id == billId);
        console.log('lll', transaction)
        const coffee = client.despatch.find(data => data.lotnumber == salesbill.lotnumber);
        if (coffee) {
            coffee.storage = coffee.storage + salesbill.qty

        }
        const salesbillSchema = client.salesbillSchema.findIndex(commitment => commitment.uniqueid == billId);
        const transactionindex = client.transaction.findIndex(data => data.id == billId);
        var payable = transaction.payable
        var recievable = transaction.revievable
        var paid = transaction.paid
        var recieved = transaction.recieved
        const storeout = client.storeout + 0
        const storein = client.storein + parseFloat(salesbill.qty)

        if (salesbillSchema === -1) {
            return res.status(404).json({ error: 'Purchase commitment not found' });
        }
        const salescommitment = client.salescommitmentsschema.find(commitment => commitment.id === salesbill.commitment);

        if (salescommitment) {
            // Calculate the new balance by subtracting the delivered quantity from the total quantity
            // Update the balance in the sales commitment object
            var weight = salescommitment.balanceweight + salesbill.weight
            salescommitment.balanceweight = salescommitment.balanceweight + salesbill.weight;
            salescommitment.balance = parseInt(weight * eppercentage / 100);

        }
        // Remove the purchase commitment from the array
        client.salesbillSchema.splice(salesbillSchema, 1);
        client.transaction.splice(transactionindex, 1);
        client.payable = client.payable - payable;
        client.recievable = client.recievable - recievable;
        client.paid = client.paid - paid;
        client.recieved = client.recieved - recieved;

        client.storeout = storeout;
        client.storein = storein;
        await client.save();

        // If successful, send a success response
        return res.json({ message: 'Purchase commitment deleted successfully' });
    } catch (error) {
        console.log(error)

        console.log('Error deleting purchase commitment:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};