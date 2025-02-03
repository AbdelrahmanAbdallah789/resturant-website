const express =require('express')
const contactController =require('../controllers/contactController')
const {requireAuth,requireAuthrize} = require('../middleware/authmiddleware');
const router = express.Router();
const Contact =require('../modles/contact')

router.get('/contact',requireAuth,contactController.contact_made)
router.get('/contacts/makeContact',contactController.contact_make_get)
router.post('/contact',requireAuth,contactController.contact_make_post)
router.get('/contact/:id',requireAuth,contactController.contact_details)
router.get('/editContact/:id',requireAuth,contactController.contact_edit_get)
router.post('/updateContact/:id',requireAuth,contactController.contact_edit_post)
router.delete('/contact/:id',requireAuth,contactController.contact_delete)

module.exports= router;
