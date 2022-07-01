const workout=require('../models/workoutModel')
const mongoose=require('mongoose')

// get all workouts
const getWorkouts=async(req,res)=>{
    const workouts=await workout.find({}).sort({createdAt:-1})

    res.status(200).json(workouts)
}

// get a singls workout

const getWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'NO such workout'})
    }

    const workout=await workout.findById(id)

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

// create new workout
const createWorkout=async(req,res)=>{
    const{title,load,reps}=req.body
    // add doc to db
  try{
    const workout= await workout.create({title,load,reps})
    res.status(200).json(workout)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
}
// delete  a workout
const deleteWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error:'NO such workout'})
    }
    res.status(200).json(workout)
}
// update a workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout=await workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout
}

