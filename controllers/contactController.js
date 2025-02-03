const { result } = require("lodash")
const Contact = require("../modles/contact")


const contact_made = async (req,res)=>{
 Contact.find().sort({createcreatedAt:-1})
    .then((result)=>{
        res.render('contacts/contact',{title:'contact us',contacts:result})
    }).catch((err)=>{
        console.log(err);
    }) 
}
const contact_make_get =(req,res)=>{
    res.render('contacts/makeContact',{title:'make contact'})
}
const contact_make_post=(req,res)=>{
    const contact = new Contact(req.body)
    contact.save()
    .then((result)=>{
        res.redirect('/contact')
    }).catch((err)=>{
        console.log(err);
        
    })
}
const contact_details =(req,res)=>{
    const id = req.params.id
    Contact.findById(id)
    .then((result)=>{
        res.render('contacts/contactDetails',{contact:result,title:'edite contact'})
    }).catch((err)=>{
        console.log(err);
    })
}

const contact_edit_get=(req,res)=>{
    const id =req.params.id
    Contact.findById(id)
    .then((result)=>{
        res.render('contacts/editContact',{contact:result,title:'edit contact'})
    })
    .catch((err)=>{
        res.status(404).render('404',{title:'contact data not found'})  
    })
}
const contact_edit_post=(req,res)=>{
    const id =req.params.id
Contact.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message
}).then((result)=>{
    res.redirect('/contact')
}).catch((err)=>{
    console.log(err);
})
}
const contact_delete =(req,res)=>{
    const id = req.params.id
    Contact.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/contact'})
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports={
    contact_made,
    contact_make_get,
    contact_make_post,
    contact_details,
    contact_edit_get,
    contact_edit_post,
    contact_delete
}