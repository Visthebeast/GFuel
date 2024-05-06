const mongoose = require('mongoose')

const Schema = mongoose.Schema

const settledTransactionsSchema = new Schema({
    employeeid: String,
    employerid: String,
    billdate: String,
    settlementdate: String,
    transactionvalue: Number,
    index: Number
}, { timestamps: true })

module.exports = mongoose.model('settledBill',settledTransactionsSchema)

