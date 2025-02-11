const { name } = require('ejs');
const { uniq, lowerCase } = require('lodash');
const{isEmail}=require('validator')
const bcrypt=require('bcrypt')
const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,'enter your name'],
        lowerCase:true
    },
    userPhone:{
        type:String,
        required:[true,'enter your phone'],  
    },
    email:{
        type:String,
        required:[true,'enter your email'],
        unique:true,
        lowerCase:true,
        validate:[isEmail,'enter a valide email']
    },
    password:{
        type:String,
        required:[true,'enter your password'],
        minlength:[6,'minimum lehgth is 6 characters']
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps:true})

userSchema.pre('save', async function(next){
const salt = await bcrypt.genSalt();
this.password =await bcrypt.hash(this.password,salt)
next()
})
userSchema.statics.login = async function(userName,email,password){
    const user =await this.findOne({userName,email})
    if(user){
    const auth = await   bcrypt.compare(password,user.password)
    if (auth) {
        return user
    }
    throw Error ('incorrect password')
    }
    throw Error('incorrect username or  email')  
}

const User =mongoose.model('user',userSchema)

module.exports=User

