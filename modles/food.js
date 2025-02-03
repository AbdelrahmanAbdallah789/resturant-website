const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const foodSchema = new  Schema({
    price:{
        type:mongoose.Types.Decimal128,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    ingredient:{
        type:String,
        required:true
    },
    image: { 
        type: String,
        required:true 
    }
},{timestamps:true});
const Food = mongoose.model('food', foodSchema)
module.exports =Food;

