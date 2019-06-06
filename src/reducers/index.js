import * as actionTypes from "../actions/types"
import { combineReducers } from "redux";

const initialUserState ={
    currentUser:'',
    isLoading:true
}

const user_reducer = (state = initialUserState ,action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
                return({
                    currentUser : action.payload.currentUser,
                    isLoading:false
                })
        default:
            return state;
    }
}// generates states in the store

const rootReducer = combineReducers({
    user : user_reducer
})// makes a tree of states with user as a branch of root , initially it is initialUserState

export default rootReducer;