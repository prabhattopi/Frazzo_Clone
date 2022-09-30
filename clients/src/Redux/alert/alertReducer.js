import { ALERT } from "./alerts"

const initial={
    loading:false,
    success:""|[],
    errors:""|[]
}
export const alertReducer=(state=initial,{type,payload})=>{
 switch(type){

    case ALERT:{
        return {
            ...state,
            loading:payload.loading,
            success:payload.success,
            errors:payload.errors
        }
    }
        


    default :
    return state
}
 }
   