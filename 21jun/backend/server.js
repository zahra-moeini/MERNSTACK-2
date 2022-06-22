require('dotenv').config()

const express=require('express');
const workoutRoutes=require('./routes/workouts.js')

// express app
const app=express()

// middlewre
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})



// routes
app.use('/api/workouts',workoutRoutes)

app.get('/',(req,res)=>{
    res.json({mssg:'welcome to the app'})
})

// listen for requests
app.listen(process.env.PORT,()=>{
    console.log('listeneing on port',process.env.PORT);
})


