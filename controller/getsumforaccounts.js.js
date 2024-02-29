
require('../model/clientsmodal')
const mongoose = require('mongoose');
const ClientModel = mongoose.model('Client');

exports.getpurchasesum = async (req, res) => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    try {
        const result1 = await ClientModel.aggregate([
            { $unwind: '$transaction' },
            {
                $group: {
                    _id: null,
                    totalPayable: { $sum: '$transaction.payable' },
                    totalPaid: { $sum: '$transaction.paid' }
                }
            }
        ]);

        const result2 = await ClientModel.aggregate([
            { $unwind: '$coffee' },
            {
                $match: {
                    'coffee.item': { $ne: 'husk' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalNetepweight: { $sum: '$coffee.netepweight' }
                }
            }
        ]);

        const result3 = await ClientModel.aggregate([
            { $unwind: '$purchasebillSchema' },
            {
                $match: {
                    'purchasebillSchema.item': { $ne: 'husk' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalQty: { $sum: '$purchasebillSchema.qty' },
                    totalAmount: { $sum: '$purchasebillSchema.total' }
                }
            }
        ]);
        console.log(result1,result2,result3)

        res.json({
            data: {
                totalNetepweight: result2[0]?.totalNetepweight || 0,
                totalQty: result3[0]?.totalQty || 0,
                totalAmount: result3[0]?.totalAmount || 0,
                totalPayable: result1[0]?.totalPayable || 0,
                totalPaid: result1[0]?.totalPaid || 0
            }
        });
    } catch (error) {
        console.error('Error in aggregation:', error);
        res.status(500).json({ error: 'Error in aggregation' });
    }
};

exports.getsalessum = async (req, res) => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    try {
        const result1 = await ClientModel.aggregate([
            { $unwind: '$transaction' },
            {
                $group: {
                    _id: null,
                    totalRevievable: { $sum: '$transaction.revievable' },
                    totalRecieved: { $sum: '$transaction.recieved' }
                }
            }
        ]);

        const result2 = await ClientModel.aggregate([
            { $unwind: '$despatch' },
            {
                $match: {
                    'despatch.item': { $ne: 'husk' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalNetepweight: { $sum: '$despatch.netepweight' }
                }
            }
        ]);

        const result3 = await ClientModel.aggregate([
            { $unwind: '$salesbillSchema' },
            {
                $match: {
                    'salesbillSchema.item': { $ne: 'husk' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalQty: { $sum: '$salesbillSchema.qty' },
                    totalAmount: { $sum: '$salesbillSchema.total' }
                }
            }
        ]);
        res.json({
            data: {
                totalNetepweight: result2[0]?.totalNetepweight || 0,
                totalQty: result3[0]?.totalQty || 0,
                totalAmount: result3[0]?.totalAmount || 0,
                totalRevievable: result1[0]?.totalRevievable || 0,
                totalRecieved: result1[0]?.totalRecieved || 0
            }
        });
    } catch (error) {
        console.error('Error in aggregation:', error);
        res.status(500).json({ error: 'Error in aggregation' });
    }
};
