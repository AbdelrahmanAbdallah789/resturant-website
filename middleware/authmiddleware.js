const jwt = require('jsonwebtoken');
const User =require('../modles/user')
const Table =require('../modles/table')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token,'this is a website that i worken on', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}
const requireAuthrize=async(req,res,next)=>{
  try {
       const token=req.cookies.jwt
        if (!token) {
          return res.redirect('/signup');
       }
       const decodedToken= jwt.verify(token,'this is a website that i worken on')
       const user=await User.findById(decodedToken.id)
       if (!user) {
          return res.redirect('/signup');
       }
       if (user.role !=='admin') {
          return res.redirect('/signup');
       }
     req.user=user
       next()
  } catch (error) {
      console.log(error)
  }
}
const checkUser=(req,res,next)=>{
  const token =req.cookies.jwt
  if(token){
    jwt.verify(token,'this is a website that i worken on', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken);
        let user= await User.findById(decodedToken.id)
        res.locals.user=user
        next();
      }
    });
  }else{
    res.locals.user=null
    next()
  }
}
module.exports = { requireAuth,checkUser,requireAuthrize};