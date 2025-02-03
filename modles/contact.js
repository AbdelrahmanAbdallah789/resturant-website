const { times } = require('lodash')
const mongoose =require('mongoose')
const Schema =mongoose .Schema
const contactSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
    }
},{timestamps:true})
const Contact =mongoose.model('contact',contactSchema)

module.exports=Contact;