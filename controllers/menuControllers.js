const Food = require('../modles/food');
const fs = require('fs')
const path =require('path')

const menu_index = async (req,res)=>{
   const food = await Food.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('foods/index',{title: 'menu',foods:result}).json(food)
    })
    .catch((err)=>{
        console.log(err);
    })
}

const menu_details=(req,res)=>{
    const id =req.params.id
    Food.findById(id)
    .then((result)=>{
        res.render('foods/details',{food:result,title:'food details'})
    })
    .catch((err)=>{
        res.status(404).render('404',{title:'food not found'})  
    })
}

const menu_create_get=(req,res)=>{
    res.render('foods/create',{title:'the Menu'})
}

const menu_create_post=(req,res)=>{
    const food =new Food({
        price:req.body.price,
        title:req.body.title,
        ingredient:req.body.ingredient,
        image:req.file.filename
    })
    food.save()
    .then((result)=>{
        res.redirect('/menu')
    }).catch((err)=>{
        console.log(err);
    })
}

const menu_edit_get=(req,res)=>{
    const id =req.params.id
    Food.findById(id)
    .then((result)=>{
        res.render('foods/edit',{food:result,title:'edit food'})
    })
    .catch((err)=>{
        res.status(404).render('404',{title:'food not found'})  
    })
}
const menu_edit_post=(req,res)=>{
    const id =req.params.id
    let new_image=""
    if(req.file){
        new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.oldImage)
        } catch (err) {
            console.log(err);
        }
    }else{
        new_image = req.body.old_image
    }
Food.findByIdAndUpdate(id,{
        price:req.body.price,
        title:req.body.title,
        ingredient:req.body.ingredient,
        image:new_image
}).then((result)=>{
    res.redirect('/menu')
}).catch((err)=>{
    console.log(err);
})
}

const menu_delete=(req,res)=>{
    const id =req.params.id
    Food.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/menu'})
    })
    .catch((err)=>{
        console.log(err); 
    })
}
module.exports={
    menu_index,
    menu_details,
    menu_create_get,
    menu_create_post,
    menu_edit_get,
    menu_edit_post,
    menu_delete,
}