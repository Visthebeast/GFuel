const mongoose = require('mongoose')

const Schema = mongoose.Schema

const settledTransactionsSchema = new Schema({
    employeeid: {
        type: String,
        required: true
    },
    employerid: String,
    billdate: String,
    settlementdate: String,
    transactionvalue: Number
}, { timestamps: true })

module.exports = mongoose.model('settledBill',settledTransactionsSchema)

