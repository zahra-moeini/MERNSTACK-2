import { createContext, useReducer } from "react";

export const WorkoutsContext=createContext()

export const WorkoutsReducer=(state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                Workouts:action.payload
            }
            case 'CREATE_WORKOUT':
                return{
                    Workouts:[action.payload,...state.Workouts]
                }
              default:
                return state  
    }
}

export const WorkoutsContextProvider=({children})=>{
    const[status,dispatch]=useReducer(WorkoutsReducer,{
        Workouts:null
    })


    return(
        <WorkoutsContext.Provider value={{...state,dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )

}