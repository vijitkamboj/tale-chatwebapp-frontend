import * as actionTypes from "../actions/types"
import { combineReducers } from "redux";

const initialUserState ={
    currentUser:null,
    isLoading:true,
    register_status:null
}
// by defualt loading is ture 
const user_reducer = (state = initialUserState ,action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return({
                currentUser : action.payload.currentUser,
                isLoading:false,
                register_status: action.payload.register_status
            })
        case actionTypes.CLEAR_USER :
            return({
                currentUser : action.payload.currentUser,
                isLoading:false,
                register_status: null
            })
        default:
            return state;
    }
}// generates states in the store according to the action 

const rootReducer = combineReducers({
    user : user_reducer
})// makes a tree of states with user as a branch of root , initially it is initialUserState

export default rootReducer;