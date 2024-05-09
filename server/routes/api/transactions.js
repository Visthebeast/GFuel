const express = require('express');
const router = express.Router();

const {
    createTransaction,
    getSettledTransactions,
    getEmployerTransaction,
    getEmployeeTransaction,
    deleteTransaction,
    updateTransaction
} =require('../../controllers/transactionsController')

const ROLES_LIST = require('../../config/roles_list');

const verifyRoles = require('../../middleware/verifyRoles');


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
// router.route('/')
    
// //.post(verifyRoles(ROLES_LIST.User), transactionsController.addTransaction)
//     .post(transactionsController.addTransaction)
    
//     //.get(verifyRoles(ROLES_LIST.User), transactionsController.getAllTransactions)
//     .get(transactionsController.getAllTransactions)
    
//     //.delete(verifyRoles(ROLES_LIST.User), transactionsController.deleteTransaction);

// router.route('/yee/:id')
//     //.get(verifyRoles(ROLES_LIST.User), transactionsController.getYeeTransaction);
//     .get(transactionsController.getYeeTransaction);

// router.route('/yer/:id')
//     //.get(verifyRoles(ROLES_LIST.User), transactionsController.getYeeTransaction);
//     .get(transactionsController.getYerTransaction);

// module.exports = router;