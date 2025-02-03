const { times } = require('lodash')
const mongoose =require('mongoose')
const Schema =mongoose .Schema
const tableSchema=new Schema({
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    peopleNumber:{
        type:Number,
        required:true
    },
},{timestamps:true})
const Table =mongoose.model('table',tableSchema)
module.exports=Table;