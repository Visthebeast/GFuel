const express = require('express')

const {
    createTransaction,
    getSettledTransactions,
    getEmployerTransaction,
    getEmployeeTransaction,
    deleteTransaction,
    updateTransaction
} =require('../controllers/transactionController')

const router = express.Router()

//get all transactions
router.get('/', (req,res) =>{
    res.json({mssg: 'GET all transactions'})
})

//get all settled transactions under an employer
router.get('/employer/:eid', getEmployerTransaction)

//get all settled transactions for an employ
router.get('/employee/:eid', getEmployeeTransaction)

//get settled transactions
router.get('/settled',getSettledTransactions)

//POST a new settled transaction
router.post('/settled',createTransaction)

//POST a new settled transaction
router.delete('/:id',deleteTransaction)

//POST a new settled transaction
router.patch('/:id',updateTransaction)

module.exports = router