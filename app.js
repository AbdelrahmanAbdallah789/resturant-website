//requires
const express =require('express');
const morgan =require('morgan');
const mongoose =require('mongoose');
const { result } = require('lodash');
const path=require('path')
const cookieParser=require('cookie-parser')
const menuRoutes =require('./routes/menuRoutes')
const tableRoutes =require('./routes/tableRoutes')
const userRoutes = require('./routes/userRoutes' );
const contactRoutes=require('./routes/contactRoutes')
const { requireAuth, checkUser } = require('./middleware/authmiddleware');
//declaring the app
const app =express();
//starting the server
const dbURL='mongodb+srv://abdo:abdo1234@cluster0.kj2ida2.mongodb.net/resturant'
mongoose.connect(dbURL)
.then((result)=>app.listen(5000))
.catch((err)=>console.log(err))
//the middleware
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

//the code of the app
app.get('*',checkUser)
app.get('/', (req,res)=>{
    res.render('home',{title:'home'})
})
app.get('/bookedTables',requireAuth,(req,res)=>{
    res.redirect('/table')
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'about'})
})
app.get('/pages',(req,res)=>(
    res.render('pages',{title:'recipies'})
))
app.get('/content',(req,res)=>{
    res.render('content',{title:'content'})
})
app.use(menuRoutes)
app.use(tableRoutes)
app.use(userRoutes)
app.use(contactRoutes)

app.use((req,res)=>{
    res.status(404).render('404',{title:'not found'})
})