import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


const WorkoutForm=()=>{
const {dispatch} =useWorkoutsContext()


const [title,setTitle]=useState('')
const [load,setLoad]=useState('')
const [reps,setReps]=useState('')
const [error,setError]=useState('')


const handelSumbit=async(e)=>{
    e.preventDefault()

    const Workout={title,load,reps}

    const response=await fetch('/api/workouts',{
        method:'Post',
        body:JSON.stringify(Workout),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const json=await  response.json()

    if(!response.ok){
        setError(json.error)
    }
    if(response.ok){
        setTitle('')
        setLoad('')
        setReps('')
        setError(null)
        console.log('new workout added',json)
        dispatch({type:'WORKOUT_CREATED',payload:json})
    }
}
    return(
        <form className="create" onSubmit={handelSumbit}>
            <h3>Add a New Workout</h3>
            <label>Excersize title</label>
            <input 
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            />

        <label>Load (in kg)</label>
            <input 
            type="number"
            onChange={(e)=>setLoad(e.target.value)}
            value={load}
            />

        <label>Reps:</label>
            <input 
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}



export default WorkoutForm