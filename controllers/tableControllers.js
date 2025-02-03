const { result } = require("lodash")
const Table = require("../modles/table")


const table_booked = async (req,res)=>{
 Table.find().sort({createcreatedAt:-1})
    .then((result)=>{
        res.render('tables/table',{title:'booked tables',tables:result})
    }).catch((err)=>{
        console.log(err);
    }) 
}
const book_table_get =(req,res)=>{
    res.render('tables/book',{title:'book a table'})
}
const book_table_post=(req,res)=>{
    const table = new Table(req.body)
    table.save()
    .then((result)=>{
        res.redirect('/table')
    }).catch((err)=>{
        console.log(err);
        
    })
}
const table_details =(req,res)=>{
    const id = req.params.id
    Table.findById(id)
    .then((result)=>{
        res.render('tables/tableDetails',{table:result,title:'edite reservation'})
    }).catch((err)=>{
        console.log(err);
    })
}

const table_edit_get=(req,res)=>{
    const id =req.params.id
    Table.findById(id)
    .then((result)=>{
        res.render('tables/editTable',{table:result,title:'edit reservation'})
    })
    .catch((err)=>{
        res.status(404).render('404',{title:'table reservation not found'})  
    })
}
const table_edit_post=(req,res)=>{
    const id =req.params.id
Table.findByIdAndUpdate(id,{
        date:req.body.date,
        time:req.body.time,
        name:req.body.name,
        phone:req.body.phone,
        peopleNumber:req.body.peopleNumber
}).then((result)=>{
    res.redirect('/table')
}).catch((err)=>{
    console.log(err);
})
}
const table_delete =(req,res)=>{
    const id = req.params.id
    Table.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/table'})
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports={
    table_booked,
    book_table_get,
    book_table_post,
    table_details,
    table_edit_get,
    table_edit_post,
    table_delete
}