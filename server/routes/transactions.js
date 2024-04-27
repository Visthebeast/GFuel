const express = require('express')

const router = express.Router()

//get all transactions
router.get('/', (req,res) =>{
    res.json({mssg: 'GET all transactions'})
})

//get settled transactions
router.get('/settled', (req,res) => {
    res.json({mssg:'GET all settled transactions'})
})

//POST a new settled transaction
router.post('/settled',(req,res) =>{
    res.json({mssg: 'POST new transactions'})
})

//POST a new settled transaction
router.delete('/:id',(req,res) =>{
    res.json({mssg: 'delete a transaction'})
})

//POST a new settled transaction
router.patch('/:id',(req,res) =>{
    res.json({mssg: 'UPDATE a transaction'})
})

module.exports = router