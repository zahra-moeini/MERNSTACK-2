import { useEffect ,useState} from "react"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"

const Home=()=>{
    const [workouts,setWorkouts]=useState(null)

    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('/api/workouts')
            const json=await response.json()
            if(response.ok){
                setWorkouts(json)
            }
        }
        fetchWorkouts()
    },[])
    return(
        <div className="home">
           <div className="workouts">
            {workouts &&  workouts.map((Workout)=>(
               <WorkoutDetails key={Workout._id} Workout={Workout}/>
            ))}
           </div>
           <WorkoutForm/>
        </div>
    )
}
export default Home