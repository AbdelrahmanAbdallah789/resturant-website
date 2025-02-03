const User= require('../modles/user')
const jwt =require('jsonwebtoken')
// handle errors
const handelError=(err)=>{
console.log(err.message,err.code);
let errors={userName:'',userPhone:'',email:'',password:''}
if(err.message==='incorrect username or  email'){
 errors.email='that userName or email dosent exist'
} 
if(err.message==='incorrect password'){
    errors.password='that password is incorrect'
}
if (err.code===11000) {
    errors.email='that email already exist'
    return errors
}
if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]=properties.message 
    }); 
}
return errors
}
// creating jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id},'this is a website that i worken on', {
    expiresIn: maxAge
  });
}
// user controller code
const signup_get=(req,res)=>{
    res.render('users/signup',{title:'sign up'})
}

const signup_post= async (req,res)=>{
    const{userName,userPhone,email,password,role}=req.body
    try {
      const user = await  User.create({userName,userPhone,email,password,role})
      const token=createToken(user._id)
      res.cookie('jwt',token,{httpOnly:true,secure:true,maxAge:maxAge*1000})
      res.status(201).json({user:user._id})
    } catch (err) {
        const errors=handelError(err)
        res.status(400).json({errors})
    }
}
const login_get =(req,res)=>{
    res.render('users/login',{title:'login'})
}
const login_post= async (req,res)=>{
    const{userName,email,password}=req.body
    try {
        const user =await User.login(userName,email,password)
        const token=createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,secure:true,maxAge:maxAge*1000})
        res.status(200).json({user:user._id})
    } catch (err) {
        const errors =handelError(err)
        res.status(400).json({errors})
    }
}
const logout_get =(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}
const get_adminPanel =(req,res)=>{
    res.render('users/adminPanel')
}
module.exports={
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get,
    get_adminPanel
}