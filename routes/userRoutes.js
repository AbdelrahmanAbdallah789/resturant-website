const express =require('express')
const userController =require('../controllers/userController')
const {requireAuth,requireAuthrize} = require('../middleware/authmiddleware');
const router =express.Router();
router.get('/signup',userController.signup_get)
router.post('/signup',userController.signup_post)
router.get('/login',userController.login_get)
router.post('/login',userController.login_post)
router.get('/logout',userController.logout_get)
router.get('/users/adminPanel',requireAuth,requireAuthrize,userController.get_adminPanel)

module.exports = router