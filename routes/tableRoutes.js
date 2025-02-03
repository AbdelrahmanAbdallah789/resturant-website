const express =require('express')
const tableController =require('../controllers/tableControllers')
const {requireAuth,requireAuthrize} = require('../middleware/authmiddleware');
const router = express.Router();
const Table =require('../modles/table')

router.get('/table',requireAuth,tableController.table_booked)
router.get('/tables/book',tableController.book_table_get)
router.post('/table',requireAuth,tableController.book_table_post)
router.get('/table/:id',requireAuth,tableController.table_details)
router.get('/editTable/:id',requireAuth,tableController.table_edit_get)
router.post('/updateTable/:id',requireAuth,tableController.table_edit_post)
router.delete('/table/:id',requireAuth,tableController.table_delete)

module.exports= router;

