const settledBill = require("../models/transactionModel");
const mongoose = require('mongoose')

//GET all settledtransactions
const getSettledTransactions = async(req,res) =>{
    const settled=await settledBill.find({})

    res.status(200).json(settled)
}


//GET all settled transactions under an employer
const getEmployerTransaction = async(req,res) => {
    const { eid } = req.params

    const settled = await settledBill.find({employerid: eid})

    if(!settled){
        return res.status(404).json({error: 'No bills'})
    }

    res.status(200).json(settled)
} 

//GET all settled transactions of an employ
const getEmployeeTransaction = async(req,res) => {
    const { eid } = req.params

    const settled = await settledBill.find({employeeid: eid})

    if(!settled){
        return res.status(404).json({error: 'No bills'})
    }

    res.status(200).json(settled)
} 

//create new settled transactions
const createTransaction = async(req,res) =>{
        const transactions = req.body;
//add doc to db
        try {
          const settled = await settledBill.create(transactions);
          res.status(200).json(settled);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
}


//DELETE a transaction
const deleteTransaction = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such transaction'})
    }

    const settled = await settledBill.findOneAndDelete({_id: id})

    if(!settled){
        return res.status(404).json({error: 'No bills'})
    }    

    res.status(200).json(settled)
}


//update a transaction
const updateTransaction = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such transaction'})
    }

    const settled = await settledBill.findOneAndUpdate({_id: id}, {...req.body})

    if (!settled) {
      return res.status(404).json({ error: "No bills" });
    }

    res.status(200).json(settled);
}




module.exports={
    createTransaction,
    getSettledTransactions,
    getEmployerTransaction,
    getEmployeeTransaction,
    deleteTransaction,
    updateTransaction
}