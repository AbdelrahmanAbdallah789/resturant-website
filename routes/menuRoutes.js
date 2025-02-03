const express =require('express')
const path =require ('path')
const menuController =require('../controllers/menuControllers')
const {requireAuth,requireAuthrize} = require('../middleware/authmiddleware');
const router = express.Router();
const multer = require('multer')
const Food = require('../modles/food');


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+"_"+file.originalname); 
    }
})
var upload=multer({
    storage:storage,
}).single('image')

router.get('/menu',menuController.menu_index)   
router.post('/menu',requireAuth,requireAuthrize,upload,menuController.menu_create_post)
router.get('/foods/create',requireAuth,menuController.menu_create_get) 
router.get('/menu/:id',requireAuth,requireAuthrize,menuController.menu_details)
router.get('/edit/:id',requireAuth,requireAuthrize,menuController.menu_edit_get)
router.post('/update/:id',requireAuth,requireAuthrize,upload,menuController.menu_edit_post)
router.delete('/menu/:id',requireAuth,requireAuthrize,menuController.menu_delete)




module.exports= router;