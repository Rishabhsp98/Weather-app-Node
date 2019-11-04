const path= require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPathMAIN=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath= path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location   
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)


// Setup static directory
app.use(express.static(publicDirectoryPathMAIN))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-app',
        name:'Rishabh Sharma'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Rishabh Sharma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        forecast:'It is foggy',
        title:'Need Help?',
        name:'Rishabh sharma'
    })
})
// weather route
app.get('/weather',(req,res)=>{

   if(!req.query.address)
   {
       return res.send({
           error:'You should provide an Address here like ,Delhi or Mumbai?'
       })
   }
   
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error)
       {
           return res.send({error})
       }
       forecast(latitude,longitude,(error,forecastData)=>{
           if(error)
           {
               return res.send({error})
           }
           res.send({
               forecast:forecastData,
               location,
               address:req.query.address
           })

       })

   })
          

})
app.get('/product',(req,res)=>{

    if(!req.query.search)
    {
         return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
// 404 page for help/anything
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        text:'Help content does not found'
    })
})

// 404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Page not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})